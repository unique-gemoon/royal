import React, { useEffect, useState } from "react";
import {
  SondageBloc,
  ItemResultSondage,
} from "../../assets/styles/componentStyle";
import RadioButton from "../ui-elements/radioButton";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useSelector } from "react-redux";
import { ROLES } from "../../config/vars";
import { getInt, getMsgError, getPercentInt } from "../../helper/fonctions";
import endPoints from "../../config/endPoints";
import connector from "../../connector";

export default function Sondage({
  name,
  item,
  setItem = () => {},
  setMsgNotifTopTime = () => {},
}) {
  const [options, setOptions] = useState([]);
  const auth = useSelector((store) => store.auth);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const cpOptions = [];
    if (item.options) {
      for (let i = 0; i < item.options.length; i++) {
        const option = item.options[i];
        cpOptions.push({ label: option.name, value: option.id });
      }
    }
    setOptions(cpOptions);
  }, []);

  const checkIsConnected = () => {
    if (auth.roles.includes(ROLES.ROLE_USER)) {
      return true;
    } else {
      setMsgNotifTopTime(
        "Vous devez être connecté pour pouvoir ajouter ou enlever du temps, publier, commenter, partager ou envoyer des messages",
        10000
      );
      return false;
    }
  };

  const saveSondageVote = (optionId) => {
    if (!submitting) {
      msgErrors({ submit: true, msg: null });

      if (item.id && optionId) {
        connector({
          method: "post",
          url: `${endPoints.PLI_SONDAGE_VOTE}`,
          data: { sondageId: item.id, optionId },
          success: (response) => {
            msgErrors({ submit: false });
            const cpItem = { ...item };
            for (let i = 0; i < cpItem.options.length; i++) {
              const option = cpItem.options[i];
              if (option.id == optionId) {
                cpItem.options[i] = {
                  ...option,
                  voted: true,
                  numberVotes: getInt(option.numberVotes) + 1,
                };
              }
            }
            setItem({
              ...cpItem,
              alreadyVoted: true,
              totalVotes: getInt(item.totalVotes) + 1,
            });
          },
          catch: (error) => {
            msgErrors({ msg: getMsgError(error), submit: false });
          },
        });
      } else {
        const msg = "Quelque chose s'est mal passé, veuillez réessayer svp.";
        msgErrors({ submit: false, msg });
      }
    }
  };

  const saveSondageNotVote = () => {
    if (!submitting) {
      msgErrors({ submit: true, msg: null });

      if (item.id) {
        connector({
          method: "post",
          url: `${endPoints.PLI_SONDAGE_NOTE_VOTE}`,
          data: { sondageId: item.id },
          success: (response) => {
            msgErrors({ submit: false });
            setItem({
              ...item,
              alreadyVoted: true,
            });
          },
          catch: (error) => {
            msgErrors({ msg: getMsgError(error), submit: false });
          },
        });
      } else {
        const msg = "Quelque chose s'est mal passé, veuillez réessayer svp.";
        msgErrors({ submit: false, msg });
      }
    }
  };

  const msgErrors = (e) => {
    if (e.msg !== undefined) setMsgNotifTopTime(e.msg, 10000);
    if (e.submit !== undefined) setSubmitting(e.submit);
  };

  return (
    <>
      {options ? (
        <SondageBloc>
          {!item.alreadyVoted && (
            <>
              <RadioButton
                className="bloc-choix-sondage"
                options={options}
                value={item?.value ? item.value : ""}
                name={name}
                onChange={(val) => {
                  if (checkIsConnected()) {
                    saveSondageVote(val.value);
                  }
                }}
              />
              <p
                className="btn-show-result"
                onClick={() => {
                  if (checkIsConnected()) {
                    saveSondageNotVote();
                  }
                }}
              >
                Voir les résultats
              </p>
            </>
          )}

          {item.alreadyVoted && (
            <div className="bloc-result-sondage">
              {item.options.map((option, index) => (
                <ItemResultSondage
                  key={index}
                  purcentage={getPercentInt(option.numberVotes,item.totalVotes)}
                >
                  <div className="content-result-sondage">
                    <span>{option.name}</span>{" "}
                    {option.voted && <CheckCircleOutlineIcon />}
                  </div>
                  <span className="purcentage-item">
                    {option.numberVotes ? getPercentInt(option.numberVotes,item.totalVotes) : 0}%
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
