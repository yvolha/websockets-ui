import { ICustomWsClient, wss } from "../../index.js";
import { roomsDb } from "../database/database";

export const getWsClientIdsInRoom = (roomId: number) => {
  const gameRoom = roomsDb.find((room) => room.roomId === roomId);

  const [wsClientId_1, wsClientId_2] = gameRoom
    ? gameRoom.roomUsers.map((user) => user.index)
    : [-1, -1];

  const wsClientsInRoom: Array<ICustomWsClient> = [];

  wss.clients.forEach((client) => {
    (client.id === wsClientId_1 || wsClientId_2) && wsClientsInRoom.push(client);
  });

  return wsClientsInRoom;
};
