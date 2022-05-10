import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import { Button } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BarTimer } from "../assets/styles/componentStyle";
import { ROLES } from "../config/vars";
import { getTime } from "../helper/fonctions";
import * as actionTypes from "../store/functions/actionTypes";

export default function BarTemporelle({
  item = {},
  setItem = {},
  showModal = false,
  setShowModal = () => {},
  action = {},
  setAction = () => {},
  activeItem = {},
  setActiveItem = () => {},
  ...props
}) {
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

  const upTime = () => {
    if (item.appearances.alreadyUpdated) {
      return;
    }
    let hour, minute, second;
    [hour, minute, second] = String(item.duration).split(":");
    hour = parseInt(hour);
    minute = parseInt(minute);
    minute++;
    if (minute >= 60) {
      minute = 0;
      hour++;
    }
    setItem({
      ...item,
      duration: getTime(hour, minute , second),
      appearances: {
        ...item.appearances,
        countUp: parseInt(item.appearances.countUp) + 1,
        alreadyUpdated: true,
        signe: true,
      },
    });
  };

  const downTime = () => {
    if (item.appearances.alreadyUpdated) {
      return;
    }
    let hour, minute, second;
    [hour, minute, second] = String(item.duration).split(":");
    hour = parseInt(hour);
    minute = parseInt(minute);
    if (minute == 0) {
      if (hour > 0) {
        hour--;
        minute = 59;
      }
    } else {
      minute--;
    }
    setItem({
      ...item,
      duration: getTime(hour, minute ,second),
      appearances: {
        ...item.appearances,
        countDown: parseInt(item.appearances.countDown) + 1,
        alreadyUpdated: true,
        signe: false,
      },
    });
  };

  return (
    <BarTimer className={props.className}>
      <LinearProgress
        className="progressBar-item"
        variant="determinate"
        value={100}
      />
      <div className="bloc-timer-Bar">
        <Button
          className={`${
            item.appearances.alreadyUpdated && !item.appearances.signe
              ? "active"
              : ""
          }`}
          onClick={() => {
            if (!checkIsConnected()) {
              const cpAction = {
                ...action,
                notification: { ...action.notification, isOpen: false },
                folower: { ...action.folower, isOpen: false },
                search: { ...action.search, isOpen: false },
                messagerie: { ...action.messagerie, isOpen: false },
              };
              setAction(cpAction);
              setShowModal(false);
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
            if (!showModal) {
              const cpAction = {
                ...action,
                notification: { ...action.notification, isOpen: false },
                folower: { ...action.folower, isOpen: false },
                search: { ...action.search, isOpen: false },
                messagerie: { ...action.messagerie, isOpen: false },
              };
              setAction(cpAction);
              setActiveItem(
                activeItem && activeItem.id == item.id ? null : item
              );
            }
          }}
        >
          <span className="timer-down">{item?.appearances?.countDown}</span>
          <div className="timer-item">
            <TimerOutlinedIcon /> <span>{item?.duration}</span>
          </div>
          <span className="timer-up">{item?.appearances?.countUp}</span>
        </div>
        <Button
          className={`${
            item.appearances.alreadyUpdated && item.appearances.signe
              ? "active"
              : ""
          }`}
          onClick={() => {
            if (!checkIsConnected()) {
              const cpAction = {
                ...action,
                notification: { ...action.notification, isOpen: false },
                folower: { ...action.folower, isOpen: false },
                search: { ...action.search, isOpen: false },
                messagerie: { ...action.messagerie, isOpen: false },
              };
              setAction(cpAction);
              setShowModal(false);
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
