import React from "react";
import { BlocNewSoundage, InputDef } from "../assets/styles/componentStyle";
import { Button } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export default function AddSoundage({
  soundage,
  setSoundage,
  maxOption,
  showSoundage,
  setShowSoundage = () => {},
}) {

  const removeOption = (option) => {
    const options = [...soundage.value];
    options.splice(options.indexOf(option), 1);
    setSoundage({ ...soundage, value: options });
  };

  //console.log(soundage);

  return (
    <BlocNewSoundage>
      <p className="titre-add-soundage">
        Ajouter un soundage{" "}
        <HighlightOffIcon
          onClick={() => {
            setShowSoundage(!showSoundage);
          }}
        />
      </p>
      <div className="items-soundage">
        {soundage.value.length &&
          soundage.value.map((option, index) => (
            <div className="row-soundage" key={index}>
              <InputDef
                className="input-soundage"
                id={option.name}
                label={option.label}
                variant="outlined"
              />
              <Button onClick={(e)=>removeOption(option)}>
                <HighlightOffIcon />
              </Button>
            </div>
          ))}
      </div>
      <Button
        className="button-addiOption"
        onClick={(e) => {
          const size = soundage.value.length;
          if (size <= maxOption - 1){
            const cpSoundage = {...soundage};
            const newOption = {
              value: "",
              label: `option ${size + 1}`,
              name: "option" + size,
            };
            cpSoundage.value = [...cpSoundage.value, newOption];
            setSoundage(cpSoundage);
          }
        }}
      >
        <AddCircleRoundedIcon /> Ajouter une option
      </Button>
    </BlocNewSoundage>
  );
}
