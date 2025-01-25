import React, {useEffect, useRef, useState} from "react";
import {Quill} from "react-quill-new";
import EmojiPicker, {EmojiClickData} from "emoji-picker-react";

const Size: any = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

const Font: any = Quill.import("formats/font");
Font.whitelist = [
    "arial",
    "comic-sans",
    "courier-new",
    "georgia",
    "helvetica",
    "lucida"
];
Quill.register(Font, true);


export const modules = {
    toolbar: {
        container: "#toolbar",
    },
    history: {
        delay: 500,
        maxStack: 100,
        userOnly: true
    }
};

export const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "script",
    "blockquote",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "code-block"
];

interface MessageInputToolbarProps {
    handleEmojiInput: (emojiObject: EmojiClickData) => void;
}
 const MessageInputToolbar = ({handleEmojiInput}: MessageInputToolbarProps) => {
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

    const handleKeyDown = (keyEvent: React.KeyboardEvent<HTMLDivElement>) => {
        if(keyEvent.key === "Escape" && showEmojiPicker) {
            setShowEmojiPicker(false);
        }
    };

    const handleEmojiClick = (emojiObject: EmojiClickData) => {
        handleEmojiInput(emojiObject);
        setShowEmojiPicker(false);
    }

    return <div id="toolbar" onKeyDownCapture={handleKeyDown}>
    <span className="ql-formats">
      <select className="ql-font" defaultValue="arial">
        <option value="arial">Arial</option>
        <option value="comic-sans">Comic Sans</option>
        <option value="courier-new">Courier New</option>
        <option value="georgia">Georgia</option>
        <option value="helvetica">Helvetica</option>
        <option value="lucida">Lucida</option>
      </select>
      <select className="ql-size" defaultValue="medium">
        <option value="extra-small">Size 1</option>
        <option value="small">Size 2</option>
        <option value="medium">Size 3</option>
        <option value="large">Size 4</option>
      </select>
      <select className="ql-header" defaultValue="3">
        <option value="1">Heading</option>
        <option value="2">Subheading</option>
        <option value="3">Normal</option>
      </select>
    </span>
        <span className="ql-formats">
      <button className="ql-bold"/>
      <button className="ql-italic"/>
      <button className="ql-underline"/>
      <button className="ql-strike"/>
    </span>
        <span className="ql-formats">
      <button className="ql-list" value="ordered"/>
      <button className="ql-list" value="bullet"/>
      <button className="ql-indent" value="-1"/>
      <button className="ql-indent" value="+1"/>
    </span>
        <span className="ql-formats">
      <button className="ql-script" value="super"/>
      <button className="ql-script" value="sub"/>
      <button className="ql-blockquote"/>
      <button className="ql-direction"/>
    </span>
        <span className="ql-formats">
      <select className="ql-align"/>
      <select className="ql-color"/>
      <select className="ql-background"/>
    </span>
        <span className="ql-formats">
      <button className="ql-link"/>
      <button className="ql-image"/>
      <button className="ql-video"/>
    </span>
        <span className="ql-formats">
      <button className="ql-formula"/>
      <button className="ql-code-block"/>
      <button className="ql-clean"/>
    </span>
        <span className="ql-formats">
      <button
          type="button"
          className="emoji-button"
          onClick={() => setShowEmojiPicker((prev) => !prev)}
      >
                    😀
                </button>
                    <div ref={emojiPickerRef} className="emoji-picker">
                        <EmojiPicker open={showEmojiPicker} onEmojiClick={handleEmojiClick}/>
                    </div>
    </span>
    </div>
};

export default MessageInputToolbar;