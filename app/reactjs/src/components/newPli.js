import AddIcon from "@mui/icons-material/Add";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import RemoveIcon from "@mui/icons-material/Remove";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { BlocAddPli } from "../assets/styles/componentStyle";
import endPoints from "../config/endPoints";
import { ROLES } from "../config/vars";
import connector from "../connector";
import { useOutsideAlerter } from "../helper/events";
import { getMsgError } from "../helper/fonctions";
import * as actionTypes from "../store/functions/actionTypes";
import AddSondage from "./addSondage";
import BarTemporelle from "./barTemporelle";
import ErrorFormMessage from "./errorFormMessage";
import NewOuvertureOptions from "./newOuvertureOptions";
import NewPliOptions from "./newPliOptions";
import ButtonDef from "./ui-elements/buttonDef";
import CountDown from "./ui-elements/countDown";
import InputTextareaAutosize from "./ui-elements/inputTextareaAutosize";

export default function NewPli({
  action,
  setAction = () => {},
  setMsgNotifTop = () => {},
}) {
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 768px)" });
  const [state, setState] = useState({
    inputEmoji: {
      name: "message-input",
      placeholder: "Que veux-tu dire, Lys ?",
      value: "",
      type: "text",
      as: "textarea",
      open: false,
      error: false,
    },
    inputEmojiOuverture: {
      name: "content-pli2",
      placeholder: "Que veux-tu dire, Lys ?",
      value: "",
      open: false,
      error: false,
    },
    sondage: {
      name: "sondage",
      value: [],
      maxOptions: 4,
      open: false,
      error: false,
    },
    sondageOuverture: {
      name: "sondageOuverture",
      value: [],
      maxOptions: 6,
      open: false,
      error: false,
    },
    media: {
      images: {
        name: "images",
        id: "file-images-nv1",
        type: "file",
        accept: "image/jpeg, image/png",
        multiple: true,
        value: [],
        file: [],
        maxFiles: 4,
      },
      video: {
        name: "video",
        id: "file-video-nv1",
        type: "file",
        accept: "video/mp4,video/x-m4v,video/*",
        multiple: false,
        value: [],
        file: [],
        maxFiles: 1,
      },
      music: {
        name: "music",
        id: "file-music-nv1",
        type: "file",
        accept: "audio/mpeg",
        multiple: false,
        value: [],
        file: [],
        maxFiles: 1,
      },
    },
    mediaOuverture: {
      images: {
        name: "images",
        id: "file-images-nv2",
        accept: "image/jpeg, image/png",
        icon: "img",
        multiple: true,
        value: [],
        file: [],
        maxFiles: 40,
      },
      video: {
        name: "video",
        id: "file-video-nv2",
        accept: "video/mp4,video/x-m4v,video/*",
        icon: "mp4",
        multiple: true,
        value: [],
        file: [],
        maxFiles: 10,
      },
      music: {
        name: "music",
        id: "file-music-nv2",
        accept: "audio/mpeg",
        icon: "mp3",
        multiple: true,
        value: [],
        file: [],
        maxFiles: 10,
      },
    },
    duration: {
      hour: 0,
      minute: 1,
      second: 0,
      countDown: 0,
      countUp: 0,
    },
    dragOpen: true,
  });

  const [togglePli, setTogglePli] = useState(false);

  const divRef = useRef();
  const handler = useCallback(() => setTogglePli(false), []);
  useOutsideAlerter(divRef, handler);
  useEffect(() => {
    if (togglePli) {
      document.body.classList.add("add-pli-showing");
    } else {
      document.body.classList.remove("add-pli-showing");
    }
  }, [togglePli]);

  const [addOuverture, setAddOuverture] = useState(false);
  const [message, setMessage] = useState(true);
  const [submitting, setSubmitting] = useState(false);
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

  const getMediaFiles = (name) => {
    return state.media[name].file.filter((f) => f !== "" && f !== null);
  };
  const getMediaOuvertureFiles = (name) => {
    return state.mediaOuverture[name].file.filter(
      (f) => f !== "" && f !== null
    );
  };

  const submitPli = (e) => {
    e.preventDefault();
    if (!submitting) {
      let files = [];
      const data = new FormData();

      data.append("content", state.inputEmoji.value);
      data.append("contentOuverture", state.inputEmoji.value);
      data.append(
        "duration",
        state.duration.hour +
          ":" +
          state.duration.minute +
          ":" +
          state.duration.second
      );

      for (let i = 0; i < state.sondage.value.length; i++) {
        data.append("sondage", JSON.stringify(state.sondage.value[i]));
      }

      for (let i = 0; i < state.sondageOuverture.value.length; i++) {
        data.append(
          "sondageOuverture",
          JSON.stringify(state.sondageOuverture.value[i])
        );
      }

      files = getMediaFiles("images");
      for (let i = 0; i < files.length; i++) {
        data.append("images", files[i]);
      }
      files = getMediaFiles("video");
      for (let i = 0; i < files.length; i++) {
        data.append("video", files[i]);
      }
      files = getMediaFiles("music");
      for (let i = 0; i < files.length; i++) {
        data.append("music", files[i]);
      }

      files = getMediaOuvertureFiles("images");
      for (let i = 0; i < files.length; i++) {
        data.append("imagesOuverture", files[i]);
      }
      files = getMediaOuvertureFiles("video");
      for (let i = 0; i < files.length; i++) {
        data.append("videoOuverture", files[i]);
      }
      files = getMediaOuvertureFiles("music");
      for (let i = 0; i < files.length; i++) {
        data.append("musicOuverture", files[i]);
      }

      connector({
        method: "post",
        url: `${endPoints.PLI}/new`,
        data,
        success: (response) => {
          console.log(response);

          msgErrors({ submit: false });
        },
        catch: (error) => {
          msgErrors({ msg: getMsgError(error), submit: false });
        },
      });

      msgErrors({ submit: true });
      //Veuillez ajouter du contenu à votre pli.
    }
  };

  const msgErrors = (e) => {
    if (e.msg !== undefined) setMessage(e.msg);
    const cpState = { ...state };
    if (e.inputEmoji !== undefined) cpState.inputEmoji.error = e.inputEmoji;
    if (e.submit !== undefined) setSubmitting(e.submit);
    setState(cpState);
  };

  return (
    <BlocAddPli>
      <div className={`bloc-new-pli ${togglePli ? "showing-new-pli" : ""}`}>
        <div className="cadre-content-new-pli">
          <form className="form-new-pli" onSubmit={submitPli}>
            <div className="content-new-pli" ref={divRef}>
              {message && (
                <ErrorFormMessage
                  text={message}
                  onClick={() => setMessage(null)}
                />
              )}
              <div className="new-pli-nv1">
                <div className="cadre-content-pli">
                  <InputTextareaAutosize
                    {...state.inputEmoji}
                    onChange={(e) => {
                      const cpState = { ...state };
                      if (e.target.value.length <= 280) {
                        cpState.inputEmoji.value = e.target.value;
                        setState(cpState);
                      }
                    }}
                  />
                  {state.sondage.open && (
                    <AddSondage
                      maxOption={state.sondage.maxOptions}
                      sondage={state.sondage}
                      setSondage={(e) => {
                        console.log("setSondage", e);
                        setState({
                          ...state,
                          sondage: e,
                        });
                      }}
                      showSondage={state.sondage.open}
                      setShowSondage={(e) => {
                        setState({
                          ...state,
                          sondage: { ...state.sondage, open: e },
                        });
                      }}
                    />
                  )}
                  <div className="bloc-footer">
                    <NewPliOptions
                      state={state}
                      setState={setState}
                      setMessage={setMessage}
                    />
                    <div className="count-publish-pli1">
                      <CountDown
                        maxCount={280}
                        setState={
                          (state.inputEmoji.value ? state.inputEmoji.value : "")
                            .length
                        }
                      />
                      {!addOuverture && (
                        <div className="bloc-btn-publish">
                          <ButtonDef
                            spinner={submitting}
                            textButton={"Publier"}
                            className="btn-publish"
                            icon={<SendRoundedIcon />}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <BarTemporelle state={state} setState={setState} />
              </div>
              {addOuverture && (
                <div className="new-pli-nv2">
                  <div className="cadre-content-pli">
                    <NewOuvertureOptions
                      state={state}
                      setState={setState}
                      setMessage={setMessage}
                      submitting={submitting}
                    />
                  </div>
                </div>
              )}
              <div
                className="toggle-open-ouverture"
                onClick={() => setAddOuverture(!addOuverture)}
              >
                {!addOuverture ? (
                  <>
                    Ajouter une ouverture <AddIcon />
                  </>
                ) : (
                  <>
                    Supprimer l'ouverture <RemoveIcon />
                  </>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      {togglePli === false && (
        <div
          onClick={() => {
            if (checkIsConnected()) {
              setMsgNotifTop(null);
              setTogglePli(true);
              const cpAction = {
                ...action,
                notification: { ...action.notification, isOpen: false },
                folower: { ...action.folower, isOpen: false },
                search: { ...action.search, isOpen: false },
                messagerie: { ...action.messagerie, isOpen: false },
              };
              setAction(cpAction);
            }
          }}
          className="toggled-new-pli"
        >
          {isDesktopOrLaptop ? (
            <KeyboardArrowUpIcon />
          ) : (
            <AddCircleOutlineOutlinedIcon />
          )}
        </div>
      )}

      {togglePli && (
        <div className="toggled-new-pli open-pli">
          {isDesktopOrLaptop ? (
            <KeyboardArrowUpIcon />
          ) : (
            <AddCircleOutlineOutlinedIcon />
          )}
        </div>
      )}
    </BlocAddPli>
  );
}
