import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  BlocMessagerie,
  ChatSpace,
  LoadingMessage,
  MessageFindFolower,
} from "../assets/styles/componentStyle";
import endPoints from "../config/endPoints";
import connector from "../connector";
import {
  getDurationHM,
  getMsgError,
  getUniqueList,
  scrollToElement,
} from "../helper/fonctions";
import ItemListFolower from "./itemListFolower";
import ItemSingleMessage from "./itemSingleMessage";
import ListMessagerie from "./listMessagerie";
import { socket } from "./socket";
import SpinnerLoading from "./spinnerLoading";
import Input from "./ui-elements/input";
import InputEmoji from "./ui-elements/inputEmoji";

export default function Messagerie({
  setMsgNotifTopTime = () => {},
  folowersMessage,
  action = {},
  setAction = () => {},
  setFolowersMessage = () => {},
  loadingMore = {},
  setLoadingMore = () => {},
  threads = [],
  setThreads = () => {},
  subscribers = [],
  setSubscribers = () => {},
  subscriptions = [],
  setSubscriptions = () => {},
  updateSubscriberStatus = () => {},
  countNewMessages = 0,
  setCountNewMessages = () => {},
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const auth = useSelector((store) => store.auth);
  const ref = useRef(null);
  const [messages, setMessages] = useState([]);
  const [totalMessages, setTotalMessages] = useState(0);
  const [pageMessages, setPageMessages] = useState(1);
  const [loadingMoreMessages, setLoadingMoreMessages] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const cpSubscriptions = [];
    for (let i = 0; i < subscriptions.length; i++) {
      const user = subscriptions[i];
      let show = false;
      if (
        String(user.username).indexOf(String(folowersMessage.search.value)) == 0
      ) {
        show = true;
      }
      cpSubscriptions.push({ ...user, show });
    }
    setUsers(cpSubscriptions);
  }, [subscriptions, folowersMessage.search.value]);

  const onScrollThreads = () => {
    const { scrollTop, scrollHeight, clientHeight } = ref.current;
    if (parseInt(scrollTop + clientHeight) === parseInt(scrollHeight)) {
      setLoadingMore({ ...loadingMore, threads: true });
    }
  };

  const onScrollMessages = () => {
    const { scrollTop } = ref.current;
    if (parseInt(scrollTop) == 0) {
      if (messages.length < totalMessages) {
        setLoadingMoreMessages(true);
        setPageMessages(pageMessages + 1);
      }
    }
  };

  const scrollChat = () => {
    const container = document.getElementById("messages-container");
    if (container) container.scrollTop = container.scrollHeight;
  };

  useEffect(() => {
    if (folowersMessage.activeItem) {
      getMessages(true);
      setTimeout(() => scrollChat(), 100);
      socket.emit("CLIENT_MESSAGE_SEEN", {
        threadId : folowersMessage.activeItem.thread.id,
        otherUser: { id: folowersMessage.activeItem.userId },
      });
    }
  }, [folowersMessage.activeItem]);

  useEffect(() => {
    if (auth.isConnected) {
      getMessages();
    } else {
      setMessages([]);
      setTotalMessages(0);
      setPageMessages(1);
    }
  }, [pageMessages, auth.isConnected]);

  const getMessages = (refresh = false) => {
    if (
      folowersMessage?.activeItem?.thread?.id &&
      folowersMessage.activeItem.thread.id != -1
    ) {
      const cpPageMessages = refresh ? 1 : pageMessages;
      if (pageMessages != cpPageMessages) {
        setPageMessages(cpPageMessages);
      }
      connector({
        method: "get",
        url: `${endPoints.MESSAGE_LIST}?page=${cpPageMessages}&threadId=${folowersMessage.activeItem.thread.id}`,
        success: (response) => {
          const data = [...response.data.messages].reverse();
          if (refresh) {
            setMessages(data);
          } else {
            setMessages(getUniqueList([...data, ...messages], "id"));
          }
          setCountNewMessages(response.data.totalNewMessages);
          setTotalMessages(parseInt(response.data.total));
          setLoadingMoreMessages(false);
          scrollToElement("message_9");
        },
        catch: (error) => {
          console.log(error);
        },
      });
    } else {
      setMessages([]);
      setTotalMessages(0);
      setLoadingMoreMessages(false);
    }
  };

  const saveMessage = async (data) => {
    if (folowersMessage.activeItem?.userId) {
      let cpActiveItem =
        folowersMessage.activeItem?.thread?.id &&
        folowersMessage.activeItem.thread.id != -1
          ? folowersMessage.activeItem
          : null;

      if (!cpActiveItem) {
        cpActiveItem = await getThread({
          id: folowersMessage.activeItem.userId,
          username: folowersMessage.activeItem.user.username,
        });
      }

      if (cpActiveItem && cpActiveItem?.thread?.id) {
        if (cpActiveItem.thread.blocked) {
          setMsgNotifTopTime(
            "Vous ne pouvez pas envoyer des messages cette discussion est bloquée.",
            5000
          );
          return;
        }

        data = { ...data, threadId: cpActiveItem.thread.id };
        return await connector({
          method: "post",
          url: endPoints.MESSAGE_NEW,
          data,
          success: (response) => {
            if (response.data?.msg) {
              socket.emit("CLIENT_MESSAGE", {
                ...response.data.msg,
                otherUser: { id: folowersMessage.activeItem.userId },
              });
              setMessages([...messages, response.data.msg]);
              scrollChat();
            }
            return true;
          },
          catch: (error) => {
            msgErrors({ msg: getMsgError(error) });
            return false;
          },
        });
      } else {
        return false;
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    const updateMessage = (item) => {
      if (auth.isConnected) {
        if (auth.user.id == item.otherUser.id) {
          setMessages([...messages, item]);
          if (
            item.threadId &&
            folowersMessage?.activeItem?.thread?.id &&
            folowersMessage.activeItem.thread.id == item.threadId
          ) {
            seenMessages(item.threadId);
          }
        }
      }
    };
    socket.on("SERVER_MESSAGE", updateMessage);

    const updateMessageSeen = (item) => {
      if (auth.isConnected) {
        if (auth.user.id == item.otherUser.id) {
          if (
            item.threadId &&
            folowersMessage?.activeItem?.thread &&
            folowersMessage.activeItem.thread.id == item.threadId
          ) {
            const cpMessages = [...messages];
            for (let i = 0; i < cpMessages.length; i++) {
              cpMessages[i].seen = true;
            }
            setMessages(cpMessages);
          }
        }
      }
    };
    socket.on("SERVER_MESSAGE_SEEN", updateMessageSeen);

    return () => {
      socket.off("SERVER_MESSAGE", updateMessage);
      socket.off("SERVER_MESSAGE_SEEN", updateMessageSeen);
    };
  }, [threads, messages, folowersMessage, auth]);

  const setItem = (item) => {
    if (item.index !== undefined) {
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
      updateSubscriberStatus(item);
    }
  };

  const blockThread = (blocked) => {
    if (folowersMessage?.activeItem?.thread?.id) {
      connector({
        method: "post",
        url: endPoints.THREAD_BLOCK,
        data: { threadId: folowersMessage.activeItem.thread.id, blocked },
        success: (response) => {
          const cpThreads = [...threads];
          for (let i = 0; i < cpThreads.length; i++) {
            if (
              cpThreads[i].thread.id == folowersMessage.activeItem.thread.id
            ) {
              cpThreads[i] = {
                ...cpThreads[i],
                thread: {
                  ...cpThreads[i].thread,
                  blocked,
                  blockedBy: auth.user.id,
                },
                otherUser: { id: folowersMessage.activeItem.userId },
              };

              const cpFolowersMessage = { ...folowersMessage };
              cpFolowersMessage.activeItem.thread = {
                ...cpFolowersMessage.activeItem.thread,
                blocked,
                blockedBy: auth.user.id,
              };
              setFolowersMessage(cpFolowersMessage);

              socket.emit("CLIENT_THREAD", cpThreads[i]);
              break;
            }
          }
          setThreads(cpThreads);
          handleClose();

          if (blocked) {
            setMsgNotifTopTime(
              "L'utilisateur a bien été bloqué. Vous ne recevrez plus de message de sa part",
              5000
            );
          } else {
            setMsgNotifTopTime(
              "L'utilisateur a bien été débloqué. Vous pouvez à nouveau recevoir des messages de sa part",
              5000
            );
          }
        },
        catch: (error) => {
          handleClose();
          msgErrors({ msg: getMsgError(error) });
        },
      });
    }
  };

  const seenMessages = (threadId) => {
    connector({
      method: "post",
      url: endPoints.MESSAGE_SEEN,
      data: { threadId },
      success: () => {
        socket.emit("CLIENT_MESSAGE_SEEN", {
          threadId,
          otherUser: { id: folowersMessage.activeItem.userId },
        });
      },
      catch: (error) => {
        console.log(error);
      },
    });
  };

  const msgErrors = (e) => {
    if (e.msg !== undefined) setMsgNotifTopTime(e.msg, 5000);
  };

  const getThread = async (item) => {
    return await connector({
      method: "post",
      url: endPoints.THREAD_NEW,
      data: { userId: item.id },
      success: (response) => {
        const thread = {
          id: -1,
          userId: item.id,
          thread: {
            id: response.data.thread.id,
            messages: [],
          },
          user: {
            username: item.username,
          },
        };
        setFolowersMessage({
          ...folowersMessage,
          activeItem: thread,
        });

        let existe = false;
        for (let i = 0; i < threads.length; i++) {
          if (threads[i].thread.id == thread.thread.id) {
            existe = true;
            break;
          }
        }
        if (!existe) {
          setThreads([thread, ...threads]);
          const otherThread = {
            id: -1,
            userId: auth.user.id,
            thread: {
              id: response.data.thread.id,
              messages: [],
            },
            user: {
              username: auth.user.username,
            },
            otherUser: {
              id: item.id,
              username: item.username,
            },
          };
          socket.emit("CLIENT_THREAD", otherThread);
        }
        return thread;
      },
      catch: (error) => {
        console.log(error);
        return false;
      },
    });
  };

  return (
    <BlocMessagerie>
      {!folowersMessage.activeItem && !folowersMessage.showSearchFolower ? (
        <div className="bloc-lists-messagerie">
          <div className="header-messagerie">
            <MailOutlineRoundedIcon /> Messages{" "}
            {countNewMessages > 0 ? (
              <span className="count-notif">{countNewMessages}</span>
            ) : null}
          </div>
          <div className="content-messagerie">
            <div
              className="list-messagerie"
              onScroll={onScrollThreads}
              ref={ref}
            >
              <ListMessagerie
                threads={threads}
                setThreads={setThreads}
                folowersMessage={folowersMessage}
                setFolowersMessage={setFolowersMessage}
              />
              {loadingMore.threads && <SpinnerLoading />}
            </div>
          </div>

          <Button
            className="start-new-message"
            onClick={() => {
              setFolowersMessage({
                ...folowersMessage,
                activeItem: false,
                showSearchFolower: true,
              });
            }}
          >
            <ModeEditOutlineOutlinedIcon />
          </Button>
        </div>
      ) : null}
      {folowersMessage.activeItem ? (
        <div className="bloc-message-item">
          <div className="header-messagerie">
            <span
              className="back-to-list"
              onClick={(e) => {
                e.preventDefault();
                const cpState = { ...folowersMessage };
                cpState.activeItem = false;
                setFolowersMessage(cpState);
              }}
            >
              <KeyboardArrowLeftIcon />
            </span>
            <span className="name-messagerie">
              {folowersMessage.activeItem?.user?.username}
            </span>
            <div>
              <Button
                id="demo-positioned-button"
                aria-controls={open ? "menu-option-message" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                className="btn-option-message"
              >
                <MoreVertIcon />
              </Button>
              <Menu
                id="menu-option-message"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                anchorOrigin={{
                  vertical: -14,
                  horizontal: 33,
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                {" "}
                <span className="close-drop-menu" onClick={() => handleClose}>
                  <MoreVertIcon />
                </span>
                {folowersMessage?.activeItem?.thread?.blocked ? (
                  <MenuItem
                    onClick={() => {
                      blockThread(false);
                    }}
                  >
                    Débloquer
                  </MenuItem>
                ) : (
                  <MenuItem
                    onClick={() => {
                      blockThread(true);
                    }}
                  >
                    Bloquer
                  </MenuItem>
                )}
              </Menu>
            </div>
          </div>
          <div className="bloc-view-message">
            <ChatSpace>
              <div
                className="content-space-chat show-typing"
                id="messages-container"
                onScroll={onScrollMessages}
                ref={ref}
              >
                {loadingMoreMessages && (
                  <SpinnerLoading className="is-top-spinner" />
                )}

                {messages.length > 0 &&
                  messages.map((row, index) => (
                    <ItemSingleMessage
                      key={index}
                      typeSend={row.userId == auth.user.id ? "user-send" : ""}
                      message={row.message}
                      date={getDurationHM(moment(), row.message.createdAt)}
                      index={index}
                      stautVu={
                        row.userId == auth.user.id && row.seen
                          ? "vuReading"
                          : ""
                      }
                    />
                  ))}

                {/* TODO TYPING USER
                <div className="d-flex justify-content-start is-teyping">
                  <div className="msg_cotainer">
                    <div className="content-msg">
                      <LoadingMessage>
                        <li></li>
                        <li></li>
                        <li></li>
                      </LoadingMessage>
                    </div>
                  </div>
                </div> */}
              </div>
            </ChatSpace>
            <InputEmoji
              typeInput="textarea"
              setMsgNotifTopTime={setMsgNotifTopTime}
              setFolowersMessage={setFolowersMessage}
              saveMessage={saveMessage}
            />
          </div>
        </div>
      ) : null}
      {!folowersMessage.activeItem && folowersMessage.showSearchFolower && (
        <MessageFindFolower>
          <div className="header-messagerie">
            <span
              className="back-to-list"
              onClick={(e) => {
                e.preventDefault();
                const cpState = { ...folowersMessage };
                cpState.showSearchFolower = false;
                setFolowersMessage(cpState);
              }}
            >
              <KeyboardArrowLeftIcon />
            </span>
            <span className="title-find-distin">
              <ModeEditOutlineOutlinedIcon /> Trouver un destinataire
            </span>
          </div>
          <div className="bloc-search-folower">
            <SearchRoundedIcon />
            <Input
              {...folowersMessage.search}
              onChange={(e) => {
                const cpState = { ...folowersMessage };
                cpState.search.value = e.target.value;
                setFolowersMessage(cpState);
                if (cpState.search.value.length >= 3) {
                  setFolowersMessage({
                    ...folowersMessage,
                    resultSearch: true,
                  });
                } else {
                  setFolowersMessage({
                    ...folowersMessage,
                    resultSearch: false,
                  });
                }
              }}
            />
          </div>
          <div className="header-info-search">
            <PeopleOutlineRoundedIcon /> Abonnements
          </div>
          {folowersMessage.resultSearch ? (
            <div className="content-search-results">
              <div className="list-result-search">
                {users.length > 0 ? (
                  users.map(
                    (item, index) =>
                      item.show && (
                        <ItemListFolower
                          key={index}
                          item={{ ...item, index }}
                          setItem={setItem}
                          setMsgNotifTopTime={setMsgNotifTopTime}
                          threads={threads}
                          setThreads={setThreads}
                          action={action}
                          setAction={setAction}
                          folowersMessage={folowersMessage}
                          setFolowersMessage={setFolowersMessage}
                        />
                      )
                  )
                ) : (
                  <p className="message-not-result">Aucun resultat trouvé </p>
                )}
              </div>
            </div>
          ) : null}
          <span className="name-messagerie">
            {folowersMessage.activeItem.name}
          </span>
        </MessageFindFolower>
      )}
    </BlocMessagerie>
  );
}
