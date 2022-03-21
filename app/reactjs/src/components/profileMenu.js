import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Grow from "@mui/material/Grow";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import { BlocProfileMenu } from "../assets/styles/componentStyle";
import endPoints from "../config/endPoints";
import connector from "../connector";
import * as actionTypes from "../store/functions/actionTypes";

export default function ProfileMenu() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

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
        handleClose();
      },
      catch: (error) => {
        msg = "Erreur";
        if (error.response.data.message !== undefined) {
          msg = error.response.data.message;
        }
        alert(msg);
      },
    });
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
        <i></i> Lys<span>#3094</span>
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
                  <MenuItem onClick={handleClose}>Se déconnecter</MenuItem>
                  <MenuItem onClick={deleteAccount}>
                    Supprimer son compte
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </BlocProfileMenu>
  );
}
