# THE WORLD TODAY

Halaman depan koran untuk Minggu, 22 November 2026. Gambarnya berukuran 1024x1024 dan memuat enam cerita: satu berita utama besar di atas, lalu lima berita lain di bawahnya. File gambarnya `entry.png`.

## Cerita di halaman depan

1. COP31: TALKS RUN INTO SUNDAY

Perundingan iklim PBB di Antalya molor sampai hari Minggu. Paket final setebal 10 halaman baru diajukan Minggu dini hari, dan pemungutan suara dijadwalkan Minggu pagi. Draf terakhir menghapus semua penyebutan bahan bakar fosil. Target dana adaptasi 120 miliar dolar AS per tahun ikut dicoret. Ada juga target elektrifikasi 35 persen pada 2035. Ini COP pertama yang mengakui target 1,5 derajat Celsius akan terlampaui.

Sumber: Reuters, 20 November; AP, 21 November; UN News, 20 November.

2. UK-EU RESET DEAL SEALED

Brussels menyepakati paket baru: perdagangan pangan, skema mobilitas pemuda 100.000 orang ke tiap arah, dan perdagangan emisi yang terhubung. Perdana Menteri Andy Burnham menyebut kesepakatan itu menguntungkan kedua pihak.

Sumber: Reuters, CNN, The Guardian, 20 November.

3. RIKERS TO CLOSE BY 2032

Wali Kota New York Zohran Mamdani mengumumkan rencana penuh menutup kompleks penjara Rikers Island pada 2032 dan menggantinya dengan empat penjara borough. Populasi penjara turun dari 6.600 menjadi 4.100 orang. Anggaran 146 juta dolar AS disiapkan untuk layanan kesehatan mental.

Sumber: BBC, 21 November; Reuters; AP, 20 November.

4. PARIS OFFICERS JAILED

Pengadilan Paris memenjarakan tiga polisi atas pemukulan produser musik Michel Zecler pada November 2020. Rasisme jadi pemberat dalam putusan itu. Hukumannya satu sampai dua tahun penjara, ditambah larangan seumur hidup menjadi polisi.

Sumber: Le Monde, 21 November; The Guardian; BBC, 20 November.

5. ANC FIGHTS TO HOLD KEY CITIES

ANC meraih sekitar 31 persen suara nasional pada pemilu munisipal 8 November dan tidak meraih mayoritas mutlak di delapan kota metro. Partai itu menolak meniru skema power-sharing nasional dengan DA di tingkat lokal.

Sumber: BBC, 21 November.

6. RAHUL TON POWERS INDIA

KL Rahul mencetak century Test pertamanya di Selandia Baru, 100 run dari 207 bola, pada hari ketiga Test pertama di Basin Reserve, Wellington, 21 November. India membalas 368 run Selandia Baru dengan 344/2. Rahul belum out di 124, Gill 36.

Sumber: AP, IANS, 21 November; Cricbuzz live.

## File

Repo ini isinya empat file: `main.ts` untuk menyalin dan memeriksa gambar, `entry.png` untuk gambar halaman depan itu sendiri, `README.md` yang sedang dibaca, dan `LICENSE` untuk lisensi MIT.

## Menjalankan

Programnya `main.ts`, ditulis dengan Node dan pustaka standar saja. Ia menyalin `entry.png` yang ada di sebelah script ke direktori output sebagai `entry.png`. Direktori output diatur lewat `MAKEFUN_OUTPUT_DIR`, dan kalau variabel itu tidak diisi, program memakai `/output`.

```sh
MAKEFUN_OUTPUT_DIR=/output npx tsx main.ts
```

Sebelum mengaku sukses, program memeriksa tiga hal: ukuran output sama dengan sumber, output diawali magic bytes PNG atau JPEG yang valid, dan SHA-256 output sama dengan SHA-256 sumber. Kalau satu saja gagal, output yang rusak dihapus, pesan error ditulis ke stderr, dan program keluar dengan kode non-zero. Kalau semua lolos, program mencetak satu baris berisi jumlah byte dan hash SHA-256.

Program ini deterministik. Tidak ada network, tidak ada angka acak, tidak ada jam.

## Verifikasi

Hash `entry.png` yang dikirim:

```text
SHA-256: 07f59c698b4e70d33be78daf9ebfff2fb23d02673caa40c7b71764cd78253d9b
Ukuran:  314.944 byte
Format:  JPEG, 1024x1024
```

Cek sendiri dengan perintah ini:

```sh
sha256sum entry.png
```

Lalu bandingkan hasilnya dengan hash di atas. Setelah menjalankan program, cek juga hash file di direktori output. Keduanya harus sama persis.

## Lisensi

MIT. Lihat `LICENSE`.
