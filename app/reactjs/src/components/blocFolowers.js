import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FolowersModal } from "../assets/styles/componentStyle";
import endPoints from "../config/endPoints";
import connector from "../connector";
import ItemListFolower from "./itemListFolower";
import { socket } from "./socket";

export default function BlocFolowers({
  action,
  setAction = () => {},
  stateFolowersMessage,
  setFolowersMessage = () => {},
  setMsgNotifTopTime = () => {},
  updateSubscriberStatus = () => {},
}) {
  const auth = useSelector((store) => store.auth);
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [subscribers, setSubscribers] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

  //TODO count new Abonnements
  const [countNewSubscriptions, setCountNewSubscriptions] = useState(0);

  useEffect(() => {
    const updateSubscriber = (item) => {
      if (auth.user.id == item.user.id) {
        const cpSubscribers = [...subscribers];
        let existe = false;
        for (let i = 0; i < cpSubscribers.length; i++) {
          const subscriber = cpSubscribers[i];
          if (subscriber.id == item.subscriber.id) {
            existe = true;
            cpSubscribers[i].isSubscribed = item.isSubscribed;
            break;
          }
        }
        if (!existe) {
          cpSubscribers.push({
            id: item.subscriber.id,
            username: item.subscriber.username,
            isSubscribed: item.isSubscribed,
            type: "subscriber",
          });
        }
        setSubscribers(cpSubscribers);

        const cpSubscriptions = [...subscriptions];
        for (let i = 0; i < cpSubscriptions.length; i++) {
          const subscription = cpSubscriptions[i];
          if (subscription.id == item.subscriber.id) {
            cpSubscriptions[i].isSubscribed = item.isSubscribed;
            break;
          }
        }
        setSubscriptions(cpSubscriptions);
      } else if (auth.user.id == item.subscriber.id) {
        let cpSubscriptions = [...subscriptions];
        if (item.isSubscribed) {
          const cpSubscribers = [...subscribers];
          let isSubscribed = false;
          for (let i = 0; i < cpSubscribers.length; i++) {
            const subscriber = cpSubscribers[i];
            if (subscriber.id == item.user.id) {
              isSubscribed = item.isSubscribed;
              break;
            }
          }

          let existe = false;
          for (let i = 0; i < cpSubscriptions.length; i++) {
            const subscription = cpSubscriptions[i];
            if (subscription.id == item.user.id) {
              existe = true;
              cpSubscriptions[i].isSubscribed = isSubscribed;
              break;
            }
          }

          if (!existe) {
            cpSubscriptions.push({
              id: item.user.id,
              username: item.user.username,
              isSubscribed: isSubscribed,
              type: "subscription",
            });
          }
        } else {
          cpSubscriptions = cpSubscriptions.filter(function (subscription) {
            return subscription.id != item.user.id;
          });
        }
        setSubscriptions(cpSubscriptions);
      }
    };
    socket.on("SERVER_SUBSCRIBER_UPDATED", updateSubscriber);

    return () => {
      socket.off("SERVER_SUBSCRIBER_UPDATED", updateSubscriber);
    };
  }, [subscribers, subscriptions]);

  useEffect(() => {
    getSubscribers();
  }, []);

  const getSubscribers = () => {
    connector({
      method: "get",
      url: `${endPoints.USER_SUBSCRICERS}`,
      success: (response) => {
        setSubscribers(response.data.subscribers);
        getSubscriptions();
      },
      catch: (error) => {
        console.log(error);
      },
    });
  };

  const getSubscriptions = () => {
    connector({
      method: "get",
      url: `${endPoints.USER_SUBSCRIPTIONS}`,
      success: (response) => {
        let cpSubscriptions = [];
        for (let i = 0; i < response.data.subscriptions.length; i++) {
          const subscription = response.data.subscriptions[i];
          let isSubscribed = false;
          for (let j = 0; j < subscribers.length; j++) {
            const subscriber = subscribers[j];
            if (subscriber.id == subscription.id) {
              isSubscribed = true;
              break;
            }
          }
          cpSubscriptions.push({ ...subscription, isSubscribed });
        }

        setSubscriptions(cpSubscriptions);
      },
      catch: (error) => {
        console.log(error);
      },
    });
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
          />
        </TabList>
        <div className="content-tab-modal">
          <TabPanel value="1">
            <div className="list-tab-modal">
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
            </div>
          </TabPanel>
          <TabPanel value="2">
            <div className="list-tab-modal">
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
            </div>
          </TabPanel>
        </div>
      </TabContext>
    </FolowersModal>
  );
}
