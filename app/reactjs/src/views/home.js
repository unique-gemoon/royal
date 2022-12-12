import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { StyledEngineProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "react-masonry-list";
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
import { decrementDurationTime, getMsgError, getUniqueList, scrollBottomById, sortObjects, uniqid } from "../helper/fonctions";
import * as actionTypes from "../store/functions/actionTypes";
import ItemMasonryModal from "../components/itemMasonry/itemMasonryModal";
import { useDurationContext } from "../context/DurationContext";
import LogoWithText from "../assets/images/logo-with-text";

export default function Home() {
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1199px)" });
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    const dispatch = useDispatch();
    const auth = useSelector((store) => store.auth);
    const notification = useSelector((store) => store.notification);
    const thread = useSelector((store) => store.thread);
    const pli = useSelector((store) => store.pli);
    const { getSeconds, updateSeconds } = useDurationContext();

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
                for (let i = 0; i < cpPlis.length; i++) {
                    let countOpened = 0;
                    for (let j = 0; j < data.length; j++) {
                        if (data[j].id == cpPlis[i].id && data[j].count != undefined) {
                            countOpened = data[j].count;
                            break;
                        }
                    }
                    cpPlis[i] = { ...cpPlis[i], countOpened };
                    if (pli.activeItem?.id == cpPlis[i].id) {
                        dispatch({
                            type: actionTypes.LOAD_PLI,
                            countOpened,
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
        pli,
        plis,
        auth,
        folowersMessage,
        thread.threads,
        thread.countNewMessages,
        notification.notifications,
        notification.countNewNotifications,
        notification.totalNotifications,
        notification.pageNotifications,
        getSeconds()
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
                    refreshItem({ ...response.data.plis[0], action }, true);
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
        refreshItem(item, true);
    };

    const refreshItem = (item, refreshDuration = false) => {
        let cpPlis = [...plis];
        if (refreshDuration) {
            const seconds = getSeconds();
            for (let i = 0; i < cpPlis.length; i++) {
                cpPlis[i].duration = decrementDurationTime(cpPlis[i].duration, seconds) || "00:00:00";
            }
            updateSeconds(0);
        }
        if (item.action == "create") {
            cpPlis.push(item);
        } else if (item.action == "update") {
            for (let i = 0; i < cpPlis.length; i++) {
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
            }
            if (pli.activeItem?.id == cpPli.id) {
                dispatch({
                    type: actionTypes.LOAD_PLI,
                    showModal: false,
                });
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
                <title>Royalis : le réseau social français privé</title>
                <meta name="description" content="Réseau social français et indépendant qui privilégie l’expérience collective à l’exposition individuelle." />
            </Helmet>
            <StyledEngineProvider injectFirst>
                {isTabletOrMobile && (
                    <HeaderMobile>
                        <div className="logo">
                            <LogoWithText />
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
                    {!isMobile ? (
                        <Layout
                            className="pli-masonry-grid"
                            minWidth={100}
                            gap={20}
                            colCount={isTabletOrMobile ? 2 : 3}
                            items={
                                plis &&
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
                                ))
                            }
                        ></Layout>
                    ) : (
                        <div className="pli-masonry-grid">
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
                        </div>
                    )}

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
