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
  folowersMessage,
  setFolowersMessage = () => {},
  setMsgNotifTopTime = () => {},
  updateSubscriberStatus = () => {},
  countNewSubscriptions = 0,
  setCountNewSubscriptions = () => {},
  subscribers = [],
  setSubscribers = () => {},
  subscriptions = [],
  setSubscriptions = () => {},
  loadingMore={},
  setLoadingMore= () => {},
}) {
  const [value, setValue] = React.useState("1");
 
  const refSubscriber = useRef(null);
  const onScrollSubscriber = () => {
    const { scrollTop, scrollHeight, clientHeight } = refSubscriber.current;
    if (parseInt(scrollTop + clientHeight) === parseInt(scrollHeight)) {
      setLoadingMore({ ...loadingMore, subscribers: true }); 
    }
  };

  const refSubscription = useRef(null);
  const onScrollSubscription = () => {
    const { scrollTop, scrollHeight, clientHeight } = refSubscription.current;
    if (parseInt(scrollTop + clientHeight) === parseInt(scrollHeight)) {
      setLoadingMore({ ...loadingMore, subscriptions: true });
    }
  };

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  const setItem = (item) => {
    if (item.index !== undefined) {
      if (item.type == "subscriber") {
        if (subscribers[item.index]) {
          let cpSubscribers = [...subscribers];
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
          let cpSubscribers = [...subscribers];
          for (let i = 0; i < cpSubscribers.length; i++) {
            const subscriber = cpSubscribers[i];
            if (subscriber.id == item.id) {
              existe = true;
              cpSubscribers[i].isSubscribed = item.isSubscribed;
              break;
            }
          }

          if (!existe) {
            cpSubscribers = [{ ...item, type: "subscriber" }, ...cpSubscribers];
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
                setCountNewSubscriptions(0);
              }
            }}
          />
        </TabList>
        <div className="content-tab-modal">
          <TabPanel value="1">
            <div className="list-tab-modal" ref={refSubscriber} onScroll={onScrollSubscriber}>
              {subscribers.length > 0 ? (
                subscribers.map((item, index) => (
                  <ItemListFolower
                    key={index}
                    item={{ ...item, type: "subscriber", index }}
                    setItem={setItem}
                    setMsgNotifTopTime={setMsgNotifTopTime}
                    action={action}
                    setAction={setAction}
                    folowersMessage={folowersMessage}
                    setFolowersMessage={setFolowersMessage}
                  />
                ))
              ) : (
                <p className="message-not-result">Aucun abonné</p>
              )}
              {loadingMore.subscribers && <SpinnerLoading />}
            </div>
          </TabPanel>
          <TabPanel value="2">
            <div className="list-tab-modal" ref={refSubscription} onScroll={onScrollSubscription}>
              {subscriptions.length > 0 ? (
                subscriptions.map((item, index) => (
                  <ItemListFolower
                    key={index}
                    item={{ ...item, type: "subscription", index }}
                    setItem={setItem}
                    setMsgNotifTopTime={setMsgNotifTopTime}
                    action={action}
                    setAction={setAction}
                    folowersMessage={folowersMessage}
                    setFolowersMessage={setFolowersMessage}
                  />
                ))
              ) : (
                <p className="message-not-result">Aucun abonnement</p>
              )}
              {loadingMore.subscriptions && <SpinnerLoading />}
            </div>
          </TabPanel>
        </div>
      </TabContext>
    </FolowersModal>
  );
}
