import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  CommentsBloc,
  EntrainTyping,
} from "../../assets/styles/componentStyle";
import endPoints from "../../config/endPoints";
import connector from "../../connector";
import LoaderTyping from "../loaderTyping";
import { socket } from "../socket";
import InputEmoji from "../ui-elements/inputEmoji";
import ListCitations from "./listCitations";

export default function BlocCitations({
  item,
  state,
  setState = () => {},
  setMsgNotifTopTime = () => {},
  typingCitation,
}) {
  const [open, setOpen] = useState(false);
  const [activeCitation, setActiveCitation] = useState({});
  const [waitingTime, setWaitingTime] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [imTyping, setImTyping] = useState(false);
  const auth = useSelector((store) => store.auth);

  useEffect(() => {
    if (waitingTime && waitingTime > 0) {
      setWaitingTime(waitingTime - 1);
    } else {
      setWaitingTime(false);
    }
  }, [seconds]);

  useEffect(() => {
    if (auth.isConnected) {
      const data = {
          pliId: item.id,
          username: auth.user.username,
          userId: auth.user.id,
        };
      if (imTyping) {
        socket.emit("CLIENT_TYPING_CITATION", data);
      } else {
        socket.emit("CLIENT_TYPING_CITATION", {...data,pliId:null});
      }
    }
  }, [imTyping, auth]);

  const saveMessage = async (data) => {
    if (!waitingTime) {
      setWaitingTime(5);
      data = {
        ...data,
        pliId: item.id,
        ancestryId: activeCitation?.id ? activeCitation.id : null,
      };
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
              },
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
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <CommentsBloc className={`${open ? "emoji-open" : ""} ${item.citations.length >= 3 ? "has-comments-citations" : ""}`}>
      <ListCitations
        items={item.citations}
        state={state.showModal}
        setMsgNotifTopTime={setMsgNotifTopTime}
        activeCitation={activeCitation}
        setActiveCitation={setActiveCitation}
        saveMessage={saveMessage}
      />

      {typingCitation &&
        typingCitation.username &&
        typingCitation.pliId == item.id && (
          <EntrainTyping>
            <LoaderTyping />
            {typingCitation.username} est en train d’écrire
          </EntrainTyping>
        )}

      <InputEmoji
        className="commentaire-form comment-def-modal"
        name="comment-pli"
        placeholder="Mon commentaire"
        open={open}
        setOpen={setOpen}
        setMsgNotifTopTime={setMsgNotifTopTime}
        setState={setState}
        saveMessage={saveMessage}
        waitingTime={waitingTime}
        setImTyping={setImTyping}
      />
    </CommentsBloc>
  );
}
