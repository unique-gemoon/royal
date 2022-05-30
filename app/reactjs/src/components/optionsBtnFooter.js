import React from "react";
import { useMediaQuery } from "react-responsive";
import { OptionsBtnAction } from "../assets/styles/globalStyle";
import ButtonAction from "./ui-elements/buttonAction";
import NewPli from "./newPli";
import BlocFolowers from "./blocFolowers";
import SearchFolowers from "./searchFolowers";
import Notifications from "./notifications";
import Messagerie from "./messagerie";

export default function OptionsBtnFooter({
  action,
  setAction = () => {},
  setMsgNotifTop = () => {},
  setItem = () => {},
  setMsgNotifTopTime = () => {},
  publishPli = null,
  setPublishPli = () => {},
  stateFolowersMessage,
  setFolowersMessage = () => {},
  updateSubscriberStatus = () => {},
  notifications = [],
  isSeenNotification = () => {},
  countNewNotifications = 0,
  countNewSubscriptions = 0,
  subscribers = [],
  setSubscribers = () => {},
  subscriptions = [],
  setSubscriptions = () => {},
  loadingMore={},
  setLoadingMore=() => {},
}) {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1199px)" });

  const updateAction = (e, name) => {
    let cpAction = { ...action };
    if (isTabletOrMobile) {
      cpAction = {
        ...action,
        notification: { ...action.notification, isOpen: false },
        folower: { ...action.folower, isOpen: false },
        search: { ...action.search, isOpen: false },
        messagerie: { ...action.messagerie, isOpen: false },
      };
    }
    if (!cpAction[name]) return;
    cpAction[name].isOpen = e.isOpen;
    setAction(cpAction);
    setMsgNotifTop(null);
  };

  return (
    <OptionsBtnAction>
      <ButtonAction
        className="messages-bloc-action"
        countNewNotif={0}
        action={action.messagerie}
        icon={action.messagerie.icon}
        setMsgNotifTopTime={setMsgNotifTopTime}
        setAction={(e) => {
          updateAction(e, "messagerie");
        }}
        stateFolowersMessage={stateFolowersMessage}
        setFolowersMessage={setFolowersMessage}
      >
        <Messagerie
          setMsgNotifTopTime={setMsgNotifTopTime}
          stateFolowersMessage={stateFolowersMessage}
          setFolowersMessage={setFolowersMessage}
        />
      </ButtonAction>
      <ButtonAction
        className="search-bloc-action"
        action={action.search}
        icon={action.search.icon}
        setMsgNotifTopTime={setMsgNotifTopTime}
        setAction={(e) => {
          updateAction(e, "search");
        }}
      >
        <SearchFolowers
          stateFolowersMessage={stateFolowersMessage}
          setFolowersMessage={setFolowersMessage}
          action={action}
          setAction={setAction}
          setMsgNotifTopTime={setMsgNotifTopTime}
          updateSubscriberStatus={updateSubscriberStatus}
        />
      </ButtonAction>
      {isTabletOrMobile && (
        <NewPli
          action={action}
          setAction={setAction}
          setMsgNotifTop={setMsgNotifTop}
          publishPli={publishPli}
          setPublishPli={setPublishPli}
          setItem={setItem}
        />
      )}
      <ButtonAction
        className="abonnee-bloc-action"
        action={action.folower}
        countNewNotif={countNewSubscriptions}
        icon={action.folower.icon}
        setMsgNotifTopTime={setMsgNotifTopTime}
        setAction={(e) => {
          updateAction(e, "folower");
        }}
      >
        <BlocFolowers
          stateFolowersMessage={stateFolowersMessage}
          setFolowersMessage={setFolowersMessage}
          action={action}
          setAction={setAction}
          setMsgNotifTopTime={setMsgNotifTopTime}
          updateSubscriberStatus={updateSubscriberStatus}
          countNewSubscriptions={countNewSubscriptions}
          subscribers={subscribers}
          setSubscribers={setSubscribers}
          subscriptions={subscriptions}
          setSubscriptions={setSubscriptions}
        />
      </ButtonAction>
      <ButtonAction
        className="notification-bloc-action"
        action={action.notification}
        countNewNotif={countNewNotifications}
        icon={action.notification.icon}
        setMsgNotifTopTime={setMsgNotifTopTime}
        setAction={(e) => {
          updateAction(e, "notification");
        }}
      >
        <Notifications
          action={action.notification}
          updateAction={updateAction}
          notifications={notifications}
          isSeenNotification={isSeenNotification}
          countNewNotifications={countNewNotifications}
          loadingMore={loadingMore}
          setLoadingMore={setLoadingMore}
        />
      </ButtonAction>
    </OptionsBtnAction>
  );
}
