import React from "react";
import "../styles/Message.css";
import parse from "html-react-parser"
import {ChatUser} from "../types/ChatUser";

interface MessageProps {
    text: string,
    sender: ChatUser,
    currentParticipant: ChatUser
}
const Message = ({ text, sender, currentParticipant }: MessageProps) => {
    const isCurrentUser = sender.id === currentParticipant.id;

    const parsedHTML = parse(text);
    return (
        <div className={`message-container ${isCurrentUser ? "current-user" : "other-participant"}`}>
            <img src={sender.profilePicture} alt={`${sender.name}'s profile`} className="profile-picture"/>
            <div className="message-content">
                <div className="sender-name">{sender.name}</div>
                <div className={`message ${isCurrentUser ? "current-user" : "other-participant"}`}>
                    {parsedHTML}
                </div>
            </div>
        </div>
    );
};

export default Message;