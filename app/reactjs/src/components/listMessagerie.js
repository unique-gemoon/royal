import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import React from "react";
import { useSelector } from "react-redux";
import {
  ItemListMessagerie,
  ListItemsMessagerie,
} from "../assets/styles/componentStyle";
import { getDurationHM } from "../helper/fonctions";
import moment from "moment";

export default function ListMessagerie({
  threads = [],
  setThreads = () => {},
  folowersMessage,
  setFolowersMessage = () => {},
}) {
  const auth = useSelector((store) => store.auth);

  const getEtat = (row) => {
    let message = row.thread.messages.length > 0 ? row.thread.messages[0] : {};
    let etat = "";

    if (message) {
      if (message.userId == auth.user.id) {
        if (message.seen) {
          etat = "read";
        } else {
          etat = "send";
        }
      } else {
        if (!message.seen) {
          etat = "receive";
        }
      }
    }
    return etat;
  };

  return (
    <ListItemsMessagerie>
      {threads.length > 0 &&
        threads.map((row, index) => (
          <ItemListMessagerie
            key={index}
            onClick={() => {
              setFolowersMessage({ ...folowersMessage, activeItem: row });
              if (row.thread.messages.length > 0 && row.thread.messages[0].userId != auth.user.id ) {
                let cpThreads = [...threads];
                const cpThread = cpThreads[index];
                cpThreads[index] = {
                  ...cpThread,
                  thread: {
                    ...cpThread.thread,
                    messages: [{ ...cpThread.thread.messages[0], seen: true }],
                  },
                };
                setThreads(cpThreads);
              }
            }}
          >
            <div className="head-item-list-message">
              <span
                className={`name-item-message ${
                  getEtat(row) == "receive" ? "hasMesaage" : ""
                }`}
              >
                {row.user.username}
              </span>
              <span className="date-message">
                {getEtat(row) === "send" ? (
                  <DoneIcon />
                ) : getEtat(row) === "reading" ? (
                  <DoneAllIcon />
                ) : null}
                {row.thread.messages.length > 0 &&
                  getDurationHM(moment(), row.thread.messages[0].createdAt)}
              </span>
            </div>
            <div className="last-item-message">
              {row.thread.messages.length > 0 && row.thread.messages[0].message}
            </div>
          </ItemListMessagerie>
        ))}

      {threads.length == 0 && (
        <div className="no-content-loading" style={{ textAlign: "center" }}>
          Aucune donnée
        </div>
      )}
    </ListItemsMessagerie>
  );
}
