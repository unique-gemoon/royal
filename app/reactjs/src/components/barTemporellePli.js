import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import { Button } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BarTimer } from "../assets/styles/componentStyle";
import { ROLES } from "../config/vars";
import * as actionTypes from "../store/functions/actionTypes";

export default function BarTemporellePli({
  state = {},
  setState = () => {},
}) {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const [stateTime, setStateTime] = useState();

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

  const updateTime = (cpState) => {
    if (cpState?.duration) {
      const h =
        String(cpState.duration.hour).length == 1
          ? "0" + cpState.duration.hour
          : cpState.duration.hour;
      const m =
        String(cpState.duration.minute).length == 1
          ? "0" + cpState.duration.minute
          : cpState.duration.minute;
      const s =
        String(cpState.duration.second).length == 1
          ? "0" + cpState.duration.second
          : cpState.duration.second;
      setStateTime(h + ":" + m + ":" + s);
    }
  };

  useEffect(() => {
    updateTime(state);
  }, []);

  const upTime = () => {
    if(state.duration.disabled){
      return;
    }
    const cpState = { ...state };
    cpState.duration.minute++;
    if (cpState.duration.minute >= 60) {
      cpState.duration.minute = 0;
      cpState.duration.hour++;
    }
    cpState.duration.countUp++;
    setState(cpState);
    updateTime(cpState);
  };

  const downTime = () => {
    if(state.duration.disabled){
      return;
    }
    const cpState = { ...state };
    if (cpState.duration.minute == 0) {
      if (cpState.duration.hour > 0) {
        cpState.duration.hour--;
        cpState.duration.minute = 59;
      }
    } else {
      cpState.duration.minute--;
    }
    cpState.duration.countDown++;
    setState(cpState);
    updateTime(cpState);
  };

  return (
    <BarTimer>
      <LinearProgress
        className="progressBar-item"
        variant="determinate"
        value={100}
      />
      <div className="bloc-timer-Bar">
        <Button
          onClick={() => {
            if (checkIsConnected()) {
              downTime();
            }
          }}
        >
          <RemoveIcon />
        </Button>
        <div className="content-timer-bar">
          <span className="timer-down">{state?.duration?.countDown}</span>
          <div className="timer-item">
            <TimerOutlinedIcon /> {stateTime && (<span>{stateTime}</span>)}
          </div>
          <span className="timer-up">{state?.duration?.countUp}</span>
        </div>
        <Button
          onClick={() => {
            if (checkIsConnected()) {
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
