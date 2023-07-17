import { ICustomWsClient } from "../../../index.js";
import { IBoard } from "../../database/database.js";
import { IParsedMessage } from "../wsClientHandler.js";

interface IPosition {
  x: number;
  y: number;
}

interface IShip {
  position: IPosition;
  direction: boolean;
  length: number;
  type: "small" | "medium" | "large" | "huge";
};

const handleAddShips = (parsedMessage: IParsedMessage, wsClient: ICustomWsClient) => {
  const parsedData = JSON.parse(parsedMessage.data.toString()) as IShip;
}



interface IFilledCell {
  type: "small" | "medium" | "large" | "huge";
  length: number;
  position: IPosition;
  shots: IPosition[];
  missesAround: IPosition[];
  status: string;
}

const createBoardWithShips = (ships: IShip[], userId: number, gameId: number): IBoard => {
  const board: Array<Array<number>> = Array(5).fill(0).map(()=>Array(5).fill(0));
  //"direction":true means VERTICAL


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

  }





  console.log(board);

  return {
    userId,
    gameId,
    board,
  }
}