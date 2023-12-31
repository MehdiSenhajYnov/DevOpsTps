import {hostname} from 'os';
import * as http from 'http';

const defaultPort = 3000;

const port = process.env.PING_LISTEN_PORT || defaultPort;
const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        if (req.url == '/ping') {
            res.writeHead(200, { 'Content-Type': 'application/json'});
            console.log(`hostname: ${hostname()}`);

            res.write(JSON.stringify({...req.headers, "hostname": hostname()}));
            //res.write(JSON.stringify({}));
            res.end();
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        }
    }
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
