import {ChatMessage} from "../types/ChatMessage";

const CHAT_DB: ChatMessage[] = [];

export const fetchMessages = async (): Promise<{data: ChatMessage[]}> => {
    await delay(3000)
    return Promise.resolve({data: CHAT_DB});
}

export const sendMessage = (message: ChatMessage): void => {
    CHAT_DB.push(message);
}


const delay = async (milliseconds: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}