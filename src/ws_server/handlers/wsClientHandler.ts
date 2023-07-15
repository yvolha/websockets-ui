import { RawData } from "ws";

import infoMessages from "../utils/messages.js";
import { regHandler } from "./specificHandlers/regHandler.js";
import { ICustomWsClient } from "../../index.js";
import { wsMessageTypes } from "../utils/wsMessageTypes.js";

export interface IParsedMessage {
  type: string;
  data: object;
  id: number;
}

export default async (rawData: RawData, wsClient: ICustomWsClient) => {
  const parsedMessage: IParsedMessage = JSON.parse(rawData.toString());
  console.log(parsedMessage);

  switch (parsedMessage.type) {
    case wsMessageTypes.reg:
      regHandler(parsedMessage, wsClient, wsMessageTypes.reg);
      break;

    case wsMessageTypes.create_room:
      break;

    case wsMessageTypes.create_game:
      break;

    case wsMessageTypes.add_user_to_room:
      break;

    case wsMessageTypes.update_room:
      break;

    case wsMessageTypes.update_winners:
      break;

    case wsMessageTypes.add_ships:
      break;

    case wsMessageTypes.start_game:
      break;

    case wsMessageTypes.attack:
      break;

    case wsMessageTypes.randomAttack:
      break;

    case wsMessageTypes.turn:
      break;

    case wsMessageTypes.finish:
      break;

    default:
      console.log(infoMessages.unknownError());
  }
};
