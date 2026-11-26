[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/irogayoh-png/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/irogayoh-png/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

# StatNusa — Portal Statistik Indonesia

StatNusa adalah situs statistik nasional Indonesia yang bekerja sepenuhnya
offline dari file statis: buka `app/index.html` di browser desktop atau
ponsel, tanpa satu pun permintaan jaringan.

Situs ini menjawab pertanyaan yang paling sering dicari orang tentang
Indonesia: berapa penduduknya, bagaimana ekonominya bergerak, berapa harga
dan upah, siapa yang bekerja, apa yang diperdagangkan dengan dunia, dan
bagaimana kondisi kesehatan serta pendidikannya — setiap angka disertai
sumber dan tahunnya.

## Yang ada di dalam

- **Beranda** — kartu indikator utama (penduduk, PDB, inflasi,
  pengangguran, kemiskinan, IPM) dengan sumber dan tahun di setiap angka.
- **Penduduk** — pertumbuhan penduduk 2015–2024, piramida usia, sebaran
  pulau, dan tabel provinsi yang bisa diurutkan.
- **Ekonomi** — PDB dan pertumbuhan 2020–2024, struktur PDB menurut
  lapangan usaha, APBN, dan cadangan devisa.
- **Harga & Tenaga Kerja** — inflasi, upah minimum provinsi, tingkat
  pengangguran, dan angkatan kerja menurut sektor.
- **Perdagangan** — ekspor dan impor menurut komoditas dan negara tujuan,
  neraca perdagangan 2020–2024.
- **Kesehatan & Pendidikan** — harapan hidup, angka kematian bayi,
  angka partisipasi sekolah, dan melek huruf.
- **Daerah** — perbandingan 38 provinsi: penduduk, PDRB per kapita,
  kemiskinan, dan IPM, dengan filter dan pengurutan.
- **Sumber Data** — daftar lengkap sumber resmi setiap angka.

Semua bagan digambar oleh kode situs sendiri (tanpa pustaka dari luar),
semua kontrol — pencarian, pemilih tahun, pengalih jenis bagan, pengurutan
tabel, filter provinsi, unduh CSV — benar-benar bekerja.

## Menjalankan

```sh
node serve.ts        # lalu buka http://localhost:8080
```

atau buka langsung `app/index.html` di browser.

## Entri make.fun

Dibangun untuk kompetisi
[Make the best national statistics site](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
di make.fun. `main.ts` di root menyerahkan situs (`app/` dan
`screenshots/`) beserta `dossier.json` yang ditulis oleh
`vendor/makefun-frontend.ts`.

Lisensi: MIT.
