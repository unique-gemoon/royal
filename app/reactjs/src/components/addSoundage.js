import React from 'react';
import TextField from '@mui/material/TextField';
import { BlocNewSoundage } from '../assets/styles/componentStyle';
import { Button } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function AddSoundage({ state, setState = () => { }, showSoundage, setShowSoundage = () => { } }) {
    const removeFile = file => () => {
            const newFiles = [...state];
            newFiles.splice(newFiles.indexOf(file), 1);
            setState(newFiles);
        }
    console.log(showSoundage)
  return (
    <BlocNewSoundage>
          <p className='titre-add-soundage'>Ajouter un soundage <HighlightOffIcon onClick={() => { setShowSoundage(!showSoundage) }} /></p>
        <div className='items-soundage'>
              {state.map( (option, index) => (
                  <div className='row-soundage' key={index}>
                      <TextField className='input-soundage' id={option.name} label={option.label} variant="outlined" />
                      <Button onClick={removeFile(option)}><HighlightOffIcon /></Button>
                  </div>
              ))}
        </div>
          <Button className='button-addiOption' onClick={(e) => {
              setState([...state, {value: "", label: `option ${state.length + 1}`, name: 'option'+state.length}]);
 
          }}><AddCircleRoundedIcon /> Ajouter une option</Button>
    </BlocNewSoundage>
  )
}
