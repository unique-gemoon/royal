import moment from "moment";
import React from "react";
import CotteIcon from "../../assets/images/icons/cotteIcon";
import { SimpleComment } from "../../assets/styles/componentStyle";
import { getDurationHMText } from "../../helper/fonctions";

export default function ItemCitation({
  item,
  activeCitation = {},
  setActiveCitation = () => {},
}) {
  const checkCotte = () => {
    return activeCitation && activeCitation.id == item.id;
  };

  return (
    <SimpleComment
      className={`${checkCotte() ? "cotte-comment" : ""}`}
      onClick={() => {
        setActiveCitation(
          activeCitation && activeCitation.id == item.id ? {} : item
        );
      }}
    >
      {checkCotte() && (
        <span className="cotte-comment">
          <CotteIcon />
        </span>
      )}
      <div className="head-comment">
        <span className="name-user-comment">{item.user.username}</span>
        {item.time ? " . " : null}
        <span className="time-comment">
          {getDurationHMText(moment(), item.createdAt)}
        </span>
      </div>
      {item.ancestry ? (
        <div className="citation-bloc">
          <span className="citation-user">{item.ancestry.user.username}</span>
          <span className="citation-text">{item.ancestry.message}</span>
        </div>
      ) : null}
      <div className="content-text-comment"> {item.message}</div>
    </SimpleComment>
  );
}
