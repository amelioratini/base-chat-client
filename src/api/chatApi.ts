import {ChatMessage} from "../components/ChatWindow";

let CHAT_DB: ChatMessage[] = [];

export const fetchMessages = async (): Promise<{data: ChatMessage[]}> => {
    await delay(3000)
    return Promise.resolve({data: CHAT_DB});
}

export const sendMessage = async (message: ChatMessage): Promise<void> => {
    CHAT_DB = [...CHAT_DB, message];
}


const delay = (milliseconds: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}