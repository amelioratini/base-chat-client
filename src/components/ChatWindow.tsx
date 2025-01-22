import React, {useEffect, useState} from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import "../styles/ChatWindow.css";
import {fetchMessages} from "../api/chatApi";
import TypingIndicator from "./TypingIndicator";
import {debounce} from "lodash";

export interface ChatMessage {
    id: string,
    text: string,
    sender: string
}
const ChatWindow = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [currentSender, setCurrentSender] = useState("user"); // Track participant
    const [currentReceiver, setCurrentReceiver] = useState("other"); // Track participant

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const debouncedSetIsTyping = debounce((isTyping: boolean) => setIsTyping(isTyping), 1000);
    useEffect(() => {
        const loadMessages = async () => {
            try {
                setLoading(true);
                const {data} = await fetchMessages();
                setMessages(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadMessages();
    }, []);

    const handleSend = (text: string) => {
        if (text.trim()) {
            setMessages([...messages, { id: Date.now().toString(), sender: currentSender, text }]);
            setIsTyping(false); // Reset typing state after sending
        }
    };

    const switchParticipant = () => {
        setCurrentSender((prev) => (prev === "user" ? "other" : "user"));
        setCurrentReceiver((prev) => (prev === "user" ? "other" : "user"));
    };

    const handleTyping = () => {
        setIsTyping(true);


        // Reset typing state after 2 seconds of inactivity
        debouncedSetIsTyping(false);
    };

    return (
        <div className="chat-window">
            <div className="header">
                <h2>{}</h2>
                <button onClick={switchParticipant}>
                    Switch to {currentSender === "user" ? "Other" : "User"}
                </button>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            <div className="messages">
                {messages.map((msg) => (
                    <Message
                        key={msg.id}
                        text={msg.text}
                        sender={msg.sender}
                        currentParticipant={currentSender}
                    />
                ))}
            </div>
            {isTyping && <TypingIndicator participant={currentSender} />}
            <MessageInput onSend={handleSend} onTyping={handleTyping} />
        </div>
    );
};

export default ChatWindow;
