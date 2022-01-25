import React from "react";
import { Form } from "react-bootstrap";

export default function Input({
  label,
  name,
  type,
  placeholder,
  onChange,
  onClick,
  value,
  id,
  className = "",
  children,
  ...props
}) {
  return (
    <Form.Group className={className}>
      {label ? <label>{label}</label> : null}

      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        id={id}
        onClick={onClick}
        onChange={onChange}
        disabled={props.disabled !== undefined}
        autoComplete="off"
      />
      {children}
    </Form.Group>
  );
}
