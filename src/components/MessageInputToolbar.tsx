import React from "react";
import {Quill} from "react-quill-new";

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

interface MessageInputToolbarProps {
    handleEmojiButtonClick: () => void;
}
 const MessageInputToolbar = ({handleEmojiButtonClick}: MessageInputToolbarProps) => {
    return <div id="toolbar">
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
          onClick={() => handleEmojiButtonClick()}
      >
                    😀
                </button>
    </span>
    </div>
};

export default MessageInputToolbar;