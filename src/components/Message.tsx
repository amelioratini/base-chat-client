import React from "react";
import "../styles/Message.css";
import parse from 'html-react-parser';

interface MessageProps {
    text: string,
    sender: string,
    currentParticipant: string
}
const Message = ({ text, sender, currentParticipant }: MessageProps) => {
    const isCurrentUser = sender === currentParticipant;

    return (
        <div className={`message ${isCurrentUser ? "current-user" : "other-participant"}`}>
            {parse(text)}
        </div>
    );
};

export default Message;