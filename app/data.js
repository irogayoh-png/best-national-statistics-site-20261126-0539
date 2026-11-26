// StatNusa — data.js
// Satu pekerjaan: semua angka situs, masing-masing dengan sumber dan tahun.
// Angka diambil dari publikasi resmi (BPS, Bank Indonesia, Kementerian
// Keuangan, Kementerian Perdagangan, Kemenkes, APJII) dan dikutip apa adanya;
// teks penjelasan ditulis sendiri oleh StatNusa.

export const META = {
  country: "Indonesia",
  referenceYear: 2024,
  updated: "November 2026",
  note: "Situs independen. StatNusa bukan situs resmi BPS; setiap angka mencantumkan sumbernya.",
};

// Indikator utama beranda. value ditampilkan apa adanya; unit dan sumber menyertai.
export const HEADLINE = [
  { id: "penduduk", label: "Penduduk", value: "281,6 jt", detail: "jiwa, pertengahan 2024", change: "+1,04% dari 2023", source: "BPS, 2024", route: "#/penduduk" },
  { id: "pdb", label: "PDB", value: "Rp22.139 T", detail: "atas dasar harga berlaku, 2024", change: "Tumbuh 5,03%", source: "BPS, 2025", route: "#/ekonomi" },
  { id: "inflasi", label: "Inflasi", value: "1,57%", detail: "Desember 2024 (y-on-y)", change: "Dari 2,61% pada 2023", source: "BPS, 2025", route: "#/harga-kerja" },
  { id: "tpt", label: "Pengangguran terbuka", value: "4,91%", detail: "Agustus 2024", change: "7,47 jt orang menganggur", source: "BPS Sakernas, 2024", route: "#/harga-kerja" },
  { id: "miskin", label: "Penduduk miskin", value: "8,57%", detail: "September 2024", change: "24,06 jt jiwa", source: "BPS, 2024", route: "#/harga-kerja" },
  { id: "ipm", label: "Indeks Pembangunan Manusia", value: "75,02", detail: "2024, kategori tinggi", change: "Naik dari 74,39 pada 2023", source: "BPS, 2024", route: "#/kesehatan-pendidikan" },
];

export const POPULATION_YEAR = [
  { year: 2020, value: 270.2 },
  { year: 2021, value: 272.2 },
  { year: 2022, value: 275.8 },
  { year: 2023, value: 278.7 },
  { year: 2024, value: 281.6 },
];

export const AGE_GROUPS = [
  { group: "0–14 tahun", share: 24.4, note: "68,8 jt jiwa" },
  { group: "15–64 tahun", share: 68.9, note: "194,0 jt jiwa — usia produktif" },
  { group: "65 tahun ke atas", share: 6.7, note: "18,9 jt jiwa" },
];

export const ISLAND_SHARE = [
  { island: "Jawa", share: 55.9 },
  { island: "Sumatera", share: 21.7 },
  { island: "Sulawesi", share: 7.3 },
  { island: "Kalimantan", share: 6.3 },
  { island: "Bali & Nusa Tenggara", share: 5.6 },
  { island: "Maluku & Papua", share: 3.2 },
];

// 12 provinsi berpenduduk terbesar, 2024 (BPS). Luas dalam km2; kepadatan dihitung.
export const PROVINCES = [
  { name: "Jawa Barat", island: "Jawa", pop: 50.35, area: 37187, tpt: 6.75 },
  { name: "Jawa Timur", island: "Jawa", pop: 41.81, area: 47803, tpt: 4.82 },
  { name: "Jawa Tengah", island: "Jawa", pop: 38.32, area: 34337, tpt: 4.77 },
  { name: "Sumatera Utara", island: "Sumatera", pop: 16.18, area: 72881, tpt: 5.60 },
  { name: "Banten", island: "Jawa", pop: 12.76, area: 9663, tpt: 6.68 },
  { name: "DKI Jakarta", island: "Jawa", pop: 10.68, area: 664, tpt: 6.03 },
  { name: "Sulawesi Selatan", island: "Sulawesi", pop: 9.49, area: 46717, tpt: 4.34 },
  { name: "Lampung", island: "Sumatera", pop: 9.45, area: 34624, tpt: 4.19 },
  { name: "Sumatera Selatan", island: "Sumatera", pop: 9.20, area: 91592, tpt: 4.03 },
  { name: "Riau", island: "Sumatera", pop: 6.97, area: 87024, tpt: 3.70 },
  { name: "Kalimantan Barat", island: "Kalimantan", pop: 5.91, area: 147307, tpt: 4.86 },
  { name: "Nusa Tenggara Timur", island: "Bali & Nusa Tenggara", pop: 5.66, area: 47824, tpt: 2.83 },
];

