import React from "react";
import { BlocNewSondage, InputDef } from "../assets/styles/componentStyle";
import { Button } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export default function AddSondage({
  sondage,
  setSondage,
  maxOption,
  showSondage,
  setShowSondage = () => {},
}) {

  const removeOption = (option) => {
    const options = [...sondage.value];
    options.splice(options.indexOf(option), 1);
    setSondage({ ...sondage, value: options });
  };

  return (
    <BlocNewSondage>
      <p className="titre-add-sondage">
        Ajouter un sondage{" "}
        <HighlightOffIcon
          onClick={() => {
            setShowSondage(!showSondage);
          }}
        />
      </p>
      <div className="items-sondage">
        {sondage.value.length > 0 &&
          sondage.value.map((option, index) => (
            <div className="row-sondage" key={index}>
              <InputDef
                className="input-sondage"
                id={option.name}
                label={option.label}
                variant="outlined"
                onChange={(e) => {
                   const cpSondage = { ...sondage };
                  if (e.target.value.length <= 25) {
                    cpSondage.value[index].value = e.target.value;
                    setSondage(cpSondage);
                  }else{
                    // 25 carac max. 
                  } 
                }
              }
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
          const size = sondage.value.length;
          if (size <= maxOption - 1){
            const cpSondage = {...sondage};
            const newOption = {
              value: "",
              label: `option ${size + 1}`,
              name: "option" + size,
            };
            cpSondage.value = [...cpSondage.value, newOption];
            setSondage(cpSondage);
          }
        }}
      >
        <AddCircleRoundedIcon /> Ajouter une option
      </Button>
    </BlocNewSondage>
  );
}
