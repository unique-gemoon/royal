import React, { useState } from 'react';
import { BlocNotification } from '../assets/styles/componentStyle';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

export default function Notifications({
    items, 
    setNewNotifs = () => {},
    dataNotifs,
    setDataNotifs = () => { },
}) {
    const filteredNotRead = items.filter(element => {
            return !element.isRead;
    });
    const filteredRead = dataNotifs.filter(element => {
            return element.isRead;
    });
    const isReadItem = (item) => {
        let cpDataNotifs = [...dataNotifs];
        for(let i=0; i< cpDataNotifs.length; i++){
            const el = cpDataNotifs[i];
            if(el.id == item.id){
                cpDataNotifs[i].isRead = true;
            }
        }
        setDataNotifs(cpDataNotifs);
        setNewNotifs(cpDataNotifs.filter(newNotif => newNotif.isRead == false));
    }
    return (
        <BlocNotification>
            <div className='header-notif'>
                Notifications {filteredNotRead.length > 0 ? <span className='count-notif'>{filteredNotRead.length}</span> : null}
            </div>
            <div className='content-notifs'>
                <div className='list-notifs'>
                    {filteredNotRead.map((item, index)=> (
                        <div className={`item-notif ${item.isRead ? "old-notif" : "new-notif"}`} key={index} onClick={() => { isReadItem(item) }}>
                            <span className='title-notif'>{item.title}</span>
                            <span className='timer-notif'>{item.timer}</span>
                        </div>
                    ))}
                    {filteredRead.map((item, index)=> (
                        <div className="item-notif old-notif" key={index}>
                            <span className='title-notif'>{item.title}</span>
                            <span className='timer-notif'>{item.timer}</span>
                        </div>
                    ))}
                </div>
                
            </div>
        </BlocNotification>
    );
}
