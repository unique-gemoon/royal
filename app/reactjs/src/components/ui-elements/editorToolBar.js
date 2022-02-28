import React, { useState } from "react";
import { Quill } from "react-quill";


// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["medium", "large"];
Quill.register(Size, true);

export const modules = {
  toolbar: {
    container: "#toolbar"
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true
  }
};

// Formats objects for setting up the Quill editor
export const formats = ["size","bold", "italic", "underline", "strike", "blockquote"];

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
