import React from "react";
import "../styles/TypingIndicator.css";

interface TypingIndicatorProps {
    participant: string
}
const TypingIndicator = ({ participant }: TypingIndicatorProps) => (
    <div className="typing-indicator">
        {participant === "user" ? "Other" : "User"} is typing...
        <div className="dots">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
);

export default TypingIndicator;