import React, { useState, useRef } from "react";
import {
  CommentsBloc,
} from "../../assets/styles/componentStyle";
import InputEmoji from "../ui-elements/inputEmoji";
import ListComments from "./listComments";
import connector from "../../connector";
import endPoints from "../../config/endPoints";
import { socket } from "../../components/socket";
import { useEffect } from "react";

export default function BlocComments({
  item,
  state,
  setState = () => {},
  setMsgNotifTopTime = () => {},
}) {
  const [open, setOpen] = useState(false);

  const [height, setHeight] = useState(0);
  const refHeight = useRef(null);


  const saveMessage = async (data) => {
    data = { ...data, pliId: item.id };
    return await connector({
      method: "post",
      url: endPoints.COMMENT_NEW,
      data,
      success: (response) => {
        if (response.data?.comment) {
          const comment = response.data.comment;
          data = {
            comment: {
              ...data,
              id: comment.id,
              userId: comment.userId,
              user: comment.user,
              createdAt: comment.createdAt,
              ancestry: comment.ancestry,
            },
            users: response.data.users,
          };
          socket.emit("CLIENT_COMMENT", data);
          return true;
        }
        return;
      },
      catch: (error) => {
        console.log(error);
        return;
      },
    });
  };

  
  return (
    <CommentsBloc className={`${open ? "emoji-open" : ""} ${item.comments.length >= 2 ? "has-comments" : ""}`}>
      {state.showComment && (
        <InputEmoji
          className="commentaire-form"
          name="comment-pli"
          placeholder="Mon commentaire"
          open={open}
          setOpen={setOpen}
          setMsgNotifTopTime={setMsgNotifTopTime}
          setState={() => {}}
          saveMessage={(message) => {
            return saveMessage({
              ...message,
              parentId: null,
              ancestryId: null,
            });
          }}
        />
      )}
      <ListComments
        items={item.comments}
        state={state.showModal}
        setMsgNotifTopTime={setMsgNotifTopTime}
        saveMessage={saveMessage}
      />
    </CommentsBloc>
  );
}
