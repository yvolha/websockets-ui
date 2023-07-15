import { ICustomWsClient } from "../../../index.js";
import { isUserNameInvalid } from "../../utils/validateUser.js";
import { IParsedMessage } from "../wsClientHandler.js";
import { wsMessageTypes } from "../../utils/wsMessageTypes.js";

export const regHandler = (parsedMessage: IParsedMessage, wsClient: ICustomWsClient) => {
  console.log("registering", parsedMessage);

  const { name, password } = JSON.parse(parsedMessage.data.toString());
  console.log(name, password);

  if (isUserNameInvalid(name)) {
    wsClient;
  }
};
