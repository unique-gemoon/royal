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
import InputEmoji from './ui-elements/inputEmoji';

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
    const [dataListMessage, setDataListMessage] = useState([
        {
            id: 1,
            name: "Fossum",
            etat: "reading",
            timer: "20h",
            lastMesssage: "Hé bien, j’ai emmené le chien au vétérinaire, et ça s’est avéré...",
            newMessage: false,
        },
        {
            id: 2,
            name: "Ellie",
            etat: "send",
            timer: "1jour",
            lastMesssage: "Oui ça va. Et tiu ?",
            newMessage: false,
        },
        {
            id: 3,
            name: "Jacquou",
            timer: "11.09.2020",
            lastMesssage: "J’ai vu ta dernière publication sur la page universelle !",
            newMessage: true,
        },
        {
            id: 4,
            name: "Lou",
            timer: "10.08.2020",
            lastMesssage: "Oui tout est assez calme récemment",
            newMessage: false,
        },
    ])

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
                            setData={setDataListMessage}
                            state={state}
                            setState={setState}
                        />
                    </div>
                </div>

                <Button className='start-new-message'><ModeEditOutlineOutlinedIcon /></Button>
            </div>) : null}
            {state.activeItem ? (
            <div className='bloc-message-item'>
                <div className='header-messagerie'>
                    <span className='back-to-list' onClick={(e) => {
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
                            aria-controls={open ? 'menu-option-message' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            className='btn-option-message'
                        >
                            <MoreVertIcon />
                        </Button>
                        <Menu
                            id="menu-option-message"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}
                            anchorOrigin={{
                                vertical: -14,
                                horizontal: 33,
                            }}
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >   <span className='close-drop-menu' onClick={handleClose}><MoreVertIcon /></span>
                            <MenuItem onClick={handleClose}>Bloquer</MenuItem> 
                        </Menu>
                    </div>


                </div>
                <div className='bloc-view-message'>

                    <div className='content-view-messagerie'></div>
                      <InputEmoji typeInput='textarea' />
                </div>
            </div>) : null}
        </BlocMessagerie>
  );
}
