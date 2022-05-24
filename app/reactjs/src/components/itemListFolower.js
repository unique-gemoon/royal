import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { ItemFolower } from "../assets/styles/componentStyle";
import endPoints from "../config/endPoints";
import connector from "../connector";
import { getMsgError } from "../helper/fonctions";

export default function ItemListFolower({
  stateFolowersMessage,
  setFolowersMessage = () => {},
  item,
  setItem = () => {},
  onClick,
  shwoButtonMessage = true,
  setMsgNotifTopTime = () => {},
}) {
  const [submitting, setSubmitting] = useState(false);

  const subscribe = () => {
    if (!submitting) {
      msgErrors({ submit: true });
      connector({
        method: "post",
        url: `${endPoints.USER_SUBSCRIVBE}`,
        data: { userId: item.id },
        success: (response) => {
          msgErrors({
            submit: false,
            msg: `Vous êtes désormais abonné à "${item.username}".`,
          });
          // refresh pli and item
          setItem({ ...item, isSubscribed: true });
        },
        catch: (error) => {
          msgErrors({ msg: getMsgError(error), submit: false });
        },
      });
    }
  };

  const unsubscribe = () => {
    if (!submitting) {
      msgErrors({ submit: true });
      connector({
        method: "post",
        url: `${endPoints.USER_UNSUBSCRIVBE}`,
        data: { userId: item.id },
        success: (response) => {
          msgErrors({
            submit: false,
            msg: `Vous êtes désormais désabonné de "${item.username}".`,
          });
          // refresh pli and item
          setItem({ ...item, isSubscribed: false });
        },
        catch: (error) => {
          msgErrors({ msg: getMsgError(error), submit: false });
        },
      });
    }
  };

  const msgErrors = (e) => {
    if (e.submit !== undefined) setSubmitting(e.submit);
    if (e.msg !== undefined) setMsgNotifTopTime(e.msg, 10000);
  };

  return (
    <ItemFolower key={item.id}>
      <span
        onClick={() => {
          setFolowersMessage({ ...stateFolowersMessage, activeItem: item });
        }}
      >
        {item.username}
      </span>
      <div className="option-item-folower">
        {shwoButtonMessage && (
          <Button className="toggle-item-message" onClick={onClick}>
            <MailOutlineRoundedIcon />
          </Button>
        )}
        {item.isSubscribed ? (
          <Button
            onClick={() => {
              unsubscribe();
            }}
            className="btn-switch-folowers"
          >
            <PersonRemoveOutlinedIcon />
          </Button>
        ) : (
          <Button
            onClick={() => {
              subscribe();
            }}
            className="btn-switch-folowers"
          >
            <PersonAddAltOutlinedIcon />
          </Button>
        )}
      </div>
    </ItemFolower>
  );
}
