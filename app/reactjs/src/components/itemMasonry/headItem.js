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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArrowDownIcon from "../../assets/images/icons/ArrowDownIcon";
import BallotIcon from "../../assets/images/icons/ballotIcon";
import { DetailsItems, HeadContentItem, PlusIcon } from "../../assets/styles/globalStyle";
import { ROLES } from "../../config/vars";
import * as actionTypes from "../../store/functions/actionTypes";

export default function HeadItem({
  item,
  state,
  setState,
  action,
  setAction = () => { },
  activeItem,
  setActiveItem = () => { },
}) {
  const [toggleProfile, setToggleProfile] = useState(false);
  const [statutFolower, setStatutFolower] = useState(item.statutAbonne);
  const [allMedia, setAllMedia] = useState([]);
  const handleTooltipClose = () => {
    setToggleProfile(false);
  };

  const handleTooltipOpen = () => {
    setToggleProfile(!toggleProfile);
  };
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

  useEffect(() => {
    if (item) {
      let cpAllMedia = [];
      if ((item.nv1.description && (item.nv1.media && !item.nv1.media.soundage)) ||
        (item.nv2 && item.nv2.description)) {
        cpAllMedia.push("description");
      }

      if ((item.nv1.media && item.nv1.media.music) || (item.nv2 && item.nv2.media.music)) {
        cpAllMedia.push("music");
      }

      if ((item.nv1.media && item.nv1.media.soundage) || (item.nv2 && item.nv2.media.soundage)) {
        cpAllMedia.push("soundage");
      }

      if ((item.nv1.media && item.nv1.media.photos) || (item.nv2 && item.nv2.media.photos)) {
        cpAllMedia.push("photos");
      }

      if ((item.nv1.media && item.nv1.media.video) || (item.nv2 && item.nv2.media.video)) {
        cpAllMedia.push("video");
      }
      setAllMedia(cpAllMedia);
    }
  }, [item]);


  const [showAllMedia, setShowAllMedia] = useState(false);


  const [CopyOpen, setCopyOpen] = useState(false);
  const handleCopyClose = () => {
    setCopyOpen(false);
  };

  const handleCopyOpen = () => {
    setCopyOpen(true);
  };
  return (
    <HeadContentItem>
      <div className="bloc-content-item">
        <DetailsItems>
          {allMedia.length && allMedia.map((media, index) => (

            <div key={index}>
              {(index == 0) && media == "description" && (
                <div className="item-detail format-text-detail">
                  <FormatSizeIcon />
                </div>
              )}
              {(index == 0) && media == "music" && (
                <div className="item-detail sound-detail">
                  <GraphicEqIcon />
                </div>
              )}
              {(index == 0) && media == "soundage" && (
                <div className="item-detail soundage-detail">
                  <BallotIcon />
                </div>
              )}
              {(index == 0) && media == "photos" && (
                <div className="item-detail image-detail">
                  <ImageIcon />
                </div>
              )}
              {(index == 0) && media == "video" && (
                <div className="item-detail video-detail">
                  <PlayArrowIcon />
                </div>
              )}
            </div>
          ))
          }
          <div className={`mediaDetails ${showAllMedia ? "showMedia" : ""}`}>
            {allMedia.length && allMedia.map((media, index) => (

              <div key={index}>

                {index > 0 ? (<>
                  {showAllMedia && media == "description" && (
                    <div className="item-detail format-text-detail">
                      <FormatSizeIcon />
                    </div>
                  )}
                  {showAllMedia && media == "music" && (
                    <div className="item-detail sound-detail">
                      <GraphicEqIcon />
                    </div>
                  )}
                  {showAllMedia && media == "soundage" && (
                    <div className="item-detail soundage-detail">
                      <BallotIcon />
                    </div>
                  )}
                  {showAllMedia && media == "photos" && (
                    <div className="item-detail image-detail">
                      <ImageIcon />
                    </div>
                  )}
                  {showAllMedia && media == "video" && (
                    <div className="item-detail video-detail">
                      <PlayArrowIcon />
                    </div>
                  )}
                </>) : ""}
              </div>
            ))
            }
          </div>
          {allMedia.length > 1 && (<div className={`item-detail more-media ${showAllMedia ? "is-showing" : ""}`} onClick={() => { setShowAllMedia(!showAllMedia) }}><PlusIcon /></div>)}

        </DetailsItems>
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
                    <span className="name-post">{item.namePost}</span>
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
                              setState({ ...state, showModal: false });
                            }
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
                              setState({ ...state, showModal: false });
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
                {item.namePost}
              </span>
            </Tooltip>
          </div>
        </ClickAwayListener>
        <span className="timer-post"> . 12</span>
      </div>
      <div className="option-item">
        {state.showModal ? (
          <div
            className="users-enligne-pli"
            onClick={() => {
              setState({ ...state, showModal: false });
            }}
          >
            13 <VisibilityIcon />{" "}
            <CloseFullscreenTwoToneIcon className="open-zoom-icon" />
          </div>
        ) : (
          <div
            className="users-enligne-pli"
            onClick={() => {
              state && setState({ ...state, showModal: true, showComment: true });
              const cpAction = {
                ...action,
                notification: { ...action.notification, isOpen: false },
                folower: { ...action.folower, isOpen: false },
                search: { ...action.search, isOpen: false },
                messagerie: { ...action.messagerie, isOpen: false },
              };
              setAction(cpAction);
              // setActiveItem((activeItem && activeItem.id == item.id) ? null : item);
            }}
          >
            14 <VisibilityIcon />{" "}
            <OpenInFullOutlinedIcon className="open-zoom-icon" />
          </div>
        )}
        <div
          className={`nb-message-comment ${(activeItem && activeItem.id == item.id) || state.showModal ? "comment-is-open" : ""}`}
          onClick={() => {
            if (state.showModal) {
              setState({ ...state, showModal: false });
            } else {
              const cpAction = {
                ...action,
                notification: { ...action.notification, isOpen: false },
                folower: { ...action.folower, isOpen: false },
                search: { ...action.search, isOpen: false },
                messagerie: { ...action.messagerie, isOpen: false },
              };
              setAction(cpAction);
              setActiveItem((activeItem && activeItem.id == item.id) ? null : item);
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
                title="Copier Pli"
              >
                <InsertLinkIcon onClick={handleCopyOpen} />
              </Tooltip>
            </div>
            </ClickAwayListener>
        </div>
      </div>
      {/* <HeadOptionItem item={item} setItem={setItem} />  */}
    </HeadContentItem>
  );
}
