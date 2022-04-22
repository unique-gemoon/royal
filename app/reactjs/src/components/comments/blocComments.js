import React, { useState } from "react";
import {
  CommentsBloc,
  EntrainTyping,
} from "../../assets/styles/componentStyle";
import LoaderTyping from "../../components/loaderTyping";
import InputEmoji from "../ui-elements/inputEmoji";
import ListComments from "./listComments";

export default function BlocComments({ item, state, setState = () => {} }) {
  const [open, setOpen] = useState(false);
  return (
    <CommentsBloc className={`${open ? "emoji-open" : ""} `}>
      {state.showComment && !state.showModal ? (
        <InputEmoji
          className="commentaire-form"
          name="comment-pli"
          placeholder="Mon commentaire"
          open={open}
          setOpen={setOpen}
        />
      ) : null}
      <ListComments items={item.comments} state={state.showModal} />
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
          />
        </>
      ) : null}
    </CommentsBloc>
  );
}
