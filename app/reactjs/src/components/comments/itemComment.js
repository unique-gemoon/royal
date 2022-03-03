import React, { useState } from 'react';
import ArrowDownIcon from '../../assets/images/icons/ArrowDownIcon';
import ReplyIcon from '../../assets/images/icons/replyIcon';
import { CommentItem } from '../../assets/styles/componentStyle';
import InputEmoji from '../ui-elements/inputEmoji';

export default function ItemComment({name, time, subject, children}) {
    const [state, setState] = useState({
        openReponces: false,
        repondre: false,
    })
    //console.log(state);
    return (
        <CommentItem>
            <div className='head-comment'>
                <span className='name-user-comment'>{name}</span>{time ? "." : null}
                <span className='time-comment'>{time}</span>
            </div> 
            <div className='content-text-comment'> {subject}</div>
            <div className='bloc-repondre'>
                <p className={`repondre-comment ${!state.repondre ? 'closed' : ''}`} onClick={() => setState({ ...state, repondre: !state.repondre })}><ReplyIcon /> Répondre</p>
                {state.repondre ? <InputEmoji name="comment-pli" placeholder="Mon commentaire" /> : null}
            </div>
            
            {children ? <div className='bloc-item-reponces'>
                {children ? <p className={`toggle-reponces ${!state.openReponces ? 'open' : ''}`} onClick={() => setState({ ...state, openReponces: !state.openReponces})}><ArrowDownIcon />{state.openReponces ? 'Masquer' : 'Afficher'} les {children.length} réponses </p> : null}
                {state.openReponces ?
                    <div className='reponces-list'>
                        {children && children.map((rep, index) => (
                            <CommentItem key={index}>
                                <div className='head-comment'>
                                    <span className='name-user-comment'>{rep.user}</span>{rep.time ? "." : null}
                                    <span className='time-comment'>{rep.time}</span>
                                </div>
                                <div className='content-text-comment'> {rep.subject}</div>
                            </CommentItem>
                        ))}
                    </div>
                    : null}
            </div> : null}
        </CommentItem>
    );
}
