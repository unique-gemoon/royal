import React, { useState } from "react";
import {
  CommentsBloc,
  EntrainTyping,
} from "../../assets/styles/componentStyle";
import LoaderTyping from "../../components/loaderTyping";
import InputEmoji from "../ui-elements/inputEmoji";
import ListComments from "./listComments";
import connector from '../../connector';
import endPoints from '../../config/endPoints';

export default function BlocComments({
  item,
  state,
  setState = () => {},
  setMsgNotifTopTime = () => {},
}) {
  const [open, setOpen] = useState(false);


  const saveMessage = (data) => {
    if(data?.message){
      connector({
        method: "post",
        url: endPoints.COMMENT_NEW,
        data : {...data, pliId : item.id},
        success: (response) => {
          console.log("ok");
        },
        catch: (error) => {
          console.log(error);
        },
      });
    }else{
      alert("messsage vide");
    }
  }

  return (
    <CommentsBloc className={`${open ? "emoji-open" : ""} `}>
      {state.showComment && !state.showModal ? (
        <InputEmoji
          className="commentaire-form"
          name="comment-pli"
          placeholder="Mon commentaire"
          open={open}
          setOpen={setOpen}
          setMsgNotifTopTime={setMsgNotifTopTime}
          setState={()=>{}}
          saveMessage={(message) => {
            saveMessage({ ...message, parentId:null, ancestryId: null });
          }}
        />
      ) : null}
      <ListComments
        items={item.comments}
        itemsOld={item.commentsOld}
        state={state.showModal}
        setMsgNotifTopTime={setMsgNotifTopTime}
        saveMessage={saveMessage}
      />
      {state.showModal ? (
        <>
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
              saveMessage({ ...message, parentId: null, ancestryId: null });
            }}
          />
        </>
      ) : null}
    </CommentsBloc>
  );
}
