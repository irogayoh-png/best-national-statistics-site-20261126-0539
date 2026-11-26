// StatNusa — charts.js
// Satu pekerjaan: menggambar bagan SVG dari data angka.
// Tanpa pustaka dari luar: setiap bagan dibangun dari string SVG oleh fungsi di sini.

const PALETTE = ["#0e3b2e", "#e9a319", "#1b7a6b", "#c65d3b", "#4a6fa5", "#8a7d5c", "#7a4a6f", "#3d7a4a"];

function esc(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function niceMax(max) {
  const step = Math.pow(10, Math.floor(Math.log10(max)));
  const norm = max / step;
  const nice = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10;
  return nice * step;
}

// Bagan batang vertikal. points: [{label, value}], format: angka -> teks.
export function barChart(points, options = {}) {
  const width = options.width || 560;
  const height = options.height || 260;
  const format = options.format || ((v) => String(v));
  const padL = 52;
  const padB = 34;
  const padT = 14;
  const max = niceMax(Math.max(...points.map((p) => p.value)) * 1.08);
  const plotW = width - padL - 12;
  const plotH = height - padT - padB;
  const slot = plotW / points.length;
  const barW = Math.min(46, slot * 0.6);
  let svg = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Bagan batang" class="chart-svg">`;
  for (let i = 0; i <= 4; i++) {
    const y = padT + (plotH * i) / 4;
    const v = max * (1 - i / 4);
    svg += `<line x1="${padL}" y1="${y}" x2="${width - 12}" y2="${y}" class="chart-grid"/><text x="${padL - 8}" y="${y + 4}" class="chart-axis" text-anchor="end">${esc(format(Math.round(v)))}</text>`;
  }
  points.forEach((p, i) => {
    const h = (p.value / max) * plotH;
    const x = padL + slot * i + (slot - barW) / 2;
    const y = padT + plotH - h;
    const color = PALETTE[i % PALETTE.length];
    svg += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW}" height="${h.toFixed(1)}" rx="4" fill="${color}"><title>${esc(p.label)}: ${esc(format(p.value))}</title></rect>`;
    svg += `<text x="${(x + barW / 2).toFixed(1)}" y="${(y - 6).toFixed(1)}" class="chart-value" text-anchor="middle">${esc(format(p.value))}</text>`;
    svg += `<text x="${(x + barW / 2).toFixed(1)}" y="${height - 12}" class="chart-axis" text-anchor="middle">${esc(p.label)}</text>`;
  });
  return svg + "</svg>";
}

// Bagan garis. points: [{label, value}].
export function lineChart(points, options = {}) {
  const width = options.width || 560;
  const height = options.height || 260;
  const format = options.format || ((v) => String(v));
  const padL = 52;
  const padB = 34;
  const padT = 18;
  const min = Math.min(0, ...points.map((p) => p.value));
  const max = niceMax(Math.max(...points.map((p) => p.value)) * 1.1);
  const plotW = width - padL - 16;
  const plotH = height - padT - padB;
  const x = (i) => padL + (plotW * i) / (points.length - 1);
  const y = (v) => padT + plotH - ((v - min) / (max - min)) * plotH;
  let svg = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Bagan garis" class="chart-svg">`;
  for (let i = 0; i <= 4; i++) {
    const gy = padT + (plotH * i) / 4;
    const v = max - ((max - min) * i) / 4;
    svg += `<line x1="${padL}" y1="${gy}" x2="${width - 16}" y2="${gy}" class="chart-grid"/><text x="${padL - 8}" y="${gy + 4}" class="chart-axis" text-anchor="end">${esc(format(Math.round(v * 10) / 10))}</text>`;
  }
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(" ");
  svg += `<path d="${path}" fill="none" stroke="#0e3b2e" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`;
  points.forEach((p, i) => {
    svg += `<circle cx="${x(i).toFixed(1)}" cy="${y(p.value).toFixed(1)}" r="5" fill="#e9a319" stroke="#fff" stroke-width="2"><title>${esc(p.label)}: ${esc(format(p.value))}</title></circle>`;
    svg += `<text x="${x(i).toFixed(1)}" y="${(y(p.value) - 11).toFixed(1)}" class="chart-value" text-anchor="middle">${esc(format(p.value))}</text>`;
    svg += `<text x="${x(i).toFixed(1)}" y="${height - 12}" class="chart-axis" text-anchor="middle">${esc(p.label)}</text>`;
  });
  return svg + "</svg>";
}

// Bagan donat. slices: [{label, value}] — value dalam persen, jumlah ~100.
export function donutChart(slices, options = {}) {
  const size = options.size || 240;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 14;
  const inner = r * 0.58;
  const total = slices.reduce((s, p) => s + p.value, 0);
  let angle = -Math.PI / 2;
  let svg = `<svg viewBox="0 0 ${size} ${size}" role="img" aria-label="Bagan donat" class="chart-svg donut">`;
  slices.forEach((p, i) => {
    const frac = p.value / total;
    const a0 = angle;
    const a1 = angle + frac * Math.PI * 2;
    angle = a1;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const xi1 = cx + inner * Math.cos(a1);
    const yi1 = cy + inner * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a0);
    const yi0 = cy + inner * Math.sin(a0);
    const color = PALETTE[i % PALETTE.length];
    svg += `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${large} 1 ${x1.toFixed(1)},${y1.toFixed(1)} L${xi1.toFixed(1)},${yi1.toFixed(1)} A${inner},${inner} 0 ${large} 0 ${xi0.toFixed(1)},${yi0.toFixed(1)} Z" fill="${color}"><title>${esc(p.label)}: ${esc(String(p.value))}%</title></path>`;
  });
  svg += `<text x="${cx}" y="${cy - 2}" class="donut-center" text-anchor="middle">${esc(options.centerTop || "")}</text>`;
  svg += `<text x="${cx}" y="${cy + 18}" class="donut-sub" text-anchor="middle">${esc(options.centerBottom || "")}</text></svg>`;
  return svg;
}

// Bagan batang horizontal dengan label. rows: [{label, value}], format: angka -> teks.
export function hbarChart(rows, options = {}) {
  const width = options.width || 560;
  const rowH = options.rowHeight || 44;
  const height = rows.length * rowH + 16;
  const format = options.format || ((v) => String(v));
  const max = niceMax(Math.max(...rows.map((p) => p.value)) * 1.05);
  const labelW = options.labelWidth || 150;
  const valueW = 74;
  const plotW = width - labelW - valueW - 8;
  let svg = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Bagan batang horizontal" class="chart-svg">`;
  rows.forEach((p, i) => {
    const y = 8 + i * rowH;
    const w = Math.max(2, (p.value / max) * plotW);
    const color = PALETTE[i % PALETTE.length];
    svg += `<text x="0" y="${y + 20}" class="chart-label">${esc(p.label)}</text>`;
    svg += `<rect x="${labelW}" y="${y + 6}" width="${w.toFixed(1)}" height="20" rx="4" fill="${color}"><title>${esc(p.label)}: ${esc(format(p.value))}</title></rect>`;
    svg += `<text x="${labelW + w + 8}" y="${y + 21}" class="chart-value">${esc(format(p.value))}</text>`;
  });
  return svg + "</svg>";
}

// Legenda kecil untuk donat dan batang.
export function legend(items) {
  return `<ul class="legend">${items.map((p, i) => `<li><span class="swatch" style="background:${PALETTE[i % PALETTE.length]}"></span>${esc(p.label)} — <strong>${esc(String(p.value))}%</strong></li>`).join("")}</ul>`;
}
