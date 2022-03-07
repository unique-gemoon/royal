import React, { useState } from 'react';
import { BlocNotification } from '../assets/styles/componentStyle';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

export default function Notifications({items, setNotif}) {
    const filteredItems = items.filter(element => {
        if (element.statut === "new") {
            return true;
        }
    });
    return (
        <BlocNotification>
            <div className='header-notif'>
                Notifications <span className='count-notif'>{filteredItems.length > 0 ? filteredItems.length : null}</span>
            </div>
            <div className='content-notifs'>
                <div className='list-notifs'>
                    {items.map((val, index)=> (
                        <div className={`item-notif ${val.statut === 'new' ? "new-notif" : "old-notif" }`} key={index}>
                            <span className='title-notif'>{val.title}</span>
                            <span className='timer-notif'>{val.timer}</span>
                        </div>
                    ))}
                </div>
                
            </div>
        </BlocNotification>
    );
}
