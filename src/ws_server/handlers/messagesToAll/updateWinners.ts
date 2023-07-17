import { wss } from "../../../index.js";
import { winnersDb } from "../../database/database.js";
import { wsMessageTypes } from "../../utils/wsMessageTypes.js";

export const sendUpdateWinners = () => {
  wss.clients.forEach((wsClient) => {
    wsClient.send(
      JSON.stringify({
        type: wsMessageTypes.update_winners,
        data: JSON.stringify(winnersDb),
        id: 0,
      })
    );
  });
};
