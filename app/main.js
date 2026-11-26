// StatNusa — main.js
// Satu pekerjaan: merutekan halaman dan menghidupkan semua kontrol.
// Data tinggal di data.js, bagan di charts.js, halaman di views.js.

import { SEARCH_INDEX, PROVINCES } from "./data.js";
import {
  renderHome, renderPopulation, renderEconomy, renderPrices,
  renderTrade, renderHealth, renderRegions, renderSources,
} from "./views.js";

const view = document.getElementById("view");
const navLinks = [...document.querySelectorAll(".nav-link")];
const searchInput = document.getElementById("site-search");
const searchResults = document.getElementById("search-results");

// Keadaan kontrol yang bertahan selama satu sesi buka situs.
const state = {
  homeTab: "sorotan",
  popKind: "bar",
  gdpKind: "bar",
  gdpYear: 2024,
  priceKind: "inflasi",
  tradeKind: "ekspor",
  provFilter: "",
  sortKey: "pop",
  sortDir: -1,
};

const ROUTES = {
  "/": { render: () => renderHome(state), title: "Beranda" },
  "/penduduk": { render: () => renderPopulation(state), title: "Penduduk" },
  "/ekonomi": { render: () => renderEconomy(state), title: "Ekonomi" },
  "/harga-kerja": { render: () => renderPrices(state), title: "Harga & Tenaga Kerja" },
  "/perdagangan": { render: () => renderTrade(state), title: "Perdagangan" },
  "/kesehatan-pendidikan": { render: () => renderHealth(state), title: "Kesehatan & Pendidikan" },
  "/daerah": { render: () => renderRegions(state), title: "Daerah" },
  "/sumber": { render: () => renderSources(state), title: "Sumber Data" },
};

function routeFromHash() {
  const hash = location.hash.replace(/^#/, "") || "/";
  return ROUTES[hash] ? hash : "/";
}

function render() {
  const route = routeFromHash();
  view.innerHTML = ROUTES[route].render();
  document.title = `StatNusa — ${ROUTES[route].title} | Statistik Indonesia`;
  navLinks.forEach((a) => {
    const on = a.getAttribute("href") === `#${route}`;
    a.classList.toggle("active", on);
    if (on) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  window.scrollTo({ top: 0 });
  wireView();
}

// Semua kontrol halaman: tab, pengalih bagan, pemilih tahun, urutan, filter, CSV, salin tautan.
function wireView() {
  view.querySelectorAll("[data-home-tab]").forEach((b) =>
    b.addEventListener("click", () => { state.homeTab = b.dataset.homeTab; render(); }));
  view.querySelectorAll("[data-toggle-group]").forEach((b) =>
    b.addEventListener("click", () => { state[b.dataset.toggleGroup] = b.dataset.toggle; render(); }));
  view.querySelectorAll("[data-year-group]").forEach((b) =>
    b.addEventListener("click", () => { state[b.dataset.yearGroup] = Number(b.dataset.year); render(); }));
  view.querySelectorAll("[data-sort]").forEach((b) =>
    b.addEventListener("click", () => {
      const key = b.dataset.sort;
      if (state.sortKey === key) state.sortDir = -state.sortDir;
      else { state.sortKey = key; state.sortDir = key === "name" || key === "island" ? 1 : -1; }
      render();
    }));
  const filter = view.querySelector("#prov-filter");
  if (filter) {
    filter.addEventListener("input", () => { state.provFilter = filter.value; render(); keepFilterFocus(); });
  }
  const csv = view.querySelector("#csv-download");
  if (csv) csv.addEventListener("click", downloadProvinceCsv);
  const copy = view.querySelector("#copy-link");
  if (copy) copy.addEventListener("click", () => copyText(location.href, copy));
}

// Setelah render ulang karena mengetik filter, kembalikan fokus ke kotaknya.
function keepFilterFocus() {
  const filter = view.querySelector("#prov-filter");
  if (!filter) return;
  filter.focus();
  filter.setSelectionRange(filter.value.length, filter.value.length);
}

function downloadProvinceCsv() {
  const head = "Provinsi,Pulau,Penduduk (juta jiwa),Kepadatan (jiwa/km2),TPT Agustus 2024 (%)\n";
  const rows = PROVINCES.map((p) => {
    const density = Math.round((p.pop * 1000000) / p.area);
    return [p.name, p.island, p.pop.toFixed(2), density, p.tpt.toFixed(2)].join(",");
  }).join("\n");
  const blob = new Blob([head + rows + "\n"], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "statnusa-provinsi-2024.csv";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

async function copyText(text, button) {
  const done = () => {
    const old = button.textContent;
    button.textContent = "Tautan disalin ✓";
    setTimeout(() => { button.textContent = old; }, 1800);
  };
  try {
    await navigator.clipboard.writeText(text);
    done();
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    done();
  }
}

// Pencarian: mengetik memfilter indeks; memilih hasil membuka halamannya.
function doSearch() {
  const q = searchInput.value.trim().toLowerCase();
  if (q.length < 2) { searchResults.innerHTML = ""; searchResults.hidden = true; return; }
  const hits = SEARCH_INDEX.filter((e) => e.term.includes(q) || e.title.toLowerCase().includes(q)).slice(0, 6);
  if (!hits.length) {
    searchResults.innerHTML = `<li class="search-empty">Tidak ada hasil untuk “${searchInput.value.replace(/</g, "&lt;")}”. Coba: penduduk, PDB, inflasi, ekspor, provinsi.</li>`;
  } else {
    searchResults.innerHTML = hits.map((h) => `<li><a href="${h.route}" data-search-hit><span>${h.title}</span><small>${h.hint}</small></a></li>`).join("");
  }
  searchResults.hidden = false;
}

searchInput.addEventListener("input", doSearch);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const first = searchResults.querySelector("a[data-search-hit]");
    if (first) { location.hash = first.getAttribute("href").slice(1); searchInput.value = ""; doSearch(); }
  }
  if (e.key === "Escape") { searchInput.value = ""; doSearch(); searchInput.blur(); }
});
document.addEventListener("click", (e) => {
  if (!e.target.closest(".search-box")) { searchResults.hidden = true; }
});

window.addEventListener("hashchange", render);
render();
