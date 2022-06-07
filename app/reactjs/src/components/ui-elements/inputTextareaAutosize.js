import React from "react";
import TextareaAutosize from "react-textarea-autosize";

export default function InputTextareaAutosize({
  name,
  placeholder = "",
  value = "",
  type = "text",
  as = "",
  onChange = () => {},
  onClick = () => {},
  ...props
}) {
  return (
    <TextareaAutosize
      className={`form-control ${props.className}`}
      name={name}
      value={value}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      onClick={onClick}
      cacheMeasurements={true}
    />
  );
}
