import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import React, { useRef, useState } from "react";
import { FolowersModal } from "../assets/styles/componentStyle";
import endPoints from "../config/endPoints";
import connector from "../connector";
import ItemListFolower from "./itemListFolower";
import SpinnerLoading from "./spinnerLoading";

export default function BlocFolowers({
  action,
  setAction = () => {},
  stateFolowersMessage,
  setFolowersMessage = () => {},
  setMsgNotifTopTime = () => {},
  updateSubscriberStatus = () => {},
  countNewSubscriptions = 0,
  subscribers = [],
  setSubscribers = () => {},
  subscriptions = [],
  setSubscriptions = () => {},
}) {
  const [value, setValue] = React.useState("1");
  const [endScroll, setEndScroll] = useState(false);
  const ref = useRef(null);

  const onScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = ref.current;
    if (scrollTop + clientHeight === scrollHeight) {
      setEndScroll(true);
      setTimeout(() => {
        setEndScroll(false);
      }, 600);
    }
  };

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  const setItem = (item) => {
    if (item.index !== undefined) {
      if (item.type == "subscriber") {
        if (subscribers[item.index]) {
          const cpSubscribers = [...subscribers];
          cpSubscribers[item.index] = item;
          setSubscribers(cpSubscribers);

          let existe = false;
          const cpSubscriptions = [...subscriptions];
          for (let i = 0; i < cpSubscriptions.length; i++) {
            const subscription = cpSubscriptions[i];
            if (subscription.id == item.id) {
              existe = true;
              cpSubscriptions[i].isSubscribed = item.isSubscribed;
              break;
            }
          }
          setSubscriptions(cpSubscriptions);
        }
      } else if (item.type == "subscription") {
        if (subscriptions[item.index]) {
          const cpSubscriptions = [...subscriptions];
          cpSubscriptions[item.index] = item;
          setSubscriptions(cpSubscriptions);

          let existe = false;
          const cpSubscribers = [...subscribers];
          for (let i = 0; i < cpSubscribers.length; i++) {
            const subscriber = cpSubscribers[i];
            if (subscriber.id == item.id) {
              existe = true;
              cpSubscribers[i].isSubscribed = item.isSubscribed;
              break;
            }
          }

          if (!existe) {
            cpSubscribers.push({ ...item, type: "subscriber" });
          }
          setSubscribers(cpSubscribers);
        }
      }
      updateSubscriberStatus(item);
    }
  };

  const seenSubscriptions = () => {
    connector({
      method: "post",
      url: endPoints.NOTIFICATION_SEEN_SUBSCRIPTIONS,
      success: (_response) => {
        const cpSubscriptions = [...subscriptions];
        for (let i = 0; i < cpSubscriptions.length; i++) {
          cpSubscriptions[i].seen = true;
        }
        setSubscriptions(cpSubscriptions);
      },
      catch: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <FolowersModal>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label={<>Abonnés</>} value="1" />

          <Tab
            label={
              <>
                Abonnements{" "}
                {countNewSubscriptions > 0 && (
                  <span className="count-tab">{countNewSubscriptions}</span>
                )}{" "}
              </>
            }
            value="2"
            onClick={() => {
              if (countNewSubscriptions > 0) {
                seenSubscriptions();
              }
            }}
          />
        </TabList>
        <div className="content-tab-modal">
          <TabPanel value="1">
            <div className="list-tab-modal" ref={ref} onScroll={onScroll}>
              {subscribers.length > 0 &&
                subscribers.map((item, index) => (
                  <ItemListFolower
                    key={index}
                    item={{ ...item, type: "subscriber", index }}
                    setItem={setItem}
                    setMsgNotifTopTime={setMsgNotifTopTime}
                    onClick={() => {
                      const cpAction = {
                        ...action,
                        notification: { ...action.notification, isOpen: false },
                        folower: { ...action.folower, isOpen: true },
                        search: { ...action.search, isOpen: false },
                        messagerie: { ...action.messagerie, isOpen: true },
                      };
                      setAction(cpAction);
                      setFolowersMessage({
                        ...stateFolowersMessage,
                        activeItem: { id: item.id },
                      });
                    }}
                  />
                ))}
              {endScroll && <SpinnerLoading />}
            </div>
          </TabPanel>
          <TabPanel value="2">
            <div className="list-tab-modal" ref={ref} onScroll={onScroll}>
              {subscriptions.length > 0 &&
                subscriptions.map((item, index) => (
                  <ItemListFolower
                    key={index}
                    item={{ ...item, type: "subscription", index }}
                    setItem={setItem}
                    setMsgNotifTopTime={setMsgNotifTopTime}
                    onClick={() => {
                      const cpAction = {
                        ...action,
                        notification: { ...action.notification, isOpen: false },
                        folower: { ...action.folower, isOpen: true },
                        search: { ...action.search, isOpen: false },
                        messagerie: { ...action.messagerie, isOpen: true },
                      };
                      setAction(cpAction);
                      setFolowersMessage({
                        ...stateFolowersMessage,
                        activeItem: { id: item.id },
                      });
                    }}
                  />
                ))}
              {endScroll && <SpinnerLoading />}
            </div>
          </TabPanel>
        </div>
      </TabContext>
    </FolowersModal>
  );
}
