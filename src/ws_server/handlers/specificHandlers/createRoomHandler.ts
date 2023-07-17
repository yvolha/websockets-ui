import { ICustomWsClient } from "../../../index.js";
import { roomsDb, usersDb } from "../../database/database.js";
import { createGameRoomId } from "../../utils/createIds.js";
import { successMessages } from "../../utils/messages.js";
import { sendAvailableRooms } from "../messagesToAll/updateAvailableRooms.js";

export const handleCreateRoom = (wsClient: ICustomWsClient) => {
  const index = wsClient.id;
  const name = usersDb[index]?.name;

  const roomByThisUserIndex = roomsDb.findIndex((room) =>
    room.roomUsers.some((user) => user.index === wsClient.id)
  );

  if (name && roomByThisUserIndex === -1) {
    const roomId = createGameRoomId();

    roomsDb.push({
      roomId: roomId,
      roomUsers: [
        {
          name,
          index,
        },
      ],
    });

    console.log(successMessages.roomCreated(roomId, name));
  }

  sendAvailableRooms();
};
