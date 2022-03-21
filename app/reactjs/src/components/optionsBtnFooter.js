import React, { useState } from "react";
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
  dataNotifs,
  setMsgNotifTop = () => {},
}) {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1199px)" });

  const [newNotifs, setNewNotif] = useState(
    dataNotifs.filter((newNotif) => newNotif.statut === "new")
  );

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
        setCount={2}
        action={action.messagerie}
        icon={action.messagerie.icon}
        setAction={(e) => {
          updateAction(e, "messagerie");
        }}
      >
        <Messagerie />
      </ButtonAction>
      <ButtonAction
        className="search-bloc-action"
        action={action.search}
        icon={action.search.icon}
        setAction={(e) => {
          updateAction(e, "search");
        }}
      >
        <SearchFolowers />
      </ButtonAction>
      {isTabletOrMobile && (
        <NewPli
          action={action}
          setAction={setAction}
          setMsgNotifTop={setMsgNotifTop}
        />
      )}
      <ButtonAction
        className="abonnee-bloc-action"
        action={action.folower}
        setCount={2}
        icon={action.folower.icon}
        setAction={(e) => {
          updateAction(e, "folower");
        }}
      >
        <BlocFolowers />
      </ButtonAction>
      <ButtonAction
        className="notification-bloc-action"
        action={action.notification}
        setCount={newNotifs.length}
        icon={action.notification.icon}
        setAction={(e) => {
          updateAction(e, "notification");
        }}
      >
        <Notifications
          items={newNotifs.length ? newNotifs : dataNotifs}
          setNotif={setNewNotif}
        />
      </ButtonAction>
    </OptionsBtnAction>
  );
}
