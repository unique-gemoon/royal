import React from 'react';
import { BlocNewSoundage, InputDef } from '../assets/styles/componentStyle';
import { Button } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function AddSoundage({ state, setState = () => { }, showSoundage, maxOption, setShowSoundage = () => { } }) {
    const removeFile = file => () => {
            const newFiles = [...state];
            newFiles.splice(newFiles.indexOf(file), 1);
            setState(newFiles);
        }
  return (
    <BlocNewSoundage>
          <p className='titre-add-soundage'>Ajouter un soundage <HighlightOffIcon onClick={() => { setShowSoundage(!showSoundage) }} /></p>
        <div className='items-soundage'>
              {state.map( (option, index) => (
                  <div className='row-soundage' key={index}>
                      <InputDef className='input-soundage' id={option.name} label={option.label} variant="outlined" />
                      <Button onClick={removeFile(option)}><HighlightOffIcon /></Button>
                  </div>
              ))}
        </div>
          <Button className='button-addiOption' onClick={(e) => {
        if (state.length <= (maxOption - 1))
              setState([...state, {value: "", label: `option ${state.length + 1}`, name: 'option'+state.length}]);
 
          }}><AddCircleRoundedIcon /> Ajouter une option</Button>
    </BlocNewSoundage>
  )
}
