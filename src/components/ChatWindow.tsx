import React, {useEffect, useState} from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import "../styles/ChatWindow.css";
import {fetchMessages} from "../api/chatApi";
import TypingIndicator from "./TypingIndicator";
import {debounce} from "lodash";
import {ChatMessage} from "../types/ChatMessage";
import {ChatUser} from "../types/ChatUser";

const PARTICIPANTS: Record<string, ChatUser> = {
    "user": {
        id: "john",
        name: "John Doe",
        profilePicture: "https://upload.wikimedia.org/wikipedia/commons/5/57/Witold_Conti_-_Profile_portrait_-_1930.jpg",
    },
    "other": {
        id: "jane",
        name: "Jane Smith",
        profilePicture: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Elsie_Ferguson_portrait%2C_profile%2C_White.jpg",
    },
};

const ChatWindow = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [currentSender, setCurrentSender] = useState<ChatUser>(PARTICIPANTS["user"]); // Track participant
    const [currentReceiver, setCurrentReceiver] = useState<ChatUser>(PARTICIPANTS["other"]); // Track participant

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
        setCurrentSender((prev) => (prev === PARTICIPANTS["user"] ? PARTICIPANTS["other"] : PARTICIPANTS["user"]));
        setCurrentReceiver((prev) => (prev === PARTICIPANTS["user"] ? PARTICIPANTS["other"] : PARTICIPANTS["user"]));
    };

    const handleTyping = () => {
        setIsTyping(true);

        debouncedSetIsTyping(false);
    };

    return (
        <div className="chat-window">
            <div className="header">
                <h2>Chat</h2>
                <button onClick={switchParticipant}>
                    Switch to {currentSender === PARTICIPANTS["user"] ? PARTICIPANTS["other"].name : PARTICIPANTS["user"].name}
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
