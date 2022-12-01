import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { StyledEngineProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Masonry from "react-masonry-css";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";
import { ContainerDef, DefaultMain, HeaderMobile } from "../assets/styles/globalStyle";
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
import { getMsgError, getUniqueList, scrollBottomById, sortObjects, uniqid } from "../helper/fonctions";
import * as actionTypes from "../store/functions/actionTypes";
import ItemMasonryModal from "../components/itemMasonry/itemMasonryModal";

export default function Home() {
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1199px)" });

    const dispatch = useDispatch();
    const auth = useSelector((store) => store.auth);
    const notification = useSelector((store) => store.notification);
    const thread = useSelector((store) => store.thread);
    const pli = useSelector((store) => store.pli);

    const [plis, setPlis] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [showBlocModalMessage, setShowBlocModalMessage] = useState(null);
    const [openModalMessage, setOpenModalMessage] = useState(false);
    const [publishPli, setPublishPli] = useState(null);
    const [channel] = useState(uniqid());
    const [countConnection, setCountConnection] = useState(0);
    const [initOpenedPlis, setInitOpenedPlis] = useState(0);
    const [msgNotifTop, setMsgNotifTop] = useState(null);
    const [typingCitation, setTypingCitation] = useState({});
    const [typingMessage, setTypingMessage] = useState({});

    const [subscribers, setSubscribers] = useState([]);
    const [totalSubscribers, setTotalSubscribers] = useState(0);
    const [pageSubscribers, setPageSubscribers] = useState(1);

    const [subscriptions, setSubscriptions] = useState([]);
    const [totalSubscriptions, setTotalSubscriptions] = useState(0);
    const [pageSubscriptions, setPageSubscriptions] = useState(1);
    const [countNewSubscriptions, setCountNewSubscriptions] = useState(0);

    const query = new URLSearchParams(useLocation().search);
    const tokenRestPassword = query.get("tokenRestPassword") || null;
    const tokenConfirmEmail = query.get("tokenConfirmEmail") || null;

    const [loadingMore, setLoadingMore] = useState({
        notifications: false,
        threads: false,
        subscribers: false,
        subscriptions: false,
    });

    const breakpointColumnsObj = { default: 3, 1200: 2, 993: 1 };

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
        console.log("pli",pli);
    }, [pli]);

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
            dispatch({
                type: actionTypes.LOAD_NOTIFICATIONS,
                notifications: [],
                totalNotifications: 0,
                pageNotifications: 1,
                countNewNotifications: 0,
            });
        }
    }, [notification.pageNotifications, auth.isConnected]);

    useEffect(() => {
        if (auth.isConnected) {
            getThreads();
        } else {
            dispatch({
                type: actionTypes.LOAD_THREADS,
                threads: [],
                totalThreads: 0,
                pageThreads: 1,
                countNewMessages: 0,
                user: auth.user,
            });
            setFolowersMessage({ ...folowersMessage, activeItem: false });
        }
    }, [thread.pageThreads, auth.isConnected]);

    useEffect(() => {
        getPlis(true);
    }, [auth.isConnected]);

    const [countDeleteUnsubscribe, setCountDeleteUnsubscribe] = useState(0);

    useEffect(() => {
        if (auth.isConnected) {
            getSubscribers();
        } else {
            setSubscribers([]);
            setTotalSubscribers(0);
            setPageSubscribers(1);
        }
    }, [pageSubscribers, auth.isConnected, countDeleteUnsubscribe]);

    useEffect(() => {
        if (auth.isConnected) {
            getSubscriptions();
        } else {
            setSubscriptions([]);
            setTotalSubscriptions(0);
            setPageSubscriptions(1);
        }
    }, [pageSubscriptions, auth.isConnected]);

    useEffect(() => {
        if (initOpenedPlis && socket) {
            socket.emit("CLIENT_OPEN_PLI", { id: 0, opened: false });
        }
    }, [initOpenedPlis]);

    useEffect(() => {
        if (socket && plis.length > 0) {
            socket.emit("CLIENT_OPEN_PLI", {
                id: pli.activeItem?.id ? pli.activeItem.id : null,
                opened: pli.showModal,
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
    }, [pli.showModal]);

    useEffect(() => {
        const updatePli = (item) => {
            if (channel != item.channel) {
                getPli(item.id, item.action);
                if (item.subscribers != undefined && item.subscribers.length > 0 && auth?.user?.id && item.subscribers.includes(auth.user.id)) {
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

                    if (pli.activeItem?.id == cpPlis[i].id) {
                        dispatch({
                            type: actionTypes.LOAD_PLI,
                            countOpened
                        }); 
                    } 
                }
                setPlis(cpPlis);
            }
        };
        socket.on("SERVER_OPEN_PLI", updateOpenPlis);

        const subscriberUpdated = (data) => {
            if (data?.notification?.id) {
                if (auth.user && auth.user.id == data.notification.subscriberId && data.notification.type == "newSubscriber") {
                    dispatch({
                        type: actionTypes.LOAD_NOTIFICATIONS,
                        notifications: [data.notification, ...notification.notifications],
                        totalNotifications: notification.totalNotifications + 1,
                        countNewNotifications: notification.countNewNotifications + 1,
                    });
                }
            }
        };
        socket.on("SERVER_SUBSCRIBER_UPDATED", subscriberUpdated);

        const newComment = (data) => {
            if (data.comment.id != undefined && data.comment.message != undefined && data.comment.pliId != undefined) {
                const cpPlis = [...plis];
                for (let i = 0; i < cpPlis.length; i++) {
                    const cpPli = cpPlis[i];
                    if (cpPli.id == data.comment.pliId) {
                        if (data.comment.parentId) {
                            for (let j = 0; j < cpPli.comments.length; j++) {
                                const comment = cpPli.comments[j];
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

                if (data.users != undefined && data.users.length > 0 && auth?.user?.id && data.users.includes(auth.user.id)) {
                    getNotificationNewComment(data.comment.id);
                }
            }
        };
        socket.on("SERVER_COMMENT", newComment);

        const newCitation = (data) => {
            if (data.citation.id != undefined && data.citation.message != undefined && data.citation.pliId != undefined) {
                const cpPlis = [...plis];
                for (let i = 0; i < cpPlis.length; i++) {
                    const cpPli = cpPlis[i];
                    if (cpPli.id == data.citation.pliId) {
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
                scrollBottomById("citations-container");
            }
        };
        socket.on("SERVER_CITATION", newCitation);

        const updateTypingCitation = (item) => {
            if (auth.isConnected && auth.user.id != item.userId) {
                setTypingCitation(item);
            }
        };
        socket.on("SERVER_TYPING_CITATION", updateTypingCitation);

        const updateTypingMessage = (item) => {
            if (auth.isConnected && auth.user.id != item.userId) {
                setTypingMessage(item);
            }
        };
        socket.on("SERVER_TYPING_MESSAGE", updateTypingMessage);

        const updateMessage = (item) => {
            if (auth.isConnected) {
                if (auth.user.id == item.otherUser.id) {
                    if (item.threadId && (!folowersMessage?.activeItem?.thread || folowersMessage.activeItem.thread.id != item.threadId)) {
                        dispatch({
                            type: actionTypes.LOAD_THREADS,
                            countNewMessages: thread.countNewMessages + 1,
                            user: auth.user,
                        });
                    }
                }

                if (auth.user.id == item.otherUser.id || auth.user.id == item.userId) {
                    const cpThreads = [...thread.threads];
                    for (let i = 0; i < cpThreads.length; i++) {
                        if (cpThreads[i].thread.id == item.threadId) {
                            cpThreads[i].thread.messages = [item];
                            dispatch({
                                type: actionTypes.LOAD_THREADS,
                                threads: cpThreads,
                                user: auth.user,
                            });
                            break;
                        }
                    }
                }
            }
        };
        socket.on("SERVER_MESSAGE", updateMessage);

        const updateThread = (item) => {
            if (auth.isConnected) {
                if (item?.otherUser?.id && auth.user.id == item.otherUser.id) {
                    const cpThreads = [...thread.threads];

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
                            item = { ...cpThreads[i], updatedAt: item.updatedAt };
                            cpThreads.splice(i, 1);
                            break;
                        }
                    }
                    dispatch({
                        type: actionTypes.LOAD_THREADS,
                        threads: [item, ...cpThreads],
                        user: auth.user,
                    });
                }
            }
        };
        socket.on("SERVER_THREAD", updateThread);

        return () => {
            socket.off("SERVER_PLI", updatePli);
            socket.off("SERVER_COUNT_CONNECTION", updateCountConnection);
            socket.off("SERVER_OPEN_PLI", updateOpenPlis);
            socket.off("SERVER_SUBSCRIBER_UPDATED", subscriberUpdated);
            socket.off("SERVER_COMMENT", newComment);
            socket.off("SERVER_CITATION", newCitation);
            socket.off("SERVER_TYPING_CITATION", updateTypingCitation);
            socket.off("SERVER_MESSAGE", updateMessage);
            socket.off("SERVER_THREAD", updateThread);
            socket.off("SERVER_TYPING_MESSAGE", updateTypingMessage);
            //socket.disconnect();
        };
    }, [
        plis,
        auth,
        folowersMessage,
        thread.threads,
        thread.countNewMessages,
        notification.notifications,
        notification.countNewNotifications,
        notification.totalNotifications,
        notification.pageNotifications,
    ]);

    useEffect(() => {
        const updateSubscriber = (item) => {
            if (auth.user.id == item.user.id) {
                let cpSubscribers = [...subscribers];
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
                    cpSubscribers = [
                        {
                            id: item.subscriber.id,
                            username: item.subscriber.username,
                            isSubscribed: item.isSubscribed,
                            type: "subscriber",
                        },
                        ...cpSubscribers,
                    ];
                    setTotalSubscribers(totalSubscribers + 1);
                }
                setSubscribers(cpSubscribers);

                let cpSubscriptions = [...subscriptions];
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
                        cpSubscriptions = [
                            {
                                id: item.user.id,
                                username: item.user.username,
                                isSubscribed: isSubscribed,
                                type: "subscription",
                                seen: false,
                            },
                            ...cpSubscriptions,
                        ];
                        setCountNewSubscriptions(countNewSubscriptions + 1);
                        setTotalSubscriptions(totalSubscriptions + 1);
                    }
                } else {
                    cpSubscriptions = cpSubscriptions.filter(function (subscription) {
                        return subscription.id != item.user.id;
                    });
                }
                setSubscriptions(cpSubscriptions);
            }

            const cpPlis = [...plis];
            let isChanged = false;
            for (let i = 0; i < cpPlis.length; i++) {
                const cpPli = cpPlis[i];

                if (cpPli.user.id == item.user.id) {
                    isChanged = true;
                    cpPli.user.totalSubscribers = item.isSubscribed ? cpPli.user.totalSubscribers + 1 : cpPli.user.totalSubscribers - 1;
                } else if (cpPli.user.id == item.subscriber.id) {
                    isChanged = true;
                    cpPli.user.totalSubscriptions = item.isSubscribed ? cpPli.user.totalSubscriptions + 1 : cpPli.user.totalSubscriptions - 1;
                }
            }
            if (isChanged) {
                setPlis(cpPlis);
            }
        };
        socket.on("SERVER_SUBSCRIBER_UPDATED", updateSubscriber);

        return () => {
            socket.off("SERVER_SUBSCRIBER_UPDATED", updateSubscriber);
        };
    }, [plis, subscribers, subscriptions, countNewSubscriptions]);

    const getPlis = (refresh = false) => {
        connector({
            method: "get",
            url: `${endPoints.PLIS}`,
            success: (response) => {
                setPlis(response.data.plis || []);
                if (response.data.plis.length == 0) {
                    setPublishPli(null);
                } else {
                    refreshPublishPli(response.data.plis);
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

    const refreshPublishPli = (data) => {
        if (auth?.user) {
            for (let i = 0; i < data.length; i++) {
                const cpPli = { ...data[i] };
                if (auth.user.id == cpPli.user.id) {
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
                    const cpNotifications = getUniqueList([response.data.notification, ...notification.notifications]);

                    if (cpNotifications.length > notification.notifications.length) {
                        dispatch({
                            type: actionTypes.LOAD_NOTIFICATIONS,
                            notifications: cpNotifications,
                            totalNotifications: notification.totalNotifications + 1,
                            countNewNotifications: notification.countNewNotifications + 1,
                        });
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
                    const cpNotifications = getUniqueList([response.data.notification, ...notification.notifications]);
                    if (cpNotifications.length > notification.notifications.length) {
                        dispatch({
                            type: actionTypes.LOAD_NOTIFICATIONS,
                            notifications: cpNotifications,
                            totalNotifications: notification.totalNotifications + 1,
                            countNewNotifications: notification.countNewNotifications + 1,
                        });
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
        refreshPublishPli(cpPlis);

        if (pli.activeItem?.id == item.id) {
            dispatch({
                type: actionTypes.LOAD_PLI,
                activeItem: { ...pli.activeItem, ...item },
            }); 
        }
    };

    const clearPliElapsed = (index) => {
        if (index != null && plis[index]) {
            const cpPli = { ...plis[index] };
            if (publishPli && publishPli.id === cpPli.id) {
                setPublishPli(null);
                if (pli.activeItem?.id == cpPli.id) {
                    dispatch({
                        type: actionTypes.LOAD_PLI,
                        showModal: false,
                    });
                }
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
            setMsgNotifTopTime("Vous devez être connecté pour pouvoir ajouter ou enlever du temps, publier, commenter, partager ou envoyer des messages", 5000);
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
        if (item.isSubscribed == false) {
            deleteUnsubscribe(item);
        }

        for (let i = 0; i < plis.length; i++) {
            const cpPli = plis[i];
            if (cpPli.user.id === item.id) {
                refreshItem({
                    ...cpPli,
                    user: {
                        ...cpPli.user,
                        isSubscribed: item.isSubscribed,
                    },
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

    const deleteUnsubscribe = (item) => {
        let cpSubscribers = [...subscribers];
        for (let i = 0; i < cpSubscribers.length; i++) {
            if (item.id == cpSubscribers[i].id) {
                cpSubscribers.splice(i, 1);
                setSubscribers(cpSubscribers);
                setCountDeleteUnsubscribe(countDeleteUnsubscribe + 1);
                break;
            }
        }
    };

    const setLoadingMoreCheck = (e) => {
        if (e.notifications) {
            if (notification.notifications.length < notification.totalNotifications) {
                dispatch({
                    type: actionTypes.LOAD_NOTIFICATIONS,
                    pageNotifications: notification.pageNotifications + 1,
                });
            }
        } else if (e.threads) {
            if (thread.threads.length < thread.totalThreads) {
                dispatch({
                    type: actionTypes.LOAD_THREADS,
                    pageThreads: thread.pageThreads + 1,
                    user: auth.user,
                });
            }
        } else if (e.subscribers) {
            if (subscribers.length < totalSubscribers) {
                setPageSubscribers(pageSubscribers + 1);
            }
        } else if (e.subscriptions) {
            if (subscriptions.length < totalSubscriptions) {
                setPageSubscriptions(pageSubscriptions + 1);
            }
        }
    };

    const isSeenNotification = (index) => {
        let cpNotifications = [...notification.notifications];
        if (cpNotifications[index]) {
            const data = cpNotifications[index];
            connector({
                method: "post",
                url: `${endPoints.NOTIFICATION_SEEN}`,
                data: { ...data },
                success: (response) => {
                    cpNotifications[index].seen = true;
                    dispatch({
                        type: actionTypes.LOAD_NOTIFICATIONS,
                        notifications: cpNotifications,
                        countNewNotifications: notification.countNewNotifications - 1,
                    });
                },
                catch: (error) => {
                    console.log(error);
                },
            });
        }
    };

    const getNotifications = (refresh = false) => {
        if (!loadingMore.notifications) {
            setLoadingMore({ ...loadingMore, notifications: true });
            const cpPageNotifications = refresh ? 1 : notification.pageNotifications;
            connector({
                method: "get",
                url: `${endPoints.NOTIFICATION_LIST}?page=${cpPageNotifications}`,
                success: (response) => {
                    dispatch({
                        type: actionTypes.LOAD_NOTIFICATIONS,
                        notifications: getUniqueList([...notification.notifications, ...response.data.notifications]),
                        totalNotifications: parseInt(response.data.total),
                        pageNotifications: cpPageNotifications,
                        countNewNotifications: parseInt(response.data.totalNew),
                    });
                    setLoadingMore({ ...loadingMore, notifications: false });
                },
                catch: (error) => {
                    console.log(error);
                    setLoadingMore({ ...loadingMore, notifications: false });
                },
            });
        }
    };

    const getSubscribers = (refresh = false) => {
        if (!loadingMore.subscribers) {
            setLoadingMore({ ...loadingMore, subscribers: true });
            const cpPageSubscribers = refresh ? 1 : pageSubscribers;
            if (pageSubscribers != cpPageSubscribers) {
                setPageSubscribers(cpPageSubscribers);
            }
            connector({
                method: "get",
                url: `${endPoints.USER_SUBSCRICERS}?page=${cpPageSubscribers}`,
                success: (response) => {
                    setSubscribers(getUniqueList([...subscribers, ...response.data.subscribers]));
                    setTotalSubscribers(response.data.total);
                    setLoadingMore({ ...loadingMore, subscribers: false });
                },
                catch: (error) => {
                    console.log(error);
                    setLoadingMore({ ...loadingMore, subscribers: false });
                },
            });
        }
    };

    const getSubscriptions = (refresh = false) => {
        if (!loadingMore.subscriptions) {
            setLoadingMore({ ...loadingMore, subscriptions: true });
            const cpPageSubscriptions = refresh ? 1 : pageSubscriptions;
            if (pageSubscriptions != cpPageSubscriptions) {
                setPageSubscriptions(cpPageSubscriptions);
            }
            connector({
                method: "get",
                url: `${endPoints.USER_SUBSCRIPTIONS}?page=${cpPageSubscriptions}`,
                success: (response) => {
                    setSubscriptions([...subscriptions, ...response.data.subscriptions]);
                    setLoadingMore({ ...loadingMore, subscriptions: false });
                    setTotalSubscriptions(response.data.total);
                    setCountNewSubscriptions(response.data.totalNew);
                },
                catch: (error) => {
                    console.log(error);
                    setLoadingMore({ ...loadingMore, subscriptions: false });
                },
            });
        }
    };

    const getThreads = (refresh = false) => {
        if (!loadingMore.threads) {
            setLoadingMore({ ...loadingMore, threads: true });
            const cpPageThreads = refresh ? 1 : thread.pageThreads;
            connector({
                method: "get",
                url: `${endPoints.THREAD_LIST}?page=${cpPageThreads}`,
                success: (response) => {
                    dispatch({
                        type: actionTypes.LOAD_THREADS,
                        threads: getUniqueList([...thread.threads, ...response.data.threads]),
                        totalThreads: parseInt(response.data.total),
                        pageThreads: cpPageThreads,
                        countNewMessages: parseInt(response.data.totalNewMessages || 0),
                        user: auth.user,
                    });
                    setLoadingMore({ ...loadingMore, threads: false });
                },
                catch: (error) => {
                    console.log(error);
                    setLoadingMore({ ...loadingMore, threads: false });
                },
            });
        }
    };

    const msgErrors = (e) => {
        if (e.submit !== undefined) setSubmitting(e.submit);
        if (e.msg !== undefined) setMsgNotifTopTime(e.msg, 5000);
    };

    return (
        <DefaultMain>
            <Helmet>
                <title>Royalis : Le Réseaux social Français Privé</title>
                <meta name="description" content="Réseau social Français et indépendant qui privilégie l’expérience collective à l’exposition individuelle." />
            </Helmet>
            <StyledEngineProvider injectFirst>
                {isTabletOrMobile && (
                    <HeaderMobile>
                        <div className="logo">
                            <svg width="136px" height="40px" viewBox="0 0 136 40" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                    <g id="Logo-avec-texte" transform="translate(0.245606, 0.100000)" fill="#EDB97B" fillRule="nonzero">
                                        <g id="Group" transform="translate(42.754394, 11.900000)">
                                            <path
                                                d="M8.33171913,14.775 L5.10411622,9.375 L2.55205811,9.375 L2.55205811,14.775 L0,14.775 L0,0.225 L6.38014528,0.225 C9.23244552,0.225 11.1840194,2.1 11.1840194,4.8 C11.1840194,7.35 9.45762712,8.775 7.73123487,9.075 L11.3341404,14.775 L8.33171913,14.775 L8.33171913,14.775 Z M8.55690073,4.8 C8.55690073,3.375 7.50605327,2.55 6.07990315,2.55 L2.55205811,2.55 L2.55205811,7.125 L6.07990315,7.125 C7.50605327,7.125 8.55690073,6.15 8.55690073,4.8 Z"
                                                id="Shape"
                                            />
                                            <path
                                                d="M14.6368039,7.5 C14.6368039,3.15 17.7142857,3.55271368e-15 22.0677966,3.55271368e-15 C26.4213075,3.55271368e-15 29.4987893,3.15 29.4987893,7.5 C29.4987893,11.85 26.4213075,15 22.0677966,15 C17.7142857,15 14.6368039,11.85 14.6368039,7.5 Z M26.8716707,7.5 C26.8716707,4.5 24.9951574,2.25 22.0677966,2.25 C19.1404358,2.25 17.2639225,4.5 17.2639225,7.5 C17.2639225,10.5 19.1404358,12.75 22.0677966,12.75 C24.9951574,12.75 26.8716707,10.5 26.8716707,7.5 Z"
                                                id="Shape"
                                            />
                                            <polygon
                                                id="Path"
                                                points="36.7046005 14.775 36.7046005 8.775 31.0750605 0.3 34.0024213 0.3 37.9806295 6.525 41.9588378 0.3 44.8861985 0.3 39.2566586 8.775 39.2566586 14.775"
                                            />
                                            <path
                                                d="M56.7457627,14.775 L55.6949153,12 L49.0145278,12 L47.9636804,14.775 L45.0363196,14.775 L50.7409201,0.3 L53.8934625,0.3 L59.598063,14.775 L56.7457627,14.775 Z M52.3171913,2.775 L49.6900726,9.675 L54.9443099,9.675 L52.3171913,2.775 Z"
                                                id="Shape"
                                            />
                                            <polygon id="Path" points="62.5254237 14.775 62.5254237 0.225 65.0774818 0.225 65.0774818 12.525 71.4576271 12.525 71.4576271 14.775" />
                                            <polygon id="Path" points="75.2106538 14.775 75.2106538 0.225 77.7627119 0.225 77.7627119 14.7 75.2106538 14.7" />
                                            <path
                                                d="M81.440678,12.675 L82.8668281,10.725 C83.842615,11.775 85.4188862,12.75 87.4455206,12.75 C89.5472155,12.75 90.3728814,11.7 90.3728814,10.725 C90.3728814,7.65 81.8910412,9.6 81.8910412,4.275 C81.8910412,1.875 83.9927361,0 87.1452785,0 C89.3970944,0 91.2736077,0.75 92.5496368,2.025 L91.1234867,3.9 C89.9975787,2.775 88.4213075,2.25 86.9200969,2.25 C85.4188862,2.25 84.5181598,3 84.5181598,4.05 C84.5181598,6.75 93,5.1 93,10.5 C93,12.9 91.2736077,15 87.37046,15 C84.7433414,15 82.7917676,14.025 81.440678,12.675 Z"
                                                id="Path"
                                            />
                                        </g>
                                        <g id="Path">
                                            <g transform="translate(8.454394, 27.200000)">
                                                <path d="M7.7,3.4 C5.7,3.4 3.6,3.4 1.6,3.4 C0.4,3.4 0,3 0,1.8 C0,0.4 0.4,-7.10542736e-15 1.6,-7.10542736e-15 C5.7,-7.10542736e-15 9.8,-7.10542736e-15 13.9,-7.10542736e-15 C15.4,-7.10542736e-15 16.1,1.2 15.5,2.6 C15.3,3.1 14.8,3.4 14.2,3.4 C12,3.4 9.8,3.4 7.7,3.4 C7.7,3.4 7.7,3.4 7.7,3.4 Z" />
                                                <path d="M9.3,9.2 C9.4,10.4 8.7,11.3 8,12.1 C7.8,12.3 7.7,12.3 7.5,12.1 C5.9,10.7 5.7,8.4 7.1,6.9 C7.6,6.3 8,6.3 8.4,6.9 C8.9,7.6 9.3,8.3 9.3,9.2 Z" />
                                                <path d="M2.9,7.8 C2.9,6.4 3.9,5.3 5.2,5.3 C5.8,5.3 6,5.6 5.9,6.1 C5.6,7.8 4.7,8.3 3.2,8.4 C2.9,8.5 2.9,8.4 2.9,7.8 Z" />
                                                <path d="M10.1,5.3 C11.4,5.3 12.7,7 12.3,8.2 C12.2,8.4 12.1,8.4 12,8.5 C10.7,8.6 9.5,7.5 9.3,6.2 C9.3,5.5 9.5,5.3 10.1,5.3 Z" />
                                            </g>
                                            <path d="M27.8543939,15.1 C22.1543939,13.7 17.4543939,20.4 16.8543939,21.7 C16.4543939,22.6 16.1543939,22.8 15.9543939,22.8 C15.8543939,22.8 15.5543939,22.6 15.0543939,21.7 C14.4543939,20.4 9.75439395,13.7 4.05439395,15.1 C-1.64560605,16.5 -1.44560605,25.6 5.35439395,26.3 C5.35439395,26.3 6.45439395,26.5 6.15439395,25.4 C5.75439395,24.3 5.55439395,21.9 8.35439395,21.1 C10.3543939,20.5 11.8543939,21.5 13.0543939,22.6 C13.8543939,23.3 14.4543939,24.2 14.8543939,25.2 C15.1543939,25.7 15.5543939,26.3 15.9543939,26.3 C16.4543939,26.3 16.9543939,25.4 17.1543939,24.8 C17.3543939,24.4 17.5543939,24 17.8543939,23.6 C19.1543939,22 20.9543939,20.3 23.5543939,21 C26.4543939,21.8 26.1543939,24.2 25.7543939,25.3 C25.3543939,26.4 26.5543939,26.2 26.5543939,26.2 C33.4543939,25.6 33.6543939,16.5 27.8543939,15.1 Z" />
                                            <path d="M21.1543939,9.1 C20.4543939,3.6 16.5543939,0.3 16.1543939,0.1 C16.0543939,-1.77635684e-15 15.9543939,-1.77635684e-15 15.8543939,-1.77635684e-15 C15.7543939,-1.77635684e-15 15.7543939,-1.77635684e-15 15.5543939,0.1 C15.1543939,0.3 11.2543939,3.5 10.5543939,9.1 C9.85439395,14.6 15.1543939,18.7 15.3543939,19 C15.4543939,19.2 15.6543939,19.2 15.7543939,19.2 C15.8543939,19.2 16.0543939,19.2 16.1543939,19 C16.6543939,18.6 21.8543939,14.6 21.1543939,9.1 Z" />
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <div className="d-flex">
                            <SeeCounter countSee={countConnection} />
                            {auth.isConnected && <ProfileMenu setMsgNotifTop={setMsgNotifTop} />}
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
                    <Masonry breakpointCols={breakpointColumnsObj} className="pli-masonry-grid" columnClassName="pli-masonry-grid_column">
                        {plis &&
                            plis.map((item, index) => (
                                <ItemMasonry
                                    key={index}
                                    indexItem={index}
                                    item={item}
                                    setItem={setItem}
                                    action={action}
                                    setAction={setAction}
                                    setMsgNotifTopTime={setMsgNotifTopTime}
                                    folowersMessage={folowersMessage}
                                    setFolowersMessage={setFolowersMessage}
                                    updateSubscriberStatus={updateSubscriberStatus}
                                    clearPliElapsed={clearPliElapsed}
                                />
                            ))}

                        {pli.activeItem && (
                            <ItemMasonryModal
                                item={pli.activeItem}
                                setItem={setItem}
                                action={action}
                                setAction={setAction}
                                setMsgNotifTopTime={setMsgNotifTopTime}
                                folowersMessage={folowersMessage}
                                setFolowersMessage={setFolowersMessage}
                                updateSubscriberStatus={updateSubscriberStatus}
                                typingCitation={typingCitation}
                            />
                        )}
                    </Masonry>
                </ContainerDef>

                {!auth.isConnected ? (
                    <FooterAuthHome setMsgNotifTopTime={setMsgNotifTopTime} countConnection={countConnection} />
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
                        isSeenNotification={isSeenNotification}
                        setCountNewSubscriptions={setCountNewSubscriptions}
                        countNewSubscriptions={countNewSubscriptions}
                        subscribers={subscribers}
                        setSubscribers={setSubscribers}
                        subscriptions={subscriptions}
                        setSubscriptions={setSubscriptions}
                        loadingMore={loadingMore}
                        setLoadingMore={setLoadingMoreCheck}
                        plis={plis}
                        typingMessage={typingMessage}
                    />
                )}
                <ModalMessage showBloc={showBlocModalMessage} setShowBloc={setShowBlocModalMessage} checkIsConnected={checkIsConnected} open={openModalMessage} setOpen={setOpenModalMessage} />
            </StyledEngineProvider>
        </DefaultMain>
    );
}
