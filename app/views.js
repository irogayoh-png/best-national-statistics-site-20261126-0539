// StatNusa — views.js
// Satu pekerjaan: mengubah data menjadi halaman HTML per rute.
// Setiap fungsi render mengembalikan HTML satu halaman lengkap.

import { barChart, lineChart, donutChart, hbarChart, legend } from "./charts.js";
import {
  HEADLINE, POPULATION_YEAR, AGE_GROUPS, ISLAND_SHARE, PROVINCES,
  GDP_YEAR, GDP_SECTORS, INFLATION_YEAR, CPI_SERIES, TPT_YEAR, POVERTY_YEAR,
  TRADE_YEAR, EXPORT_DESTINATIONS, TOP_EXPORTS, HDI_YEAR, FACTS,
  EDUCATION, SOURCES, UPDATES,
} from "./data.js";

// Format angka Indonesia: 281,6 — bukan 281.6.
function idNum(v, decimals = 1) {
  return v.toLocaleString("id-ID", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function src(text) {
  return `<p class="source">Sumber: ${text}</p>`;
}

function kpiCard(k) {
  return `<a class="kpi" href="${k.route}" data-kpi="${k.id}">
    <span class="kpi-label">${k.label}</span>
    <span class="kpi-value">${k.value}</span>
    <span class="kpi-detail">${k.detail}</span>
    <span class="kpi-change">${k.change}</span>
    <span class="kpi-source">Sumber: ${k.source}</span>
  </a>`;
}

function sectionHead(title, intro) {
  return `<div class="section-head"><h2>${title}</h2><p>${intro}</p></div>`;
}

function yearButtons(years, current, group) {
  return `<div class="year-row" role="group" aria-label="Pilih tahun">${years.map((y) => `<button type="button" class="year-btn${y === current ? " active" : ""}" data-year-group="${group}" data-year="${y}">${y}</button>`).join("")}</div>`;
}

function toggleButtons(current, group, options) {
  return `<div class="toggle-row" role="group" aria-label="Jenis bagan">${options.map((o) => `<button type="button" class="toggle-btn${o.value === current ? " active" : ""}" data-toggle-group="${group}" data-toggle="${o.value}">${o.label}</button>`).join("")}</div>`;
}

// ---------- Beranda ----------
export function renderHome(state) {
  const tab = state.homeTab || "sorotan";
  const tabBody = tab === "sorotan"
    ? `<div class="duo">
        <article class="card"><h3>Pertumbuhan tetap di atas 5%</h3>
        <p>Ekonomi tumbuh 5,03% pada 2024, nyaris sama dengan 5,05% pada 2023. Konsumsi rumah tangga — 54,04% dari PDB — tumbuh 4,94%, sementara investasi tumbuh 4,61%.</p>${src("BPS, rilis 5 Februari 2025")}</article>
        <article class="card"><h3>Pengangguran terendah sejak sebelum pandemi</h3>
        <p>Tingkat pengangguran terbuka 4,91% pada Agustus 2024, lebih rendah dari 5,32% setahun sebelumnya dan dari 5,76% pada Agustus 2019.</p>${src("BPS Sakernas, Agustus 2024")}</article>
        <article class="card"><h3>Surplus dagang tahun kelima</h3>
        <p>Neraca perdagangan surplus US$31,04 miliar pada 2024. Ekspor US$264,70 miliar, impor US$233,66 miliar — surplus lima tahun berturut-turut sejak 2020.</p>${src("BPS / Kementerian Keuangan, 2024")}</article>
        <article class="card"><h3>Kemiskinan di bawah 9% untuk pertama kalinya</h3>
        <p>Persentase penduduk miskin 8,57% pada September 2024, turun dari 9,03% pada Maret 2024. Garis kemiskinan Rp595.242 per kapita per bulan.</p>${src("BPS, 2024")}</article>
      </div>`
    : `<ul class="update-list">${UPDATES.map((u) => `<li><span class="update-date">${u.date}</span><span>${u.text}</span></li>`).join("")}</ul>
      <p class="muted">Pembaruan memakai tahun acuan 2024 sebagai dasar yang lengkap; angka 2025–2026 dikutip dari rilis resmi terbaru.</p>`;
  return `
  <section class="hero">
    <p class="eyebrow">Portal Statistik Indonesia · Tahun acuan 2024</p>
    <h1>Angka resmi Indonesia,<br>dalam satu tempat.</h1>
    <p class="lede">Penduduk, ekonomi, harga, pekerjaan, perdagangan, kesehatan, dan pendidikan — setiap angka disertai sumber dan tahunnya, supaya Anda bisa memakainya dengan percaya diri.</p>
    <div class="hero-actions">
      <a class="btn primary" href="#/ekonomi">Lihat ekonomi 2024</a>
      <a class="btn" href="#/daerah">Bandingkan provinsi</a>
      <button type="button" class="btn" id="copy-link">Salin tautan halaman ini</button>
    </div>
  </section>
  <section aria-label="Indikator utama">
    <div class="kpi-grid">${HEADLINE.map(kpiCard).join("")}</div>
  </section>
  <section>
    ${sectionHead("Sorotan dan pembaruan", "Empat hal yang paling penting dari data 2024, lalu kabar terbaru dari rilis resmi.")}
    <div class="tabs" role="tablist" aria-label="Sorotan atau pembaruan">
      <button type="button" role="tab" class="tab${tab === "sorotan" ? " active" : ""}" data-home-tab="sorotan" aria-selected="${tab === "sorotan"}">Sorotan 2024</button>
      <button type="button" role="tab" class="tab${tab === "terbaru" ? " active" : ""}" data-home-tab="terbaru" aria-selected="${tab === "terbaru"}">Pembaruan terbaru</button>
    </div>
    ${tabBody}
  </section>
  <section>
    ${sectionHead("Penduduk terus bertambah, perlahan", "Pertumbuhan penduduk melambat dari 1,3% menjadi sekitar 1,0% per tahun, tetapi jumlahnya tetap naik hampir 3 juta jiwa setiap tahun.")}
    <div class="chart-card">
      ${barChart(POPULATION_YEAR.map((p) => ({ label: String(p.year), value: p.value })), { format: (v) => `${idNum(v)} jt` })}
      ${src("BPS, 2024 — jumlah penduduk pertengahan tahun (juta jiwa)")}
    </div>
  </section>
  <section>
    ${sectionHead("Fakta cepat", "Angka-angka yang paling sering dicari tentang Indonesia.")}
    <dl class="facts">${FACTS.map((f) => `<div class="fact"><dt>${f.label}</dt><dd>${f.value}</dd><dd class="fact-src">Sumber: ${f.source}</dd></div>`).join("")}</dl>
  </section>
  <section class="note-box">
    <h2>Cara memakai situs ini</h2>
    <p>Ketik kata kunci di kotak pencarian atas untuk melompat ke indikatornya. Setiap halaman punya bagan yang bisa diubah jenisnya, tabel yang bisa diurutkan, dan tombol unduh CSV pada tabel provinsi. Semua data tersimpan di situs ini — tidak ada yang diambil dari internet saat Anda membukanya.</p>
    <p><a href="#/sumber">Lihat daftar sumber dan metodologi →</a></p>
  </section>`;
}

// ---------- Penduduk ----------
export function renderPopulation(state) {
  const kind = state.popKind || "bar";
  const chart = kind === "line"
    ? lineChart(POPULATION_YEAR.map((p) => ({ label: String(p.year), value: p.value })), { format: (v) => `${idNum(v)} jt` })
    : barChart(POPULATION_YEAR.map((p) => ({ label: String(p.year), value: p.value })), { format: (v) => `${idNum(v)} jt` });
  return `
  <section class="page-head"><p class="eyebrow">Penduduk</p><h1>281,6 juta jiwa, dan terus bertambah</h1>
  <p class="lede">Indonesia adalah negara berpenduduk terbesar keempat di dunia. Pertumbuhannya melambat, tetapi setiap tahun bertambah sekitar 3 juta jiwa — setara satu kota besar baru.</p></section>
  <section>
    ${sectionHead("Jumlah penduduk 2020–2024", "Pertengahan tahun, dalam juta jiwa.")}
    <div class="chart-card">${toggleButtons(kind, "popKind", [{ value: "bar", label: "Batang" }, { value: "line", label: "Garis" }])}${chart}${src("BPS, 2024")}</div>
  </section>
  <section>
    ${sectionHead("Siapa penduduk Indonesia?", "Hampir tujuh dari sepuluh penduduk berada pada usia produktif — peluang besar, sekaligus pekerjaan rumah untuk lapangan kerja.")}
    <div class="duo">
      <div class="chart-card">${donutChart(AGE_GROUPS.map((g) => ({ label: g.group, value: g.share })), { centerTop: "68,9%", centerBottom: "usia produktif" })}${legend(AGE_GROUPS.map((g) => ({ label: `${g.group} (${g.note})`, value: g.share })))}</div>
      <div class="chart-card"><h3>Sebaran menurut pulau</h3>${hbarChart(ISLAND_SHARE.map((s) => ({ label: s.island, value: s.share })), { format: (v) => `${idNum(v)}%`, labelWidth: 170 })}${src("BPS, 2024 — persen penduduk")}</div>
    </div>
  </section>
  <section>
    ${sectionHead("Provinsi berpenduduk terbesar", "Klik judul kolom untuk mengurutkan. Kepadatan dihitung dari jumlah penduduk dibagi luas wilayah.")}
    ${provinceTable(state, "pop")}
    ${src("BPS, 2024 — penduduk pertengahan tahun; luas wilayah BPS; TPT BPS Sakernas Agustus 2024")}
  </section>`;
}

export function provinceRows(list) {
  return list.map((p) => {
    const density = Math.round((p.pop * 1000000) / p.area);
    return `<tr><td>${p.name}</td><td>${p.island}</td><td class="num">${idNum(p.pop, 2)}</td><td class="num">${density.toLocaleString("id-ID")}</td><td class="num">${idNum(p.tpt, 2)}%</td></tr>`;
  }).join("");
}

export function provinceTable(state, context) {
  const q = (state.provFilter || "").toLowerCase();
  const list = [...PROVINCES].filter((p) => !q || p.name.toLowerCase().includes(q) || p.island.toLowerCase().includes(q));
  const key = state.sortKey || "pop";
  const dir = state.sortDir || -1;
  list.sort((a, b) => {
    const av = key === "name" || key === "island" ? a[key] : key === "density" ? (a.pop * 1000000) / a.area : a[key];
    const bv = key === "name" || key === "island" ? b[key] : key === "density" ? (b.pop * 1000000) / b.area : b[key];
    if (typeof av === "string") return dir * av.localeCompare(bv, "id");
    return dir * (av - bv);
  });
  const th = (label, k) => `<th scope="col"><button type="button" class="sort-btn" data-sort="${k}" data-context="${context}" aria-sort="${key === k ? (dir === 1 ? "ascending" : "descending") : "none"}">${label} ${key === k ? (dir === 1 ? "▲" : "▼") : ""}</button></th>`;
  return `<div class="table-tools">
      <label class="filter-label">Cari provinsi <input type="search" id="prov-filter" placeholder="mis. Jawa, Sumatera…" value="${(state.provFilter || "").replace(/"/g, "&quot;")}" aria-label="Cari provinsi"></label>
      <button type="button" class="btn small" id="csv-download">Unduh tabel (CSV)</button>
    </div>
    <div class="table-wrap"><table class="data-table" id="prov-table">
      <caption>12 provinsi berpenduduk terbesar, 2024</caption>
      <thead><tr>${th("Provinsi", "name")}${th("Pulau", "island")}${th("Penduduk (jt)", "pop")}${th("Kepadatan (jiwa/km²)", "density")}${th("TPT (%)", "tpt")}</tr></thead>
      <tbody>${provinceRows(list) || `<tr><td colspan="5">Tidak ada provinsi yang cocok dengan “${(state.provFilter || "").replace(/</g, "&lt;")}”.</td></tr>`}</tbody>
    </table></div>
    <p class="muted">${list.length} dari 12 provinsi ditampilkan. TPT = tingkat pengangguran terbuka, Agustus 2024.</p>`;
}

// ---------- Ekonomi ----------
export function renderEconomy(state) {
  const kind = state.gdpKind || "bar";
  const year = state.gdpYear || 2024;
  const row = GDP_YEAR.find((g) => g.year === year);
  const chart = kind === "line"
    ? lineChart(GDP_YEAR.map((g) => ({ label: String(g.year), value: g.growth })), { format: (v) => `${idNum(v, 2)}%` })
    : barChart(GDP_YEAR.map((g) => ({ label: String(g.year), value: g.nominal })), { format: (v) => `Rp${v.toLocaleString("id-ID")} T` });
  return `
  <section class="page-head"><p class="eyebrow">Ekonomi</p><h1>PDB Rp22.139 triliun, tumbuh 5,03%</h1>
  <p class="lede">Ekonomi Indonesia tumbuh stabil di atas 5% selama tiga tahun berturut-turut. PDB per kapita mencapai Rp78,6 juta — sekitar US$4.960 — pada 2024.</p></section>
  <section>
    ${sectionHead("Pertumbuhan dan besarnya ekonomi", "Batang menunjukkan PDB atas dasar harga berlaku; garis menunjukkan laju pertumbuhannya.")}
    <div class="chart-card">${toggleButtons(kind, "gdpKind", [{ value: "bar", label: "PDB (Rp triliun)" }, { value: "line", label: "Pertumbuhan (%)" }])}${chart}${src("BPS, rilis 5 Februari 2025")}</div>
  </section>
  <section>
    ${sectionHead("Sorotan per tahun", "Pilih tahun untuk melihat angkanya.")}
    ${yearButtons(GDP_YEAR.map((g) => g.year), year, "gdpYear")}
    <div class="duo">
      <article class="card stat"><span class="stat-label">PDB ${row.year}</span><span class="stat-value">Rp${row.nominal.toLocaleString("id-ID")} triliun</span><span class="stat-note">Atas dasar harga berlaku</span></article>
      <article class="card stat"><span class="stat-label">Pertumbuhan ${row.year}</span><span class="stat-value">${idNum(row.growth, 2)}%</span><span class="stat-note">Dibanding tahun sebelumnya (c-to-c)</span></article>
    </div>
    ${src("BPS, 2025")}
  </section>
  <section>
    ${sectionHead("Apa yang menggerakkan ekonomi?", "Industri pengolahan tetap lapangan usaha terbesar, diikuti perdagangan dan pertanian.")}
    <div class="duo">
      <div class="chart-card">${donutChart(GDP_SECTORS.map((s) => ({ label: s.sector, value: s.share })), { centerTop: "18,98%", centerBottom: "industri pengolahan" })}${legend(GDP_SECTORS)}</div>
      <div>
        <article class="card"><h3>Dari sisi pengeluaran</h3><p>Konsumsi rumah tangga 54,04% dari PDB dan tumbuh 4,94% pada 2024. Investasi (PMTB) tumbuh 4,61%; konsumsi pemerintah tumbuh 6,28%.</p>${src("BPS, 2025")}</article>
        <article class="card"><h3>APBN 2024</h3><p>Pendapatan negara terealisasi Rp2.842,5 triliun; belanja negara Rp3.350,3 triliun; defisit Rp507,8 triliun atau 2,29% dari PDB.</p>${src("Kementerian Keuangan, 2025")}</article>
        <article class="card"><h3>Cadangan devisa</h3><p>US$155,7 miliar pada akhir Desember 2024 — setara pembiayaan 6,7 bulan impor.</p>${src("Bank Indonesia, 2024")}</article>
      </div>
    </div>
  </section>`;
}

// ---------- Harga & Tenaga Kerja ----------
export function renderPrices(state) {
  const kind = state.priceKind || "inflasi";
  const chart = kind === "inflasi"
    ? lineChart(INFLATION_YEAR.map((p) => ({ label: String(p.year), value: p.value })), { format: (v) => `${idNum(v, 2)}%` })
    : kind === "tpt"
      ? lineChart(TPT_YEAR.map((p) => ({ label: String(p.year), value: p.value })), { format: (v) => `${idNum(v, 2)}%` })
      : lineChart(POVERTY_YEAR.map((p) => ({ label: String(p.year), value: p.value })), { format: (v) => `${idNum(v, 2)}%` });
  const titles = { inflasi: "Inflasi tahunan 2020–2024", tpt: "Pengangguran terbuka (Agustus) 2020–2024", miskin: "Penduduk miskin (September) 2020–2024" };
  const notes = {
    inflasi: "Inflasi 2022 melonjak ke 5,51% setelah penyesuaian harga BBM, lalu kembali ke 1,57% pada 2024 — terendah dalam lima tahun.",
    tpt: "Pengangguran melonjak saat pandemi (7,07% pada Agustus 2020) lalu turun setiap tahun hingga 4,91% pada 2024.",
    miskin: "Kemiskinan naik saat pandemi, lalu turun bertahap hingga 8,57% — pertama kalinya di bawah 9% — pada September 2024.",
  };
  const srcs = { inflasi: "BPS, rilis 2 Januari 2025", tpt: "BPS Sakernas, Agustus 2024", miskin: "BPS, 2024" };
  return `
  <section class="page-head"><p class="eyebrow">Harga &amp; Tenaga Kerja</p><h1>Harga terkendali, pekerjaan membaik</h1>
  <p class="lede">Inflasi kembali ke 1,57%, pengangguran ke 4,91%, dan kemiskinan ke 8,57%. Tiga angka ini bergerak ke arah yang sama pada 2024: membaik.</p></section>
  <section>
    ${sectionHead(titles[kind], notes[kind])}
    <div class="chart-card">${toggleButtons(kind, "priceKind", [{ value: "inflasi", label: "Inflasi" }, { value: "tpt", label: "Pengangguran" }, { value: "miskin", label: "Kemiskinan" }])}${chart}${src(srcs[kind])}</div>
  </section>
  <section>
    ${sectionHead("Siapa yang bekerja?", "Dari 215,37 juta penduduk usia kerja pada Agustus 2024, 152,15 juta orang bekerja dan 7,47 juta menganggur. Tingkat partisipasi angkatan kerja 70,63%.")}
    <div class="duo">
      <article class="card"><h3>Pengangguran tertinggi dan terendah</h3><p>Tertinggi: Jawa Barat 6,75%, Banten 6,68%, Papua Barat 6,48%. Terendah: Papua Pegunungan 1,32%, Bali 1,79%, Sulawesi Barat 2,68%.</p>${src("BPS Sakernas, Agustus 2024")}</article>
      <article class="card"><h3>Upah</h3><p>Rata-rata upah buruh Rp3,26 juta per bulan (Agustus 2024). Upah minimum provinsi 2025 tertinggi di DKI Jakarta: Rp5.396.761 per bulan, naik 6,5% dari 2024.</p>${src("BPS Sakernas, 2024; Pemprov DKI Jakarta, 2025")}</article>
      <article class="card"><h3>Garis kemiskinan</h3><p>Rp595.242 per kapita per bulan pada September 2024; 74,50% di antaranya untuk kebutuhan makanan. Rumah tangga miskin rata-rata beranggotakan 4,71 orang.</p>${src("BPS, 2024")}</article>
      <article class="card"><h3>Perkotaan dan perdesaan</h3><p>Kemiskinan perkotaan 6,66%, perdesaan 11,34% (September 2024). Pengangguran perkotaan 5,79%, perdesaan 3,67%.</p>${src("BPS, 2024")}</article>
    </div>
  </section>
  <section>
    ${sectionHead("Kalkulator daya beli", "Berapa nilai uang tahun lalu dalam rupiah hari ini? Kalkulator ini menyesuaikan dengan inflasi (IHK) BPS.")}
    <div class="card calc-box">
      <div class="calc-row">
        <label>Jumlah (Rp)<input type="number" id="calc-amount" value="1000000" min="0" step="1000" inputmode="numeric"></label>
        <label>Dari tahun
          <select id="calc-year">${CPI_SERIES.map((c) => `<option value="${c.year}"${c.year === 2020 ? " selected" : ""}>${c.year}</option>`).join("")}</select>
        </label>
        <button type="button" class="btn primary" id="calc-run">Hitung nilainya di 2024</button>
      </div>
      <p class="calc-result" id="calc-result" aria-live="polite">Rp1.000.000 pada 2020 setara dengan Rp1.120.200 pada 2024.</p>
      ${src("BPS — IHK 2020 = 100; 2021: 101,87; 2022: 107,49; 2023: 110,29; 2024: 112,02")}
    </div>
  </section>`;
}

// ---------- Perdagangan ----------
export function renderTrade(state) {
  const kind = state.tradeKind || "ekspor";
  const chart = kind === "ekspor"
    ? barChart(TRADE_YEAR.map((t) => ({ label: String(t.year), value: t.exports })), { format: (v) => `US$${idNum(v, 2)} M` })
    : barChart(TRADE_YEAR.map((t) => ({ label: String(t.year), value: t.surplus })), { format: (v) => `US$${idNum(v, 2)} M` });
  return `
  <section class="page-head"><p class="eyebrow">Perdagangan</p><h1>Surplus US$31,04 miliar pada 2024</h1>
  <p class="lede">Indonesia surplus dagang lima tahun berturut-turut. Ekspor naik 2,29% menjadi US$264,70 miliar; impor naik 5,31% menjadi US$233,66 miliar.</p></section>
  <section>
    ${sectionHead(kind === "ekspor" ? "Nilai ekspor 2020–2024" : "Surplus neraca perdagangan 2020–2024", "Dalam miliar dolar AS.")}
    <div class="chart-card">${toggleButtons(kind, "tradeKind", [{ value: "ekspor", label: "Ekspor" }, { value: "surplus", label: "Surplus" }])}${chart}${src("BPS / Kementerian Keuangan, 2024")}</div>
  </section>
  <section>
    ${sectionHead("Ke mana barang Indonesia pergi?", "Tiongkok menyerap hampir seperempat ekspor. Tiga negara tujuan utama — Tiongkok, Amerika Serikat, Jepang — menyumbang 44,2% ekspor nonmigas pada Desember 2024.")}
    <div class="duo">
      <div class="chart-card"><h3>Negara tujuan ekspor utama (US$ miliar)</h3>${hbarChart(EXPORT_DESTINATIONS.map((d) => ({ label: d.country, value: d.value })), { format: (v) => `US$${idNum(v, 2)} M`, labelWidth: 130 })}${src("BPS, 2024")}</div>
      <div class="chart-card"><h3>Komoditas ekspor terbesar (US$ miliar)</h3><ol class="rank-list">${TOP_EXPORTS.map((t, i) => `<li><span>${i + 1}. ${t.good}</span><strong>US$${idNum(t.value)} M</strong></li>`).join("")}</ol>${src("BPS, Januari–November 2024")}</div>
    </div>
  </section>
  <section>
    ${sectionHead("Neraca per tahun", "Surplus menyusut dari puncaknya pada 2022 karena impor tumbuh lebih cepat dari ekspor.")}
    <div class="table-wrap"><table class="data-table"><caption>Perdagangan luar negeri (US$ miliar)</caption>
    <thead><tr><th scope="col">Tahun</th><th scope="col" class="num">Ekspor</th><th scope="col" class="num">Impor</th><th scope="col" class="num">Surplus</th></tr></thead>
    <tbody>${TRADE_YEAR.map((t) => `<tr><td>${t.year}</td><td class="num">${idNum(t.exports, 2)}</td><td class="num">${idNum(t.imports, 2)}</td><td class="num">${idNum(t.surplus, 2)}</td></tr>`).join("")}</tbody></table></div>
    ${src("BPS / Kementerian Keuangan, 2024")}
  </section>`;
}

// ---------- Kesehatan & Pendidikan ----------
export function renderHealth(state) {
  return `
  <section class="page-head"><p class="eyebrow">Kesehatan &amp; Pendidikan</p><h1>Manusia Indonesia makin sehat dan terdidik</h1>
  <p class="lede">IPM mencapai 75,02 pada 2024 — kategori tinggi. Harapan hidup 74,15 tahun, rata-rata lama sekolah 9,04 tahun, dan harapan lama sekolah 13,36 tahun.</p></section>
  <section>
    ${sectionHead("Indeks Pembangunan Manusia 2020–2024", "IPM naik setiap tahun; seluruh komponennya — kesehatan, pendidikan, dan pengeluaran — membaik.")}
    <div class="chart-card">${lineChart(HDI_YEAR.map((h) => ({ label: String(h.year), value: h.value })), { format: (v) => String(v) })}${src("BPS, 2024")}</div>
  </section>
  <section>
    ${sectionHead("Sekolah: hampir semua anak bersekolah", "Angka partisipasi sekolah (APS) menurut jenjang, 2024.")}
    <div class="chart-card">${hbarChart(EDUCATION.map((e) => ({ label: e.level, value: e.aps })), { format: (v) => `${idNum(v)}%`, labelWidth: 210 })}${src("BPS, 2024")}</div>
  </section>
  <section>
    ${sectionHead("Kesehatan dalam angka", "Empat angka yang paling sering dicari.")}
    <div class="duo">
      <article class="card stat"><span class="stat-label">Harapan hidup saat lahir</span><span class="stat-value">74,15 tahun</span><span class="stat-note">BPS, 2024</span></article>
      <article class="card stat"><span class="stat-label">Stunting balita</span><span class="stat-value">19,8%</span><span class="stat-note">Kemenkes (SSGI), 2024 — turun dari 21,5% pada 2023</span></article>
      <article class="card stat"><span class="stat-label">Rata-rata lama sekolah</span><span class="stat-value">9,04 tahun</span><span class="stat-note">BPS, 2024</span></article>
      <article class="card stat"><span class="stat-label">Harapan lama sekolah</span><span class="stat-value">13,36 tahun</span><span class="stat-note">BPS, 2024</span></article>
    </div>
  </section>`;
}

// ---------- Daerah ----------
export function renderRegions(state) {
  return `
  <section class="page-head"><p class="eyebrow">Daerah</p><h1>38 provinsi, satu Indonesia</h1>
  <p class="lede">Jawa Barat adalah provinsi berpenduduk terbesar (50,35 juta jiwa); DKI Jakarta yang terpadat (lebih dari 16.000 jiwa per km²). Bandingkan provinsi-provinsi terbesar di bawah ini.</p></section>
  <section>
    ${sectionHead("Penduduk 12 provinsi terbesar", "Dalam juta jiwa, 2024.")}
    <div class="chart-card">${hbarChart(PROVINCES.map((p) => ({ label: p.name, value: p.pop })), { format: (v) => `${idNum(v, 2)} jt`, labelWidth: 170 })}${src("BPS, 2024")}</div>
  </section>
  <section>
    ${sectionHead("Tabel provinsi", "Cari, urutkan, dan unduh. Tabel memuat 12 provinsi berpenduduk terbesar.")}
    ${provinceTable(state, "daerah")}
    ${src("BPS, 2024 — penduduk pertengahan tahun; luas wilayah BPS; TPT BPS Sakernas Agustus 2024")}
  </section>
  <section class="note-box">
    <h2>Mengapa Jawa begitu padat?</h2>
    <p>Lebih dari separuh penduduk Indonesia tinggal di Jawa — 55,9% dari total — di atas kurang dari 7% luas daratan. Kepadatan Jawa Barat sekitar 1.354 jiwa per km², sementara Kalimantan Barat hanya 40 jiwa per km². Ketimpangan inilah yang membuat pemerataan pembangunan menjadi tema utama statistik daerah.</p>
    ${src("BPS, 2024 — dihitung dari data penduduk dan luas wilayah")}
  </section>`;
}

// ---------- Bandingkan ----------
export function renderCompare(state) {
  const aName = state.compareA || "Jawa Barat";
  const bName = state.compareB || "DKI Jakarta";
  const a = PROVINCES.find((p) => p.name === aName) || PROVINCES[0];
  const b = PROVINCES.find((p) => p.name === bName) || PROVINCES[5];
  const dens = (p) => Math.round((p.pop * 1000000) / p.area);
  const ratio = (a.pop / b.pop).toFixed(1).replace(".", ",");
  const densRatio = Math.round(dens(b) / dens(a));
  const options = (current) => PROVINCES.map((p) => `<option value="${p.name}"${p.name === current ? " selected" : ""}>${p.name}</option>`).join("");
  const row = (label, va, vb, note) => `<tr><th scope="row">${label}</th><td class="num">${va}</td><td class="num">${vb}</td><td class="muted">${note}</td></tr>`;
  return `
  <section class="page-head"><p class="eyebrow">Bandingkan</p><h1>${a.name} lawan ${b.name}</h1>
  <p class="lede">Pilih dua provinsi dan bandingkan langsung: penduduk, kepadatan, dan pengangguran. Semua angka tahun 2024.</p></section>
  <section>
    <div class="card compare-pick">
      <label>Provinsi pertama
        <select id="compare-a">${options(a.name)}</select>
      </label>
      <span class="vs" aria-hidden="true">lawan</span>
      <label>Provinsi kedua
        <select id="compare-b">${options(b.name)}</select>
      </label>
    </div>
  </section>
  <section>
    <div class="table-wrap"><table class="data-table"><caption>Perbandingan ${a.name} dan ${b.name}, 2024</caption>
    <thead><tr><th scope="col">Ukuran</th><th scope="col" class="num">${a.name}</th><th scope="col" class="num">${b.name}</th><th scope="col">Catatan</th></tr></thead>
    <tbody>
      ${row("Penduduk (juta jiwa)", idNum(a.pop, 2), idNum(b.pop, 2), `${a.name} berpenduduk ${ratio} kali ${b.name}`)}
      ${row("Kepadatan (jiwa/km²)", dens(a).toLocaleString("id-ID"), dens(b).toLocaleString("id-ID"), `${b.name} ${densRatio} kali lebih padat`)}
      ${row("Luas wilayah (km²)", a.area.toLocaleString("id-ID"), b.area.toLocaleString("id-ID"), "Luas daratan menurut BPS")}
      ${row("Pengangguran / TPT (%)", idNum(a.tpt, 2) + "%", idNum(b.tpt, 2) + "%", "Agustus 2024 — lebih rendah lebih baik")}
      ${row("Pulau", a.island, b.island, "")}
    </tbody></table></div>
    ${src("BPS, 2024 — penduduk pertengahan tahun; luas wilayah BPS; TPT BPS Sakernas Agustus 2024")}
  </section>
  <section>
    ${sectionHead("Penduduk kedua provinsi", "Dalam juta jiwa.")}
    <div class="chart-card">${hbarChart([{ label: a.name, value: a.pop }, { label: b.name, value: b.pop }], { format: (v) => `${idNum(v, 2)} jt`, labelWidth: 170 })}${src("BPS, 2024")}</div>
  </section>`;
}

// ---------- Sumber ----------
export function renderSources() {
  return `
  <section class="page-head"><p class="eyebrow">Sumber Data</p><h1>Dari mana angka-angka ini berasal</h1>
  <p class="lede">Setiap angka di situs ini dikutip dari publikasi resmi. Tahun acuan utama adalah 2024 — tahun terakhir yang datanya lengkap untuk semua topik saat situs ini disusun.</p></section>
  <section>
    <div class="table-wrap"><table class="data-table"><caption>Daftar sumber menurut penerbit</caption>
    <thead><tr><th scope="col">Penerbit</th><th scope="col">Data yang dipakai</th><th scope="col">Tahun</th></tr></thead>
    <tbody>${SOURCES.map((s) => `<tr><td>${s.publisher}</td><td>${s.items}</td><td>${s.years}</td></tr>`).join("")}</tbody></table></div>
  </section>
  <section>
    ${sectionHead("Metodologi singkat", "Cara membaca angka-angka di situs ini.")}
    <div class="duo">
      <article class="card"><h3>Pertumbuhan penduduk</h3><p>Jumlah penduduk pertengahan tahun dari BPS, berdasarkan Sensus Penduduk dan proyeksi antar-sensus.</p></article>
      <article class="card"><h3>PDB</h3><p>Atas dasar harga berlaku (ADHB) dalam rupiah; pertumbuhan memakai PDB atas dasar harga konstan 2010.</p></article>
      <article class="card"><h3>Inflasi</h3><p>Perubahan Indeks Harga Konsumen (IHK) year-on-year pada Desember tahun berjalan.</p></article>
      <article class="card"><h3>Pengangguran (TPT)</h3><p>Persentase penganggur terhadap angkatan kerja, dari Survei Angkatan Kerja Nasional (Sakernas) Agustus.</p></article>
      <article class="card"><h3>Kemiskinan</h3><p>Persentase penduduk dengan pengeluaran di bawah garis kemiskinan BPS, per September.</p></article>
      <article class="card"><h3>IPM</h3><p>Indeks Pembangunan Manusia BPS: gabungan harapan hidup, pendidikan, dan pengeluaran per kapita yang disesuaikan.</p></article>
    </div>
  </section>
  <section>
    ${sectionHead("Pembaruan setelah 2024", "Angka terbaru dari rilis resmi yang terbit setelah tahun acuan.")}
    <ul class="update-list">${UPDATES.map((u) => `<li><span class="update-date">${u.date}</span><span>${u.text}</span></li>`).join("")}</ul>
  </section>
  <section class="note-box">
    <h2>Catatan</h2>
    <p>StatNusa adalah situs independen dan bukan situs resmi Badan Pusat Statistik. Angka-angka di sini diringkas dari publikasi resmi untuk dibaca cepat; untuk keperluan resmi, rujuk langsung ke publikasi penerbitnya. Pembulatan dapat membuat jumlah komponen berbeda 0,01 dari totalnya.</p>
  </section>`;
}
