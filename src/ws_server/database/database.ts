interface IUser {
  name: string;
  password: string;
}

type IUsersDb = Record<number, IUser>;

export const usersDb: IUsersDb = {
  0: {
    name: "11111",
    password: "22222",
  },
};

export const regUserInDb = async (id: number, name: string, password: string) => {
  usersDb[id] = {
    name,
    password,
  };
};
