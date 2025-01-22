import React, {useState, FormEvent, useEffect, useRef} from "react";
import "../styles/MessageInput.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EmojiPicker, {EmojiClickData} from "emoji-picker-react";

interface MessageInputProps {
    onSend: (arg: string) => void
    onTyping: () => void
}
const MessageInput = ({ onSend, onTyping }: MessageInputProps) => {
    const emojiPickerRef = useRef<HTMLDivElement>(null);
    const [input, setInput] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleEmojiClick = (emojiObject: EmojiClickData) => {
        setInput((prevText) => `${prevText}${emojiObject.emoji}`);
        setShowEmojiPicker(false);
    };

    const handleSend = (event?: FormEvent<HTMLFormElement>) => {
        event?.preventDefault();

        onSend(input);
        setInput("");
    };

    const handleChange = (value: string) => {
        setInput(value);
        if (onTyping) onTyping();
    }

    const handleDocumentClick = (mouseEvent: MouseEvent) => {
        console.log("Handling event");
        const target = (mouseEvent.currentTarget as Document).activeElement;
        if(!emojiPickerRef.current?.contains(target) && showEmojiPicker) {
            setShowEmojiPicker(false);
        }
    }

    const handleDocumentKeyDown = (keyEvent: KeyboardEvent) => {
        if(keyEvent.key === "Escape" && showEmojiPicker) {
            setShowEmojiPicker(false);
        } else if(keyEvent.key === "Enter") {
            handleSend();
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleDocumentClick, true);
        document.addEventListener("keydown", handleDocumentKeyDown);

        return () => {
            document.removeEventListener("click", handleDocumentClick);
            document.removeEventListener("keydown", handleDocumentKeyDown);
        }
    });

    return (
        <form className="message-input" onSubmit={handleSend}>
            <div className="input-toolbar">
                <button
                    type="button"
                    id="emoji-toggle"
                    className="emoji-button"
                    onClick={() => setShowEmojiPicker((prev) => !prev)}
                >
                    😀
                </button>
                    <div ref={emojiPickerRef} className="emoji-picker">
                        <EmojiPicker open={showEmojiPicker} onEmojiClick={handleEmojiClick}/>
                    </div>
            </div>
            <ReactQuill
                value={input}
                onChange={handleChange}
                placeholder="Type a message..."
                className="rich-text-editor"
            />
            <button type="submit">Send</button>
        </form>
    );
};

export default MessageInput;
