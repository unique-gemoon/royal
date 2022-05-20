import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  BlocActionButton,
  ButtonIcon,
} from "../../assets/styles/componentStyle";

export default function ButtonAction({
  children,
  className = "",
  icon = null,
  setCount = null,
  action,
  setAction = () => {},
  setMsgNotifTopTime = () => {},
  stateFolowersMessage,
  setFolowersMessage = () => { },
}) {
  const auth = useSelector((store) => store.auth);
  const [countNotif, setCountNotif] = useState(setCount);
  const containerRef = useRef(null);
  const sidebar = {
    open: {
      transition: {
        opacity: 1,
        duration: 0.15,
      },
    },
    closed: {
      transition: {
        opacity: 0,
        duration: 0.15,
      },
    },
  };

  const checkIsConnected = () => {
    if (auth.isConnected) {
      return true;
    } else {
      setMsgNotifTopTime("Vous devez être connecté pour pouvoir ajouter ou enlever du temps, publier, commenter, partager ou envoyer des messages",10000);
      return false;
    }
  };

  return (
    <BlocActionButton className={className}>
      <ButtonIcon
        className={`btn-white ${action.isOpen ? "isopen" : ""}`}
        onClick={() => {
          if (checkIsConnected()) {
            setAction({ ...action, isOpen: !action.isOpen });
            setTimeout(() => {
              setCountNotif("");
            }, 1000);
          }
          setFolowersMessage({ ...stateFolowersMessage, activeItem: false });
        }}
      >
        {icon}
        {countNotif ? <span className="count-notif">{countNotif}</span> : null}
      </ButtonIcon>
      {action.isOpen ? (
        <motion.div
          initial={false}
          variants={sidebar}
          animate={action.isOpen ? "open" : "closed"}
          ref={containerRef}
          className="content-button-action"
        >
          {children}
        </motion.div>
      ) : null}
    </BlocActionButton>
  );
}
