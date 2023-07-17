import { RawData } from "ws";

import infoMessages from "../utils/messages.js";
import { ICustomWsClient } from "../../index.js";
import { wsMessageTypes } from "../utils/wsMessageTypes.js";
import { handleReg } from "./specificHandlers/regHandler.js";
import { handleCreateRoom } from "./specificHandlers/createRoomHandler.js";
import { handleAddUserToRoom } from "./specificHandlers/addUserToRoomHandler.js";
import { handleAddShips } from "./specificHandlers/addShipsHandler.js";
import { handleAttack } from "./specificHandlers/attackHandler.js";

export interface IParsedMessage {
  type: string;
  data: object;
  id: number;
}

export default async (rawData: RawData, wsClient: ICustomWsClient) => {
  const parsedMessage: IParsedMessage = JSON.parse(rawData.toString());
  //onsole.log(parsedMessage);

  switch (parsedMessage.type) {
    case wsMessageTypes.reg:
      handleReg(parsedMessage, wsClient, wsMessageTypes.reg);
      break;

    case wsMessageTypes.create_room:
      handleCreateRoom(wsClient);
      break;

    case wsMessageTypes.add_user_to_room:
      handleAddUserToRoom(parsedMessage, wsClient);
      break;

    case wsMessageTypes.add_ships:
      handleAddShips(parsedMessage);
      break;

    case wsMessageTypes.attack:
      handleAttack(parsedMessage);
      break;

    case wsMessageTypes.randomAttack:
      break;

    case wsMessageTypes.finish:
      break;

    default:
      console.log(infoMessages.unknownError());
  }
};
