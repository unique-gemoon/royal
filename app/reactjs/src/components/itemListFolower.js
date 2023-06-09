import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { ItemFolower } from "../assets/styles/componentStyle";
import endPoints from "../config/endPoints";
import connector from "../connector";
import { getMsgError } from "../helper/fonctions";
import { useMediaQuery } from "react-responsive";

export default function ItemListFolower({
    folowersMessage,
    setFolowersMessage = () => {},
    action = {},
    setAction = () => {},
    item,
    setItem = () => {},
    setMsgNotifTopTime = () => {},
    deleteUnsubscribe = () => {},
    index = null,
}) {
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 993px)" });
    const [submitting, setSubmitting] = useState(false);

    const subscribe = () => {
        if (!submitting) {
            msgErrors({ submit: true });
            connector({
                method: "post",
                url: `${endPoints.USER_SUBSCRIVBE}`,
                data: { userId: item.id },
                success: (response) => {
                    msgErrors({
                        submit: false,
                        msg: `Vous êtes désormais abonné à "${item.username}".`,
                    });
                    setItem({
                        ...item,
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
                data: { userId: item.id },
                success: (response) => {
                    msgErrors({
                        submit: false,
                        msg: `Vous êtes désormais désabonné de "${item.username}".`,
                    });
                    setItem({
                        ...item,
                        isSubscribed: false,
                        notification: response.data.notification,
                    });
                    deleteUnsubscribe(index);
                },
                catch: (error) => {
                    msgErrors({ msg: getMsgError(error), submit: false });
                },
            });
        }
    };

    const checkThread = (item) => {
        connector({
            method: "post",
            url: endPoints.THREAD_CHECK,
            data: { userId: item.id },
            success: (response) => {
                const thread = {
                    id: -1,
                    userId: item.id,
                    thread: {
                        id: response.data?.thread?.id ? response.data.thread.id : -1,
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
        <ItemFolower key={item.id}>
            <span>{item.username}</span>
            <div className="option-item-folower">
                <Button
                    className="toggle-item-message"
                    onClick={() => {
                        if (!isTabletOrMobile) {
                            const cpAction = {
                                ...action,
                                messagerie: { ...action.messagerie, isOpen: true },
                            };
                            setAction(cpAction);
                        } else {
                            const cpAction = {
                                ...action,
                                notification: {
                                    ...action.notification,
                                    isOpen: false,
                                },
                                folower: { ...action.folower, isOpen: false },
                                search: { ...action.search, isOpen: false },
                                messagerie: { ...action.messagerie, isOpen: true },
                            };
                            setAction(cpAction);
                        }

                        checkThread(item);
                    }}
                >
                    <MailOutlineRoundedIcon />
                </Button>
                {item.isSubscribed ? (
                    <Button
                        onClick={() => {
                            unsubscribe();
                        }}
                        className="btn-switch-folowers"
                    >
                        <PersonRemoveOutlinedIcon />
                    </Button>
                ) : (
                    <Button
                        onClick={() => {
                            subscribe();
                        }}
                        className="btn-switch-folowers"
                    >
                        <PersonAddAltOutlinedIcon />
                    </Button>
                )}
            </div>
        </ItemFolower>
    );
}
