import React, {useState} from 'react';
import { BlocMessagerie } from '../assets/styles/componentStyle';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { Button } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListMessagerie from './listMessagerie';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function Messagerie() {
    const [state, setState] = useState({
        activeItem: false,
    });
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
     const handleClose = () => {
        setAnchorEl(null);
    };
    const dataListMessage = [
        {
            id: 1,
            name: "Fossum",
            etat: "sended",
            timer: "20h",
            lastMesssage: "Hé bien, j’ai emmené le chien au vétérinaire, et ça s’est avéré..."
        },
        {
            id: 2,
            name: "Ellie",
            etat: "send",
            timer: "1jour",
            lastMesssage: "Oui ça va. Et tiu ?"
        },
    ]

  return (
     <BlocMessagerie>
            {!state.activeItem ? (
            <div className='bloc-lists-messagerie'>
                <div className='header-messagerie'>
                    <MailOutlineRoundedIcon /> Messages 
                </div>
                <div className='content-messagerie'>
                    <div className='list-messagerie'>
                        <ListMessagerie 
                            data={dataListMessage} 
                            state={state}
                            setState={setState}
                        />
                    </div>
                    <p className='show-more-folower'><ArrowCircleDownIcon /> Voir les anciens messages</p>
                </div>

                <Button className='start-new-message'><ModeEditOutlineOutlinedIcon /></Button>
            </div>) : null}
            {state.activeItem ? (
            <>
            <div className='bloc-message-item'>
                <div className='header-messagerie'>
                    <span onClick={(e) => {
                          e.preventDefault();
                          const cpState = { ...state };
                          cpState.activeItem = false;
                          setState(cpState);
                        }}>
                         <KeyboardArrowLeftIcon />
                    </span> 
                    <span className='name-messagerie'>{state.activeItem.name}</span>
                    <div>
                        <Button
                            id="demo-positioned-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <MoreVertIcon />
                        </Button>
                        <Menu
                            id="basic-menu"
                            aria-labelledby="demo-positioned-button"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}
                            anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem> 
                        </Menu>
                    </div>


                </div>
                <div className='content-messagerie'></div>
            </div>
            </>) : null}
        </BlocMessagerie>
  );
}
