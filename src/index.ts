import { WebSocketServer } from "ws";

import { httpServer } from "./http_server/index.js";
import infoMessages from "./ws_server/utils/messages.js";
import handleWsClientMessage from "./ws_server/handlers/wsClientHandler.js";
import { createWsId } from "./ws_server/utils/createRandomIds.js";
import { WebSocket } from "ws";

export interface ICustomWsClient extends WebSocket {
  id: number;
}

process.on("SIGINT", () => {
  setImmediate(() => process.exit(0));
});

const WS_PORT = 3000;
export const wss = new WebSocketServer({ port: WS_PORT });

wss.on("listening", () => {
  console.log(infoMessages.wsServerStarted(WS_PORT));
});

wss.on("connection", function connection(wsClient: ICustomWsClient) {
  wsClient.id = createWsId();

  try {
    wsClient.on("error", (err) => {
      console.log(infoMessages.unknownError(), err.message);
    });

    wsClient.on("message", function message(data) {
      if (data !== null) {
        handleWsClientMessage(data, wsClient);
      } else {
        console.log(infoMessages.noDataReceived());
      }
    });

    wsClient.on("close", function () {
      console.log(infoMessages.connectionTerminated());
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(infoMessages.unknownError(), err.message);
    } else {
      console.log(infoMessages.unknownError());
    }
  }
});

const HTTP_PORT = 8181;
httpServer.listen(HTTP_PORT, () => {
  console.log(infoMessages.httpServerStarted(HTTP_PORT));
});
