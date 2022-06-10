import moment from "moment";
import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { BlocNotification } from "../assets/styles/componentStyle";
import { getDurationHM, scrollToElement } from "../helper/fonctions";
import SpinnerLoading from "./spinnerLoading";
import { useMediaQuery } from "react-responsive";

export default function Notifications({
  notifications = [],
  isSeenNotification = () => {},
  countNewNotifications = 0,
  action = {},
  updateAction = () => {},
  loadingMore = {},
  setLoadingMore = () => {},
  setActiveItemNV2 = () => {},
  plis = [],
}) {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 993px)" });
  const history = useHistory();
  const ref = useRef(null);
  const onScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = ref.current;
    if (parseInt(scrollTop + clientHeight) === parseInt(scrollHeight)) {
      setLoadingMore({ ...loadingMore, notifications: true });
    }
  };
  return (
    <BlocNotification>
      <div className="header-notif">
        Notifications{" "}
        {countNewNotifications > 0 ? (
          <span className="count-notif">{countNewNotifications}</span>
        ) : null}
      </div>
      <div className="content-notifs" ref={ref} onScroll={(e) => { if (isTabletOrMobile) { onScroll(e) } }}>
        <div className="list-notifs" ref={ref} onScroll={(e) => { if (!isTabletOrMobile){onScroll(e)}}}>
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
                } else if (item.type == "newSubscriber" && item.userId) {
                  updateAction({ ...action, isOpen: true }, "folower");
                } else if (
                  item.type == "newComment" &&
                  item.pliId &&
                  item.commentId
                ) {
                  scrollToElement(`masonryItem_${item.pliId}`);
                  for (let i = 0; i < plis.length; i++) {
                    const pli = plis[i];
                    if (pli.id == item.pliId) {
                      setActiveItemNV2({...pli, showNV2:true});
                      break;
                    }
                  }
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
