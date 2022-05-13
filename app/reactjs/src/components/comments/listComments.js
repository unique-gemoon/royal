import React from "react";
import ItemComment from "./itemComment";
import ItemCommentSimple from "./itemCommentSimple";

export default function ListComments({
  items,
  setMsgNotifTopTime = () => {},
  ...props
}) {
  return (
    <>
      {!props.state ? (
        <div className="list-comments">
          {items &&
            items.map((item, index) => (
              <ItemComment
                key={index}
                item={item}
                setMsgNotifTopTime={setMsgNotifTopTime}
              />
            ))}
        </div>
      ) : (
        <div className="list-comments liste-comment-modal">
          {items &&
            items.map((item, index) => (
              <ItemCommentSimple
                key={index}
                item={item}
                setMsgNotifTopTime={setMsgNotifTopTime}
              />
            ))}
        </div>
      )}
    </>
  );
}
