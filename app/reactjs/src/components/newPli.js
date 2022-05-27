import AddIcon from "@mui/icons-material/Add";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { LinearProgress } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { BlocAddPli, BarTimerPli } from "../assets/styles/componentStyle";
import endPoints from "../config/endPoints";
import connector from "../connector";
import { useOutsideAlerter } from "../helper/events";
import { getMsgError, getPercentDuration } from "../helper/fonctions";
import AddSondage from "./addSondage";
import BarTemporellePli from "./barTemporellePli";
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
  setMsgNotifTopTime = () => {},
  setItem = () => {},
  publishPli,
  setPublishPli = () => {},
}) {
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 768px)" });
  const auth = useSelector((store) => store.auth);

  const [state, setState] = useState({
    inputEmoji: {
      name: "message-input",
      placeholder: `Que veux-tu dire, ${auth?.user?.username} ?`,
      value: "",
      type: "text",
      as: "textarea",
      open: false,
      error: false,
    },
    inputEmojiOuverture: {
      name: "content-pli2",
      placeholder: `Que veux-tu dire, ${auth?.user?.username} ?`,
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
      hour: 1,
      minute: 0,
      second: 0,
      countDown: 0,
      countUp: 0,
      disabled: true,
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
  const [message, setMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const checkIsConnected = () => {
    if (auth.isConnected) {
      return true;
    } else {
      setMsgNotifTopTime(
        "Vous devez être connecté pour pouvoir ajouter ou enlever du temps, publier, commenter, partager ou envoyer des messages",
        5000
      );
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

  const getDurationTime = () => {
    if (state.duration) {
      const h =
        String(state.duration.hour).length == 1
          ? "0" + state.duration.hour
          : state.duration.hour;
      const m =
        String(state.duration.minute).length == 1
          ? "0" + state.duration.minute
          : state.duration.minute;
      const s =
        String(state.duration.second).length == 1
          ? "0" + state.duration.second
          : state.duration.second;
      return h + ":" + m + ":" + s;
    }
    return null;
  };

  const submitPli = (e) => {
    e.preventDefault();
    if (!submitting) {
      msgErrors({ submit: true, msg: null });

      if (state.inputEmoji.value || state.sondage.value.length) {
        let files = [];
        const data = new FormData();

        data.append("content", state.inputEmoji.value);
        data.append("contentOuverture", state.inputEmojiOuverture.value);
        data.append("duration", getDurationTime());

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
          url: endPoints.PLI_NEW,
          data,
          success: (response) => {
            msgErrors({ submit: false });
            clearPli();
            setMsgNotifTopTime(
              "Votre pli a bien été publié sur la page universelle ! Il reste 1 heure avant qu’il ne disparaisse si aucun délai supplémentaire ne lui est ajouté ou enlevé par les utilisateurs.",
              5000
            );
            setTogglePli(false);
            setPublishPli(response.data.pli);
            setItem({
              ...response.data.pli,
              action: "create",
              subscribers: response.data.subscribers,
            });
          },
          catch: (error) => {
            msgErrors({ msg: getMsgError(error), submit: false });
          },
        });
      } else {
        const msg = "Veuillez ajouter du contenu à votre pli.";
        msgErrors({ submit: false, msg });
      }
    }
  };

  const clearPli = () => {
    let cpState = { ...state };
    cpState.inputEmoji = {
      ...cpState.inputEmoji,
      value: "",
      open: false,
      error: false,
    };
    cpState.sondage = {
      ...cpState.sondage,
      value: [],
      open: false,
      error: false,
    };
    cpState.media.images = {
      ...cpState.media.images,
      value: [],
      file: [],
      error: false,
    };
    cpState.media.video = {
      ...cpState.media.video,
      value: [],
      file: [],
      error: false,
    };
    cpState.media.music = {
      ...cpState.media.music,
      value: [],
      file: [],
      error: false,
    };
    cpState.duration = {
      ...cpState.duration,
      hour: 1,
      minute: 0,
      second: 0,
      countDown: 0,
      countUp: 0,
    };
    cpState = clearPliOuverture(cpState);
    setState(cpState);
  };

  const clearPliOuverture = (cpState) => {
    cpState.inputEmojiOuverture = {
      ...cpState.inputEmojiOuverture,
      value: "",
      open: false,
      error: false,
    };
    cpState.sondageOuverture = {
      ...cpState.sondageOuverture,
      value: [],
      open: false,
      error: false,
    };
    cpState.mediaOuverture.images = {
      ...cpState.mediaOuverture.images,
      value: [],
      file: [],
      error: false,
    };
    cpState.mediaOuverture.video = {
      ...cpState.mediaOuverture.video,
      value: [],
      file: [],
      error: false,
    };
    cpState.mediaOuverture.music = {
      ...cpState.mediaOuverture.music,
      value: [],
      file: [],
      error: false,
    };
    return cpState;
  };

  const deleteOuverture = () => {
    setState(clearPliOuverture({ ...state }));
    setAddOuverture(false);
  };

  const msgErrors = (e) => {
    if (e.msg !== undefined) setMessage(e.msg);
    const cpState = { ...state };
    if (e.inputEmoji !== undefined) cpState.inputEmoji.error = e.inputEmoji;
    if (e.submit !== undefined) setSubmitting(e.submit);
    setState(cpState);
  };

  const isPublishPli = () => {
    return (
      publishPli &&
      publishPli?.user?.id &&
      auth.isConnected &&
      publishPli.user.id == auth.user.id
    );
  };

  return (
    <BlocAddPli className={`${isPublishPli() && "is-publish-pli"}`}>
      {!isPublishPli() && (
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
                          size={String(state.inputEmoji.value).length}
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
                  <BarTemporellePli
                    state={state}
                    setState={setState}
                    setMsgNotifTopTime={setMsgNotifTopTime}
                  />
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

                {!addOuverture && (
                  <div
                    className="toggle-open-ouverture"
                    onClick={() => setAddOuverture(true)}
                  >
                    Ajouter une ouverture <AddIcon />
                  </div>
                )}

                {addOuverture && (
                  <div
                    className="toggle-open-ouverture"
                    onClick={() => deleteOuverture()}
                  >
                    Supprimer l'ouverture <RemoveIcon />
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
      {isPublishPli() && (
        <BarTimerPli>
          <LinearProgress
            className="progressBar-item"
            variant="determinate"
            value={getPercentDuration(publishPli)}
          />
          <div className="content-timer-bar">
            <span className="timer-down">
              {publishPli?.appearances?.countDown}
            </span>
            <div className="timer-item">
              <TimerOutlinedIcon /> <span>{publishPli?.duration}</span>
            </div>
            <span className="timer-up">{publishPli?.appearances?.countUp}</span>
          </div>
        </BarTimerPli>
      )}
      {!isPublishPli() && togglePli === false && (
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

      {!isPublishPli() && togglePli && (
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
