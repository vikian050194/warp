import { Message } from "./message.js";
import { MESSAGE } from "../constants/index.js";

const send = async (message) => await chrome.runtime.sendMessage(message);

export const queryMessage = async (query) => await send(new Message(MESSAGE.QUERY, query));
export const updateMessage = async () => await send(new Message(MESSAGE.UPDATE));
export const callMessage = async (data) => await send(new Message(MESSAGE.CALL, data));