export const GDP_YEAR = [
  { year: 2020, nominal: 15434, growth: -2.07 },
  { year: 2021, nominal: 16977, growth: 3.70 },
  { year: 2022, nominal: 19588, growth: 5.31 },
  { year: 2023, nominal: 20892, growth: 5.05 },
  { year: 2024, nominal: 22139, growth: 5.03 },
];

export const GDP_SECTORS = [
  { sector: "Industri pengolahan", share: 18.98 },
  { sector: "Perdagangan", share: 12.91 },
  { sector: "Pertanian, kehutanan, perikanan", share: 12.53 },
  { sector: "Konstruksi", share: 10.09 },
  { sector: "Pertambangan dan penggalian", share: 9.02 },
  { sector: "Lapangan usaha lainnya", share: 36.47 },
];

export const INFLATION_YEAR = [
  { year: 2020, value: 1.68 },
  { year: 2021, value: 1.87 },
  { year: 2022, value: 5.51 },
  { year: 2023, value: 2.61 },
  { year: 2024, value: 1.57 },
];

// Indeks Harga Konsumen (2020 = 100), dihitung berantai dari inflasi tahunan BPS:
// 2021 = 100 × 1,0187; 2022 = × 1,0551; 2023 = × 1,0261; 2024 = × 1,0157.
export const CPI_SERIES = [
  { year: 2020, index: 100.0 },
  { year: 2021, index: 101.87 },
  { year: 2022, index: 107.49 },
  { year: 2023, index: 110.29 },
  { year: 2024, index: 112.02 },
];

export const TPT_YEAR = [
  { year: 2020, value: 7.07 },
  { year: 2021, value: 6.49 },
  { year: 2022, value: 5.86 },
  { year: 2023, value: 5.32 },
  { year: 2024, value: 4.91 },
];

export const POVERTY_YEAR = [
  { year: 2020, value: 10.19 },
  { year: 2021, value: 9.71 },
  { year: 2022, value: 9.57 },
  { year: 2023, value: 9.36 },
  { year: 2024, value: 8.57 },
];

export const TRADE_YEAR = [
  { year: 2020, exports: 163.19, imports: 141.57, surplus: 21.62 },
  { year: 2021, exports: 231.61, imports: 196.27, surplus: 35.34 },
  { year: 2022, exports: 291.90, imports: 237.44, surplus: 54.46 },
  { year: 2023, exports: 258.82, imports: 221.93, surplus: 36.89 },
  { year: 2024, exports: 264.70, imports: 233.66, surplus: 31.04 },
];

export const EXPORT_DESTINATIONS = [
  { country: "Tiongkok", value: 62.43 },
  { country: "Amerika Serikat", value: 26.42 },
  { country: "Jepang", value: 20.85 },
  { country: "India", value: 19.61 },
  { country: "Malaysia", value: 11.36 },
  { country: "Singapura", value: 10.05 },
];

export const TOP_EXPORTS = [
  { good: "Bahan bakar mineral (batu bara, migas)", value: 61.5 },
  { good: "Lemak dan minyak hewan/nabati", value: 27.4 },
  { good: "Besi dan baja", value: 27.0 },
  { good: "Mesin dan peralatan listrik", value: 14.2 },
  { good: "Kendaraan dan bagiannya", value: 11.5 },
];

export const HDI_YEAR = [
  { year: 2020, value: 71.94 },
  { year: 2021, value: 72.29 },
  { year: 2022, value: 73.37 },
  { year: 2023, value: 74.39 },
  { year: 2024, value: 75.02 },
];

export const FACTS = [
  { label: "Luas daratan", value: "1.916.907 km²", source: "BPS, 2024" },
  { label: "Jumlah pulau", value: "17.508", source: "KKP, 2024" },
  { label: "Provinsi", value: "38", source: "Kemendagri, 2024" },
  { label: "Kabupaten/kota", value: "514", source: "Kemendagri, 2024" },
  { label: "Penduduk perkotaan", value: "58,6%", source: "BPS, 2024" },
  { label: "Pengguna internet", value: "221,6 jt (79,5%)", source: "APJII, 2024" },
  { label: "Kunjungan wisman", value: "13,90 jt", source: "BPS, 2024" },
  { label: "Cadangan devisa", value: "US$155,7 M", source: "Bank Indonesia, Des 2024" },
  { label: "Angka harapan hidup", value: "74,15 tahun", source: "BPS, 2024" },
  { label: "Rata-rata lama sekolah", value: "9,04 tahun", source: "BPS, 2024" },
  { label: "Harapan lama sekolah", value: "13,36 tahun", source: "BPS, 2024" },
  { label: "Prevalensi stunting balita", value: "19,8%", source: "Kemenkes (SSGI), 2024" },
];

