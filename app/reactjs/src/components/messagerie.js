import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  BlocMessagerie,
  ChatSpace,
  LoadingMessage,
  MessageFindFolower
} from "../assets/styles/componentStyle";
import ItemListFolower from "./itemListFolower";
import ItemSingleMessage from "./itemSingleMessage";
import ListMessagerie from "./listMessagerie";
import SpinnerLoading from "./spinnerLoading";
import Input from "./ui-elements/input";
import InputEmoji from "./ui-elements/inputEmoji";

export default function Messagerie({
  setMsgNotifTopTime = () => {},
  folowersMessage,
  setFolowersMessage = () => {},
  loadingMore = {},
  setLoadingMore = () => {},
  threads = [],
  setThreads = () => {},
}) {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const auth = useSelector((store) => store.auth);
  const [startScroll, setStartScroll] = useState(false);
  const ref = useRef(null);
  const [messages, setMessages] = useState([]);
  const [countNewMessages, setCountNewMessages] = useState(0);
  const [totalMessages, setTotalMessages] = useState(0);
  const [pageMessages, setPageMessages] = useState(1);

  const onScrollThreads = () => {
    const { scrollTop, scrollHeight, clientHeight } = ref.current;
    if (parseInt(scrollTop + clientHeight) === parseInt(scrollHeight)) {
      setLoadingMore({ ...loadingMore, threads: true });
    }
  };

  const onScrollTop = () => {
    const { scrollTop } = ref.current;
    if (parseInt(scrollTop) == 0) {
      setStartScroll(true);
    }
  };

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
    if (folowersMessage.activeItem) {
      getMessages(true);
      setTimeout(() => scrollChat(), 100);
    }
  }, [folowersMessage.activeItem]);


  
  useEffect(() => {
    if (auth.isConnected) {
      getMessages();
    } else {
      setMessages([]);
      setCountNewMessages(0);
      setTotalMessages(0);
      setPageMessages(1);
    }
  }, [pageMessages, auth.isConnected]);

  const getMessages = (refresh = false) => {
    if (folowersMessage?.activeItem?.thread?.id) {
      const cpPageMessages = refresh ? 1 : pageMessages;
      if (pageMessages != cpPageMessages) {
        setPageMessages(cpPageMessages);
      }
      connector({
        method: "get",
        url: `${endPoints.MESSAGE_LIST}?page=${cpPageMessages}&threadId=${folowersMessage.activeItem.thread.id}`,
        success: (response) => {
          setMessages(
            getUniqueList([...messages, ...response.data.messages], "id")
          );
          //setCountNewMessages(parseInt(response.data.totalNew));
          setTotalMessages(parseInt(response.data.total));
          setLoadingMore({ ...loadingMore, messages: false });
        },
        catch: (error) => {
          console.log(error);
        },
      });
    }
  };

  return (
    <BlocMessagerie>
      {!folowersMessage.activeItem && !folowersMessage.showSearchFolower ? (
        <div className="bloc-lists-messagerie">
          <div className="header-messagerie">
            <MailOutlineRoundedIcon /> Messages
          </div>
          <div className="content-messagerie">
            <div
              className="list-messagerie"
              onScroll={onScrollThreads}
              ref={ref}
            >
              <ListMessagerie
                threads={threads}
                setThreads={setThreads}
                folowersMessage={folowersMessage}
                setFolowersMessage={setFolowersMessage}
              />
              {loadingMore.threads && <SpinnerLoading />}
            </div>
          </div>

          <Button
            className="start-new-message"
            onClick={() => {
              setFolowersMessage({
                ...folowersMessage,
                activeItem: false,
                showSearchFolower: true,
              });
            }}
          >
            <ModeEditOutlineOutlinedIcon />
          </Button>
        </div>
      ) : null}
      {folowersMessage.activeItem ? (
        <div className="bloc-message-item">
          <div className="header-messagerie">
            <span
              className="back-to-list"
              onClick={(e) => {
                e.preventDefault();
                const cpState = { ...folowersMessage };
                cpState.activeItem = false;
                setFolowersMessage(cpState);
              }}
            >
              <KeyboardArrowLeftIcon />
            </span>
            <span className="name-messagerie">
              {folowersMessage.activeItem.nameItem}
            </span>
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
                onScroll={onScrollTop}
                ref={ref}
              >
                 {startScroll && <SpinnerLoading className="is-top-spinner"/>}
                <ItemSingleMessage
                  typeSend="user-send"
                  message="Hé bien test, j’ai emmené le chien au vétérinaire, et ça s’est avéré pas trop grave."
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
      {folowersMessage.showSearchFolower ? (
        <MessageFindFolower>
          <div className="header-messagerie">
            <span
              className="back-to-list"
              onClick={(e) => {
                e.preventDefault();
                const cpState = { ...folowersMessage };
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
              {...folowersMessage.search}
              onChange={(e) => {
                const cpState = { ...folowersMessage };
                cpState.search.value = e.target.value;
                setFolowersMessage(cpState);
                if (cpState.search.value.length >= 3) {
                  setFolowersMessage({
                    ...folowersMessage,
                    resultSearch: true,
                  });
                } else {
                  setFolowersMessage({
                    ...folowersMessage,
                    resultSearch: false,
                  });
                }
              }}
            />
          </div>
          <div className="header-info-search">
            <PeopleOutlineRoundedIcon /> Abonnements
          </div>
          {folowersMessage.resultSearch ? (
            <div className="content-search-results">
              <div className="list-result-search">
                {dataFolower.map((item, index) => (
                  <ItemListFolower
                    setMsgNotifTopTime={setMsgNotifTopTime}
                    folowersMessage={folowersMessage}
                    setFolowersMessage={setFolowersMessage}
                    shwoButtonMessage={false}
                    key={index}
                    item={item}
                  />
                ))}
              </div>
            </div>
          ) : null}
          <span className="name-messagerie">
            {folowersMessage.activeItem.name}
          </span>
        </MessageFindFolower>
      ) : (
        <p>No resultat</p>
      )}
    </BlocMessagerie>
  );
}
