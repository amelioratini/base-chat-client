import React, {useEffect, useRef, useState} from "react";
import "../styles/MessageInput.css";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import MessageInputToolbar from "./MessageInputToolbar";
import EmojiPicker, {EmojiClickData} from "emoji-picker-react";

interface MessageInputProps {
    onSend: (arg: string) => void
    onTyping: () => void
}
const MessageInput = ({ onSend, onTyping }: MessageInputProps) => {
    const [inputText, setInputText] = useState("");

    const handleEmojiClick = (emojiObject: EmojiClickData) => {
        setInputText((prevText) => prevText.endsWith("</p>") ?
            `${prevText.substring(0, prevText.length - 4)}${emojiObject.emoji}</p>`
            : `${prevText}${emojiObject.emoji}`);
        setShowEmojiPicker(false);
    };

    const handleSend = (mouseEvent?: React.MouseEvent) => {
        onSend(inputText);
        setInputText("");
        mouseEvent?.preventDefault();
    };

    const handleChange = (value: string) => {
        setInputText(value);
        if (onTyping) onTyping();
    }

    const handleKeyDown = (keyEvent: React.KeyboardEvent) => {
        if(keyEvent.key === "Enter" && !keyEvent.shiftKey) {
            keyEvent.preventDefault();
            handleSend();
        } else if(keyEvent.key === "Escape" && showEmojiPicker) {
            setShowEmojiPicker(false);
        }
    };

    const handleEmojiButtonClick = () => {
        setShowEmojiPicker((prevState) => !prevState);
    };

    const modules = {
        toolbar: {
            container: "#toolbar",
        },
        history: {
            delay: 500,
            maxStack: 100,
            userOnly: true
        }
    };

    const emojiPickerRef = useRef<HTMLDivElement>(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

    const handleDocumentClick = (mouseEvent: MouseEvent) => {
        const target = (mouseEvent.currentTarget as Document).activeElement;
        if(!emojiPickerRef.current?.contains(target) && showEmojiPicker) {
            setShowEmojiPicker(false);
            mouseEvent.preventDefault();
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleDocumentClick, true);

        return () => {
            document.removeEventListener("click", handleDocumentClick);
        }
    }, []);

    return (
        <div>
            <div ref={emojiPickerRef} className="emoji-picker">
                <EmojiPicker open={showEmojiPicker} onEmojiClick={handleEmojiClick}/>
            </div>
            <MessageInputToolbar handleEmojiButtonClick={handleEmojiButtonClick}/>
            <div className="chat-input-wrapper" onKeyDownCapture={handleKeyDown}>
                <ReactQuill
                    value={inputText}
                    onChange={handleChange}
                    placeholder="Type a message..."
                    className="rich-text-editor"
                    theme="snow"
                    modules={modules}
                />
                <button className="submit-button" onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default MessageInput;
