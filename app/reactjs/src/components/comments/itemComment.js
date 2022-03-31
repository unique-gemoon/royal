import React, { useState } from "react";
import { useSelector } from "react-redux";
import ArrowDownIcon from "../../assets/images/icons/ArrowDownIcon";
import { CommentItem } from "../../assets/styles/componentStyle";
import { ReplyIcon, ReplyIconGreen } from "../../assets/styles/globalStyle";
import { ROLES } from "../../config/vars";
import InputEmoji from "../ui-elements/inputEmoji";

export default function ItemComment({ name, time, subject, children }) {
  const [state, setState] = useState({
    openReponces: false,
    repondre: false,
  });

  const auth = useSelector((store) => store.auth);
  
  return (
    <CommentItem>
      <div className="head-comment">
        <span className="name-user-comment">{name}</span>
        {time ? " . " : null}
        <span className="time-comment">Il y a {time}</span>
      </div>
      <div className="content-text-comment"> {subject}</div>

      {auth.roles.includes(ROLES.ROLE_USER) && (
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
              state={{}}
              setState={() => {}}
            />
          ) : null}
        </div>
      )}

      {children ? (
        <div className="bloc-item-reponces">
          {children ? (
            <p
              className={`toggle-reponces ${!state.openReponces ? "open" : ""}`}
              onClick={() =>
                setState({ ...state, openReponces: !state.openReponces })
              }
            >
              <ArrowDownIcon />
              {state.openReponces ? "Masquer" : "Afficher"} les{" "}
              {children.length} réponses{" "}
            </p>
          ) : null}
          {state.openReponces ? (
            <div className="reponces-list">
              {children &&
                children.map((rep, index) => (
                  <CommentItem key={index}>
                    <div className="head-comment">
                      <span className="name-user-comment">{rep.user}</span>
                      {rep.time ? " . " : null}
                      <span className="time-comment">Il y a {rep.time}</span>
                    </div>
                    <div className="content-text-comment"> {rep.subject}</div>
                  </CommentItem>
                ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </CommentItem>
  );
}
