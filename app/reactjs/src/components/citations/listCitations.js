import React from "react";
import ItemCommentSimple from "../comments/itemCommentSimple";

export default function ListCitations({
  itemsOld,
  setMsgNotifTopTime = () => {},
  saveMessage = () => {},
}) {
  return (
    <div className="list-comments liste-comment-modal">
      {itemsOld &&
        itemsOld.map((item, index) => (
          <ItemCommentSimple
            key={index}
            item={item}
            setMsgNotifTopTime={setMsgNotifTopTime}
            saveMessage={saveMessage}
          />
        ))}
    </div>
  );
}
