import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../components/ui-elements/editorToolBar";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { BlocAddPli, ToolBarEditor } from '../assets/styles/componentStyle';
import { useOutsideAlerter } from '../helper/events';
import NewPilOptions from './newPilOptions';
import BarTemporelle from './barTemporelle';
import TextareaAutosize from 'react-textarea-autosize';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CountDown from './ui-elements/countDown';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { Button } from '@mui/material';
import WysiwygEditor from "./ui-elements/wysiwygEditor";
import { removeTags } from '../helper/fonctions';
import NewOvertureOptions from './newOvertureOptions';
import AddSoundage from './addSoundage';

export default function NewPli() {

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

  const ref = useRef(null);
  useOutsideAlerter(ref, () => setTogglePli(false));
  useEffect(() => {
    if (togglePli) {
      document.body.classList.add("add-pli-showing");
    } else {
      document.body.classList.remove("add-pli-showing");
    }
  }, [togglePli]);

  const [addOverture, setAddOverture] = useState(false);


  return (
    <BlocAddPli>
      {togglePli ?
        <div className="bloc-new-pli">
          <div className='cadre-content-new-pli'>
            <div className='content-new-pli'>

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
                  {stateTextarea.openSoundage ? <AddSoundage state={stateTextarea.soundageOptions} setState={(e) => setStateTextarea({ ...stateTextarea, soundageOptions: e })} /> : null}
                  <div className='bloc-footer'>
                    <NewPilOptions state={stateTextarea} setState={setStateTextarea} />
                    <CountDown maxCount={280} setState={(stateTextarea.inputEmoji.value ? stateTextarea.inputEmoji.value : '').length} />
                    {!addOverture ? (
                      <div className='bloc-btn-publish'>
                        <Button className='btn-publish'>Publier <SendRoundedIcon /></Button>
                      </div>) : null}
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

      <div onClick={() => setTogglePli(!togglePli)} className={`toggled-new-pli ${togglePli ? "open-pli" : ""}`}>
        <KeyboardArrowUpIcon />
      </div>
    </BlocAddPli>
  );
}
