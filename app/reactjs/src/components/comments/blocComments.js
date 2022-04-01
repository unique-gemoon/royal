import React, { useState } from "react";
import { CommentsBloc, EntrainTyping } from "../../assets/styles/componentStyle";
import LoaderTyping from "../../components/loaderTyping";
import InputEmoji from "../ui-elements/inputEmoji";
import ListComments from "./listComments";

export default function BlocComments({ item, state, setState = () => {} }) {
  const [opened, setOpened] = useState(false);
  return (
    <CommentsBloc className={`${opened ? "emoji-open" : ""} `}>
      {state.showComment && !state.showModal ? <InputEmoji className="commentaire-form" name="comment-pli" placeholder="Mon commentaire" opened={opened} setOpened={setOpened} /> : null}
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
            opened={opened}
            setOpened={setOpened}
            state={state}
            setState={setState}
          />
        </>
      ) : null}
    </CommentsBloc>
  );
}
