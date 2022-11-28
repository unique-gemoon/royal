import React from "react";
import { useMediaQuery } from "react-responsive";
import { OptionsBtnAction } from "../assets/styles/globalStyle";
import ButtonAction from "./ui-elements/buttonAction";
import NewPli from "./newPli";
import BlocFolowers from "./blocFolowers";
import SearchFolowers from "./searchFolowers";
import Notifications from "./notifications";
import Messagerie from "./messagerie";
import ButtonActionNotification from './ui-elements/buttonActionNotification';
import { useSelector } from "react-redux";

export default function OptionsBtnFooter({
  action,
  setAction = () => {},
  setMsgNotifTop = () => {},
  setItem = () => {},
  setMsgNotifTopTime = () => {},
  publishPli = null,
  setPublishPli = () => {},
  folowersMessage,
  setFolowersMessage = () => {},
  updateSubscriberStatus = () => {},
  isSeenNotification = () => {},
  countNewSubscriptions = 0,
  setCountNewSubscriptions = () => {},
  subscribers = [],
  setSubscribers = () => {},
  subscriptions = [],
  setSubscriptions = () => {},
  loadingMore={},
  setLoadingMore=() => {},
  plis=[],
  typingMessage={}
}) {

  const thread = useSelector((store) => store.thread);
  
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
        countNewNotif={thread.countNewMessages}
        action={action.messagerie}
        icon={action.messagerie.icon}
        setMsgNotifTopTime={setMsgNotifTopTime}
        setAction={(e) => {
          updateAction(e, "messagerie");
        }}
        folowersMessage={folowersMessage}
        setFolowersMessage={setFolowersMessage}
      >
        <Messagerie
          setMsgNotifTopTime={setMsgNotifTopTime}
          folowersMessage={folowersMessage}
          setFolowersMessage={setFolowersMessage}
          loadingMore={loadingMore}
          setLoadingMore={setLoadingMore}
          subscribers={subscribers}
          setSubscribers={setSubscribers}
          subscriptions={subscriptions}
          setSubscriptions={setSubscriptions}
          updateSubscriberStatus={updateSubscriberStatus}
          action={action}
          setAction={setAction}
          typingMessage={typingMessage}
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
          folowersMessage={folowersMessage}
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
          folowersMessage={folowersMessage}
          setFolowersMessage={setFolowersMessage}
          action={action}
          setAction={setAction}
          setMsgNotifTopTime={setMsgNotifTopTime}
          updateSubscriberStatus={updateSubscriberStatus}
          countNewSubscriptions={countNewSubscriptions}
          setCountNewSubscriptions={setCountNewSubscriptions}
          subscribers={subscribers}
          setSubscribers={setSubscribers}
          subscriptions={subscriptions}
          setSubscriptions={setSubscriptions}
          loadingMore={loadingMore}
          setLoadingMore={setLoadingMore}
        />
      </ButtonAction>
      <ButtonActionNotification
        className="notification-bloc-action"
        action={action.notification}
        icon={action.notification.icon}
        setMsgNotifTopTime={setMsgNotifTopTime}
        setAction={(e) => {
          updateAction(e, "notification");
        }}
      >
        <Notifications
          action={action.notification}
          updateAction={updateAction}
          isSeenNotification={isSeenNotification}
          loadingMore={loadingMore}
          setLoadingMore={setLoadingMore}
          plis={plis}
        />
      </ButtonActionNotification>
    </OptionsBtnAction>
  );
}
