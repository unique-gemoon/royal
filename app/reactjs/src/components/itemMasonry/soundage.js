import React, { useEffect, useState } from "react";
import {
  SoundageBloc,
  ItemResultSoundage,
} from "../../assets/styles/componentStyle";
import RadioButton from "../ui-elements/radioButton";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import { ROLES } from "../../config/vars";
import * as actionTypes from "../../store/functions/actionTypes";

export default function Soundage({ name, niveau, item, setItem }) {
  const [items] = useState(
    niveau == 1 ? [...item.nv1.media.soundage] : [...item.nv2.media.soundage]
  );
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
    <>
      {items ? (
        <SoundageBloc>
          {!item.result && (
            <>
              <RadioButton
                className="bloc-choix-soundage"
                options={items}
                value={item.value}
                name={name}
                onChange={(val) => {
                    if(checkIsConnected()){
                  for (let i = 0; i < items.length; i++) {
                    if (items[i].value == val.value) {
                      items[i].choix = true;
                    } else {
                      items[i].choix = false;
                    }
                  }
                  if (niveau == 1) {
                    setItem({
                      ...item,
                      value: val.value,
                      nv1: { ...item.nv1, soundage: items },
                    });
                  } else if (niveau == 2) {
                    setItem({
                      ...item,
                      value: val.value,
                      nv2: { ...item.nv2, soundage: items },
                    });
                  }}
                }}
              />
              <p
                className="btn-show-result"
                onClick={() => {
                    if(checkIsConnected()){setItem({ ...item, result: true });}
                }}
              >
                Voir les résultats
              </p>
            </>
          )}

          {item.result && (
            <div className="bloc-result-soundage">
              {items.map((val, index) => (
                <ItemResultSoundage key={index} purcentage={val.countQte}>
                  <div className="content-result-soundage">
                    <span>{val.label}</span>{" "}
                    {val.choix ? <CheckCircleOutlineIcon /> : null}
                  </div>
                  <span className="purcentage-item">{val.countQte}</span>
                </ItemResultSoundage>
              ))}
            </div>
          )}
        </SoundageBloc>
      ) : null}
    </>
  );
}
