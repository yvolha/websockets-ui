import { ICustomWsClient } from "../../../index.js";
import { regUserInDb } from "../../database/database.js";
import { successMessages } from "../../utils/messages.js";
import { isUserNameInvalid } from "../../utils/validateUser.js";
import { IParsedMessage } from "../wsClientHandler.js";

export const regHandler = async (
  parsedMessage: IParsedMessage,
  wsClient: ICustomWsClient,
  wsMessageType: string
) => {
  const { name, password } = JSON.parse(parsedMessage.data.toString());
  const index = wsClient.id;

  const errorText = isUserNameInvalid(name);
  if (errorText) {
    wsClient.send(
      JSON.stringify({
        type: wsMessageType,
        data: JSON.stringify({
          name,
          index,
          error: true,
          errorText,
        }),
        id: 0,
      })
    );
  } else {
    wsClient.send(
      JSON.stringify({
        type: wsMessageType,
        data: JSON.stringify({
          name,
          index,
          error: false,
          errorText: "",
        }),
        id: 0,
      })
    );

    await regUserInDb(index, name, password);
    console.log(successMessages.userRegistered(index, name));
  }
};
