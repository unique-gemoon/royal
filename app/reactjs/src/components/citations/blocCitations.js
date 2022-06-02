import React, { useState } from "react";
import {
  CommentsBloc,
  EntrainTyping,
} from "../../assets/styles/componentStyle";
import LoaderTyping from "../loaderTyping";
import InputEmoji from "../ui-elements/inputEmoji";
import connector from "../../connector";
import endPoints from "../../config/endPoints";
import { socket } from "../socket";
import ListCitations from "./listCitations";

export default function BlocCitations({
  item,
  state,
  setState = () => {},
  setMsgNotifTopTime = () => {},
}) {
  const [open, setOpen] = useState(false);

  const saveMessage = async (data) => {
    //TODO save citation
    console.log(data);
    return;
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
    <CommentsBloc className={`${open ? "emoji-open" : ""} `}>
      <ListCitations
        items={item.comments}
        itemsOld={item.commentsOld}
        state={state.showModal}
        setMsgNotifTopTime={setMsgNotifTopTime}
        saveMessage={saveMessage}
      />
      <EntrainTyping>
        <LoaderTyping />
        Jacquou est en train d’écrire
      </EntrainTyping>
      <InputEmoji
        className="commentaire-form comment-def-modal"
        name="comment-pli"
        placeholder="Mon commentaire"
        open={open}
        setOpen={setOpen}
        setMsgNotifTopTime={setMsgNotifTopTime}
        setState={setState}
        saveMessage={(message) => {
          return saveMessage({
            ...message,
            parentId: null,
            ancestryId: null,
          });
        }}
      />
    </CommentsBloc>
  );
}
