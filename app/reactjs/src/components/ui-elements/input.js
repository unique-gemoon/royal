import React from "react";
import { Form } from "react-bootstrap";
import { InputForm } from "../../assets/styles/componentStyle";

export default function Input({
  label,
  name,
  type,
  placeholder,
  onChange,
  onClick,
  value,
  id,
  className = "form-group",
  children,
  as,
  accept,
  ...props
}) {
  return (
    <Form.Group className={className}>
      {label ? <label>{label}</label> : null}

      <InputForm
        as={as}
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
