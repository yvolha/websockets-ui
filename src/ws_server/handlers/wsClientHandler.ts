import { RawData } from "ws";

import infoMessages from "../utils/messages.js";

interface IParsedMessage {
  type: string;
  data: {};
  id: number;
}

export default async (rawData: RawData) => {
  const parsedMessage = JSON.parse(rawData.toString());
  console.log(parsedMessage);
  
  switch (parsedMessage.type) {
    case "reg":
      console.log("registering");
      break;
    default: 
    console.log(infoMessages.unknownError());
  }
}