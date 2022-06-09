import React from "react";
import TextareaAutosize from "react-textarea-autosize";

export default function InputTextareaAutosize({
  name,
  placeholder = "",
  value = "",
  type = "text",
  as = "",
  onKeyPress,
  onChange = () => {},
  onClick = () => {},
  ...props
}) {
  return (
    <TextareaAutosize
      className={`form-control ${props.className}`}
      name={name}
      onKeyPress={onKeyPress}
      value={value}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      onClick={onClick}
      cacheMeasurements={true}
    />
  );
}
