import { ICustomWsClient, wss } from "../../index.js";
import { roomsDb } from "../database/database";

export const getWsClientIdsInRoom = (roomId: number) => {
  const gameRoom = roomsDb.find((room) => room.roomId === roomId);

  const [wsClientId_1, wsClientId_2] = gameRoom
    ? gameRoom.roomUsers.map((user) => user.index)
    : [-1, -1];

  const wsClientsInRoom = [];

  wss.clients.forEach((client) => console.log(client.id));
  /*
  for (let i = 0; i < wss.clients.size; i++){
    if (wss.clients.id)
  } */
};
