import React, { useState } from "react";
import { CommentsBloc } from "../../assets/styles/componentStyle";
import InputEmoji from "../ui-elements/inputEmoji";
import ListComments from "./listComments";

export default function BlocComments({ item, state, setState = () => {} }) {
  const [opened, setOpened] = useState(false);
  return (
    <CommentsBloc className={`${opened ? "emoji-open" : ""}`}>
      <ListComments items={item.comments} />
      {state.showComment ? (
        <InputEmoji
          className="commentaire-form"
          name="comment-pli"
          placeholder="Mon commentaire"
          opened={opened}
          setOpened={setOpened}
          state={state}
          setState={setState}
        />
      ) : null}
    </CommentsBloc>
  );
}
