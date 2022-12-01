import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import { Button } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BarTimer } from "../assets/styles/componentStyle";
import endPoints from "../config/endPoints";
import connector from "../connector";
import { decrementDurationTime, getInt, getPercentDuration } from "../helper/fonctions";
import * as actionTypes from "../store/functions/actionTypes";

export default function BarTemporelle({
    state = {},
    item = {},
    indexItem = null,
    setItem = {},
    action = {},
    setAction = () => {},
    setMsgNotifTopTime = () => {},
    clearPliElapsed = () => {},
    ...props
}) {
    const dispatch = useDispatch();
    const [isPending, setIsPending] = useState(false);
    const auth = useSelector((store) => store.auth);
    const pli = useSelector((store) => store.pli);
    const [duration, setDuration] = useState(item.duration);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        setDuration(item.duration);
    }, [item.duration]);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((seconds) => seconds + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let cpDuration = duration ? decrementDurationTime(duration) : false;
        if (cpDuration) {
            setDuration(cpDuration);
        } else {
            clearPliElapsed(indexItem);
        }
    }, [seconds]);

    const saveTime = ({ signe }) => {
        if (!isPending) {
            setIsPending(true);
            connector({
                method: "post",
                url: endPoints.PLI_TIME,
                data: { duration: "00:01:00", allottedTime: 1, signe, id: item.id },
                success: (response) => {
                    setIsPending(false);
                    const appearances = {
                        ...item.appearances,
                        alreadyUpdated: true,
                        signe,
                    };
                    if (signe) {
                        appearances.countUp = getInt(item.appearances.countUp) + 1;
                    } else {
                        appearances.countDown = getInt(item.appearances.countDown) + 1;
                    }
                    setItem({
                        ...item,
                        duration: response.data.pli.duration,
                        allottedTime: response.data.pli.allottedTime,
                        appearances,
                        action: "update",
                    });
                },
                catch: () => {
                    setIsPending(false);
                },
            });
        }
    };

    const cancelTime = () => {
        if (!isPending) {
            setIsPending(true);
            connector({
                method: "post",
                url: endPoints.PLI_TIME_CANCEL,
                data: { id: item.id },
                success: (response) => {
                    setIsPending(false);
                    const appearances = {
                        ...item.appearances,
                        alreadyUpdated: false,
                        signe: response.data.pli.signe,
                    };
                    if (response.data.pli.signe) {
                        appearances.countUp = getInt(item.appearances.countUp) - 1;
                    } else {
                        appearances.countDown = getInt(item.appearances.countDown) - 1;
                    }
                    setItem({
                        ...item,
                        duration: response.data.pli.duration,
                        allottedTime: response.data.pli.allottedTime,
                        appearances,
                        action: "update",
                    });
                },
                catch: () => {
                    setIsPending(false);
                },
            });
        }
    };

    const checkIsConnected = () => {
        if (auth.isConnected) {
            return true;
        } else {
            setMsgNotifTopTime("Vous devez être connecté pour pouvoir ajouter ou enlever du temps, publier, commenter, partager ou envoyer des messages", 5000);
            return false;
        }
    };

    const upTime = () => {
        if (item.appearances.alreadyUpdated) {
            cancelTime();
            return;
        }
        saveTime({ signe: true });
    };

    const downTime = () => {
        if (item.appearances.alreadyUpdated) {
            cancelTime();
            return;
        }
        saveTime({ signe: false });
    };

    return (
        <BarTimer className={props.className}>
            <LinearProgress className="progressBar-item" variant="determinate" value={getPercentDuration(item)} />
            <div className="bloc-timer-Bar">
                <Button
                    className={`${item.appearances.alreadyUpdated && !item.appearances.signe ? "active" : ""}`}
                    onClick={() => {
                        if (!checkIsConnected()) {
                            dispatch({
                                type: actionTypes.LOAD_PLI,
                                showModal: false,
                            });
                        } else {
                            downTime();
                        }
                    }}
                >
                    <RemoveIcon />
                </Button>
                <div
                    className="content-timer-bar"
                    onClick={() => {
                        if (!pli.showModal) {
                            if (pli.activeItem?.id != item.id) {
                                dispatch({
                                    type: actionTypes.LOAD_PLI,
                                    activeItem: item,
                                    showNV2: true,
                                }); 
                            } else {
                                dispatch({
                                    type: actionTypes.LOAD_PLI,
                                    activeItem: item,
                                    showNV2: !pli.showNV2,
                                }); 
                            }
                        }
                    }}
                >
                    <span className="timer-down">{item?.appearances?.countDown}</span>
                    <div className="timer-item">
                        <TimerOutlinedIcon /> <span>{duration}</span>
                    </div>
                    <span className="timer-up">{item?.appearances?.countUp}</span>
                </div>
                <Button
                    className={`${item.appearances.alreadyUpdated && item.appearances.signe ? "active" : ""}`}
                    onClick={() => {
                        if (!checkIsConnected()) {
                            dispatch({
                                type: actionTypes.LOAD_PLI,
                                showModal: false,
                            });
                        } else {
                            upTime();
                        }
                    }}
                >
                    <AddIcon />
                </Button>
            </div>
        </BarTimer>
    );
}
