import React from "react";
import { NotificationMessage } from "../assets/styles/componentStyle";
import { ContainerDef } from "../assets/styles/globalStyle";
import CloseIcon from "@mui/icons-material/Close";

export default function MessageNotif({ message, setMessage = () => {} }) {
  return (
    <NotificationMessage className={message ? "isMesssage" : ""}>
      <ContainerDef>
        <span>{message}</span>
        <CloseIcon onClick={() => setMessage()} />
      </ContainerDef>
    </NotificationMessage>
  );
}
