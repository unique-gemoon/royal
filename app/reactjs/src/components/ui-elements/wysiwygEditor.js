import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { WysiwygDefault } from "../../assets/styles/componentStyle";
import EditorToolbar, { modules, formats } from "./editorToolBar";


export default function WysiwygEditor({
  label,
  placeholder,
  value,
  onChange,
  image,
  ...props
}) {
  

  return (
    <WysiwygDefault>
      <label>{label}</label>
      <ReactQuill
        theme="snow"
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        modules={modules}
        formats={formats}
      />

      <EditorToolbar />
    </WysiwygDefault>
  );
}
