import React from "react";
import ItemComment from "./itemComment";

export default function ListComments({
  items,
  setMsgNotifTopTime = () => {},
  saveMessage = () => {},
}) {
  return (
    <div className="list-comments">
      {items &&
        items.map((item, index) => (
          <ItemComment
            key={index}
            item={item}
            setMsgNotifTopTime={setMsgNotifTopTime}
            saveMessage={saveMessage}
          />
        ))}
    </div>
  );
}
