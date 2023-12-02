"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
const http = __importStar(require("http"));
const defaultPort = 3000;
const port = process.env.PING_LISTEN_PORT || defaultPort;
const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        if (req.url == '/ping') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            console.log(`hostname: ${(0, os_1.hostname)()}`);
            res.write(JSON.stringify(Object.assign(Object.assign({}, req.headers), { "hostname": (0, os_1.hostname)() })));
            //res.write(JSON.stringify({}));
            res.end();
        }
        else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        }
    }
});
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
