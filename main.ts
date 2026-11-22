// news-image-20261122: one-image front page for Sunday 22 November 2026.
//
// The entry is a program that writes one image to /output/entry.png. The
// image itself lives in this repository as entry.png (drawn by the agent
// from the day's reporting), so this program only has to copy it into
// place. No network, no randomness, no clock: two runs write the same
// bytes every time.
//
// After copying, the program verifies the output three ways: same size as
// the source, valid PNG or JPEG magic bytes, and an identical SHA-256 hash.
// If any check fails it deletes the bad output, prints the problem to
// stderr, and exits non-zero, so a broken copy can never pass as a good
// entry.
//
// Run it outside the grader with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { createHash } from 'node:crypto';
import { copyFileSync, mkdirSync, readFileSync, rmSync, statSync } from 'node:fs';
import { join } from 'node:path';

function sha256(bytes: Buffer): string {
  return createHash('sha256').update(bytes).digest('hex');
}

function fail(dest: string, message: string): never {
  // Never leave a partial or wrong file behind for the grader to find.
  try {
    rmSync(dest, { force: true });
  } catch {
    // Removing the bad file is best effort; the error below is what matters.
  }
  console.error(`error: ${message}`);
  process.exit(1);
}

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR?.trim() || '/output';
  mkdirSync(outDir, { recursive: true });

  const source = new URL('./entry.png', import.meta.url);
  const dest = join(outDir, 'entry.png');
  copyFileSync(source, dest);

  const sourceSize = statSync(source).size;
  const sourceBytes = readFileSync(source);
  const destBytes = readFileSync(dest);

  if (destBytes.length !== sourceSize) {
    fail(
      dest,
      `entry.png copy failed: output is ${destBytes.length} bytes, expected ${sourceSize} bytes`,
    );
  }

  const magic = destBytes.subarray(0, 4);
  const isPng =
    magic[0] === 0x89 &&
    magic[1] === 0x50 &&
    magic[2] === 0x4e &&
    magic[3] === 0x47;
  const isJpeg = magic[0] === 0xff && magic[1] === 0xd8 && magic[2] === 0xff;
  if (!isPng && !isJpeg) {
    fail(
      dest,
      'entry.png copy failed: output does not start with valid PNG or JPEG magic bytes',
    );
  }

  // Byte-for-byte check. Size and magic bytes alone cannot catch a copy
  // that has the right length and format but different content, so hash
  // both files with SHA-256 and compare.
  const sourceHash = sha256(sourceBytes);
  const destHash = sha256(destBytes);
  if (sourceHash !== destHash) {
    fail(
      dest,
      `entry.png copy failed: output SHA-256 ${destHash} does not match source SHA-256 ${sourceHash}`,
    );
  }

  console.log(
    `ok: wrote ${dest} (${destBytes.length} bytes, sha256 ${destHash})`,
  );
}

try {
  main();
} catch (err) {
  // Anything unexpected (missing entry.png, unreadable output dir) is a
  // failed run, not a crash dump: report it and exit non-zero.
  const detail = err instanceof Error ? err.message : String(err);
  console.error(`error: ${detail}`);
  process.exit(1);
}
