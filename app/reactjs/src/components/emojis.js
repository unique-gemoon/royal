import React, { useEffect, useRef, useState } from 'react';
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import { BlocEmojis } from '../assets/styles/componentStyle';
import { Button } from '@mui/material';
import SentimentSatisfiedAltRoundedIcon from '@mui/icons-material/SentimentSatisfiedAltRounded';


export default function Emojis({ state = {}, setState = () => { } }) {
    /**
 * Hook that alerts clicks outside of the passed ref
 */
    function useOutsideAlerter(ref, action) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    action();
                }
            }

            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const [toggleEmoji, setToggleEmoji] = useState(false);
    const [chosenEmoji, setChosenEmoji] = useState(null);

    const ref = useRef(null);
    useOutsideAlerter(ref, () => setToggleEmoji(false));

    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
        if (emojiObject.emoji) {
            setState({ ...state, inputEmoji: { ...state.inputEmoji, value: state.inputEmoji.value + emojiObject.emoji }, opened: !toggleEmoji });
        }
        setToggleEmoji(false);
    };
    return (
        <BlocEmojis>
            <Button className={`btn-toggle-emoji ${toggleEmoji ? "active-emoji" : ''}`} onClick={() => { setState({ ...state, opened: !toggleEmoji }); setToggleEmoji(!toggleEmoji)}}>
                <SentimentSatisfiedAltRoundedIcon />
            </Button>
            {toggleEmoji ? 
                <div className='bloc-list-emoji'>
                <Picker
                    onEmojiClick={onEmojiClick}
                    skinTone={SKIN_TONE_MEDIUM_DARK}
                    native
                    disableSearchBar
                />
            </div>  
            : null}
        </BlocEmojis>
    );
}
