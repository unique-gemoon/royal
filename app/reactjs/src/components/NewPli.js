import React, { useEffect, useRef, useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { BlocAddPli } from '../assets/styles/componentStyle';
import { useOutsideAlerter } from '../helper/events';
import NewPilOptions from './newPilOptions';
import BarTemporelle from './barTemporelle';
import TextareaAutosize from 'react-textarea-autosize';


export default function NewPli() {
  const [state, setState] = useState({
    inputEmoji: {
      name: "message-input",
      placeholder: "Que veux-tu dire, Lys ?",
      value: "",
      type: "text",
      as: 'textarea'
    },
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
          <div className='content-new-pli'>
            
            <div className='new-pli-nv1'>
              <div className='cadre-content-pli'>
                <TextareaAutosize 
                  {...state.inputEmoji}
                  onChange={(e) => {
                    const cpState = { ...state };
                    cpState.inputEmoji.value = e.target.value;
                    setState(cpState);
                  }} />
                <NewPilOptions state={state} setState={setState} />
              </div>
              <BarTemporelle />

            </div>
            {addOverture ? (
            <div className='new-pli-nv2'>
                <div className='cadre-content-pli'>
                  
                  <NewPilOptions state={state} setState={setState} />
                </div>
              
            </div>) : null}
            <div onClick={() => setAddOverture(!addOverture)}>{!addOverture ? "Ajouter une ouverture" : "Supprimer l’ouverture" }</div>
          </div>
        </div>
        : null}

      <div onClick={() => setTogglePli(!togglePli)} className={`toggled-new-pli ${togglePli ? "open-pli" : ""}`}>
        <KeyboardArrowUpIcon />
      </div>
    </BlocAddPli>
  );
}
