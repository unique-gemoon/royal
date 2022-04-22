import SentimentSatisfiedAltRoundedIcon from "@mui/icons-material/SentimentSatisfiedAltRounded";
import { Button } from "@mui/material";
import Picker, { SKIN_TONE_NEUTRAL } from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";
import { BlocEmojis } from "../assets/styles/componentStyle";

export default function Emojis({ inputEmoji = {}, setInputEmoji = () => {} }) {
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
      setInputEmoji({
        ...inputEmoji,
        value: inputEmoji.value + emojiObject.emoji,
        open: !toggleEmoji,
      });
    }
    setToggleEmoji(false);
  };
  return (
    <BlocEmojis>
      <Button
        className={`btn-toggle-emoji ${toggleEmoji ? "active-emoji" : ""}`}
        onClick={() => {
          setInputEmoji({ ...inputEmoji, open: !toggleEmoji });
          setToggleEmoji(!toggleEmoji);
        }}
      >
        <SentimentSatisfiedAltRoundedIcon />
      </Button>
      {toggleEmoji ? (
        <div className="bloc-list-emoji">
          <Picker
            onEmojiClick={onEmojiClick}
            skinTone={SKIN_TONE_NEUTRAL}
            native
            unified={true}
            disableSearchBar
            disableSkinTonePicker={true}
          />
        </div>
      ) : null}
    </BlocEmojis>
  );
}
