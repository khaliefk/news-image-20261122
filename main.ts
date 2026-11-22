import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PNG_HEAD = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const JPEG_HEAD = [0xff, 0xd8, 0xff];

function sha256Of(bytes: Buffer): string {
  return createHash("sha256").update(bytes).digest("hex");
}

function looksLikeImage(bytes: Buffer): boolean {
  const png = PNG_HEAD.every((b, i) => bytes[i] === b);
  const jpeg = JPEG_HEAD.every((b, i) => bytes[i] === b);
  return png || jpeg;
}

function fail(target: string, message: string): never {
  if (existsSync(target)) {
    rmSync(target, { force: true });
  }
  console.error(`error: ${message}`);
  process.exit(1);
}

const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const targetPath = join(outDir, "entry.png");

if (!existsSync(sourcePath)) {
  console.error(`error: source image not found at ${sourcePath}`);
  process.exit(1);
}

const sourceBytes = readFileSync(sourcePath);
const sourceHash = sha256Of(sourceBytes);

if (sourceBytes.length === 0) {
  console.error("error: source image is empty");
  process.exit(1);
}
if (!looksLikeImage(sourceBytes)) {
  console.error("error: source image does not start with a valid PNG or JPEG signature");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(sourcePath, targetPath);

const outBytes = readFileSync(targetPath);
if (statSync(targetPath).size !== sourceBytes.length) {
  fail(targetPath, `size mismatch: got ${outBytes.length} bytes, expected ${sourceBytes.length}`);
}
if (!looksLikeImage(outBytes)) {
  fail(targetPath, "output does not start with a valid PNG or JPEG signature");
}
const outHash = sha256Of(outBytes);
if (outHash !== sourceHash) {
  fail(targetPath, `sha256 mismatch: got ${outHash}, expected ${sourceHash}`);
}

console.log(`${outBytes.length} bytes ${outHash}`);
