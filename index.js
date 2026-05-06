const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const WGT_DIR = path.join(__dirname, "widget");

const MIME_TYPES = {
  ".wgt": "application/octet-stream",
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".xml": "application/xml",
};

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method === "GET" && req.url === "/") {
    // Список файлов
    const files = fs.readdirSync(WGT_DIR).filter((f) => f.endsWith(".wgt"));
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <h2>WGT Files</h2>
      <ul>${files.map((f) => `<li><a href="/widget/${f}">${f}</a></li>`).join("")}</ul>
    `);
    return;
  }

  if (req.method === "GET" && req.url.startsWith("/widget/")) {
    const fileName = decodeURIComponent(req.url.replace("/widget/", ""));
    const filePath = path.join(WGT_DIR, fileName);

    if (!fs.existsSync(filePath)) {
      res.writeHead(404);
      res.end("File not found");
      return;
    }

    const ext = path.extname(fileName).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    const stat = fs.statSync(filePath);

    res.writeHead(200, {
      "Content-Type": contentType,
      "Content-Length": stat.size,
      "Content-Disposition": `attachment; filename="${fileName}"`,
    });

    fs.createReadStream(filePath).pipe(res);
    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`WGT server running on port ${PORT}`);
  console.log(`Upload .wgt files to ./widget/ directory`);
});
