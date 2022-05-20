import React, { useState } from 'react';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import { Button } from '@mui/material';
import { ItemFolower } from '../assets/styles/componentStyle';


export default function ItemListFolower({ 
    stateFolowersMessage, 
    setFolowersMessage = () => { }, 
    item, 
    onClick, 
    shwoButtonMessage = true,  }) {
    const [statutFolower, setStatutFolower] = useState(item.statut);
    const toggleFolower = () => {
        if(statutFolower === 0){
            setStatutFolower(1);
        }else{
            setStatutFolower(0);
        }
    }
    return (
        <ItemFolower key={item.id}>
            <span onClick={() => { setFolowersMessage({ ...stateFolowersMessage, activeItem: item }); }}>{item.name}</span>
            <div className='option-item-folower'>
                {shwoButtonMessage && (<Button className='toggle-item-message' onClick={onClick}><MailOutlineRoundedIcon /></Button>)}
                <Button onClick={toggleFolower} className='btn-switch-folowers'>{ statutFolower === 1 ? <PersonAddAltOutlinedIcon /> : <PersonRemoveOutlinedIcon />}</Button>
            </div>
        </ItemFolower>
    );
}
