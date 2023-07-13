import { httpServer } from "./src/http_server/index.js";

import { WebSocketServer } from "ws";

const HTTP_PORT = 8181;

httpServer.listen(HTTP_PORT, () => {
  console.log(`Started static http server on localhost:${HTTP_PORT}!`);
});

const WS_PORT = 3000;

const wss = new WebSocketServer({ port: WS_PORT });

wss.on("listening", () => {
  console.log(`Started WS server on localhost:${WS_PORT}!`);
});

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });
});
