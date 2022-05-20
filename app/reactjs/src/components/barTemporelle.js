import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import { Button } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BarTimer } from "../assets/styles/componentStyle";
import endPoints from "../config/endPoints";
import connector from "../connector";
import { getInt, getPercentDuration } from "../helper/fonctions";

export default function BarTemporelle({
  item = {},
  setItem = {},
  showModal = false,
  setShowModal = () => {},
  action = {},
  setAction = () => {},
  activeItem = {},
  setActiveItem = () => {},
  setMsgNotifTopTime = () => {},
  ...props
}) {
  const [isPending, setIsPending] = useState(false);
  const auth = useSelector((store) => store.auth);

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

  const checkIsConnected = () => {
    if (auth.isConnected) {
      return true;
    } else {
      setMsgNotifTopTime(
        "Vous devez être connecté pour pouvoir ajouter ou enlever du temps, publier, commenter, partager ou envoyer des messages",
        10000
      );
      return false;
    }
  };

  const upTime = () => {
    if (item.appearances.alreadyUpdated) {
      return;
    }
    let hour, minute, second;
    [hour, minute, second] = String(item.duration).split(":");
    hour = getInt(hour);
    minute = getInt(minute);
    minute++;
    if (minute >= 60) {
      minute = 0;
      hour++;
    }
    saveTime({ signe: true });
  };

  const downTime = () => {
    if (item.appearances.alreadyUpdated) {
      return;
    }
    let hour, minute, second;
    [hour, minute, second] = String(item.duration).split(":");
    hour = getInt(hour);
    minute = getInt(minute);
    if (minute == 0) {
      if (hour > 0) {
        hour--;
        minute = 59;
      }
    } else {
      minute--;
    }
    saveTime({ signe: false });
  };

  return (
    <BarTimer className={props.className}>
      <LinearProgress
        className="progressBar-item"
        variant="determinate"
        value={getPercentDuration(item)}
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
