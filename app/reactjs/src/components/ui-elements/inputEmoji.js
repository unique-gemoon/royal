import SendIcon from "@mui/icons-material/Send";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormEmoji } from "../../assets/styles/componentStyle";
import * as actionTypes from "../../store/functions/actionTypes";
import Emojis from "../emojis";
import InputTextareaAutosize from "./inputTextareaAutosize";

export default function InputEmoji({
    name,
    placeholder,
    typeInput,
    open,
    setOpen = () => {},
    setMsgNotifTopTime = () => {},
    saveMessage = () => {},
    waitingTime = false,
    setImTyping = () => {},
    ...props
}) {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        inputEmoji: {
            name: "message-input",
            placeholder: placeholder ? placeholder : "Ecrire un message",
            value: "",
            type: "text",
            as: typeInput,
            open: false,
        },
    });
    const [waitingTimeError, setWaitingTimeError] = useState(true);

    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        setOpen(state.inputEmoji.open);
    }, [state]);

    useEffect(() => {
        if (!waitingTime) {
            setWaitingTimeError(false);
        }
    }, [waitingTime]);

    useEffect(() => {
        if (String(state.inputEmoji.value).length > 0) {
            setImTyping(true);
        } else {
            setImTyping(false);
        }
    }, [state.inputEmoji.value]);

    const auth = useSelector((store) => store.auth);

    const checkIsConnected = () => {
        if (auth.isConnected) {
            return true;
        } else {
            setMsgNotifTopTime("Vous devez être connecté pour pouvoir ajouter ou enlever du temps, publier, commenter, partager ou envoyer des messages", 5000);
            return false;
        }
    };

    return (
        <FormEmoji className={props.className}>
            <div className={`content-form-emoji ${waitingTimeError ? "is-waiting" : ""}`}>
                <InputTextareaAutosize
                    {...state.inputEmoji}
                    onChange={(e) => {
                        const cpState = { ...state };
                        cpState.inputEmoji.value = e.target.value;
                        setState(cpState);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            if (!waitingTime) {
                                if (state.inputEmoji.value) {
                                    if (!submitting) {
                                        setSubmitting(true);
                                        saveMessage({ message: state.inputEmoji.value }).then(() => {
                                            setState({
                                                ...state,
                                                inputEmoji: { ...state.inputEmoji, value: "" },
                                            });
                                            setSubmitting(false);
                                        });
                                    }
                                } else {
                                    setMsgNotifTopTime("Vous ne pouvez pas poster un message vide.", 5000);
                                }
                            } else {
                                setWaitingTimeError(true);
                            }
                        }
                    }}
                    onClick={(e) => {
                        if (!checkIsConnected()) {
                            dispatch({
                                type: actionTypes.LOAD_PLI,
                                showModal: false,
                            });
                        }
                    }}
                />
                <Emojis inputEmoji={state.inputEmoji} setInputEmoji={(e) => setState({ ...state, inputEmoji: e })} />
                <div className="timer-waiting">
                    {waitingTime !== false && (
                        <span>
                            {" "}
                            00:0{waitingTime} <TimerOutlinedIcon />
                        </span>
                    )}
                </div>
            </div>

            <Button
                className="btn-send-emoji"
                onClick={(e) => {
                    if (!checkIsConnected()) {
                        dispatch({
                            type: actionTypes.LOAD_PLI,
                            showModal: false,
                        });
                    } else if (!waitingTime) {
                        if (state.inputEmoji.value) {
                            if (!submitting) {
                                setSubmitting(true);
                                saveMessage({ message: state.inputEmoji.value }).then(() => {
                                    setState({
                                        ...state,
                                        inputEmoji: { ...state.inputEmoji, value: "" },
                                    });
                                    setSubmitting(false);
                                });
                            }
                        } else {
                            setMsgNotifTopTime("Vous ne pouvez pas poster un message vide.", 5000);
                        }
                    } else {
                        setWaitingTimeError(true);
                    }
                }}
            >
                <SendIcon />
            </Button>
        </FormEmoji>
    );
}
