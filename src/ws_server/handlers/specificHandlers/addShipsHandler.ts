import { wss } from "../../../index.js";
import { IBoard, boardsDb } from "../../database/database.js";
import { wsMessageTypes } from "../../utils/wsMessageTypes.js";
import { IParsedMessage } from "../wsClientHandler.js";

interface IPosition {
  x: number;
  y: number;
}

export interface IShip {
  position: IPosition;
  direction: boolean;
  length: number;
  type: "small" | "medium" | "large" | "huge";
}

export const handleAddShips = (parsedMessage: IParsedMessage) => {
  const parsedData = JSON.parse(parsedMessage.data.toString());
  const { gameId, ships, indexPlayer } = parsedData;

  boardsDb.push(createBoardWithShips(ships, indexPlayer, gameId));

  if (
    boardsDb.map((e) => e.gameId).indexOf(gameId) !==
    boardsDb.map((e) => e.gameId).lastIndexOf(gameId)
  ) {
    const wsClientsIds = boardsDb.filter((e) => e.gameId === gameId).map((e) => e.userId);

    wss.clients.forEach((client) => {
      if (client.id === wsClientsIds[0]! || client.id === wsClientsIds[1]!) {
        client.send(
          JSON.stringify({
            type: wsMessageTypes.start_game,
            data: JSON.stringify({
              ships: boardsDb.filter((e) => e.userId === client.id).map((e) => e.ships),
              currentPlayerIndex: client.id,
            }),
            id: 0,
          })
        );
      }

      if (client.id === wsClientsIds[0]!) {
        client.send(
          JSON.stringify({
            type: wsMessageTypes.turn,
            data: JSON.stringify({
              currentPlayer: client.id,
            }),
            id: 0,
          })
        );
      }
    });
  }
};

export interface IFilledCell {
  type: "small" | "medium" | "large" | "huge";
  length: number;
  position: IPosition;
  shots: IPosition[];
  missesAround: IPosition[];
  status: string;
}

const createBoardWithShips = (ships: IShip[], userId: number, gameId: number): IBoard => {
  const board: number[][] | IFilledCell[][] = Array(10)
    .fill(0)
    .map(() => Array(10).fill(0));
  // "direction":true means VERTICAL

  for (const ship of ships) {
    const {
      position: { x, y },
      direction,
      length,
      type,
      position,
    } = ship;

    const filledCell: IFilledCell = {
      type,
      length,
      position,
      shots: [],
      missesAround: [],
      status: "ok",
    };

    if (board[y]?.[x] === 0) {
      let index = 0;

      if (direction === true || length > 1) {
        for (let row = -1; row <= length; row++) {
          for (let column = -1; column <= 1; column++) {
            filledCell.missesAround.push({ x: x + column, y: y + row });
          }
        }

        while (index < length) {
          const toCheck = board[y + index];
          if (toCheck !== undefined) {
            toCheck[x] = filledCell;
          }
          index++;
        }
      } else {
        for (let row = -1; row <= 1; row++) {
          for (let column = -1; column <= length; column++) {
            filledCell.missesAround.push({ x: x + column, y: y + row });
          }
        }

        while (index < length) {
          const toCheck = board[y];
          if (toCheck) {
            toCheck[x + index] = filledCell;
          }
          index++;
        }
      }
    }
  }

  return {
    userId,
    gameId,
    board,
    ships,
  };
};
