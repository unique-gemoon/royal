import React from "react";
import ItemCitation from './itemCitation';

export default function ListCitations({
  items,
  setMsgNotifTopTime = () => {},
  saveMessage = () => {},
  activeCitation = {},
  setActiveCitation = () => {},
}) {

  return (
    <div className="list-comments liste-comment-modal"  id="citations-container">
      {items &&
        items.map((item, index) => (
          <ItemCitation
            key={index}
            item={item}
            setMsgNotifTopTime={setMsgNotifTopTime}
            saveMessage={saveMessage}
            activeCitation={activeCitation}
            setActiveCitation={setActiveCitation}
          />
        ))}
    </div>
  );
}
