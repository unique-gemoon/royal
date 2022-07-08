import CloseFullscreenTwoToneIcon from "@mui/icons-material/CloseFullscreenTwoTone";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import FormatSizeIcon from "@mui/icons-material/FormatSize";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import ImageIcon from "@mui/icons-material/Image";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import OpenInFullOutlinedIcon from "@mui/icons-material/OpenInFullOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Tooltip from "@mui/material/Tooltip";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import ArrowDownIcon from "../../assets/images/icons/ArrowDownIcon";
import BallotIcon from "../../assets/images/icons/ballotIcon";
import { DetailsItems, HeadContentItem, PlusIcon } from "../../assets/styles/globalStyle";
import { useOutsideAlerter } from "../../helper/events";
import { useMediaQuery } from "react-responsive";
import moment from "moment";
import { copyToClipboard, getDurationHM, getMsgError } from "../../helper/fonctions";
import endPoints from "../../config/endPoints";
import connector from "../../connector";

export default function HeadItem({
    item,
    setItem = () => {},
    state,
    setState,
    action,
    setAction = () => {},
    activeItem,
    setActiveItem = () => {},
    setMsgNotifTopTime = () => {},
    folowersMessage,
    setFolowersMessage = () => {},
    updateSubscriberStatus = () => {},
}) {
    const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 540px)" });
    const [toggleProfile, setToggleProfile] = useState(false);
    const [mediaIcons, setMediaIcons] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const handleTooltipClose = () => {
        setToggleProfile(false);
    };

    const handleTooltipOpen = () => {
        setToggleProfile(!toggleProfile);
    };
    const auth = useSelector((store) => store.auth);

    const history = useHistory();

    const query = new URLSearchParams(useLocation().search);
    const pliId = query.get("pli") || null;

    useEffect(() => {
        if (pliId && item && item.id == pliId) {
            setState({ ...state, showModal: true, showComment: true, item });
            const cpAction = {
                ...action,
                notification: { ...action.notification, isOpen: false },
                folower: { ...action.folower, isOpen: false },
                search: { ...action.search, isOpen: false },
                messagerie: { ...action.messagerie, isOpen: false },
            };
            setAction(cpAction);
            history.push("/");
        }
    }, [pliId]);

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
    useEffect(() => {
        if (item) {
            let cpMediaIcons = [];
            if (item.ouverture != "") {
                cpMediaIcons.push("description");
            }
            if (item.medias.length > 0 ) {
                for (let i = 0; i < item.medias.length; i++) {
                    if (item.medias[i].isOuverture == true && !cpMediaIcons.includes(item.medias[i].type)) {
                        cpMediaIcons.push(item.medias[i].type);
                    }
                }
            }
            setMediaIcons(cpMediaIcons);
        }
    }, [item]);

    const [showMediaIcons, setShowMediaIcons] = useState(false);

    const [copyOpen, setCopyOpen] = useState(false);
    const handleCopyClose = () => {
        setCopyOpen(false);
    };

    const handleCopyOpen = () => {
        setCopyOpen(true);
        copyToClipboard(`${window.location.origin}/?pli=${item.id}`);
    };

    const ref = useRef(null);
    useOutsideAlerter(ref, () => {
        setShowMediaIcons(false);
    });

    const subscribe = () => {
        if (!submitting) {
            msgErrors({ submit: true });
            connector({
                method: "post",
                url: `${endPoints.USER_SUBSCRIVBE}`,
                data: { userId: item.user.id },
                success: (response) => {
                    msgErrors({
                        submit: false,
                        msg: `Vous êtes désormais abonné à "${item.user.username}".`,
                    });
                    setItem({
                        ...item,
                        user: { ...item.user, isSubscribed: true },
                        action: "update",
                    });
                    updateSubscriberStatus({
                        ...item.user,
                        isSubscribed: true,
                        notification: response.data.notification,
                    });
                },
                catch: (error) => {
                    msgErrors({ msg: getMsgError(error), submit: false });
                },
            });
        }
    };

    const unsubscribe = () => {
        if (!submitting) {
            msgErrors({ submit: true });
            connector({
                method: "post",
                url: `${endPoints.USER_UNSUBSCRIVBE}`,
                data: { userId: item.user.id },
                success: (response) => {
                    msgErrors({
                        submit: false,
                        msg: `Vous êtes désormais désabonné de "${item.user.username}".`,
                    });
                    setItem({
                        ...item,
                        user: { ...item.user, isSubscribed: false  },
                        action: "update",
                    });
                    updateSubscriberStatus({
                        ...item.user,
                        isSubscribed: false,
                        notification: response.data.notification,
                    });
                },
                catch: (error) => {
                    msgErrors({ msg: getMsgError(error), submit: false });
                },
            });
        }
    };

    const msgErrors = (e) => {
        if (e.submit !== undefined) setSubmitting(e.submit);
        if (e.msg !== undefined) setMsgNotifTopTime(e.msg, 5000);
    };

    const [createdAt, setCreatedAt] = useState(item.createdAt);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        setCreatedAt(item.createdAt);
    }, [item.createdAt]);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((seconds) => seconds + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setCreatedAt(getDurationHM(moment(), item.createdAt));
    }, [seconds]);

    const pliCheckThread = (item) => {
        connector({
            method: "post",
            url: endPoints.THREAD_CHECK,
            data: { userId: item.user.id },
            success: (response) => {
                const thread = {
                    id: -1,
                    userId: item.user.id,
                    thread: {
                        id: response.data?.thread?.id ? response.data.thread.id : -1,
                        messages: [],
                    },
                    user: {
                        username: item.user.username,
                    },
                    updatedAt: response.data.updatedAt,
                };
                setFolowersMessage({
                    ...folowersMessage,
                    activeItem: thread,
                });
            },
            catch: (error) => {
                console.log(error);
            },
        });
    };

    return (
        <HeadContentItem>
            <div className={`bloc-content-item ${mediaIcons.length == 0 ? "no-media-overture" :""}`}>
                <DetailsItems className={mediaIcons.length > 1 && "is-other-media"}>
                    {mediaIcons.length > 0 &&
                        mediaIcons.map((media, index) => (
                            <div key={index}>
                                {(index == 0 || isDesktopOrLaptop) && media === "description" && (
                                    <div className="item-detail format-text-detail">
                                        <FormatSizeIcon />
                                    </div>
                                )}
                                {(index == 0 || isDesktopOrLaptop) && media === "music" && (
                                    <div className="item-detail sound-detail">
                                        <GraphicEqIcon />
                                    </div>
                                )}
                                {(index == 0 || isDesktopOrLaptop) && media === "sondage" && (
                                    <div className="item-detail sondage-detail">
                                        <BallotIcon />
                                    </div>
                                )}
                                {(index == 0 || isDesktopOrLaptop) && media === "image" && (
                                    <div className="item-detail image-detail">
                                        <ImageIcon />
                                    </div>
                                )}
                                {(index == 0 || isDesktopOrLaptop) && media == "video" && (
                                    <div className="item-detail video-detail">
                                        <PlayArrowIcon />
                                    </div>
                                )}
                            </div>
                        ))}
                    <div className="bloc-more-medias" ref={ref}>
                        <div className={`mediaDetails ${showMediaIcons ? "showMedia" : ""}`}>
                            {mediaIcons.length > 0 &&
                                !isDesktopOrLaptop &&
                                mediaIcons.map((media, index) => (
                                    <div key={index}>
                                        {index > 0 ? (
                                            <>
                                                {showMediaIcons && media == "description" && (
                                                    <div className="item-detail format-text-detail">
                                                        <FormatSizeIcon />
                                                    </div>
                                                )}
                                                {showMediaIcons && media == "music" && (
                                                    <div className="item-detail sound-detail">
                                                        <GraphicEqIcon />
                                                    </div>
                                                )}
                                                {showMediaIcons && media == "sondage" && (
                                                    <div className="item-detail sondage-detail">
                                                        <BallotIcon />
                                                    </div>
                                                )}
                                                {showMediaIcons && media == "image" && (
                                                    <div className="item-detail image-detail">
                                                        <ImageIcon />
                                                    </div>
                                                )}
                                                {showMediaIcons && media == "video" && (
                                                    <div className="item-detail video-detail">
                                                        <PlayArrowIcon />
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                ))}
                        </div>
                        {mediaIcons.length > 1 && !isDesktopOrLaptop && (
                            <div
                                className={`item-detail more-media ${showMediaIcons ? "is-showing" : ""}`}
                                onClick={() => {
                                    setShowMediaIcons(!showMediaIcons);
                                }}
                            >
                                <PlusIcon />
                            </div>
                        )}
                    </div>
                </DetailsItems>
                <div className="d-flex">
                    <ClickAwayListener onClickAway={handleTooltipClose}>
                        <div className="user-info-tooltip">
                            <Tooltip
                                PopperProps={{
                                    disablePortal: true,
                                }}
                                className="tooltip-post"
                                arrow
                                onClose={handleTooltipClose}
                                open={toggleProfile}
                                disableFocusListener
                                disableHoverListener
                                disableTouchListener
                                placement="top"
                                title={
                                    <>
                                        <div className="tooltip-info-post">
                                            <span className="name-post">{item.user.username}</span>
                                            <div className="detail-ifo-post">
                                                <div className="folowers-post">
                                                    <p className="abonnes-post">
                                                        <span>{item.user.totalSubscribers || "0"}</span>
                                                        abonnés
                                                    </p>
                                                    <p className="abonnes-post">
                                                        <span>{item.user.totalSubscriptions || "0"}</span>
                                                        abonnements
                                                    </p>
                                                </div>
                                                <div className="tooltip-btns-action">
                                                    <Button
                                                        onClick={() => {
                                                            if (!checkIsConnected()) {
                                                                setState({ ...state, showModal: false, item });
                                                            }
                                                            const cpAction = {
                                                                ...action,
                                                                // notification: {
                                                                //     ...action.notification,
                                                                //     isOpen: false,
                                                                // },
                                                                // folower: { ...action.folower, isOpen: false },
                                                                // search: { ...action.search, isOpen: false },
                                                                messagerie: {
                                                                    ...action.messagerie,
                                                                    isOpen: true,
                                                                },
                                                            };
                                                            setAction(cpAction);
                                                            setState({ ...state, showModal: false });
                                                            setToggleProfile(false);

                                                            pliCheckThread(item);
                                                        }}
                                                        className="toggle-item-message"
                                                    >
                                                        <MailOutlineRoundedIcon />
                                                    </Button>
                                                    <Button className="btn-switch-folowers">
                                                        {item.user.isSubscribed ? (
                                                            <div
                                                                onClick={() => {
                                                                    if (checkIsConnected()) {
                                                                        unsubscribe();
                                                                    }
                                                                }}
                                                            >
                                                                Abonner
                                                                <PersonRemoveOutlinedIcon />
                                                            </div>
                                                        ) : (
                                                            <div
                                                                onClick={() => {
                                                                    if (checkIsConnected()) {
                                                                        subscribe();
                                                                    }
                                                                }}
                                                            >
                                                                S'abonner
                                                                <PersonAddAltOutlinedIcon />
                                                            </div>
                                                        )}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>{" "}
                                    </>
                                }
                            >
                                <span
                                    className="name-post"
                                    onClick={() => {
                                        if (!auth.isConnected || (auth.user && auth.user.id != item.user.id)) {
                                            handleTooltipOpen();
                                        }
                                    }}
                                >
                                    {item.user.username}
                                </span>
                            </Tooltip>
                        </div>
                    </ClickAwayListener>
                    <span className="timer-post">
                        {". "}
                        {createdAt}
                    </span>
                </div>
            </div>
            <div className="option-item">
                {state.showModal ? (
                    <div
                        className="users-enligne-pli"
                        onClick={() => {
                            setState({ ...state, showModal: false, item });
                        }}
                    >
                        {item?.countOpened ? item.countOpened : 0} <VisibilityIcon />{" "}
                        <CloseFullscreenTwoToneIcon className="open-zoom-icon" />
                    </div>
                ) : (
                    <div
                        className="users-enligne-pli"
                        onClick={() => {
                            setState({ ...state, showModal: true, item });
                            // const cpAction = {
                            //     ...action,
                            //     notification: { ...action.notification, isOpen: false },
                            //     folower: { ...action.folower, isOpen: false },
                            //     search: { ...action.search, isOpen: false },
                            //     messagerie: { ...action.messagerie, isOpen: false },
                            // };
                            // setAction(cpAction);
                            setActiveItem(item);
                        }}
                    >
                        {item?.countOpened ? item.countOpened : 0} <VisibilityIcon />{" "}
                        <OpenInFullOutlinedIcon className="open-zoom-icon" />
                    </div>
                )}
                <div
                    className={`nb-message-comment ${
                        (activeItem && activeItem.id == item.id && !state.showModal && state.showNV2) ||
                        (state.showModal && state.showCitation)
                            ? "comment-is-open"
                            : ""
                    }`}
                    onClick={() => {
                        if (state.showModal) {
                            setState({ ...state, showCitation: !state.showCitation });
                        } else {
                            // const cpAction = {
                            //     ...action,
                            //     notification: { ...action.notification, isOpen: false },
                            //     folower: { ...action.folower, isOpen: false },
                            //     search: { ...action.search, isOpen: false },
                            //     messagerie: { ...action.messagerie, isOpen: false },
                            // };
                            // setAction(cpAction);
                            if (activeItem && activeItem.id != item.id) {
                                setActiveItem({ ...item, showNV2: true });
                            } else {
                                setActiveItem({ ...item, showNV2: !state.showNV2 });
                            }
                        }
                    }}
                >
                    {item.totalComments} <CommentOutlinedIcon /> <ArrowDownIcon />
                </div>
                <div className="btn-copy">
                    <ClickAwayListener onClickAway={handleCopyClose}>
                        <div className="default-tooltip">
                            <Tooltip
                                PopperProps={{
                                    disablePortal: true,
                                }}
                                onClose={handleCopyClose}
                                open={copyOpen}
                                arrow
                                leaveDelay={1000}
                                title="lien du pli copié"
                            >
                                <InsertLinkIcon onClick={handleCopyOpen} />
                            </Tooltip>
                        </div>
                    </ClickAwayListener>
                </div>
            </div>
        </HeadContentItem>
    );
}
