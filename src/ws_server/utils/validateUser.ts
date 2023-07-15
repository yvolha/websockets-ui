import { usersDb } from "../database/database.js";

const validationErrors = {
  lengthTooShort: () => "Length is too short.",
  duplicateName: () => "There already is a user with such a name, please pick a different name.",
  wrongPassword: () => "Incorrect password, please try again.",
};

export const isUserNameInvalid = (name: string) => {
  if (name.length < 5) {
    return validationErrors.lengthTooShort();
  }

  if (Object.values(usersDb).find((el) => el.name === name)) {
    return validationErrors.duplicateName();
  }

  return null;
};
