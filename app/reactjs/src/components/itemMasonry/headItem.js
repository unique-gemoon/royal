import React, { useState } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { HeadContentItem, DetailsItems } from '../../assets/styles/globalStyle';
import HeadOptionItem from './headOptionItem';

export default function HeadItem({ item, setItem = ()=>{} }) {
    return (
        <>
            <HeadContentItem>
                {/* <DetailsItems>
                    {item.hasContent ? 
                    <div className='item-detail format-text-detail'>
                        <FormatSizeIcon />
                    </div> : null}
                    {item.hasSound ? <div className='item-detail sound-detail'>
                        <GraphicEqIcon />
                    </div> : null}
                    
                    {item.hasImage ? <div className='item-detail image-detail'>
                        <ImageIcon />
                    </div> : null }
                    {item.hasVideo ? <div className='item-detail video-detail'>
                        <PlayArrowIcon />
                    </div> : null}
                </DetailsItems> */}
                <span className='name-post'>{item.namePost}</span>
                <span className='timer-post'> . 12</span>
            </HeadContentItem>
            <HeadOptionItem item={item} setItem={setItem} /> 
        </>
    )
}
