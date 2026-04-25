import { createReadStream } from 'node:fs';
import { access, stat } from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, 'dist');

const port = Number(process.env.PORT ?? '3000');
const host = process.env.HOST ?? '0.0.0.0';

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.mp3': 'audio/mpeg',
  '.ogg': 'audio/ogg',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function withSecurityHeaders(res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; img-src 'self' data:; media-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; font-src 'self'; connect-src 'self'; frame-ancestors 'self'; base-uri 'self'; form-action 'self'",
  );
}

function getContentType(filePath) {
  return contentTypes[path.extname(filePath).toLowerCase()] ?? 'application/octet-stream';
}

function normalizePathname(rawPathname) {
  let pathname;
  try {
    pathname = decodeURIComponent(rawPathname);
  } catch {
    pathname = '/';
  }

  if (!pathname.startsWith('/')) return '/';
  return pathname;
}

function resolveSafePath(targetPath) {
  const normalized = path.normalize(targetPath).replace(/^\.{2}(\/|\\|$)/, '');
  return path.join(distDir, normalized);
}

async function fileExists(filePath) {
  try {
    await access(filePath);
    const fileStats = await stat(filePath);
    return fileStats.isFile();
  } catch {
    return false;
  }
}

async function resolveStaticFile(pathname) {
  const cleanPath = pathname.replace(/^\/+/, '');

  const candidates = [
    resolveSafePath(cleanPath),
    resolveSafePath(`${cleanPath}.html`),
    resolveSafePath(path.join(cleanPath, 'index.html')),
  ];

  if (pathname === '/') {
    candidates.unshift(resolveSafePath('index.html'));
  }

  for (const candidate of candidates) {
    if (candidate.startsWith(distDir) && (await fileExists(candidate))) {
      return candidate;
    }
  }

  const fallback = resolveSafePath('index.html');
  if (await fileExists(fallback)) {
    return fallback;
  }

  return null;
}

const server = http.createServer(async (req, res) => {
  withSecurityHeaders(res);

  if (!req.url) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ error: 'Bad Request', code: 'BAD_REQUEST' }));
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host ?? 'localhost'}`);
  const pathname = normalizePathname(url.pathname);

  if (pathname === '/api/health') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ status: 'ok', code: 'HEALTHY' }));
    return;
  }

  const filePath = await resolveStaticFile(pathname);
  if (!filePath) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ error: 'Not Found', code: 'NOT_FOUND' }));
    return;
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', getContentType(filePath));

  createReadStream(filePath).pipe(res).on('error', () => {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ error: 'Internal Server Error', code: 'INTERNAL_SERVER_ERROR' }));
  });
});

server.listen(port, host, () => {
  console.log(`Node server running at http://${host}:${port}`);
});
