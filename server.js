const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const url = require("url");

const PORT = process.env.PORT || 3000;
const BACKEND =
  process.env.BACKEND_URL ||
  "https://plazagardenmsk.naviboard.navicentric.com";
const ROOT = path.join(__dirname, "public");

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

function serveFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";
  const stat = fs.statSync(filePath);

  res.writeHead(200, {
    "Content-Type": contentType,
    "Content-Length": stat.size,
  });

  fs.createReadStream(filePath).pipe(res);
}

const server = http.createServer((req, res) => {
  if (PROXY_PATHS.some((p) => req.url.startsWith(p))) {
    proxyRequest(req, res);
    return;
  }

  const reqPath = decodeURIComponent(req.url.split("?")[0].split("#")[0]);
  const filePath = path.join(ROOT, reqPath);

  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  // Directory — serve index.html inside it (like Python SimpleHTTPRequestHandler)
  if (fs.statSync(filePath).isDirectory()) {
    const indexPath = path.join(filePath, "index.html");
    if (fs.existsSync(indexPath)) {
      serveFile(indexPath, res);
    } else {
      res.writeHead(404);
      res.end("Not found");
    }
    return;
  }

  serveFile(filePath, res);
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Serving files from ${ROOT}`);
  console.log(`Proxying ${PROXY_PATHS.join(", ")} -> ${BACKEND}`);
});
