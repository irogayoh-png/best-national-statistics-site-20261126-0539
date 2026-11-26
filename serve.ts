// StatNusa — serve.ts (pengujian lokal saja, bukan bagian dari entri)
// Menyajikan app/ di http://localhost:8080 (atau --port lain).
// Jalankan: node serve.ts

import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const here = fileURLToPath(new URL(".", import.meta.url));
const port = Number(process.argv.find((a) => a.startsWith("--port="))?.split("=")[1] ?? 8080);
const types: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
};

createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url ?? "/", "http://localhost").pathname);
  const file = join(here, "app", path === "/" ? "index.html" : path);
  try {
    const data = await readFile(file);
    res.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" });
    res.end(data);
  } catch {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("Tidak ditemukan");
  }
}).listen(port, () => console.log(`StatNusa di http://localhost:${port}`));
