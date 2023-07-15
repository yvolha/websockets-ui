import { WebSocketServer } from "ws";

import { httpServer } from "./src/http_server/index.js";
import infoMessages from "./src/ws_server/utils/messages.js";
import handleWsClientMessage from "./src/ws_server/handlers/wsClientHandler.js";

process.on("SIGINT", () => {
  setImmediate(() => process.exit(0));
});

const HTTP_PORT = 8181;

httpServer.listen(HTTP_PORT, () => {
  console.log(infoMessages.httpServerStarted(HTTP_PORT));
});

const WS_PORT = 3000;
export const wss = new WebSocketServer({ port: WS_PORT });

wss.on("listening", () => {
  console.log(infoMessages.wsServerStarted(WS_PORT));
});

wss.on("connection", function connection(wsClient) {

  try {
    wsClient.on("error", console.error);

    wsClient.on("message", function message(data) {
      if (data !== null) {
        handleWsClientMessage(data);
        console.log("received: %s", data);
      } else {
        console.log(infoMessages.noDataReceived());
      }
      
    });

    wsClient.on("close", function () {
      console.log(infoMessages.connectionTerminated);
    });
  } catch (err: unknown) {
    if ( err instanceof Error) {
      console.log(infoMessages.unknownError(), err.message);
    } else {
      console.log(infoMessages.unknownError());
    }
  }

});
