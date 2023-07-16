import { ICustomWsClient } from "../../../index.js";
import { roomsDb, usersDb } from "../../database/database.js";
import { sendAvailableRooms } from "../messagesToAll/updateAvailableRooms.js";
import { IParsedMessage } from "../wsClientHandler.js";

export const handleAddUserToRoom = async (
  parsedMessage: IParsedMessage,
  wsClient: ICustomWsClient
) => {
  const { indexRoom } = JSON.parse(parsedMessage.data.toString());
  const roomToAdd = roomsDb.find((room) => room.roomId === indexRoom);

  const index = wsClient.id;
  const name = usersDb[index]?.name;

  if (roomToAdd && name && typeof indexRoom === "number") {
    roomToAdd.roomUsers.push({
      name,
      index,
    });

    sendAvailableRooms();
  }
};
