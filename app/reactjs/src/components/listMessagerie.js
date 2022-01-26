import React from 'react';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { ListItemsMessagerie, ItemListMessagerie } from '../assets/styles/componentStyle';

export default function ListMessagerie({data = [], state, setState, ...props}) {
    const showData = () => {
        
        if (data.length === 0) {
        return (
            <div className="no-content-loading" style={{ textAlign: "center" }}>
            Aucune donnée
            </div>
        );
        }
        return data.map(($val, $index) => (
        <ItemListMessagerie
            
            key={$index}
            onClick={() => setState({ ...state, activeItem: $val })}
        >
            <div className='head-item-list-message'>
                <span className='name-item-message'>{$val.name}</span>
                <span className='date-message'>
                    {$val.etat === "send" ? <DoneIcon /> : $val.etat === "reading" ? <DoneAllIcon /> : null} 
                    {$val.timer}
                </span>
            </div>
            <div className='last-item-message'>{$val.lastMesssage}</div>
        </ItemListMessagerie>
        ));
    };
  return (
    <ListItemsMessagerie>{showData()}</ListItemsMessagerie>
  );
}
