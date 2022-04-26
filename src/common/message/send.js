import { Message } from "./message.js";
import * as type from "./type.js";

const send = async (message) => await chrome.runtime.sendMessage(message);

export const queryMessage = async (query) => await send(new Message(type.QUERY, query));
export const updateMessage = async () => await send(new Message(type.UPDATE));
