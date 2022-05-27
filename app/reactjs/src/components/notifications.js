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
}) {
  const history = useHistory();
  const [endScroll, setEndScroll] = useState(false)
  const ref = useRef(null);
  const onScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = ref.current;
    if (scrollTop + clientHeight === scrollHeight) {
      setEndScroll(true)
      setTimeout(() => {
        setEndScroll(false)
      }, 600);
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
                }
              }}
            >
              <span className="title-notif">{item.message}</span>
              <span className="timer-notif">
                {getDurationHM(moment(), item.createdAt)}
              </span>
            </div>
          ))}
          {endScroll && <SpinnerLoading />}
        </div>
      </div>
    </BlocNotification>
  );
}
