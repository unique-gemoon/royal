import React from "react";

export default function InputFile({
  name,
  id,
  type = "file",
  accept = "audio/*,video/*,image/*",
  multiple = false,
  onClick = () => {},
  onChange = () => {},
}) {
  return (
    <input
      name={name}
      id={id}
      type={type}
      accept={accept}
      multiple={multiple}
      onClick={onClick}
      onChange={onChange}
    />
  );
}
