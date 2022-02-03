import React, { useEffect, useRef, useState } from 'react';
import { MasonryItem, ModalItem } from '../../assets/styles/componentStyle';
import BarTemporelle from '../barTemporelle';
import HeadItem from './headItem';
import ImagesGallery from './imagesGallery';
import PlayerVideo from './playerVideo';
import Soundage from './soundage';
import PlayerMusic from './PlayerMusic';
import VisibilityIcon from '@mui/icons-material/Visibility';
import OpenInFullOutlinedIcon from '@mui/icons-material/OpenInFullOutlined';
import CloseFullscreenTwoToneIcon from '@mui/icons-material/CloseFullscreenTwoTone';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';

export default function ItemMasonry({ item, setItem = () => { }, open = false }) {
    const [state, setState] = useState({
        showPli2: open,
        showModal: false,
    });
    const [height, setHeight] = useState(0);
    const refHeight = useRef(null);

    useEffect(() => {
        if (refHeight.current) {
            setTimeout(() => {
                setHeight(refHeight.current.clientHeight);
            }, 1000);
        }
    }, []);
    console.log(height);
    return (
        <>

            <ModalItem show={state.showModal} onHide={() => { setState({ ...state, showModal: false }) }}>
                <ModalItem.Body>
                    <MasonryItem ref={refHeight}>
                        <div className='bloc-NV1'>
                            <HeadItem item={item} setItem={setItem} state={state} setState={setState} />
                            <div className='bloc-miniature'>
                                {item.nv1.description ? <div className='descripton-miniature'>{item.nv1.description}</div> : null}
                                {item.nv1.soundage ? <Soundage name={`modal_${item.id}_1`} niveau={1} item={item} setItem={setItem} /> : null}
                                {item.nv1.photos ? <ImagesGallery items={item.nv1.photos} /> : null}
                                {item.nv1.video ? <PlayerVideo item={item.nv1.video} /> : null}
                                {item.nv1.music ? <PlayerMusic item={item.nv1.music} /> : null}
                            </div>
                            <BarTemporelle
                                state={state}
                                setState={setState}
                            />
                        </div>
                        {state.showPli2 ?
                        <div className='Bloc-NV2'>
                            {item.nv2 ?
                                <div className='content-bloc-NV2'>
                                    {item.nv2.description ? <div className='descripton-miniature'>{item.nv2.description}</div> : null}
                                    {item.nv2.music ? <PlayerMusic item={item.nv2.music} isClick={true} /> : null}
                                    {item.nv2.soundage ? <Soundage name={`modal_${item.id}_2`} niveau={2} item={item} setItem={setItem} /> : null}
                                    {item.nv2.photos ? <ImagesGallery items={item.nv2.photos} /> : null}
                                    {item.nv2.video ? <PlayerVideo item={item.nv2.video} /> : null}
                                </div>
                                : null}
                            <div className='toggle-pli2'><span className='users-views'>14 <CommentOutlinedIcon /></span> . <span className='toggle-zoom' onClick={() => setState({ ...state, showModal: false })}>Retour au pli ouvert<CloseFullscreenTwoToneIcon className='open-zoom-icon' /></span></div>
                        </div>
                        : null}
                    </MasonryItem>
                </ModalItem.Body>
            </ModalItem>
            <MasonryItem height={height}>
                <div className='bloc-NV1' ref={refHeight}>
                    <HeadItem item={item} setItem={setItem} state={state} setState={setState}/>
                    <div className='bloc-miniature'>

                        {item.nv1.description ? <div className='descripton-miniature'>{item.nv1.description}</div> : null}
                        {item.nv1.soundage ? <Soundage name={`bloc_${item.id}_1`} niveau={1} item={item} setItem={setItem} /> : null}
                        {item.nv1.photos ? <ImagesGallery items={item.nv1.photos} /> : null}
                        {item.nv1.video ? <PlayerVideo item={item.nv1.video} /> : null}
                        {item.nv1.music ? <PlayerMusic item={item.nv1.music} /> : null}
                    </div>
                    <BarTemporelle
                        state={state}
                        setState={setState}
                    />
                    {state.showPli2 ?
                        <div className='Bloc-NV2'>
                            {item.nv2 ?
                                <div className='content-bloc-NV2'>
                                    {item.nv2.description ? <div className='descripton-miniature'>{item.nv2.description}</div> : null}
                                    {item.nv2.music ? <PlayerMusic item={item.nv2.music} isClick={true} /> : null}
                                    {item.nv2.soundage ? <Soundage name={`bloc_${item.id}_2`} niveau={2} item={item} setItem={setItem} /> : null}
                                    {item.nv2.photos ? <ImagesGallery items={item.nv2.photos} /> : null}
                                    {item.nv2.video ? <PlayerVideo item={item.nv2.video} /> : null}
                                </div>
                                : null}
                            <div className='toggle-pli2'><span className='users-views'>14 <VisibilityIcon /></span> . <span className='toggle-zoom' onClick={() => setState({ ...state, showModal: true })}>Etendre le pli<OpenInFullOutlinedIcon className='open-zoom-icon' /></span></div>

                        </div>
                        : null}

                </div>
            </MasonryItem>


        </>


    )
}
