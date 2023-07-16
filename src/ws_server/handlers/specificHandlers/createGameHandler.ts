import { createGameId } from "../../utils/createIds.js";
import { getWsClientIdsInRoom } from "../../utils/getWsClientIdsInRoom.js";
import { successMessages } from "../../utils/messages.js";
import { wsMessageTypes } from "../../utils/wsMessageTypes.js";

export const handleGameCreation = (roomId: number) => {
  const usersInGame = getWsClientIdsInRoom(roomId);

  const idGame = createGameId();

  usersInGame.forEach((user) => {
    user.send(
      JSON.stringify({
        type: wsMessageTypes.create_game,
        data: JSON.stringify({
          idGame,
          idPlayer: user.id,
        }),
        id: 0,
      })
    );
  });

  console.log(successMessages.gameCreated(idGame));
};
