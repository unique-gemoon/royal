import React, { useState } from "react";
import {
  BlocMessagerie,
  ChatSpace,
  LoadingMessage,
  MessageFindFolower,
} from "../assets/styles/componentStyle";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListMessagerie from "./listMessagerie";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InputEmoji from "./ui-elements/inputEmoji";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Input from "./ui-elements/input";
import ItemListFolower from "./itemListFolower";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import ItemSingleMessage from "./itemSingleMessage";
import { useEffect } from "react";

export default function Messagerie({ 
  setMsgNotifTopTime = () => {},
  stateFolowersMessage,
  setFolowersMessage = () => { },
 }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [dataListMessage, setDataListMessage] = useState([
    {
      id: 1,
      name: "Fossum",
      etat: "reading",
      timer: "20h",
      lastMesssage:
        "Hé bien, j’ai emmené le chien au vétérinaire, et ça s’est avéré...",
      newMessage: false,
    },
    {
      id: 2,
      name: "Ellie",
      etat: "send",
      timer: "1jour",
      lastMesssage: "Oui ça va. Et tiu ?",
      newMessage: false,
    },
    {
      id: 3,
      name: "Jacquou",
      timer: "11.09.2020",
      lastMesssage: "J’ai vu ta dernière publication sur la page universelle !",
      newMessage: true,
    },
    {
      id: 4,
      name: "Lou",
      timer: "10.08.2020",
      lastMesssage: "Oui tout est assez calme récemment",
      newMessage: false,
    },
  ]);
  const [dataFolower, setDataFolower] = useState([
    {
      id: 4,
      name: "LangNickname",
      idMessanger: 12,
      statut: 0,
    },
    {
      id: 5,
      name: "Elly",
      idMessanger: 12,
      statut: 0,
    },
    {
      id: 6,
      name: "LangNickname",
      idMessanger: 12,
      statut: 0,
    },
    {
      id: 7,
      name: "Elly",
      idMessanger: 12,
      statut: 0,
    },
    {
      id: 8,
      name: "LangNickname",
      idMessanger: 12,
      statut: 0,
    },
    {
      id: 9,
      name: "Elly",
      idMessanger: 12,
      statut: 0,
    },
  ]);
  const scrollChat = () => {
    const container = document.getElementById("messages-container");
    if (container) container.scrollTop = container.scrollHeight;
  };
  useEffect(() => {
    if (stateFolowersMessage.activeItem) {
      setTimeout(() => scrollChat(), 100);
    }
  }, [stateFolowersMessage.activeItem]);
  return (
    <BlocMessagerie>
      {!stateFolowersMessage.activeItem && !stateFolowersMessage.showSearchFolower ? (
        <div className="bloc-lists-messagerie">
          <div className="header-messagerie">
            <MailOutlineRoundedIcon /> Messages
          </div>
          <div className="content-messagerie">
            <div className="list-messagerie">
              <ListMessagerie
                data={dataListMessage}
                setData={setDataListMessage}
                stateFolowersMessage={stateFolowersMessage}
                setFolowersMessage={setFolowersMessage}
              />
            </div>
          </div>

          <Button
            className="start-new-message"
            onClick={() => {
              setFolowersMessage({
                ...stateFolowersMessage,
                activeItem: false,
                showSearchFolower: true,
              });
            }}
          >
            <ModeEditOutlineOutlinedIcon />
          </Button>
        </div>
      ) : null}
      {stateFolowersMessage.activeItem ? (
        <div className="bloc-message-item">
          <div className="header-messagerie">
            <span
              className="back-to-list"
              onClick={(e) => {
                e.preventDefault();
                const cpState = { ...stateFolowersMessage };
                cpState.activeItem = false;
                setFolowersMessage(cpState);
              }}
            >
              <KeyboardArrowLeftIcon />
            </span>
            <span className="name-messagerie">{stateFolowersMessage.activeItem.nameItem}</span>
            <div>
              <Button
                id="demo-positioned-button"
                aria-controls={open ? "menu-option-message" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                className="btn-option-message"
              >
                <MoreVertIcon />
              </Button>
              <Menu
                id="menu-option-message"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                anchorOrigin={{
                  vertical: -14,
                  horizontal: 33,
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                {" "}
                <span className="close-drop-menu" onClick={() => handleClose}>
                  <MoreVertIcon />
                </span>
                <MenuItem onClick={handleClose}>Bloquer</MenuItem>
              </Menu>
            </div>
          </div>
          <div className="bloc-view-message">
            <ChatSpace>
              <div
                className="content-space-chat show-typing"
                id="messages-container"
              >
                <ItemSingleMessage
                  typeSend="user-send"
                  message="Hé bien, j’ai emmené le chien au vétérinaire, et ça s’est avéré pas trop grave."
                  date="Hier . 19:20"
                  stautVu="vuReading"
                />
                <ItemSingleMessage message="Oui, alors ?" date="Hier . 19:30" />
                <ItemSingleMessage
                  typeSend="user-send"
                  message="Hé bien, j’ai emmené le chien au vétérinaire, et ça s’est avéré pas trop grave."
                  date="Hier . 19:20"
                  stautVu="vuResent"
                />
                <ItemSingleMessage message="Oui, alors ?" date="Hier . 19:30" />
                <ItemSingleMessage
                  typeSend="user-send"
                  message="Hé bien, j’ai emmené le chien au vétérinaire, et ça s’est avéré pas trop grave."
                  date="Hier . 19:20"
                  stautVu="vuSend"
                />
                <ItemSingleMessage message="Oui, alors ?" date="Hier . 19:30" />

                <div className="d-flex justify-content-start is-teyping">
                  <div className="msg_cotainer">
                    <div className="content-msg">
                      <LoadingMessage>
                        <li></li>
                        <li></li>
                        <li></li>
                      </LoadingMessage>
                    </div>
                  </div>
                </div>
              </div>
            </ChatSpace>
            <InputEmoji
              typeInput="textarea"
              setMsgNotifTopTime={setMsgNotifTopTime}
              setFolowersMessage={setFolowersMessage}
            />
          </div>
        </div>
      ) : null}
      {stateFolowersMessage.showSearchFolower ? (
        <MessageFindFolower>
          <div className="header-messagerie">
            <span
              className="back-to-list"
              onClick={(e) => {
                e.preventDefault();
                const cpState = { ...stateFolowersMessage };
                cpState.showSearchFolower = false;
                setFolowersMessage(cpState);
              }}
            >
              <KeyboardArrowLeftIcon />
            </span>
            <span className="title-find-distin">
              <ModeEditOutlineOutlinedIcon /> Trouver un destinataire
            </span>
          </div>
          <div className="bloc-search-folower">
            <SearchRoundedIcon />
            <Input
              {...stateFolowersMessage.search}
              onChange={(e) => {
                const cpState = { ...stateFolowersMessage };
                cpState.search.value = e.target.value;
                setFolowersMessage(cpState);
                if (cpState.search.value.length >= 3) {
                  setFolowersMessage({ ...stateFolowersMessage, resultSearch: true });
                } else {
                  setFolowersMessage({ ...stateFolowersMessage, resultSearch: false });
                }
              }}
            />
          </div>
          <div className="header-info-search">
            <PeopleOutlineRoundedIcon /> Abonnements
          </div>
          {stateFolowersMessage.resultSearch ? (
            <div className="content-search-results">
              <div className="list-result-search">
                {dataFolower.map((item,index) => (
                  <ItemListFolower
                    setMsgNotifTopTime={setMsgNotifTopTime}
                    stateFolowersMessage={stateFolowersMessage}
                    setFolowersMessage={setFolowersMessage}
                    shwoButtonMessage={false}
                    key={index}
                    item={item}
                  />
                ))}
              </div>
            </div>
          ) : null}
          <span className="name-messagerie">{stateFolowersMessage.activeItem.name}</span>
        </MessageFindFolower>
      ) : (
        <p>No resultat</p>
      )}
    </BlocMessagerie>
  );
}
