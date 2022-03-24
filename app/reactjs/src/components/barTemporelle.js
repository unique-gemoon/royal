import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import { Button } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BarTimer } from "../assets/styles/componentStyle";
import { ROLES } from "../config/vars";
import * as actionTypes from "../store/functions/actionTypes";

export default function BarTemporelle({ state, setState = () => { }, ...props }) {
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
    <BarTimer className={props.className}>
      <LinearProgress
        className="progressBar-item"
        variant="determinate"
        value={93}
      />
      <div className="bloc-timer-Bar">
        <Button
          onClick={() => {
            if(!checkIsConnected()){
                setState({ ...state, showModal: false })
            }
          }}
        >
          <RemoveIcon />
        </Button>
        <div className="content-timer-bar">
          <span className="timer-down">320</span>
          <div className="timer-item">
            <TimerOutlinedIcon /> 04 : 12 : 06
          </div>
          <span className="timer-up">400</span>
        </div>
        <Button
          onClick={() => {
            if(!checkIsConnected()){
                setState({ ...state, showModal: false })
            }
          }}
        >
          <AddIcon />
        </Button>
      </div>
    </BarTimer>
  );
}
