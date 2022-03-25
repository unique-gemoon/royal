import React from "react";
import { Spinner } from "react-bootstrap";
import { ButtonDefault } from "../../assets/styles/globalStyle";

export default function ButtonDef({
  textButton,
  onClick,
  spinner = false,
  disabled = false,
  type = "", 
  icon = "",
  ...props
}) {
  return (
    <ButtonDefault
      className={props.className}
      disabled={spinner ? true : disabled}
      onClick={onClick}
      type={type}
    >
      {spinner && (
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      ) }
      {!spinner && icon}
      {textButton}
    </ButtonDefault>
  );
}
