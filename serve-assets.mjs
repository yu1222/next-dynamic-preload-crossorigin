// Serves .next/static at http://127.0.0.1:4000/_next/static/* with CORS, like a CDN.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('.next/static');
const types = {'.js': 'application/javascript', '.css': 'text/css', '.woff2': 'font/woff2'};

http.createServer((req, res) => {
    const url = decodeURIComponent(req.url.split('?')[0]);
    const file = path.join(root, url.replace(/^\/_next\/static\//, ''));
    if (!url.startsWith('/_next/static/') || !file.startsWith(root) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
        res.writeHead(404);
        return res.end();
    }
    res.writeHead(200, {
        'content-type': types[path.extname(file)] ?? 'application/octet-stream',
        'cache-control': 'public, max-age=31536000, immutable',
        'access-control-allow-origin': '*',
    });
    fs.createReadStream(file).pipe(res);
}).listen(4000, process.env.HOST ?? '127.0.0.1', () => console.log('assets on port 4000'));
