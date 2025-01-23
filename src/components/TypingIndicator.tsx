import React from "react";
import "../styles/TypingIndicator.css";

interface TypingIndicatorProps {
    participant: ChatUser;
}
const TypingIndicator = ({ participant }: TypingIndicatorProps) => (
    <div className="typing-indicator">
        {participant.name} is typing...
        <div className="dots">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
);

export default TypingIndicator;