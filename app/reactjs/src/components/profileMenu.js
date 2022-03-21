import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { BlocProfileMenu, ModalItem } from '../assets/styles/componentStyle';

export default function ProfileMenu() {
    const [modalConfirm, setModalConfirm] = useState(false);
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const ToggleModalConfirm = () => {
      setModalConfirm((modalConfirm) => !modalConfirm);
    };
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
  return (
      <BlocProfileMenu>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'option-profile-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
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
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper className='paper-menu-profile'>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="option-profile-menu"
                    aria-labelledby="composition-button"
                    className='profil-menu-options'
                  >
                    <MenuItem onClick={handleClose}>Se déconnecter</MenuItem>
                  <MenuItem onClick={ToggleModalConfirm}>Supprimer son compte</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      <ModalItem className="confirmation-modal" show={modalConfirm} centered backdrop="static" keyboard={false} onHide={() => setModalConfirm(false)}>
        <ModalItem.Body>
          <div className='bloc-default-modal'>
            <p className='qst-confirm'>lorem ipsum</p>
            <div className='bloc-btns-confirm'>
              <Button onClick={() => setModalConfirm(false)}>Annuler</Button>
              <Button >Confirmer</Button>
            </div>
          </div>
        </ModalItem.Body>
      </ModalItem>
      </BlocProfileMenu>
  )
}
