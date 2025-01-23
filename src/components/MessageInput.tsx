import React, {useState, FormEvent, useEffect, useRef} from "react";
import "../styles/MessageInput.css";
import "react-quill-new/dist/quill.snow.css";
import EmojiPicker, {EmojiClickData} from "emoji-picker-react";
import ReactQuill from "react-quill-new";

interface MessageInputProps {
    onSend: (arg: string) => void
    onTyping: () => void
}
const MessageInput = ({ onSend, onTyping }: MessageInputProps) => {
    const emojiPickerRef = useRef<HTMLDivElement>(null);
    const [inputText, setInputText] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleEmojiClick = (emojiObject: EmojiClickData) => {
        setInputText((prevText) => `${prevText}${emojiObject.emoji}`);
        setShowEmojiPicker(false);
    };

    const handleSend = (formEvent?: FormEvent<HTMLFormElement>) => {
        onSend(inputText);
        setInputText("");
        formEvent?.preventDefault();
    };

    const handleChange = (value: string) => {
        setInputText(value);
        if (onTyping) onTyping();
    }

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

    const handleKeyDownQuill = (keyEvent: React.KeyboardEvent<HTMLDivElement>) => {
        if(keyEvent.key === "Escape" && showEmojiPicker) {
            setShowEmojiPicker(false);
        } else if(keyEvent.key === "Enter" && !keyEvent.shiftKey) {
            handleSend();
            keyEvent.preventDefault();
        }
    };

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
            <div className={"quill-wrapper-custom"} onKeyDownCapture={handleKeyDownQuill}>
            <ReactQuill
                value={inputText}
                onChange={handleChange}
                placeholder="Type a message..."
                className="rich-text-editor"
                theme="snow"
            />
            </div>
            <button className="submitButton" type="submit">Send</button>
        </form>
    );
};

export default MessageInput;
