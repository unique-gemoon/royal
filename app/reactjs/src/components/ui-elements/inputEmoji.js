import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FormEmoji } from "../../assets/styles/componentStyle";
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
  setImTyping=() => {},
  ...props
}) {
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

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setOpen(state.inputEmoji.open);
  }, [state]);

  useEffect(() => {
    if(String(state.inputEmoji.value).length>0){
      setImTyping(true);
    }else{
      setImTyping(false);
    }
  }, [state.inputEmoji.value]);

  const auth = useSelector((store) => store.auth);

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

  return (
    <FormEmoji className={props.className}>
      <div className="content-form-emoji">
        <InputTextareaAutosize
          {...state.inputEmoji}
          onChange={(e) => {
            const cpState = { ...state };
            cpState.inputEmoji.value = e.target.value;
            setState(cpState);
          }}
          onClick={(e) => {
            if (!checkIsConnected()) {
              props.setState({ ...props.state, showModal: false });
            }
          }}
        />
        <Emojis
          inputEmoji={state.inputEmoji}
          setInputEmoji={(e) => setState({ ...state, inputEmoji: e })}
        />
      </div>

      <Button
        className="btn-send-emoji"
        onClick={(e) => {
          if (!checkIsConnected()) {
            props.setState({ ...props.state, showModal: false });
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
              setMsgNotifTopTime(
                "Vous ne pouvez pas poster un message vide.",
                5000
              );
            }
          }
        }}
      >
        <SendIcon />
      </Button>

      {waitingTime!=false && `0:0${waitingTime}`}
    </FormEmoji>
  );
}
