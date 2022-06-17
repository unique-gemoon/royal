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
import { useMediaQuery } from "react-responsive";
import { BlocMessagerie, ChatSpace, LoadingMessage, MessageFindFolower } from "../assets/styles/componentStyle";
import endPoints from "../config/endPoints";
import connector from "../connector";
import { getDurationHM, getMsgError, getUniqueList, scrollToElement, sortObjects } from "../helper/fonctions";
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
    typingMessage = {},
}) {
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 993px)" });
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const auth = useSelector((store) => store.auth);
    const [messages, setMessages] = useState([]);
    const [totalMessages, setTotalMessages] = useState(0);
    const [pageMessages, setPageMessages] = useState(1);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [imTyping, setImTyping] = useState(false);

    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [pageUsers, setPageUsers] = useState(1);
    const [loadingUsers, setLoadingUsers] = useState(false);

    useEffect(() => {
        if (!auth.isConnected) {
            setUsers([]);
            setTotalUsers(0);
        }
    }, [auth.isConnected]);

    useEffect(() => {
        getUsers();
    }, [pageUsers]);

    useEffect(() => {
        if (auth.isConnected && folowersMessage?.activeItem?.thread?.id) {
            const data = {
                threadId: folowersMessage.activeItem.thread.id,
                username: auth.user.username,
                userId: auth.user.id,
            };
            if (imTyping) {
                socket.emit("CLIENT_TYPING_MESSAGE", data);
            } else {
                socket.emit("CLIENT_TYPING_MESSAGE", { ...data, threadId: null });
            }
        }
    }, [imTyping, auth, folowersMessage.activeItem]);

    const refThreads = useRef(null);
    const onScrollThreads = () => {
        const { scrollTop, scrollHeight, clientHeight } = refThreads.current;
        if (Math.round(scrollTop + clientHeight) == parseInt(scrollHeight)) {
            setLoadingMore({ ...loadingMore, threads: true });
        }
    };

    const refMessages = useRef(null);
    const onScrollMessages = () => {
        const { scrollTop } = refMessages.current;
        if (parseInt(scrollTop) == 0) {
            if (messages.length < totalMessages) {
                setPageMessages(pageMessages + 1);
            }
        }
    };

    const scrollChat = () => {
        const container = document.getElementById("messages-container");
        if (container) container.scrollTop = container.scrollHeight;
    };

    const refContent = useRef(null);
    const onScrollContent = () => {
        const { scrollTop, scrollHeight, clientHeight } = refContent.current;
        if (parseInt(scrollTop + clientHeight) === parseInt(scrollHeight)) {
            if (users.length < totalUsers) {
                setPageUsers(pageUsers + 1);
            }
        }
    };

    const refList = useRef(null);
    const onScrollList = () => {
        const { scrollTop, scrollHeight, clientHeight } = refList.current;
        if (parseInt(scrollTop + clientHeight) === parseInt(scrollHeight)) {
            if (users.length < totalUsers) {
                setPageUsers(pageUsers + 1);
            }
        }
    };

    useEffect(() => {
        if (folowersMessage.activeItem) {
            getMessages(true);
            setTimeout(() => scrollChat(), 100);
            socket.emit("CLIENT_MESSAGE_SEEN", {
                threadId: folowersMessage.activeItem.thread.id,
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

    useEffect(() => {
        let cpUsers = [...users];
        for (let i = 0; i < cpUsers.length; i++) {
            let user = cpUsers[i];
            for (let j = 0; j < subscriptions.length; j++) {
                const subscription = subscriptions[j];
                if (user.id == subscription.id) {
                    cpUsers[i].isSubscribed = subscription.isSubscribed;
                    break;
                }
            }
        }
        setUsers(cpUsers);
    }, [subscriptions]);

    const getUsers = (refresh = false) => {
        if (!loadingUsers) {
            setLoadingUsers(true);
            const cpPageUsers = refresh ? 1 : pageUsers;
            if (pageUsers != cpPageUsers) {
                setPageUsers(cpPageUsers);
            }
            if (folowersMessage.search.value.length >= 3) {
                connector({
                    method: "get",
                    url: `${endPoints.USER_SUBSCRIPTIONS}?page=${pageUsers}&q=${folowersMessage.search.value}`,
                    success: (response) => {
                        if (pageUsers == 1) {
                            setUsers(response.data.subscriptions);
                        } else {
                            setUsers([...users, ...response.data.subscriptions]);
                        }
                        setTotalUsers(response.data.total);
                        setLoadingUsers(false);
                    },
                    catch: (error) => {
                        console.log(error);
                        setLoadingUsers(false);
                    },
                });
            } else {
                setLoadingUsers(false);
            }
        }
    };

    const getMessages = (refresh = false) => {
        if (!loadingMessages) {
            setLoadingMessages(true);
            if (folowersMessage?.activeItem?.thread?.id && folowersMessage.activeItem.thread.id != -1) {
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
                        setLoadingMessages(false);
                        scrollToElement("message_9");
                    },
                    catch: (error) => {
                        console.log(error);
                        setLoadingMessages(false);
                    },
                });
            } else {
                setMessages([]);
                setTotalMessages(0);
                setLoadingMessages(false);
            }
        }
    };

    const saveMessage = async (data) => {
        if (folowersMessage.activeItem?.userId) {
            let cpActiveItem =
                folowersMessage.activeItem?.thread?.id && folowersMessage.activeItem.thread.id != -1
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
                    setMsgNotifTopTime("Vous ne pouvez pas envoyer des messages cette discussion est bloquée.", 5000);
                    return;
                }

                data = { ...data, threadId: cpActiveItem.thread.id };
                return await connector({
                    method: "post",
                    url: endPoints.MESSAGE_NEW,
                    data,
                    success: (response) => {
                        if (response.data?.msg) {
                            const threadUser = {
                                id: -1,
                                userId: cpActiveItem.userId,
                                thread: {
                                    id: cpActiveItem.thread.id,
                                    messages: [
                                        {
                                            ...response.data.msg,
                                            otherUser: { id: cpActiveItem.userId },
                                        },
                                    ],
                                },
                                user: {
                                    username: cpActiveItem.user.username,
                                },
                                updatedAt: response.data.msg.updatedAt,
                            };
                            let cpThreads = [...threads];
                            for (let i = 0; i < cpThreads.length; i++) {
                                if (cpThreads[i].thread.id == threadUser.thread.id) {
                                    cpThreads.splice(i, 1);
                                    break;
                                }
                            }
                            setThreads([threadUser, ...cpThreads]);

                            const otherThread = {
                                ...threadUser,
                                userId: auth.user.id,
                                user: {
                                    username: auth.user.username,
                                },
                                otherUser: { id: cpActiveItem.userId },
                            };
                            socket.emit("CLIENT_THREAD", otherThread);

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
                    cpSubscribers = [{ ...item, type: "subscriber" }, ...cpSubscribers];
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
                        if (cpThreads[i].thread.id == folowersMessage.activeItem.thread.id) {
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
                const threadUser = {
                    id: -1,
                    userId: item.id,
                    thread: {
                        id: response.data.thread.id,
                        messages: [],
                    },
                    user: {
                        username: item.username,
                    },
                    updatedAt: response.data.thread.updatedAt,
                };
                setFolowersMessage({
                    ...folowersMessage,
                    activeItem: threadUser,
                });
                return threadUser;
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
                        {countNewMessages > 0 ? <span className="count-notif">{countNewMessages}</span> : null}
                    </div>
                    <div className="content-messagerie">
                        <div className="list-messagerie" onScroll={onScrollThreads} ref={refThreads}>
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
                                const cpFolowersMessage = { ...folowersMessage };
                                cpFolowersMessage.activeItem = false;
                                setFolowersMessage(cpFolowersMessage);
                            }}
                        >
                            <KeyboardArrowLeftIcon />
                        </span>
                        <span className="name-messagerie">{folowersMessage.activeItem?.user?.username}</span>
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
                                ref={refMessages}
                            >
                                {loadingMessages && <SpinnerLoading className="is-top-spinner" />}

                                {messages.length > 0 &&
                                    messages.map((row, index) => (
                                        <ItemSingleMessage
                                            key={index}
                                            typeSend={row.userId == auth.user.id ? "user-send" : ""}
                                            message={row.message}
                                            date={getDurationHM(moment(), row.message.createdAt)}
                                            index={index}
                                            stautVu={row.userId == auth.user.id && row.seen ? "vuReading" : ""}
                                        />
                                    ))}
                                {typingMessage &&
                                    typingMessage.threadId == folowersMessage.activeItem.thread.id &&
                                    typingMessage.userId != auth.user.id &&
                                    !folowersMessage.activeItem.thread.blocked && (
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
                                        </div>
                                    )}
                            </div>
                        </ChatSpace>
                        <InputEmoji
                            typeInput="textarea"
                            setMsgNotifTopTime={setMsgNotifTopTime}
                            setFolowersMessage={setFolowersMessage}
                            saveMessage={saveMessage}
                            setImTyping={setImTyping}
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
                                const cpFolowersMessage = { ...folowersMessage };
                                cpFolowersMessage.showSearchFolower = false;
                                setFolowersMessage(cpFolowersMessage);
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
                                const cpFolowersMessage = { ...folowersMessage };
                                cpFolowersMessage.search.value = e.target.value;
                                setFolowersMessage(cpFolowersMessage);
                                if (cpFolowersMessage.search.value.length >= 3) {
                                    setFolowersMessage({
                                        ...folowersMessage,
                                        resultSearch: true,
                                    });
                                    getUsers(true);
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
                        <div
                            className="content-search-results"
                            ref={refContent}
                            onScroll={(e) => {
                                if (isTabletOrMobile) {
                                    onScrollContent(e);
                                }
                            }}
                        >
                            <div
                                className="list-result-search"
                                ref={refList}
                                onScroll={(e) => {
                                    if (!isTabletOrMobile) {
                                        onScrollList(e);
                                    }
                                }}
                            >
                                {users.length > 0 ? (
                                    users.map((item, index) => (
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
                                    ))
                                ) : (
                                    <p className="message-not-result">Aucun resultat trouvé </p>
                                )}
                                {loadingUsers && <SpinnerLoading />}
                            </div>
                        </div>
                    ) : null}
                    <span className="name-messagerie">{folowersMessage.activeItem.name}</span>
                </MessageFindFolower>
            )}
        </BlocMessagerie>
    );
}
