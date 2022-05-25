import React from 'react';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { ListItemsMessagerie, ItemListMessagerie } from '../assets/styles/componentStyle';

export default function ListMessagerie({ data = [], setData = () => { }, state, setState, ...props }) {
    const showData = () => {

        if (data.length === 0) {
            return (
                <div className="no-content-loading" style={{ textAlign: "center" }}>
                    Aucune donnée
                </div>
            );
        }
        return data.map((row, index) => (
            <ItemListMessagerie
                key={index}
                onClick={() => {
                    setState({ ...state, activeItem: row });
                    let cpData = [...data];
                    cpData = cpData.map((d) => { return (d.id == row.id) ? { ...d, newMessage: false } : d; });
                    setData(cpData);
                }}
            >
                <div className='head-item-list-message'>
                    <span className={`name-item-message ${row.newMessage ? "hasMesaage" : ""}`}>{row.name}</span>
                    <span className='date-message'>
                        {row.etat === "send" ? <DoneIcon /> : row.etat === "reading" ? <DoneAllIcon /> : null}
                        {row.timer}
                    </span>
                </div>
                <div className='last-item-message'>{row.lastMesssage}</div>
            </ItemListMessagerie>
        ));
    };
    return (
        <ListItemsMessagerie>{showData()}</ListItemsMessagerie>
    );
}
