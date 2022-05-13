import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormEmoji } from "../../assets/styles/componentStyle";
import { ROLES } from "../../config/vars";
import * as actionTypes from "../../store/functions/actionTypes";
import Emojis from "../emojis";
import InputTextareaAutosize from "./inputTextareaAutosize";

export default function InputEmoji({
  name,
  placeholder,
  typeInput,
  open,
  setOpen = () => {},
  setMsgNotifTopTime  = () => {},
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

  useEffect(() => {
    setOpen(state.inputEmoji.open);
  }, [state]);

  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);

  const checkIsConnected = () => {
    if (auth.roles.includes(ROLES.ROLE_USER)) {
      return true;
    } else {
      setMsgNotifTopTime(
        "Vous devez être connecté pour pouvoir ajouter ou enlever du temps, publier, commenter, partager ou envoyer des messages",
        10000
      );
      dispatch({
        type: actionTypes.TO_LOGIN,
        toLogin: true,
      });
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
          }
        }}
      >
        <SendIcon />
      </Button>
    </FormEmoji>
  );
}
