import SentimentSatisfiedAltRoundedIcon from "@mui/icons-material/SentimentSatisfiedAltRounded";
import { Button } from "@mui/material";
import Picker, { SKIN_TONE_NEUTRAL } from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";
import { BlocEmojis } from "../assets/styles/componentStyle";
import { useOutsideAlerter } from "../helper/events";

export default function Emojis({ inputEmoji = {}, setInputEmoji = () => {} }) {
  

  const [toggleEmoji, setToggleEmoji] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const ref = useRef(null);

  useOutsideAlerter(ref, () => {
    setToggleEmoji(false)
  });

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    if (emojiObject.emoji) {
      setInputEmoji({
        ...inputEmoji,
        value: inputEmoji.value + emojiObject.emoji,
        open: true,
      });
    }
    setToggleEmoji(false);
  };
  return (
    <BlocEmojis>
      {toggleEmoji === false && (
      <Button
        className={`btn-toggle-emoji`}
        onClick={() => {
          setInputEmoji({ ...inputEmoji, open: true });
          setToggleEmoji(true);
        }}
      >
        <SentimentSatisfiedAltRoundedIcon />
      </Button>
      )}
      {toggleEmoji && (
      <Button
        className={`btn-toggle-emoji active-emoji`}
      >
        <SentimentSatisfiedAltRoundedIcon />
      </Button>
      )}
      {toggleEmoji ? (
        <div className="bloc-list-emoji" ref={ref}>
          <Picker
            onEmojiClick={onEmojiClick}
            skinTone={SKIN_TONE_NEUTRAL}
            unified={true}
            disableSearchBar
            disableSkinTonePicker={true}
            groupVisibility={{
              recently_used: false,
            }}
          />
        </div>
      ) : null}
    </BlocEmojis>
  );
}
