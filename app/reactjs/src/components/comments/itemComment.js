import React, { useState } from "react";
import { useSelector } from "react-redux";
import ArrowDownIcon from "../../assets/images/icons/ArrowDownIcon";
import { CommentItem } from "../../assets/styles/componentStyle";
import { ReplyIcon, ReplyIconGreen } from "../../assets/styles/globalStyle";
import { ROLES } from "../../config/vars";
import InputEmoji from "../ui-elements/inputEmoji";

export default function ItemComment({ item }) {
  const [state, setState] = useState({
    openReponces: false,
    repondre: false,
  });

  const [activeItemComment, setActiveItemComment] = useState(null);
  const auth = useSelector((store) => store.auth);
  console.log(activeItemComment);
  return (
    <CommentItem>
      <div className="head-comment">
        <span className="name-user-comment">{item.user}</span>
        {item.time ? " . " : null}
        <span className="time-comment">Il y a {item.time}</span>
      </div>
      <div className="content-text-comment"> {item.subject}</div>

      {auth.roles.includes(ROLES.ROLE_USER) && (
        <div className="bloc-repondre">
          <p
            className={`repondre-comment ${!state.repondre ? "closed" : ""}`}
            onClick={() => setState({ ...state, repondre: !state.repondre })}
          >
            {state.repondre ? <ReplyIcon /> : <ReplyIconGreen />} Répondre
          </p>
          {state.repondre ? (
            <InputEmoji name="comment-pli" placeholder="Mon commentaire" />
          ) : null}
        </div>
      )}

      {item.reponses ? (
        <div className="bloc-item-reponces">
          {item.reponses ? (
            <p
              className={`toggle-reponces ${!state.openReponces ? "open" : ""}`}
              onClick={() => {
                setState({ ...state, openReponces: !state.openReponces });
                setActiveItemComment(null);
              }}
            >
              <ArrowDownIcon />
              {state.openReponces ? "Masquer" : "Afficher"} les{" "}
              {item.reponses.length} réponses{" "}
            </p>
          ) : null}
          {state.openReponces ? (
            <div className="reponces-list">
              {item.reponses &&
                item.reponses.map((rep, index) => (
                  <CommentItem key={index}>
                    <div className="head-comment">
                      <span className="name-user-comment">
                        {rep.user} {">"} {rep.userRep}
                      </span>
                      {rep.time ? " . " : null}
                      <span className="time-comment">Il y a {rep.time}</span>
                    </div>
                    <div className="content-text-comment"> {rep.subject}</div>
                    {auth.roles.includes(ROLES.ROLE_USER) && (
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
