import React, { useState } from "react";
import { useSelector } from "react-redux";
import ArrowDownIcon from "../../assets/images/icons/ArrowDownIcon";
import { CommentItem } from "../../assets/styles/componentStyle";
import { ReplyIcon, ReplyIconGreen } from "../../assets/styles/globalStyle";
import InputEmoji from "../ui-elements/inputEmoji";
import moment from "moment";
import { getDurationHM } from "../../helper/fonctions";

export default function ItemComment({
  item,
  setMsgNotifTopTime = () => {},
  saveMessage = () => {},
}) {
  const [state, setState] = useState({
    openReponces: false,
    repondre: false,
  });

  const [activeItemComment, setActiveItemComment] = useState(null);
  const auth = useSelector((store) => store.auth);

  const getTitleComment = (rep) => {
    let title = rep.user.username;
    if (rep?.ancestry?.user?.username) {
      if (rep.user.username != rep.ancestry.user.username) {
        title += " > " + rep.ancestry.user.username;
      }
    } else {
      if (rep.user.username != item.user.username) {
        title += " > " + item.user.username;
      }
    }
    return title;
  };

  return (
    <CommentItem>
      <div className="head-comment">
        <span className="name-user-comment">{item.user.username}</span>
        {item.time ? " . " : null}
        <span className="time-comment">
          Il y a {getDurationHM(moment(), item.createdAt)}
        </span>
      </div>
      <div className="content-text-comment"> {item.message}</div>

      {auth.isConnected && (
        <div className="bloc-repondre">
          <p
            className={`repondre-comment ${!state.repondre ? "closed" : ""}`}
            onClick={() => setState({ ...state, repondre: !state.repondre })}
          >
            {state.repondre ? <ReplyIcon /> : <ReplyIconGreen />} Répondre
          </p>
          {state.repondre ? (
            <InputEmoji
              name="comment-pli"
              placeholder="Mon commentaire"
              setMsgNotifTopTime={setMsgNotifTopTime}
              saveMessage={(message) => {
                return saveMessage({
                  ...message,
                  parentId: item.id,
                  ancestryId: null,
                });
              }}
            />
          ) : null}
        </div>
      )}

      {item.childs ? (
        <div className="bloc-item-reponces">
          {item.childs.length > 0 && (
            <p
              className={`toggle-reponces ${!state.openReponces ? "open" : ""}`}
              onClick={() => {
                setState({ ...state, openReponces: !state.openReponces });
                setActiveItemComment(null);
              }}
            >
              <ArrowDownIcon />
              {state.openReponces ? "Masquer" : "Afficher"} les{" "}
              {item.childs.length} réponses{" "}
            </p>
          )}
          {state.openReponces ? (
            <div className="reponces-list">
              {item.childs &&
                item.childs.map((rep, index) => (
                  <CommentItem key={index}>
                    <div className="head-comment">
                      <span className="name-user-comment">
                        {getTitleComment(rep)}
                      </span>
                      {rep.createdAt ? " . " : null}
                      <span className="time-comment">
                        Il y a {getDurationHM(moment(), rep.createdAt)}
                      </span>
                    </div>
                    <div className="content-text-comment"> {rep.message}</div>
                    {auth.isConnected && (
                      <div className="bloc-repondre">
                        <p
                          className={`repondre-comment ${
                            activeItemComment && activeItemComment.id == rep.id
                              ? ""
                              : "closed"
                          }`}
                          onClick={() =>
                            setActiveItemComment(
                              activeItemComment &&
                                activeItemComment.id == rep.id
                                ? null
                                : rep
                            )
                          }
                        >
                          {activeItemComment &&
                          activeItemComment.id == rep.id ? (
                            <ReplyIcon />
                          ) : (
                            <ReplyIconGreen />
                          )}{" "}
                          Répondre
                        </p>
                        {activeItemComment && activeItemComment.id == rep.id ? (
                          <InputEmoji
                            name="comment-pli"
                            placeholder="Mon commentaire"
                            setMsgNotifTopTime={setMsgNotifTopTime}
                            saveMessage={(message) => {
                              return saveMessage({
                                ...message,
                                parentId: item.id,
                                ancestryId: rep.id,
                              });
                            }}
                          />
                        ) : null}
                      </div>
                    )}
                  </CommentItem>
                ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </CommentItem>
  );
}
