const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const url = require("url");

const PORT = process.env.PORT || 3000;
const BACKEND = process.env.BACKEND_URL || "https://plazagardenmsk.naviboard.navicentric.com";
const ROOT = __dirname;

const MIME_TYPES = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".xml": "application/xml",
  ".wgt": "application/vnd.tizen.package",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
};

const PROXY_PATHS = ["/api", "/static", "/connection"];

function proxyRequest(req, res) {
  const targetUrl = BACKEND + req.url;
  const parsed = url.parse(targetUrl);
  const transport = parsed.protocol === "https:" ? https : http;

  const proxyReq = transport.request(
    {
      hostname: parsed.hostname,
      port: parsed.port,
      path: parsed.path,
      method: req.method,
      headers: {
        ...req.headers,
        host: parsed.hostname,
      },
    },
    (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    },
  );

  proxyReq.on("error", (err) => {
    console.error("Proxy error:", err.message);
    res.writeHead(502);
    res.end("Bad Gateway");
  });

  req.pipe(proxyReq);
}

const server = http.createServer((req, res) => {
  // Proxy /api, /static, /connection to backend
  if (PROXY_PATHS.some((p) => req.url.startsWith(p))) {
    proxyRequest(req, res);
    return;
  }

  // Static files
  const reqPath = decodeURIComponent(req.url.split("?")[0]);
  const filePath = path.join(ROOT, reqPath === "/" ? "." : reqPath);

  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  // Directory listing (like Python SimpleHTTPRequestHandler)
  if (fs.statSync(filePath).isDirectory()) {
    const files = fs.readdirSync(filePath).filter(
      (f) => !f.startsWith(".") && f !== "server.js" && f !== "package.json" && f !== "node_modules",
    );
    const dirPath = reqPath.endsWith("/") ? reqPath : reqPath + "/";
    const links = files
      .map((f) => {
        const isDir = fs.statSync(path.join(filePath, f)).isDirectory();
        return `<li><a href="${dirPath}${f}${isDir ? "/" : ""}">${f}${isDir ? "/" : ""}</a></li>`;
      })
      .join("\n");

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`<!DOCTYPE html>
<html><head><title>Directory listing for ${reqPath}</title></head>
<body>
<h2>Directory listing for ${reqPath}</h2>
<hr><ul>\n${links}\n</ul><hr>
</body></html>`);
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";
  const stat = fs.statSync(filePath);

  res.writeHead(200, {
    "Content-Type": contentType,
    "Content-Length": stat.size,
  });

  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Proxying ${PROXY_PATHS.join(", ")} -> ${BACKEND}`);
});
