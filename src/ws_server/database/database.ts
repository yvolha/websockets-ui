import { IFilledCell, IShip } from "../handlers/specificHandlers/addShipsHandler.js";

interface IUser {
  name: string;
  password: string;
}

type IUsersDb = Record<number, IUser>;

export const usersDb: IUsersDb = {};

export const regUserInDb = async (id: number, name: string, password: string) => {
  usersDb[id] = {
    name,
    password,
  };
};

type IWinnersDb = Array<{
  name: string;
  wins: number;
}>;

export const winnersDb: IWinnersDb = [];

export interface IRoom {
  roomId: number;
  roomUsers: Array<{
    name: string;
    index: number;
  }>;
}

export const roomsDb: Array<IRoom> = [];

export interface IBoard {
  userId: number;
  gameId: number;
  board: number[][] | IFilledCell[][];
  ships: IShip[];
}

export const boardsDb: IBoard[] = [];
