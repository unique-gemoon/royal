import React, { useState } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BallotIcon from '../../assets/images/icons/ballotIcon';
import VisibilityIcon from '@mui/icons-material/Visibility';
import OpenInFullOutlinedIcon from '@mui/icons-material/OpenInFullOutlined';
import CloseFullscreenTwoToneIcon from '@mui/icons-material/CloseFullscreenTwoTone';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import { Button } from '@mui/material';
import { HeadContentItem, DetailsItems } from '../../assets/styles/globalStyle';
import HeadOptionItem from './headOptionItem';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import ArrowDownIcon from '../../assets/images/icons/ArrowDownIcon';

export default function HeadItem({ item, setItem = () => { }, state, setState, action, setAction = () => { } }) {
    const [toggleProfile, setToggleProfile] = useState(false);
    const [statutFolower, setStatutFolower] = useState(item.statutAbonne);
    const handleTooltipClose = () => {
        setToggleProfile(false);
    };

    const handleTooltipOpen = () => {
        setToggleProfile(!toggleProfile)
    };
    return (
            <HeadContentItem>
                <div className='bloc-content-item'>
                    <DetailsItems>
                        {(item.nv1.description && !item.nv1.soundage) || (item.nv2 && item.nv2.description) ?
                            <div className='item-detail format-text-detail'>
                                <FormatSizeIcon />
                            </div> : null}
                        {item.nv1.music || (item.nv2 && item.nv2.music)  ? <div className='item-detail sound-detail'>
                            <GraphicEqIcon />
                        </div> : null}
                        {item.nv1.soundage || (item.nv2 && item.nv2.soundage) ? <div className='item-detail soundage-detail'>
                            <BallotIcon />
                        </div> : null}
                        {item.nv1.photos || (item.nv2 && item.nv2.photos)  ? <div className='item-detail image-detail'>
                            <ImageIcon />
                        </div> : null}
                        {item.nv1.video || (item.nv2 && item.nv2.video)  ? <div className='item-detail video-detail'>
                            <PlayArrowIcon />
                        </div> : null}
                    </DetailsItems> 
                    <ClickAwayListener onClickAway={handleTooltipClose}>
                    <div>
                        <Tooltip
                            PopperProps={{
                                disablePortal: true,
                            }}
                            className="tooltip-post"
                            arrow
                            onClose={handleTooltipClose}
                            open={toggleProfile}
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                            placement="top"
                            title={<><div className='tooltip-info-post'>
                                <span className='name-post'>{item.namePost}</span>
                                <div className='detail-ifo-post'>
                                    <div className='folowers-post'>
                                        <p className='abonnes-post'>
                                            <span>{item.abonnes}</span>
                                            abonnés
                                        </p>
                                        <p className='abonnes-post'>
                                            <span>{item.abonnes}</span>
                                            abonnements
                                        </p>
                                    </div>
                                    <div className='tooltip-btns-action'>
                                        <Button className='toggle-item-message'><MailOutlineRoundedIcon /></Button>
                                        <Button onClick={() => { setStatutFolower(!statutFolower) }} className='btn-switch-folowers'>{statutFolower ? <>S'abonner<PersonAddAltOutlinedIcon /></> : <> Abonner<PersonRemoveOutlinedIcon /></>}</Button>
                                    </div>
                                </div>
                            </div> </>}
                        >
                            <span className='name-post' onClick={handleTooltipOpen}>{item.namePost}</span>
                        </Tooltip></div>
                    </ClickAwayListener>
                    <span className='timer-post'> . 12</span>
                </div>
                <div className='option-item'>
                {state.showModal ?
                    <div className='users-enligne-pli' onClick={() => {
                        setState({ ...state, showModal: false});
                        const cpAction = {
                            ...action, notification: { ...action.notification, isOpen: false }, folower: { ...action.folower, isOpen: false }, search: { ...action.search, isOpen: false }
                            , messagerie: { ...action.messagerie, isOpen: false }
                        };
                        setAction(cpAction);
                     }}>
                        14 <VisibilityIcon /> <CloseFullscreenTwoToneIcon className='open-zoom-icon' /> 
                    </div>
                    :
                    <div className='users-enligne-pli' onClick={() => { 
                        state && setState({ ...state, showModal: true,  showPli2: true })
                        
                        }}>
                        14 <VisibilityIcon /> <OpenInFullOutlinedIcon className='open-zoom-icon' />
                    </div> 
                    }
                    <div className='nb-message-comment' onClick={() => {
                        // setState({ ...state, showModal: !state.showModal });
                        // const cpAction = {
                        //     ...action, notification: { ...action.notification, isOpen: false }, folower: { ...action.folower, isOpen: false }, search: { ...action.search, isOpen: false }
                        //     , messagerie: { ...action.messagerie, isOpen: false }
                        // };
                        // setAction(cpAction);
                        setState({ ...state, showPli2: !state.showPli2 });
                        const cpAction = {
                            ...action, notification: { ...action.notification, isOpen: false }, folower: { ...action.folower, isOpen: false }, search: { ...action.search, isOpen: false }
                            , messagerie: { ...action.messagerie, isOpen: false }
                        };
                        setAction(cpAction);
                    }}>
                    3 <CommentOutlinedIcon /> <ArrowDownIcon />
                    </div>
                    <div className='btn-copy'>
                        <InsertLinkIcon />
                    </div>
                </div>
            {/* <HeadOptionItem item={item} setItem={setItem} />  */}
            </HeadContentItem>
            
    )
}
