import CloseFullscreenTwoToneIcon from "@mui/icons-material/CloseFullscreenTwoTone";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import FormatSizeIcon from "@mui/icons-material/FormatSize";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import ImageIcon from "@mui/icons-material/Image";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import OpenInFullOutlinedIcon from "@mui/icons-material/OpenInFullOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Tooltip from "@mui/material/Tooltip";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import ArrowDownIcon from "../../assets/images/icons/ArrowDownIcon";
import BallotIcon from "../../assets/images/icons/ballotIcon";
import {
  DetailsItems,
  HeadContentItem,
  PlusIcon
} from "../../assets/styles/globalStyle";
import { useOutsideAlerter } from "../../helper/events";
import { useMediaQuery } from "react-responsive";
import moment from 'moment';

export default function HeadItem({
  item,
  state,
  setState,
  action,
  setAction = () => {},
  activeItem,
  setActiveItem = () => {},
  setMsgNotifTopTime = () => { },
  stateFolowersMessage,
  setFolowersMessage = () => { },
}) {

  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 540px)" });
  const [toggleProfile, setToggleProfile] = useState(false);
  const [statutFolower, setStatutFolower] = useState(item.statutAbonne);
  const [mediaIcons, setMediaIcons] = useState([]);
  const handleTooltipClose = () => {
    setToggleProfile(false);
  };

  const handleTooltipOpen = () => {
    setToggleProfile(!toggleProfile);
  };
  const auth = useSelector((store) => store.auth);

  const history = useHistory();

  const query = new URLSearchParams(useLocation().search);
  const pliId = query.get("pli") || null;

  useEffect(() => {
    if (pliId && item && item.id == pliId) {
      setState({ ...state, showModal: true, showComment: true , item});
      const cpAction = {
        ...action,
        notification: { ...action.notification, isOpen: false },
        folower: { ...action.folower, isOpen: false },
        search: { ...action.search, isOpen: false },
        messagerie: { ...action.messagerie, isOpen: false },
      };
      setAction(cpAction);
      history.push("/");
    }
  }, [pliId]);

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

  useEffect(() => {
    if (item) {
      let cpMediaIcons = [];
      if (item.content != "" || item.ouverture != "") {
        cpMediaIcons.push("description");
      }
      if (item.medias.length > 0) {
        for (let i = 0; i < item.medias.length; i++) {
          if (!cpMediaIcons.includes(item.medias[i].type)) {
            cpMediaIcons.push(item.medias[i].type);
          }
        }
      }
      setMediaIcons(cpMediaIcons);
    }
  }, [item]);

  const [showMediaIcons, setShowMediaIcons] = useState(false);

  const [CopyOpen, setCopyOpen] = useState(false);
  const handleCopyClose = () => {
    setCopyOpen(false);
  };

  const handleCopyOpen = () => {
    setCopyOpen(true);
  };

  const ref = useRef(null);
  useOutsideAlerter(ref, () => {
    setShowMediaIcons(false);
  });

  return (
    <HeadContentItem>
      <div className="bloc-content-item">
        <DetailsItems className={mediaIcons.length > 1 && "is-other-media"}>
          {mediaIcons.length > 0 &&
            mediaIcons.map((media, index) => (
              <div key={index}>
                {(index == 0 || isDesktopOrLaptop) && media === "description" && (
                  <div className="item-detail format-text-detail">
                    <FormatSizeIcon />
                  </div>
                )}
                {(index == 0 || isDesktopOrLaptop) && media === "music" && (
                  <div className="item-detail sound-detail">
                    <GraphicEqIcon />
                  </div>
                )}
                {(index == 0 || isDesktopOrLaptop) && media === "sondage" && (
                  <div className="item-detail sondage-detail">
                    <BallotIcon />
                  </div>
                )}
                {(index == 0 || isDesktopOrLaptop) && media === "image" && (
                  <div className="item-detail image-detail">
                    <ImageIcon />
                  </div>
                )}
                {(index == 0 || isDesktopOrLaptop) && media == "video" && (
                  <div className="item-detail video-detail">
                    <PlayArrowIcon />
                  </div>
                )}
              </div>
            ))}
          <div className="bloc-more-medias" ref={ref}>
            <div
              className={`mediaDetails ${showMediaIcons ? "showMedia" : ""}`}
            >
              {mediaIcons.length > 0 && !isDesktopOrLaptop &&
                mediaIcons.map((media, index) => (
                  <div key={index}>
                    {index > 0 ? (
                      <>
                        {showMediaIcons && media == "description" && (
                          <div className="item-detail format-text-detail">
                            <FormatSizeIcon />
                          </div>
                        )}
                        {showMediaIcons && media == "music" && (
                          <div className="item-detail sound-detail">
                            <GraphicEqIcon />
                          </div>
                        )}
                        {showMediaIcons && media == "sondage" && (
                          <div className="item-detail sondage-detail">
                            <BallotIcon />
                          </div>
                        )}
                        {showMediaIcons && media == "image" && (
                          <div className="item-detail image-detail">
                            <ImageIcon />
                          </div>
                        )}
                        {showMediaIcons && media == "video" && (
                          <div className="item-detail video-detail">
                            <PlayArrowIcon />
                          </div>
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
            </div>
            {mediaIcons.length > 1 && !isDesktopOrLaptop && (
              <div
                className={`item-detail more-media ${
                  showMediaIcons ? "is-showing" : ""
                }`}
                onClick={() => {
                  setShowMediaIcons(!showMediaIcons);
                }}
              >
                <PlusIcon />
              </div>
            )}
          </div>
        </DetailsItems>
        <div className="d-flex">
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <div className="user-info-tooltip">
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                className="tooltip-post"
                arrow
                onClose={handleTooltipClose}
                open={toggleProfile}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                placement="top"
                title={
                  <>
                    <div className="tooltip-info-post">
                      <span className="name-post">{item.user.username}</span>
                      <div className="detail-ifo-post">
                        <div className="folowers-post">
                          <p className="abonnes-post">
                            <span>{item.abonnes}</span>
                            abonnés
                          </p>
                          <p className="abonnes-post">
                            <span>{item.abonnes}</span>
                            abonnements
                          </p>
                        </div>
                        <div className="tooltip-btns-action">
                          <Button
                            onClick={() => {
                              if (!checkIsConnected()) {
                                setState({ ...state, showModal: false, item });
                              }
                              const cpAction = {
                                ...action,
                                notification: { ...action.notification, isOpen: false },
                                folower: { ...action.folower, isOpen: false },
                                search: { ...action.search, isOpen: false },
                                messagerie: { ...action.messagerie, isOpen: true },
                              };
                              setAction(cpAction);
                              setFolowersMessage({ ...stateFolowersMessage, activeItem: { id: 4} });
                              setState({ ...state, showModal: false });
                            }}
                            className="toggle-item-message"
                          >
                            <MailOutlineRoundedIcon />
                          </Button>
                          <Button
                            onClick={() => {
                              if (checkIsConnected()) {
                                setStatutFolower(!statutFolower);
                              } else {
                                setState({ ...state, showModal: false, item });
                              }
                            }}
                            className="btn-switch-folowers"
                          >
                            {statutFolower ? (
                              <>
                                S'abonner
                                <PersonAddAltOutlinedIcon />
                              </>
                            ) : (
                              <>
                                {" "}
                                Abonner
                                <PersonRemoveOutlinedIcon />
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>{" "}
                  </>
                }
              >
                <span className="name-post" onClick={handleTooltipOpen}>
                  {item.user.username}
                </span>
              </Tooltip>
            </div>
          </ClickAwayListener>
          <span className="timer-post"> {moment().diff(item.createdAt, 'hours')}h</span>
        </div>
      </div>
      <div className="option-item">
        {state.showModal ? (
          <div
            className="users-enligne-pli"
            onClick={() => {
              setState({ ...state, showModal: false, item });
            }}
          >
            {item?.countOpened ?item.countOpened: 0} <VisibilityIcon />{" "}
            <CloseFullscreenTwoToneIcon className="open-zoom-icon" />
          </div>
        ) : (
          <div
            className="users-enligne-pli"
            onClick={() => {
              setState({ ...state, showModal: true, showComment: true, item  });
              const cpAction = {
                ...action,
                notification: { ...action.notification, isOpen: false },
                folower: { ...action.folower, isOpen: false },
                search: { ...action.search, isOpen: false },
                messagerie: { ...action.messagerie, isOpen: false },
              };
              setAction(cpAction);
              setActiveItem((activeItem && activeItem.id == item.id) ? null : item);
            }}
          >
            {item?.countOpened ?item.countOpened: 0} <VisibilityIcon />{" "}
            <OpenInFullOutlinedIcon className="open-zoom-icon" />
          </div>
        )}
        <div
          className={`nb-message-comment ${
            (activeItem && activeItem.id == item.id) || state.showModal
              ? "comment-is-open"
              : ""
          }`}
          onClick={() => {
            if (state.showModal) {
              setState({ ...state, showModal: false, item });
            } else {
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
          3 <CommentOutlinedIcon /> <ArrowDownIcon />
        </div>
        <div className="btn-copy">
          <ClickAwayListener onClickAway={handleCopyClose}>
            <div className="default-tooltip">
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleCopyClose}
                open={CopyOpen}
                arrow
                leaveDelay={1000}
                title="lien du pli copié"
              >
                <InsertLinkIcon onClick={handleCopyOpen} />
              </Tooltip>
            </div>
          </ClickAwayListener>
        </div>
      </div>
    </HeadContentItem>
  );
}
