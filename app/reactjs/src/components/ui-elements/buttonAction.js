import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BlocActionButton,
  ButtonIcon,
} from "../../assets/styles/componentStyle";
import { ROLES } from "../../config/vars";
import * as actionTypes from "../../store/functions/actionTypes";

export default function ButtonAction({
  children,
  className = "",
  icon = null,
  setCount = null,
  action,
  setAction = () => {},
  setMsgNotifTopTime = () => {},
}) {
  const dispatch = useDispatch();
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
    if (auth.roles.includes(ROLES.ROLE_USER)) {
      return true;
    } else {
      setMsgNotifTopTime("Vous devez être connecté pour pouvoir ajouter ou enlever du temps, publier, commenter, partager ou envoyer des messages",10000);
      dispatch({
        type: actionTypes.TO_LOGIN,
        toLogin: true,
      });
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
