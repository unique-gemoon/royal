import React from 'react';
import { MasonryItem } from '../../assets/styles/componentStyle';
import BarTemporelle from '../barTemporelle';
import HeadItem from './headItem';
import PlayerMusic from './playerMusic';
import Soundage from './soundage';

export default function ItemMasonry({item, setItem = ()=>{}}) {
    
    return (
        <MasonryItem>
            <div className='bloc-NV1'>
                <HeadItem item={item} setItem={setItem} />
                <div className='bloc-miniature'>
                    {item.niveau1 === "music" ? <PlayerMusic items={item.music} /> : null}
                    {item.niveau1 === "descriptionNV1" && item.descriptionMiniature ? <div className='descripton-miniature'>{item.descriptionMiniature}</div> : null}
                    {item.niveau1 === "soundage" ? <Soundage item={item} setItem={setItem} /> : null}
                </div>
                <BarTemporelle />
            </div>
        </MasonryItem>
    )
}
