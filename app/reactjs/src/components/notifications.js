import moment from "moment";
import React from "react";
import { BlocNotification } from "../assets/styles/componentStyle";
import { getDurationHM } from "../helper/fonctions";

export default function Notifications({
  notifications = [],
  isSeenNotification = () => {},
  countNewNotifications = 0,
}) {
  return (
    <BlocNotification>
      <div className="header-notif">
        Notifications{" "}
        {countNewNotifications > 0 ? (
          <span className="count-notif">{countNewNotifications}</span>
        ) : null}
      </div>
      <div className="content-notifs">
        <div className="list-notifs">
          {notifications.map((item, index) => (
            <div
              className={`item-notif ${item.seen ? "old-notif" : "new-notif"}`}
              key={index}
              onClick={() => {
                if (!item.seen) {
                  isSeenNotification(index);
                }
              }}
            >
              <span className="title-notif">{item.message}</span>
              <span className="timer-notif">
                {getDurationHM(moment(), item.createdAt)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </BlocNotification>
  );
}
