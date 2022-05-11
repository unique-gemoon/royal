import React, { useEffect, useState } from "react";
import {
  SondageBloc,
  ItemResultSondage,
} from "../../assets/styles/componentStyle";
import RadioButton from "../ui-elements/radioButton";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import { ROLES } from "../../config/vars";
import * as actionTypes from "../../store/functions/actionTypes";

export default function Sondage({ name, item, setItem }) {
  const [options, setOptions] = useState([]);
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);

  const getOptions = () => {
    const cpOptions = [];
    if (item.options) {
      for (let i = 0; i < item.options.length; i++) {
        const option = item.options[i];
        cpOptions.push({ label: option.name, value: option.id });
      }
    }
    return cpOptions;
  };

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
    <>
      {options ? (
        <SondageBloc>
          {!item.result && (
            <>
              <RadioButton
                className="bloc-choix-sondage"
                options={getOptions()}
                value={item?.value ? item.value : ""}
                name={name}
                onChange={(val) => {
                  if (checkIsConnected()) {
                    const cpItem = {...item};
                    for (let i = 0; i < cpItem.options.length; i++) {
                      const option = cpItem.options[i];
                      const choix = option.id == val.value ? true : false;
                      cpItem.options[i] = { ...option, choix };
                    }
                    setItem({ ...cpItem, value: val.value });
                  }
                }}
              />
              <p
                className="btn-show-result"
                onClick={() => {
                  if (checkIsConnected()) {
                    setItem({ ...item, result: true });
                  }
                }}
              >
                Voir les résultats
              </p>
            </>
          )}

          {item.result && (
            <div className="bloc-result-sondage">
              {item.options.map((option, index) => (
                <ItemResultSondage
                  key={index}
                  purcentage={option.countQte || 0}
                >
                  <div className="content-result-sondage">
                    <span>{option.name}</span>{" "}
                    {option.choix && <CheckCircleOutlineIcon />}
                  </div>
                  <span className="purcentage-item">
                    {option.countQte || 0}
                  </span>
                </ItemResultSondage>
              ))}
            </div>
          )}
        </SondageBloc>
      ) : null}
    </>
  );
}
