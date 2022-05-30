import moment from "moment";
import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { BlocNotification } from "../assets/styles/componentStyle";
import { getDurationHM } from "../helper/fonctions";
import SpinnerLoading from "./spinnerLoading";

export default function Notifications({
  notifications = [],
  isSeenNotification = () => {},
  countNewNotifications = 0,
  action={},
  updateAction = () => {},
  loadingMore={},
  setLoadingMore=() => {},
}) {
  const history = useHistory();
  const ref = useRef(null);
  const onScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = ref.current;
    if (parseInt(scrollTop + clientHeight) === parseInt(scrollHeight)) {
      setLoadingMore({...loadingMore,notifications:true});
    }
  }
  return (
    <BlocNotification>
      <div className="header-notif">
        Notifications{" "}
        {countNewNotifications > 0 ? (
          <span className="count-notif">{countNewNotifications}</span>
        ) : null}
      </div>
      <div className="content-notifs">
        <div className="list-notifs" ref={ref} onScroll={onScroll}>
          {notifications.map((item, index) => (
            <div
              className={`item-notif ${item.seen ? "old-notif" : "new-notif"}`}
              key={index}
              onClick={() => {
                if (!item.seen) {
                  isSeenNotification(index);
                }
                if (item.type == "newPli" && item.pliId) {
                  history.push(`/?pli=${item.pliId}`);
                }else if (item.type == "newSubscriber" && item.userId) {
                  updateAction({...action, isOpen:true},"folower");
                }
              }}
            >
              <span className="title-notif">{item.message}</span>
              <span className="timer-notif">
                {getDurationHM(moment(), item.createdAt)}
              </span>
            </div>
          ))}
          {loadingMore.notifications && <SpinnerLoading />}
        </div>
      </div>
    </BlocNotification>
  );
}
