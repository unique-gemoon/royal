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
  getMsgError,
  getUniqueList,
  scrollBottomById,
  sortObjects,
  uniqid,
} from "../helper/fonctions";

export default function Home() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1199px)" });

  const auth = useSelector((store) => store.auth);

  const [plis, setPlis] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [activeItemNV2, setActiveItemNV2] = useState(null);
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
  const [pageThreads, setPageThreads] = useState(1);
  const [loadingMore, setLoadingMore] = useState({
    notifications: false,
    threads: false,
  });
  const [typingCitation, setTypingCitation] = useState({});
  const [totalThreads, setTotalThreads] = useState(0);
  const [countNewMessages, setCountNewMessages] = useState(0);
  const [threads, setThreads] = useState([]);

  const breakpointColumnsObj = {
    default: 3,
    1200: 2,
    993: 1,
  };

  const [folowersMessage, setFolowersMessage] = useState({
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

  useEffect(() => {
    if (activeItem?.id) {
      setActiveItemNV2({ ...activeItem });
    }
  }, [activeItem]);

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
    if (auth.isConnected) {
      getThreads();
    } else {
      setThreads([]);
      setTotalThreads(0);
      setPageThreads(1);
      setCountNewMessages(0);
    }
  }, [pageThreads, auth.isConnected]);

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

    const newComment = (data) => {
      if (
        data.comment.id != undefined &&
        data.comment.message != undefined &&
        data.comment.pliId != undefined
      ) {
        const cpPlis = [...plis];
        for (let i = 0; i < cpPlis.length; i++) {
          const pli = cpPlis[i];
          if (pli.id == data.comment.pliId) {
            if (data.comment.parentId) {
              for (let j = 0; j < pli.comments.length; j++) {
                const comment = pli.comments[j];
                if (comment.id == data.comment.parentId) {
                  if (Array.isArray(cpPlis[i].comments[j].childs)) {
                    cpPlis[i].comments[j].childs.unshift(data.comment);
                  } else {
                    cpPlis[i].comments[j].childs = [data.comment];
                  }
                  break;
                }
              }
            } else {
              cpPlis[i].comments.unshift(data.comment);
            }
            cpPlis[i].totalComments++;
            break;
          }
        }
        setPlis(cpPlis);

        if (
          data.users != undefined &&
          data.users.length > 0 &&
          auth?.user?.id &&
          data.users.includes(auth.user.id)
        ) {
          getNotificationNewComment(data.comment.id);
        }
      }
    };
    socket.on("SERVER_COMMENT", newComment);

    const newCitation = (data) => {
      if (
        data.citation.id != undefined &&
        data.citation.message != undefined &&
        data.citation.pliId != undefined
      ) {
        const cpPlis = [...plis];
        for (let i = 0; i < cpPlis.length; i++) {
          const pli = cpPlis[i];
          if (pli.id == data.citation.pliId) {
            if (Array.isArray(cpPlis[i].citations)) {
              cpPlis[i].citations.push(data.citation);
            } else {
              cpPlis[i].citations = [data.citation];
            }
            cpPlis[i].totalCitations++;
            break;
          }
        }
        setPlis(cpPlis);
        if (
          data.citation.userId != undefined &&
          auth.user &&
          data.citation.userId == auth.user.id
        ) {
          scrollBottomById("citations-container");
        }
      }
    };
    socket.on("SERVER_CITATION", newCitation);

    const updateTypingCitation = (item) => {
      if (auth.isConnected && auth.user.id != item.userId) {
        setTypingCitation(item);
      }
    };
    socket.on("SERVER_TYPING_CITATION", updateTypingCitation);

    const updateMessage = (item) => {
      if (auth.isConnected) {
        if (auth.user.id == item.otherUser.id) {
          if (
            item.threadId &&
            (!folowersMessage?.activeItem?.thread ||
              folowersMessage.activeItem.thread.id != item.threadId)
          ) {
            setCountNewMessages(countNewMessages + 1);
          }
        }
      }
    };
    socket.on("SERVER_MESSAGE", updateMessage);

    return () => {
      socket.off("SERVER_PLI", updatePli);
      socket.off("SERVER_COUNT_CONNECTION", updateCountConnection);
      socket.off("SERVER_OPEN_PLI", updateOpenPlis);
      socket.off("SERVER_SUBSCRIBER_UPDATED", subscriberUpdated);
      socket.off("SERVER_COMMENT", newComment);
      socket.off("SERVER_CITATION", newCitation);
      socket.off("SERVER_TYPING_CITATION", updateTypingCitation);
      socket.off("SERVER_MESSAGE", updateMessage);
      //socket.disconnect();
    };
  }, [plis, auth, folowersMessage, countNewMessages]);

  useEffect(() => {
    const updateThread = (item) => {
      if (auth.isConnected) {
        if (item?.otherUser?.id && auth.user.id == item.otherUser.id) {
          let existe = false;
          const cpThreads = [...threads];
          for (let i = 0; i < cpThreads.length; i++) {
            if (cpThreads[i].thread.id === item.thread.id) {
              cpThreads[i].thread = {
                ...cpThreads[i].thread,
                blocked: item.thread.blocked,
                blockedBy: item.thread.blockedBy,
              };

              if (folowersMessage?.activeItem?.thread?.id == item.thread.id) {
                const cpFolowersMessage = { ...folowersMessage };
                cpFolowersMessage.activeItem.thread = {
                  ...cpFolowersMessage.activeItem.thread,
                  blocked: item.thread.blocked,
                  blockedBy: item.thread.blockedBy,
                };
                setFolowersMessage(cpFolowersMessage);
              }

              existe = true;
              break;
            }
          }
          if (!existe) {
            setThreads([item, ...threads]);
          } else {
            setThreads(cpThreads);
          }
        }
      }
    };
    socket.on("SERVER_THREAD", updateThread);

    const updateMessage = (item) => {
      if (auth.isConnected) {
        if (auth.user.id == item.otherUser.id || auth.user.id == item.userId) {
          const cpThreads = [...threads];
          for (let i = 0; i < cpThreads.length; i++) {
            if (cpThreads[i].thread.id == item.threadId) {
              cpThreads[i].thread.messages = [item];
              setThreads(cpThreads);
              break;
            }
          }
        }
      }
    };
    socket.on("SERVER_MESSAGE", updateMessage);

    return () => {
      socket.off("SERVER_THREAD", updateThread);
      socket.off("SERVER_MESSAGE", updateMessage);
    };
  }, [threads, folowersMessage, auth]);

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

      if (auth.isConnected) {
        const data = {
          pliId: null,
          username: auth.user.username,
          userId: auth.user.id,
        };
        socket.emit("CLIENT_TYPING_CITATION", data);
      }
    }
  }, [stateModal.showModal]);

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
        } else {
          refreshpPublishPli(response.data.plis);
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

  const refreshpPublishPli = (data) => {
    if (localStorage.getItem("publishPli")) {
      const id = Number(localStorage.getItem("publishPli"));
      for (let i = 0; i < data.length; i++) {
        const cpPli = { ...data[i] };
        if (id === cpPli.id) {
          setPublishPli(cpPli);
          break;
        }
      }
    }
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
          const cpNotifications = getUniqueList([
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

  const getNotificationNewComment = (commentId) => {
    connector({
      method: "get",
      url: `${endPoints.NOTIFICATION_NEW}?commentId=${commentId}`,
      success: (response) => {
        if (response.data.notification) {
          const cpNotifications = getUniqueList([
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
          if (publishPli && publishPli.id === item.id) {
            setPublishPli(item);
          }
          break;
        }
      }
    }
    cpPlis = sortObjects(cpPlis, "duration", "desc");
    setPlis(cpPlis);
  };

  const clearPliElapsed = (index) => {
    if (plis[index]) {
      const pli = { ...plis[index] };
      if (publishPli && publishPli.id === pli.id) {
        setPublishPli(null);
        localStorage.removeItem("publishPli");
      }
      let cpPlis = [...plis];
      cpPlis.splice(index, 1);
      setPlis(cpPlis);
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
        setNotifications(
          getUniqueList(
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
    if (e.notifications) {
      if (notifications.length < totalNotifications) {
        setLoadingMore({ ...loadingMore, notifications: true });
        setPageNotifications(pageNotifications + 1);
      }
    } else if (e.threads) {
      if (threads.length < totalThreads) {
        setLoadingMore({ ...loadingMore, threads: true });
        setPageThreads(pageThreads + 1);
      }
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

  const getThreads = (refresh = false) => {
    const cpPageThreads = refresh ? 1 : pageThreads;
    if (pageThreads != cpPageThreads) {
      setPageThreads(cpPageThreads);
    }
    connector({
      method: "get",
      url: `${endPoints.THREAD_LIST}?page=${cpPageThreads}`,
      success: (response) => {
        setThreads(getUniqueList([...threads, ...response.data.threads], "id"));
        setTotalThreads(parseInt(response.data.total));
        setLoadingMore({ ...loadingMore, threads: false });
        setCountNewMessages(response.data.totalNewMessages || 0);
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
                  indexItem={index}
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
                  folowersMessage={folowersMessage}
                  setFolowersMessage={setFolowersMessage}
                  updateSubscriberStatus={updateSubscriberStatus}
                  activeItemNV2={activeItemNV2}
                  clearPliElapsed={clearPliElapsed}
                  typingCitation={typingCitation}
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
            folowersMessage={folowersMessage}
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
            setActiveItemNV2={setActiveItemNV2}
            plis={plis}
            threads={threads}
            setThreads={setThreads}
            countNewMessages={countNewMessages}
            setCountNewMessages={setCountNewMessages}
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
