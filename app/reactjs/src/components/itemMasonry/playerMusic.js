import React from 'react';
import Wavefrom from '../wavefrom';

export default function PlayerMusic({ items }) {
    return (
        <>{items && items.map((item, index) => (
            <Wavefrom url={item.url} name={item.name} genre={item.genre} key={index} />
        ))}</>
    ) ;
}
