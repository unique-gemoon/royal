import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormEmoji } from "../../assets/styles/componentStyle";
import Input from "./input";
import SendIcon from "@mui/icons-material/Send";
import Emojis from "../emojis";
import { useDispatch, useSelector } from "react-redux";
import { ROLES } from "../../config/vars";
import * as actionTypes from "../../store/functions/actionTypes";

export default function InputEmoji({
  name,
  placeholder,
  typeInput,
  open,
  setOpen = () => {},
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
        <Input
          {...state.inputEmoji}
          onChange={(e) => {
            const cpState = { ...state };
            cpState.inputEmoji.value = e.target.value;
            setState(cpState);
          }}
          onClick={() => {
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

      <Button className="btn-send-emoji">
        <SendIcon />
      </Button>
    </FormEmoji>
  );
}
