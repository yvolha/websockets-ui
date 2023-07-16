import { wss } from "../../../index.js";
import { roomsDb } from "../../database/database.js";
import { wsMessageTypes } from "../../utils/wsMessageTypes.js";

export const sendAvailableRooms = () => {
  wss.clients.forEach((wsClient) => {
    wsClient.send(
      JSON.stringify({
        type: wsMessageTypes.update_room,
        data: JSON.stringify(roomsDb),
        id: 0,
      })
    );
  });
};
