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
  const [activeCitation, setActiveCitation] = useState({});

  const saveMessage = async (data) => {
    data = { ...data, pliId: item.id, ancestryId: activeCitation?.id ? activeCitation.id : null  };
    return await connector({
      method: "post",
      url: endPoints.CITATION_NEW,
      data,
      success: (response) => {
        if (response.data?.citation) {
          const citation = response.data.citation;
          data = {
            citation: {
              ...data,
              id: citation.id,
              userId: citation.userId,
              user: citation.user,
              createdAt: citation.createdAt,
              ancestry: citation.ancestry,
            }
          };
          socket.emit("CLIENT_CITATION", data);
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
        items={item.citations}
        state={state.showModal}
        setMsgNotifTopTime={setMsgNotifTopTime}
        activeCitation={activeCitation}
        setActiveCitation={setActiveCitation}
        saveMessage={saveMessage}
      />
     {/* TODO : show user typing <EntrainTyping>
        <LoaderTyping />
        Jacquou est en train d’écrire
      </EntrainTyping> */}
      <InputEmoji
        className="commentaire-form comment-def-modal"
        name="comment-pli"
        placeholder="Mon commentaire"
        open={open}
        setOpen={setOpen}
        setMsgNotifTopTime={setMsgNotifTopTime}
        setState={setState}
        saveMessage={saveMessage}
      />
    </CommentsBloc>
  );
}
