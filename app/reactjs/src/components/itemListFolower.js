import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { ItemFolower } from "../assets/styles/componentStyle";
import endPoints from "../config/endPoints";
import connector from "../connector";
import { getMsgError } from "../helper/fonctions";
import { socket } from "./socket";

export default function ItemListFolower({
  folowersMessage,
  setFolowersMessage = () => {},
  item,
  setItem = () => {},
  onClick,
  shwoButtonMessage = true,
  setMsgNotifTopTime = () => {},
  threads = [],
  setThreads = () => {},
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
          setItem({
            ...item,
            isSubscribed: true,
            notification: response.data.notification,
          });
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
          setItem({
            ...item,
            isSubscribed: false,
            notification: response.data.notification,
          });
        },
        catch: (error) => {
          msgErrors({ msg: getMsgError(error), submit: false });
        },
      });
    }
  };

  const getThread = (item) => {
    connector({
      method: "post",
      url: endPoints.THREAD_NEW,
      data: { userId: item.id },
      success: (response) => {
        if (response.data?.thread) {
          const thread = {
            id: -1,
            userId: item.id,
            thread: {
              id: response.data.thread.id,
              messages: [],
            },
            user: {
              username: item.username,
            },
          };
          setFolowersMessage({
            ...folowersMessage,
            activeItem: thread,
          });

          //todo check thred
          let existe = false;
          for (let i = 0; i < threads.length; i++) {
            if (threads[i].thread.id === thread.thread.id) {
              existe = true;
              break;
            }
          }
          if (!existe) {
            setThreads([thread, ...threads]);
            socket.emit("CLIENT_THREAD", thread);
          }
        }
      },
      catch: (error) => {
        console.log(error);
      },
    });
  };

  const msgErrors = (e) => {
    if (e.submit !== undefined) setSubmitting(e.submit);
    if (e.msg !== undefined) setMsgNotifTopTime(e.msg, 5000);
  };

  return (
    <ItemFolower key={item.id}>
      <span
        onClick={() => {
          getThread(item);
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
