import React, { useState } from "react";
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Button } from "@mui/material";
import { ModalDefault } from "../assets/styles/componentStyle";

export default function PopinModal({
  children,
  nameButton,
  ...props
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <ModalDefault className={props.className}>
      <Button onClick={handleOpen}>{nameButton}</Button>
      <Modal
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
            {children}
          </div>
        </Fade>
      </Modal>
    </ModalDefault>
  );
}
