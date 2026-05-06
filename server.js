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

function directoryListing(dirPath, reqPath, res) {
  const files = fs.readdirSync(dirPath).filter((f) => !f.startsWith("."));
  const dirUrl = reqPath.endsWith("/") ? reqPath : reqPath + "/";
  const links = files
    .map((f) => {
      const isDir = fs.statSync(path.join(dirPath, f)).isDirectory();
      const name = isDir ? f + "/" : f;
      return `<li><a href="${dirUrl}${name}">${name}</a></li>`;
    })
    .join("\n");

  const html = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Directory listing for ${reqPath}</title>
</head>
<body>
<h1>Directory listing for ${reqPath}</h1>
<hr>
<ul>
${links}
</ul>
<hr>
</body>
</html>`;

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
}

const server = http.createServer((req, res) => {
  if (PROXY_PATHS.some((p) => req.url.startsWith(p))) {
    proxyRequest(req, res);
    return;
  }

  const reqPath = decodeURIComponent(req.url.split("?")[0]);
  const filePath = path.join(ROOT, reqPath);

  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  if (fs.statSync(filePath).isDirectory()) {
    directoryListing(filePath, reqPath, res);
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
  console.log(`Serving files from ${ROOT}`);
  console.log(`Proxying ${PROXY_PATHS.join(", ")} -> ${BACKEND}`);
});
