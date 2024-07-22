"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const url = process.argv[2];
http_1.default.get(url, (response) => {
    response.setEncoding('utf8');
    let data = '';
    response.on('data', (chunk) => {
        data += chunk;
    });
    response.on('end', () => {
        console.log(data);
    });
}).on('error', (error) => {
    console.error(error);
});
//# sourceMappingURL=app.js.map