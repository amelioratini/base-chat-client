import React, { useEffect, useRef, useState } from "react";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import MessageInputToolbar from "./MessageInputToolbar";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import styled from "styled-components";

const SendButton = styled.button`
  position: absolute;
  background: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  padding: ${(props) => props.theme.spacing.small}
    ${(props) => props.theme.spacing.medium};
  border-radius: ${(props) => props.theme.borderRadius};
  margin-right: ${(props) => props.theme.spacing.medium};
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  align-self: flex-end;

  &:hover {
    background: ${(props) => props.theme.colors.primaryLight};
  }
`;

const ChatInputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const EmojiPickerWrapper = styled.div`
  position: absolute;
  z-index: 100;
  background: white;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius};
  right: 20%;
  top: 10%;
`;

interface MessageInputProps {
  onSend: (arg: string) => void;
  onTyping: () => void;
}
const MessageInput = ({ onSend, onTyping }: MessageInputProps) => {
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<ReactQuill>(null);
  const [inputText, setInputText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  const handleEmojiClick = (emojiObject: EmojiClickData) => {
    setInputText((prevText) =>
      prevText.endsWith("</p>")
        ? `${prevText.substring(0, prevText.length - 4)}${emojiObject.emoji}</p>`
        : `${prevText}${emojiObject.emoji}`,
    );
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  };

  const handleSend = (mouseEvent?: React.MouseEvent) => {
    onSend(inputText);
    setInputText("");
    mouseEvent?.preventDefault();
  };

  const handleChange = (value: string) => {
    setInputText(value);
    if (onTyping) onTyping();
  };

  const handleKeyDown = (keyEvent: React.KeyboardEvent) => {
    if (keyEvent.key === "Enter" && !keyEvent.shiftKey) {
      keyEvent.preventDefault();
      handleSend();
    } else if (keyEvent.key === "Escape" && showEmojiPicker) {
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
      userOnly: true,
    },
  };

  const handleDocumentClick = (mouseEvent: MouseEvent) => {
    const target = (mouseEvent.currentTarget as Document).activeElement;
    if (!emojiPickerRef.current?.contains(target) && showEmojiPicker) {
      setShowEmojiPicker(false);
      mouseEvent.preventDefault();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick, true);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <>
      <EmojiPickerWrapper ref={emojiPickerRef}>
        <EmojiPicker open={showEmojiPicker} onEmojiClick={handleEmojiClick} />
      </EmojiPickerWrapper>
      <MessageInputToolbar handleEmojiButtonClick={handleEmojiButtonClick} />
      <ChatInputWrapper onKeyDownCapture={handleKeyDown}>
        <ReactQuill
          value={inputText}
          onChange={handleChange}
          placeholder="Type a message..."
          theme="snow"
          modules={modules}
          ref={inputRef}
        />
        <SendButton onClick={handleSend}>Send</SendButton>
      </ChatInputWrapper>
    </>
  );
};

export default MessageInput;
