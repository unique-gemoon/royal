import React from "react";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";

export default function ItemSingleMessage({
  message,
  date,
  stautVu,
  typeSend,
}) {
  const getSend = () => {
    switch (typeSend) {
      case "reserved":
        return "";
      case "user-send":
        return "msg-user-enligne";
      default:
        return "";
    }
  };
  const vuStatut = () => {
    switch (stautVu) {
      case "vuSend":
        return <DoneIcon/>;
      case "vuResent":
        return <DoneAllIcon/>;
      case "vuReading":
        return <DoneAllIcon style={{ color: "#74E8BE" }}/>;
      default:
        return <DoneIcon/>;
    }
  };
  return (
    <div
      className={`d-flex ${
        typeSend === "user-send"
          ? "justify-content-end"
          : "justify-content-start"
      } mb-2`}
    >
      <div className={`msg_cotainer ${getSend()}`}>
        <div className="content-msg">{message}</div>
        <div className="msg_time">
          {typeSend === "user-send" ? vuStatut() : null} <span>{date}</span>
        </div>
      </div>
    </div>
  );
}
