import http from "http";
import routes from "./routes";

const server = http.createServer((req, res) => routes(req, res));

server.listen(4000);
