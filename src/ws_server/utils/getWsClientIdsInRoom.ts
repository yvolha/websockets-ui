import { roomsDb } from "../database/database";

export const getWsClientIdsInRoom = (roomId: number) => {
  const gameRoom = roomsDb.find((room) => room.roomId === roomId);

  return gameRoom ? gameRoom.roomUsers.map((user) => user.index) : [-1, -1];
};
