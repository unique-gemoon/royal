import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDetectClickOutside } from "react-detect-click-outside";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { BlocAddPli } from '../assets/styles/componentStyle';
import { useOutsideAlerter } from '../helper/events';
import NewPilOptions from './newPilOptions';
import BarTemporelle from './barTemporelle';
import TextareaAutosize from 'react-textarea-autosize';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CountDown from './ui-elements/countDown';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { Button } from '@mui/material';
import NewOvertureOptions from './newOvertureOptions';
import AddSoundage from './addSoundage';
import { useMediaQuery } from "react-responsive";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ErrorFormMessage from './errorFormMessage';

export default function NewPli({ action, setAction = () => { } , setShowMessage = () => { }, ...props}) {

  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 768px)" });
  const [stateTextarea, setStateTextarea] = useState({
    inputEmoji: {
      name: "message-input",
      placeholder: "Que veux-tu dire, Lys ?",
      value: "",
      type: "text",
      as: 'textarea'
    },
    openSoundage: false,
    soundageOptions: [
      {
        name: "option-1",
        label: "Option 1",
        value: "",
      }
    ]
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



  return (
    <BlocAddPli>
      {togglePli ?
        <div className="bloc-new-pli">
          <div className='cadre-content-new-pli' >
            <div className='content-new-pli' ref={divRef}>
              {message ? <ErrorFormMessage text="Veuillez ajouter du contenu à votre pli." onClick={() => setMessage(null)} /> : null}
              <div className='new-pli-nv1'>
                <div className='cadre-content-pli'>
                  <TextareaAutosize
                    {...stateTextarea.inputEmoji}
                    onChange={(e) => {
                      const cpState = { ...stateTextarea };
                      if (e.target.value.length <= 280) {
                        cpState.inputEmoji.value = e.target.value;
                        setStateTextarea(cpState);
                      }
                    }} />
                  {stateTextarea.openSoundage ? <AddSoundage state={stateTextarea.soundageOptions} showSoundage={stateTextarea.openSoundage} setShowSoundage={(e) => setStateTextarea({ ...stateTextarea, openSoundage: e })} setState={(e) => setStateTextarea({ ...stateTextarea, soundageOptions: e })} /> : null}
                  <div className='bloc-footer'>
                    <NewPilOptions state={stateTextarea} setState={setStateTextarea} />
                    <div className='count-publish-pli1'>
                      <CountDown maxCount={280} setState={(stateTextarea.inputEmoji.value ? stateTextarea.inputEmoji.value : '').length} />
                      {!addOverture ? (
                        <div className='bloc-btn-publish'>
                          <Button className='btn-publish'>Publier <SendRoundedIcon /></Button>
                        </div>) : null}
                    </div>
                  </div>
                </div>
                <BarTemporelle />

              </div>
              {addOverture ? (
                <div className='new-pli-nv2'>
                  <div className='cadre-content-pli'>
                    <NewOvertureOptions />
                  </div>

                </div>) : null}
              <div className='toggle-open-ouverture' onClick={() => setAddOverture(!addOverture)}>{!addOverture ? <>Ajouter une ouverture <AddIcon /></> : <>Supprimer l’ouverture <RemoveIcon /></>}</div>
            </div>
          </div>
        </div>
        : null}
      {isDesktopOrLaptop ?
        <div onClick={() => {
          setShowMessage(false);
          handleToggle();
          const cpAction = {
            ...action, notification: { ...action.notification, isOpen: false }, folower: { ...action.folower, isOpen: false }, search: { ...action.search, isOpen: false }
            , messagerie: { ...action.messagerie, isOpen: false }
          };
          setAction(cpAction);
        }} className={`toggled-new-pli ${togglePli ? "open-pli" : ""}`} ref={divRef} >
          <KeyboardArrowUpIcon />
        </div> :
        <div onClick={() => {
          setShowMessage(false);
          handleToggle();
          const cpAction = {
            ...action, notification: { ...action.notification, isOpen: false }, folower: { ...action.folower, isOpen: false }, search: { ...action.search, isOpen: false }
            , messagerie: { ...action.messagerie, isOpen: false }
          };
          setAction(cpAction);
        }} className={`toggled-new-pli ${togglePli ? "open-pli" : ""}`}>
          <AddCircleOutlineOutlinedIcon />
        </div>
      }

    </BlocAddPli>
  );
}
