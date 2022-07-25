import { padding } from "@mui/system";
import React, { useState } from "react";
import { Quill } from "react-quill";

const BlockEmbed = Quill.import("blots/block/embed");

//ADD image
class ImageBlot extends BlockEmbed {
    static create(value) {
        const node = super.create(value);
        let p = document.createElement('p');
        p.setAttribute("class", "block-image");
        node.setAttribute("src", value);
        node.setAttribute("width", 300);
        node.setAttribute("height", 300);
        node.setAttribute("align", "center");
        p.appendChild(node);
        return p;
    }
    static value(node) {
        return node.getAttribute("src");
    }
}
ImageBlot.blotName = "image";
ImageBlot.tagName = "IMG";
Quill.register(ImageBlot);

//ADD video
class VideoBlot extends BlockEmbed {
    static create(value) {
        let node = super.create(value);
        let p = document.createElement('p');
        p.setAttribute("class", "block-video");
        node.setAttribute("src", value);
        node.setAttribute("width", "100%");
        node.setAttribute("controls", "");
        p.appendChild(node);
        return p;
    }
    static value(node) {
        return node.getAttribute("src");
    }
}
VideoBlot.blotName = "video";
VideoBlot.tagName = "VIDEO";
Quill.register(VideoBlot);

//ADD audio
class AudioBlot extends BlockEmbed {
    static create(value) {
        const node = super.create();
        let p = document.createElement('p');
        p.setAttribute("class", "block-audio");
        node.setAttribute("src", value);
        node.setAttribute("controls", "");
        p.appendChild(node);
        return p;
    }
    static value(node) {
        return node.getAttribute("src");
    }
}

AudioBlot.blotName = "audio";
AudioBlot.tagName = "AUDIO";
Quill.register(AudioBlot);

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["medium", "large"];
Quill.register(Size, true);

export const modules = {
    toolbar: {
        container: "#toolbar",
    },
    history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
    },
};

// Formats objects for setting up the Quill editor
export const formats = ["size", "bold", "italic", "underline", "strike", "blockquote", "image", "video", "audio"];

// Quill Toolbar component
export const QuillToolbar = () => (
    <div id="toolbar">
        <span className="ql-formats">
            <select className="ql-size" defaultValue="medium">
                <option value="medium">T</option>
                <option value="large">T</option>
            </select>
            <button className="ql-bold" />
            <button className="ql-italic" />
            <button className="ql-underline" />
            <button className="ql-strike" />
            <button className="ql-blockquote" />
        </span>
    </div>
);

export default QuillToolbar;
