import AddIcon from "@mui/icons-material/Add";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import RemoveIcon from "@mui/icons-material/Remove";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { Button } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import TextareaAutosize from "react-textarea-autosize";
import { BlocAddPli } from "../assets/styles/componentStyle";
import { ROLES } from "../config/vars";
import { useOutsideAlerter } from "../helper/events";
import * as actionTypes from "../store/functions/actionTypes";
import AddSoundage from "./addSoundage";
import BarTemporelle from "./barTemporelle";
import ErrorFormMessage from "./errorFormMessage";
import NewOvertureOptions from "./newOvertureOptions";
import NewPilOptions from "./newPilOptions";
import CountDown from "./ui-elements/countDown";

export default function NewPli({
  action,
  setAction = () => {},
  setMsgNotifTop = () => {},
}) {
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 768px)" });
  const [stateTextarea, setStateTextarea] = useState({
    inputEmoji: {
      name: "message-input",
      placeholder: "Que veux-tu dire, Lys ?",
      value: "",
      type: "text",
      as: "textarea",
    },
    openSoundage: false,
    soundageOptions: [
      {
        name: "option-1",
        label: "Option 1",
        value: "",
      },
    ],
  });
  const [togglePli, setTogglePli] = useState(false);
  const handleToggle = (e) => {
    setTogglePli(true);
  };
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

  const [addOverture, setAddOverture] = useState(false);
  const [message, setMessage] = useState(true);
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

  return (
    <BlocAddPli>
      {togglePli ? (
        <div className="bloc-new-pli">
          <div className="cadre-content-new-pli">
            <div className="content-new-pli" ref={divRef}>
              {message ? (
                <ErrorFormMessage
                  text="Veuillez ajouter du contenu à votre pli."
                  onClick={() => setMessage(null)}
                />
              ) : null}
              <div className="new-pli-nv1">
                <div className="cadre-content-pli">
                  <TextareaAutosize
                    {...stateTextarea.inputEmoji}
                    onChange={(e) => {
                      const cpState = { ...stateTextarea };
                      if (e.target.value.length <= 280) {
                        cpState.inputEmoji.value = e.target.value;
                        setStateTextarea(cpState);
                      }
                    }}
                  />
                  {stateTextarea.openSoundage ? (
                    <AddSoundage
                      state={stateTextarea.soundageOptions}
                      showSoundage={stateTextarea.openSoundage}
                      setShowSoundage={(e) =>
                        setStateTextarea({ ...stateTextarea, openSoundage: e })
                      }
                      setState={(e) =>
                        setStateTextarea({
                          ...stateTextarea,
                          soundageOptions: e,
                        })
                      }
                    />
                  ) : null}
                  <div className="bloc-footer">
                    <NewPilOptions
                      state={stateTextarea}
                      setState={setStateTextarea}
                    />
                    <div className="count-publish-pli1">
                      <CountDown
                        maxCount={280}
                        setState={
                          (stateTextarea.inputEmoji.value
                            ? stateTextarea.inputEmoji.value
                            : ""
                          ).length
                        }
                      />
                      {!addOverture ? (
                        <div className="bloc-btn-publish">
                          <Button className="btn-publish">
                            Publier <SendRoundedIcon />
                          </Button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <BarTemporelle />
              </div>
              {addOverture ? (
                <div className="new-pli-nv2">
                  <div className="cadre-content-pli">
                    <NewOvertureOptions />
                  </div>
                </div>
              ) : null}
              <div
                className="toggle-open-ouverture"
                onClick={() => setAddOverture(!addOverture)}
              >
                {!addOverture ? (
                  <>
                    Ajouter une ouverture <AddIcon />
                  </>
                ) : (
                  <>
                    Supprimer l’ouverture <RemoveIcon />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div
        onClick={() => {
          if (checkIsConnected()) {
            setMsgNotifTop(null);
            handleToggle();
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
        className={`toggled-new-pli ${togglePli ? "open-pli" : ""}`}
        ref={divRef}
      >
        {isDesktopOrLaptop ? (
          <KeyboardArrowUpIcon />
        ) : (
          <AddCircleOutlineOutlinedIcon />
        )}
      </div>
    </BlocAddPli>
  );
}
