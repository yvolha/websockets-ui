import { ICustomWsClient } from "../../../index.js";
import { getWsClientIdsInRoom } from "../../utils/getWsClientIdsInRoom";

export const handleRoomCreation = (wsClient: ICustomWsClient, roomId: number) => {
  const usersInGame = getWsClientIdsInRoom(roomId);
  usersInGame.forEach((user) => {
    user.send(JSON.stringify({}));
  });
};
