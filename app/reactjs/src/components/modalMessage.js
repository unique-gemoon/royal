import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Backdrop, Fade } from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ModalDefault } from "../assets/styles/componentStyle";
import { ModalPopIn } from "../assets/styles/globalStyle";
import ButtonDef from "./ui-elements/buttonDef";

export default function ModalMessage({
  open = false,
  setOpen = () => {},
  showBloc = "",
  setShowBloc = () => {},
  checkIsConnected = () => {},
}) {
  const handleClose = () => setOpen(false);

  const history = useHistory();

  return (
    <ModalDefault className="modal-footer modal-connect">
      <ModalPopIn
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        className="modal-def"
      >
        <Fade in={open}>
          <div className="content-modal">
            {showBloc == "confirmEmail" && (
              <div className="message-modal-content">
                <CheckCircleOutlineIcon />
                <p className="titre-message-modal">
                  Confirmation email réalisée avec succès
                </p>
                <div className="text-message-modal">
                  <p>Merci, votre adresse email a bien été validé.</p>
                </div>
                <ButtonDef
                  onClick={() => {
                    handleClose();
                    setTimeout(() => {
                      setShowBloc(null);
                      checkIsConnected();
                      history.push("/");
                    }, 100);
                  }}
                  textButton={"Ok"}
                />
              </div>
            )}
          </div>
        </Fade>
      </ModalPopIn>
    </ModalDefault>
  );
}
