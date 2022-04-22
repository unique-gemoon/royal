import React from "react";
import TextareaAutosize from "react-textarea-autosize";

export default function InputTextareaAutosize({
  name,
  placeholder = "",
  value = "",
  type = "text",
  as = "",
  onChange = () => {},
}) {
  return (
    <TextareaAutosize
      name={name}
      value={value}
      placeholder={placeholder}
      as={as}
      type={type}
      onChange={onChange}
    />
  );
}
