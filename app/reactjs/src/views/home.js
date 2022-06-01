import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { StyledEngineProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";
import logoType from "../assets/images/Logotype.png";
import {
  ContainerDef,
  DefaultMain,
  HeaderMobile,
} from "../assets/styles/globalStyle";
import FooterAuthHome from "../components/footerAuthHome";
import FooterHome from "../components/footerHome";
import ItemMasonry from "../components/itemMasonry/itemMasonry";
import MessageNotif from "../components/messageNotif";
import ModalMessage from "../components/modalMessage";
import ProfileMenu from "../components/profileMenu";
import { socket } from "../components/socket";
import SeeCounter from "../components/ui-elements/seeCounter";
import endPoints from "../config/endPoints";
import connector from "../connector";
import {
  decrementDuration,
  getMsgError,
  getTime,
  getUniqueListNotifications,
  sortObjects,
  uniqid,
} from "../helper/fonctions";

export default function Home() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1199px)" });

  const auth = useSelector((store) => store.auth);

  const [plis, setPlis] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const [activeItem, setActiveItem] = useState(null);
  const [activeItemPlayer, setActiveItemPlayer] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showBlocModalMessage, setShowBlocModalMessage] = useState(null);
  const [openModalMessage, setOpenModalMessage] = useState(false);
  const [publishPli, setPublishPli] = useState(null);
  const [channel] = useState(uniqid());
  const [countConnection, setCountConnection] = useState(0);
  const [initOpenedPlis, setInitOpenedPlis] = useState(0);
  const [subscribers, setSubscribers] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoadedSubscribers, setIsLoadedSubscribers] = useState(false);
  const [isLoadedSubscriptions, setIsLoadedSubscriptions] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [countNewNotifications, setCountNewNotifications] = useState(0);
  const [countNewSubscriptions, setCountNewSubscriptions] = useState(0);
  const [totalNotifications, setTotalNotifications] = useState(0);
  const [msgNotifTop, setMsgNotifTop] = useState(null);

  const query = new URLSearchParams(useLocation().search);
  const tokenRestPassword = query.get("tokenRestPassword") || null;
  const tokenConfirmEmail = query.get("tokenConfirmEmail") || null;
  const [pageNotifications, setPageNotifications] = useState(1);
  const [loadingMore, setLoadingMore] = useState({ notifications: false });

  const breakpointColumnsObj = {
    default: 3,
    1200: 2,
    993: 1,
  };

  const [stateFolowersMessage, setFolowersMessage] = useState({
    showSearchFolower: false,
    activeItem: false,
    resultSearch: false,
    search: {
      type: "text",
      id: "search-folowers",
      value: "",
      placeholder: "Qui recherchez-vous ?",
      className: "search-input",
    },
  });

  useEffect(() => {
    if (tokenRestPassword) {
      checkIsConnected();
    }
  }, [tokenRestPassword]);

  useEffect(() => {
    if (tokenConfirmEmail) {
      checkTokenConfirmEmail();
    }
  }, [tokenConfirmEmail]);

  const [action, setAction] = useState({
    notification: {
      icon: <NotificationsNoneOutlinedIcon />,
      isOpen: false,
    },
    folower: {
      icon: <PeopleOutlineRoundedIcon />,
      isOpen: false,
    },
    search: {
      icon: <SearchRoundedIcon />,
      isOpen: false,
    },
    messagerie: {
      icon: <MailOutlineRoundedIcon />,
      isOpen: false,
    },
  });

  useEffect(() => {
    if (auth.isConnected) {
      getNotifications();
    } else {
      setNotifications([]);
      setCountNewNotifications(0);
      setTotalNotifications(0);
      setPageNotifications(1);
    }
  }, [pageNotifications, auth.isConnected]);

  useEffect(() => {
    getPlis(true);

    if (auth.isConnected) {
      getSubscribers();
      getSubscriptions();
    } else {
      setSubscribers([]);
      setSubscriptions([]);
    }
  }, [auth.isConnected]);

  useEffect(() => {
    if (initOpenedPlis && socket) {
      socket.emit("CLIENT_OPEN_PLI", { id: 0, opened: false });
    }
  }, [initOpenedPlis]);

  useEffect(() => {
    const updatePli = (item) => {
      if (channel != item.channel) {
        getPli(item.id, item.action);
        if (
          item.subscribers != undefined &&
          item.subscribers.length > 0 &&
          auth?.user?.id &&
          item.subscribers.includes(auth.user.id)
        ) {
          if (item.action == "create") {
            getNotificationNewPli(item.id);
          }
        }
      }
    };
    socket.on("SERVER_PLI", updatePli);

    const updateCountConnection = (data) => {
      if (data.countConnection != undefined) {
        setCountConnection(data.countConnection);
      }
    };
    socket.on("SERVER_COUNT_CONNECTION", updateCountConnection);

    const updateOpenPlis = (data) => {
      if (data) {
        const cpPlis = [...plis];
        for (var i = 0; i < cpPlis.length; i++) {
          let countOpened = 0;
          for (var j = 0; j < data.length; j++) {
            if (data[j].id == cpPlis[i].id && data[j].count != undefined) {
              countOpened = data[j].count;
              break;
            }
          }
          cpPlis[i] = { ...cpPlis[i], countOpened };
        }
        setPlis(cpPlis);
      }
    };
    socket.on("SERVER_OPEN_PLI", updateOpenPlis);

    const subscriberUpdated = (data) => {
      if (data?.notification?.id) {
        if (
          auth.user &&
          auth.user.id == data.notification.subscriberId &&
          data.notification.type == "newSubscriber"
        ) {
          setNotifications([data.notification, ...notifications]);
          setCountNewNotifications(countNewNotifications + 1);
          setTotalNotifications(totalNotifications + 1);
        }
      }
    };
    socket.on("SERVER_SUBSCRIBER_UPDATED", subscriberUpdated);

    const newComment = (item) => {
      if (
        item.id != undefined &&
        item.message != undefined &&
        item.pliId != undefined
      ) {
        const cpPlis = [...plis];
        for (let i = 0; i < cpPlis.length; i++) {
          const pli = cpPlis[i];
          if (pli.id == item.pliId) {
            if (item.parentId) {
              for (let j = 0; j < pli.comments.length; j++) {
                const comment = pli.comments[j];
                if (comment.id == item.parentId) {
                  if (item.ancestryId) {
                    for (let k = 0; k < comment.childs.length; k++) {
                      const child = comment.childs[k];
                      if (child.id == item.ancestryId) {
                        item.ancestry = {id:child.id, message: child.message, user: child.user};
                        break;
                      }
                    }
                  }
                  if (Array.isArray(cpPlis[i].comments[j].childs)) {
                    cpPlis[i].comments[j].childs.push(item);
                  } else {
                    cpPlis[i].comments[j].childs = [item];
                  }
                  break;
                }
              }
            } else {
              cpPlis[i].comments.push(item);
            }
            break;
          }
        }
        setPlis(cpPlis);
      }
    };
    socket.on("SERVER_COMMENT", newComment);

    return () => {
      socket.off("SERVER_PLI", updatePli);
      socket.off("SERVER_COUNT_CONNECTION", updateCountConnection);
      socket.off("SERVER_OPEN_PLI", updateOpenPlis);
      socket.off("SERVER_SUBSCRIBER_UPDATED", subscriberUpdated);
      socket.off("SERVER_COMMENT", newComment);
      //socket.disconnect();
    };
  }, [plis]);

  const [stateModal, setStateModal] = useState({
    showModal: false,
    item: {},
  });

  useEffect(() => {
    if (socket && plis.length > 0) {
      socket.emit("CLIENT_OPEN_PLI", {
        id: stateModal?.item?.id ? stateModal.item.id : null,
        opened: stateModal.showModal,
      });
    }
  }, [stateModal.showModal]);

  useEffect(() => {
    updateDurations();
  }, [seconds]);

  useEffect(() => {
    if (localStorage.getItem("publishPli")) {
      setPublishPli({
        id: Number(localStorage.getItem("publishPli")),
        duration: "00:00:00",
        appearances: {
          countDown: 0,
          countUp: 0,
        },
      });
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
              seen: false,
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
  }, [subscribers, subscriptions, countNewSubscriptions]);

  useEffect(() => {
    let cmp = 0;
    for (let i = 0; i < subscriptions.length; i++) {
      const subscription = subscriptions[i];
      if (subscription.seen == false) {
        cmp++;
      }
    }
    setCountNewSubscriptions(cmp);
  }, [subscriptions]);

  useEffect(() => {
    if (isLoadedSubscribers && isLoadedSubscriptions) {
      let cpSubscriptions = [];
      for (let i = 0; i < subscriptions.length; i++) {
        const subscription = subscriptions[i];
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
    }
  }, [isLoadedSubscribers, isLoadedSubscriptions]);

  const getPlis = (refresh = false) => {
    connector({
      method: "get",
      url: `${endPoints.PLIS}`,
      success: (response) => {
        setPlis(response.data.plis || []);
        if (response.data.plis.length == 0) {
          setPublishPli(null);
          localStorage.removeItem("publishPli");
        }
        if (refresh) {
          setInitOpenedPlis(initOpenedPlis + 1);
        }
      },
      catch: (error) => {
        console.log(error);
      },
    });
  };

  const getPli = (id, action) => {
    connector({
      method: "get",
      url: `${endPoints.PLIS}?id=${id}`,
      success: (response) => {
        if (response.data.plis.length == 1) {
          refreshItem({ ...response.data.plis[0], action });
        }
      },
      catch: (error) => {
        console.log(error);
      },
    });
  };

  const getNotificationNewPli = (pliId) => {
    connector({
      method: "get",
      url: `${endPoints.NOTIFICATION_NEW}?pliId=${pliId}`,
      success: (response) => {
        if (response.data.notification) {
          const cpNotifications = getUniqueListNotifications([
            response.data.notification,
            ...notifications,
          ]);
          if (cpNotifications.length > notifications.length) {
            setNotifications([response.data.notification, ...notifications]);
            setCountNewNotifications(countNewNotifications + 1);
            setTotalNotifications(totalNotifications + 1);
          }
        }
      },
      catch: (error) => {
        console.log(error);
      },
    });
  };

  const setItem = (item) => {
    if (socket) {
      socket.emit("CLIENT_PLI", { ...item, channel });
    }
    refreshItem(item);
  };

  const refreshItem = (item) => {
    let cpPlis = [...plis];
    if (item.action == "create") {
      cpPlis.push(item);
    } else if (item.action == "update") {
      for (var i = 0; i < cpPlis.length; i++) {
        if (cpPlis[i].id == item.id) {
          cpPlis[i] = item;
          break;
        }
      }
    }
    cpPlis = sortObjects(cpPlis, "duration", "desc");
    setPlis(cpPlis);
  };

  const updateDurations = () => {
    if (plis.length) {
      let existed = false;
      let hour, minute, second;
      const cpPlis = [];
      for (let i = 0; i < plis.length; i++) {
        const cpPli = { ...plis[i] };
        [hour, minute, second] = decrementDuration(cpPli.duration);
        cpPli.duration = getTime(hour, minute, second);
        if (hour > 0 || minute > 0 || second > 0) {
          cpPlis.push(cpPli);
        }
        if (publishPli && publishPli.id === cpPli.id) {
          if (hour > 0 || minute > 0 || second > 0) {
            setPublishPli(cpPli);
            localStorage.setItem("publishPli", cpPli.id);
            existed = true;
          }
        }
      }
      setPlis(cpPlis);
      if (!existed) {
        setPublishPli(null);
        localStorage.removeItem("publishPli");
      }
    }
  };

  const setMsgNotifTopTime = (msg, time) => {
    setMsgNotifTop(msg);
    setTimeout(() => {
      setMsgNotifTop(false);
    }, time);
  };

  const checkIsConnected = () => {
    if (auth.isConnected) {
      return true;
    } else {
      setMsgNotifTopTime(
        "Vous devez être connecté pour pouvoir ajouter ou enlever du temps, publier, commenter, partager ou envoyer des messages",
        5000
      );
      return false;
    }
  };

  const checkTokenConfirmEmail = () => {
    if (!submitting) {
      msgErrors({ submit: true });
      connector({
        method: "post",
        url: endPoints.CONFIRM_EMAIL,
        data: { tokenConfirmEmail },
        success: () => {
          msgErrors({ submit: false });
          setOpenModalMessage(true);
          setShowBlocModalMessage("confirmEmail");
        },
        catch: (error) => {
          msgErrors({ msg: getMsgError(error), submit: false });
        },
      });
    }
  };

  const updateSubscriberStatus = (item) => {
    for (let i = 0; i < plis.length; i++) {
      const pli = plis[i];
      if (pli.user.id === item.id) {
        refreshItem({
          ...pli,
          user: { ...pli.user, isSubscribed: item.isSubscribed },
          action: "update",
        });
        break;
      }
    }
    socket.emit("CLIENT_SUBSCRIBER_UPDATED", {
      user: { id: auth.user.id, username: auth.user.username },
      subscriber: { id: item.id, username: item.username },
      isSubscribed: item.isSubscribed,
      notification: item.notification,
    });
  };

  const getNotifications = (refresh = false) => {
    const cpPageNotifications = refresh ? 1 : pageNotifications;
    if (pageNotifications != cpPageNotifications) {
      setPageNotifications(cpPageNotifications);
    }

    connector({
      method: "get",
      url: `${endPoints.NOTIFICATION_LIST}?page=${cpPageNotifications}`,
      success: (response) => {
        //todo check double
        setNotifications(
          getUniqueListNotifications(
            [...notifications, ...response.data.notifications],
            "id"
          )
        );
        setCountNewNotifications(parseInt(response.data.totalNew));
        setTotalNotifications(parseInt(response.data.total));
        setLoadingMore({ ...loadingMore, notifications: false });
      },
      catch: (error) => {
        console.log(error);
      },
    });
  };

  const setLoadingMoreCheck = (e) => {
    if (e.notifications && notifications.length < totalNotifications) {
      setLoadingMore({ ...loadingMore, notifications: e });
      setPageNotifications(pageNotifications + 1);
    }
  };

  const isSeenNotification = (index) => {
    let cpNotifications = [...notifications];
    if (cpNotifications[index]) {
      const notification = cpNotifications[index];
      connector({
        method: "post",
        url: `${endPoints.NOTIFICATION_SEEN}`,
        data: { ...notification },
        success: (response) => {
          cpNotifications[index].seen = true;
          setCountNewNotifications(countNewNotifications - 1);
          setNotifications(cpNotifications);
        },
        catch: (error) => {
          console.log(error);
        },
      });
    }
  };

  const getSubscribers = () => {
    connector({
      method: "get",
      url: `${endPoints.USER_SUBSCRICERS}`,
      success: (response) => {
        setSubscribers(response.data.subscribers);
        setIsLoadedSubscribers(true);
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
        setSubscriptions(response.data.subscriptions);
        setIsLoadedSubscriptions(true);
      },
      catch: (error) => {
        console.log(error);
      },
    });
  };

  const msgErrors = (e) => {
    if (e.submit !== undefined) setSubmitting(e.submit);
    if (e.msg !== undefined) setMsgNotifTopTime(e.msg, 5000);
  };

  return (
    <DefaultMain>
      <StyledEngineProvider injectFirst>
        {isTabletOrMobile && (
          <HeaderMobile>
            <div className="logo">
              <img src={logoType} alt="Royalis" />
            </div>
            <div className="d-flex">
              <SeeCounter countSee={countConnection} />
              {auth.isConnected && (
                <ProfileMenu setMsgNotifTop={setMsgNotifTop} />
              )}
            </div>
          </HeaderMobile>
        )}
        <ContainerDef>
          {msgNotifTop && (
            <MessageNotif
              setMessage={() => {
                setMsgNotifTop(null);
              }}
              message={msgNotifTop}
            />
          )}
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="pli-masonry-grid"
            columnClassName="pli-masonry-grid_column"
          >
            {plis &&
              plis.map((item, index) => (
                <ItemMasonry
                  key={index}
                  item={item}
                  setItem={setItem}
                  action={action}
                  setAction={setAction}
                  activeItem={activeItem}
                  setActiveItem={setActiveItem}
                  activeItemPlayer={activeItemPlayer}
                  setActiveItemPlayer={setActiveItemPlayer}
                  setMsgNotifTopTime={setMsgNotifTopTime}
                  setStateModal={setStateModal}
                  stateFolowersMessage={stateFolowersMessage}
                  setFolowersMessage={setFolowersMessage}
                  updateSubscriberStatus={updateSubscriberStatus}
                />
              ))}
          </Masonry>
        </ContainerDef>

        {!auth.isConnected ? (
          <FooterAuthHome
            setMsgNotifTopTime={setMsgNotifTopTime}
            countConnection={countConnection}
          />
        ) : (
          <FooterHome
            action={action}
            setAction={setAction}
            setMsgNotifTop={setMsgNotifTop}
            setMsgNotifTopTime={setMsgNotifTopTime}
            getPlis={getPlis}
            setItem={setItem}
            publishPli={publishPli}
            setPublishPli={setPublishPli}
            countConnection={countConnection}
            stateFolowersMessage={stateFolowersMessage}
            setFolowersMessage={setFolowersMessage}
            updateSubscriberStatus={updateSubscriberStatus}
            notifications={notifications}
            isSeenNotification={isSeenNotification}
            countNewNotifications={countNewNotifications}
            setCountNewNotifications={setCountNewNotifications}
            countNewSubscriptions={countNewSubscriptions}
            subscribers={subscribers}
            setSubscribers={setSubscribers}
            subscriptions={subscriptions}
            setSubscriptions={setSubscriptions}
            loadingMore={loadingMore}
            setLoadingMore={setLoadingMoreCheck}
          />
        )}
        <ModalMessage
          showBloc={showBlocModalMessage}
          setShowBloc={setShowBlocModalMessage}
          checkIsConnected={checkIsConnected}
          open={openModalMessage}
          setOpen={setOpenModalMessage}
        />
      </StyledEngineProvider>
    </DefaultMain>
  );
}
