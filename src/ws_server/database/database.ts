interface IUser {
  name: string;
  password: string;
}

type IUsersDb = Record<string, IUser>;

export const usersDb: IUsersDb = {
  "0": {
    name: "11111",
    password: "22222",
  },
};