export const EDUCATION = [
  { level: "SD/sederajat (7–12 th)", aps: 99.4 },
  { level: "SMP/sederajat (13–15 th)", aps: 95.6 },
  { level: "SMA/sederajat (16–18 th)", aps: 82.4 },
];

export const SOURCES = [
  { publisher: "Badan Pusat Statistik (BPS)", items: "Penduduk pertengahan tahun; PDB dan pertumbuhan ekonomi; inflasi; Sakernas (TPT, TPAK, upah); kemiskinan; IPM; harapan hidup; lama sekolah; luas wilayah; kunjungan wisatawan mancanegara.", years: "2020–2025" },
  { publisher: "Bank Indonesia", items: "Cadangan devisa; nilai tukar rupiah; suku bunga acuan.", years: "2024" },
  { publisher: "Kementerian Keuangan", items: "Realisasi APBN; neraca perdagangan; siaran pers fiskal.", years: "2024–2025" },
  { publisher: "Kementerian Perdagangan / BPS", items: "Ekspor dan impor menurut negara tujuan dan komoditas.", years: "2024" },
  { publisher: "Kementerian Kesehatan", items: "Survei Status Gizi Indonesia (stunting balita).", years: "2024" },
  { publisher: "APJII", items: "Survei penetrasi pengguna internet Indonesia.", years: "2024" },
  { publisher: "Kemendagri", items: "Jumlah provinsi dan kabupaten/kota.", years: "2024" },
  { publisher: "KKP", items: "Jumlah pulau.", years: "2024" },
];

// Indeks pencarian: setiap entri menunjuk ke halaman dan kotaknya.
export const SEARCH_INDEX = [
  { term: "penduduk", title: "Jumlah penduduk 281,6 juta jiwa", route: "#/penduduk", hint: "BPS, pertengahan 2024" },
  { term: "pdb produk domestik bruto ekonomi", title: "PDB Rp22.139 triliun, tumbuh 5,03%", route: "#/ekonomi", hint: "BPS, 2024" },
  { term: "inflasi harga", title: "Inflasi 1,57% (Desember 2024)", route: "#/harga-kerja", hint: "BPS, 2025" },
  { term: "pengangguran tpt kerja", title: "Pengangguran terbuka 4,91%", route: "#/harga-kerja", hint: "BPS Sakernas, Agustus 2024" },
  { term: "kemiskinan miskin", title: "Penduduk miskin 8,57%", route: "#/harga-kerja", hint: "BPS, September 2024" },
  { term: "ipm pembangunan manusia", title: "IPM 75,02 — kategori tinggi", route: "#/kesehatan-pendidikan", hint: "BPS, 2024" },
  { term: "ekspor impor perdagangan", title: "Ekspor US$264,70 miliar, surplus US$31,04 miliar", route: "#/perdagangan", hint: "BPS / Kemenkeu, 2024" },
  { term: "provinsi daerah jawa barat jakarta", title: "Perbandingan 12 provinsi terbesar", route: "#/daerah", hint: "BPS, 2024" },
  { term: "bandingkan provinsi lawan", title: "Bandingkan dua provinsi", route: "#/bandingkan", hint: "BPS, 2024" },
  { term: "kalkulator daya beli inflasi rupiah", title: "Kalkulator daya beli (IHK)", route: "#/harga-kerja", hint: "BPS, 2024" },
  { term: "sekolah pendidikan aps", title: "Angka partisipasi sekolah dan lama sekolah", route: "#/kesehatan-pendidikan", hint: "BPS, 2024" },
  { term: "harapan hidup kesehatan stunting", title: "Harapan hidup 74,15 tahun, stunting 19,8%", route: "#/kesehatan-pendidikan", hint: "BPS / Kemenkes, 2024" },
  { term: "upah ump jakarta", title: "UMP DKI Jakarta 2025 Rp5.396.761", route: "#/harga-kerja", hint: "Pemprov DKI Jakarta, 2025" },
  { term: "sumber data metodologi", title: "Daftar sumber dan metodologi", route: "#/sumber", hint: "Semua penerbit resmi" },
];

// Pembaruan setelah tahun acuan 2024, dikutip dari rilis resmi.
export const UPDATES = [
  { date: "Februari 2026", text: "Ekonomi 2025 tumbuh 5,11% dan PDB mencapai Rp23.821,1 triliun (BPS)." },
  { date: "Agustus 2025", text: "Tingkat pengangguran terbuka turun ke 4,85% (BPS Sakernas)." },
  { date: "Maret 2025", text: "Tingkat kemiskinan turun ke 8,47% (BPS)." },
];
