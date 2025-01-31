import React, {useEffect, useState} from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import {fetchMessages} from "../api/chatApi";
import TypingIndicator from "./TypingIndicator";
import {debounce} from "lodash";
import {ChatMessage} from "../types/ChatMessage";
import {ChatUser} from "../types/ChatUser";
import styled from "styled-components";

const ChatWindowWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 80vh;
    width: 60%;
    margin: auto;
    border-width: 1px;
    border-style: solid;
    border-color: ${(props) => props.theme.colors.border};
    border-radius: ${(props) => props.theme.borderRadius};
`;

const ChatWindowHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${(props) => props.theme.spacing.medium};
    background: ${(props) => props.theme.colors.primary};
    border-width: 1px;
    border-style: solid;
    border-color: ${(props) => props.theme.colors.border};
`;

const HeaderButton = styled.button`
    padding: ${(props) => props.theme.spacing.small} ${(props) => props.theme.spacing.medium};
    background: ${(props) => props.theme.colors.secondary};
    color: white;
    border: none;
    border-radius: ${(props) => props.theme.borderRadius};
    cursor: pointer;

    &:hover {
        background: ${(props) => props.theme.colors.secondaryLight};
    }
`;

const MessagesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: ${(props) => props.theme.spacing.small}
    overflow-y: auto;
    background: ${(props) => props.theme.colors.background};
`;

const ChatError = styled.p`
    color: ${(props) => props.theme.colors.error};
`;

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
        <ChatWindowWrapper>
            <ChatWindowHeader>
                <h2>Chat</h2>
                <HeaderButton onClick={switchParticipant}>
                    Switch to {currentSender === PARTICIPANTS["user"] ? PARTICIPANTS["other"].name : PARTICIPANTS["user"].name}
                </HeaderButton>
            </ChatWindowHeader>
            {loading && <p>Loading...</p>}
            {error && <ChatError>{error}</ChatError>}
            <MessagesWrapper>
                {messages.map((msg) => (
                    <Message
                        key={msg.id}
                        text={msg.text}
                        sender={msg.sender}
                        currentParticipant={currentSender}
                    />
                ))}
            </MessagesWrapper>
            {isTyping && <TypingIndicator participant={currentSender} />}
            <MessageInput onSend={handleSend} onTyping={handleTyping} />
        </ChatWindowWrapper>
    );
};

export default ChatWindow;
