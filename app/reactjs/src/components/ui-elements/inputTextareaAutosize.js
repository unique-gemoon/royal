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
      className="form-control"
      name={name}
      value={value}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      cacheMeasurements={true}
    />
  );
}
