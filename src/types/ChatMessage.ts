import {ChatUser} from "./ChatUser";

export interface ChatMessage {
    id: string,
    text: string,
    sender: ChatUser
}