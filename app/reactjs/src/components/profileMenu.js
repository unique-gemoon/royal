import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BlocProfileMenu, ModalItem } from "../assets/styles/componentStyle";
import endPoints from "../config/endPoints";
import connector from "../connector";
import * as actionTypes from "../store/functions/actionTypes";

export default function ProfileMenu({ setMsgNotifTop = () => {} }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const anchorRef = useRef(null);
  const auth = useSelector((store) => store.auth);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const deleteAccount = () => {
    let msg = "";
    connector({
      method: "get",
      url: endPoints.DELETE_ACCOUNT,
      success: (response) => {
        dispatch({
          type: actionTypes.LOGOUT,
        });
        setMsgNotifTop(null);
      },
      catch: (error) => {
        msg = "Erreur";
        if (error.response?.data?.message !== undefined) {
          msg = error.response.data.message;
        }
        alert(msg);
      },
    });
  };

  const logout = () => {
    dispatch({
      type: actionTypes.LOGOUT,
    });
    setMsgNotifTop(null);
  };

  return (
    <BlocProfileMenu>
      <Button
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "option-profile-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <i></i> {auth?.user?.username}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper className="paper-menu-profile">
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="option-profile-menu"
                  aria-labelledby="composition-button"
                  className="profil-menu-options"
                >
                  <MenuItem onClick={() => logout()}>Se déconnecter</MenuItem>
                  <MenuItem
                    onClick={() => {
                      setModalConfirm(true);
                    }}
                  >
                    Supprimer son compte
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <ModalItem
        className="confirmation-modal"
        show={modalConfirm}
        centered
        backdrop="static"
        keyboard={false}
        onHide={() => setModalConfirm(false)}
      >
        <ModalItem.Body>
          <div className="bloc-default-modal">
            <p className="qst-confirm">
              Êtes-vous sûr de vouloir supprimer votre compte
            </p>
            <div className="bloc-btns-confirm">
              <Button onClick={() => setModalConfirm(false)}>Annuler</Button>
              <Button onClick={() => deleteAccount()}>Confirmer</Button>
            </div>
          </div>
        </ModalItem.Body>
      </ModalItem>
    </BlocProfileMenu>
  );
}
