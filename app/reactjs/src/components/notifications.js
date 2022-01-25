import React, { useState } from 'react';
import { BlocNotification } from '../assets/styles/componentStyle';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

export default function Notifications({item}) {
    return (
        <BlocNotification>
            <div className='header-notif'>
                Notifications <span className='count-notif'>{item.length}</span>
            </div>
            <div className='content-notifs'>
                <div className='list-notifs'>
                    {item.map((val, index)=> (
                        <div className={`item-notif ${val.statut === 'new' ? "new-notif" : "old-notif" }`} key={index}>
                            <span className='title-notif'>{val.title}</span>
                            <span className='timer-notif'>{val.timer}</span>
                        </div>
                    ))}
                </div>
                <p className='show-more-folower'><ArrowCircleDownIcon /> Voir plus d’abonnés</p>
            </div>
        </BlocNotification>
    );
}
