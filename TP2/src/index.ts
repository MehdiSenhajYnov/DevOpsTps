import * as http from 'http';

const defaultPort = 3000;

const port = process.env.PING_LISTEN_PORT ? parseInt(process.env.PING_LISTEN_PORT, 10) : defaultPort;
const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        if (req.url == '/ping') {
            const headers = req.headers;
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(headers));
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        }
    }
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
