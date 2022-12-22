import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MusicPlayer } from "../../assets/styles/componentStyle";
import { getPathMedia } from "../../helper/fonctions";
import * as actionTypes from "../../store/functions/actionTypes";

import ReactWaves from "@dschoon/react-waves";

export default function PlayerMusic({ item }) {
    const dispatch = useDispatch();
    const pli = useSelector((store) => store.pli);
    const [playingMusic, setPlayingMusic] = useState(false);

    useEffect(() => {
        if (pli.activeItemPlayer?.id !== item.id) {
            setPlayingMusic(false);
        }
    }, [pli.activeItemPlayer]);

    const handlePlayPause = () => {
        if (playingMusic) {
            setPlayingMusic(false);
        } else {
            setPlayingMusic(true);
            dispatch({
                type: actionTypes.LOAD_PLI,
                activeItemPlayer: item,
            });
        }
    };

    return (
        <MusicPlayer>
            <div className="controls-player">
                <Button onClick={handlePlayPause}>{!playingMusic ? <PlayArrowIcon /> : <PauseIcon />}</Button>
                <div>
                    <span className="name-player">{item.originalname || item.name}</span>
                </div>
            </div>

            <ReactWaves
                audioFile={getPathMedia(item.path, "music")}
                className={"react-waves"}
                options={{
                    waveColor: "#A0A0A0",
                    progressColor: "OrangeRed",
                    cursorColor: "OrangeRed",
                    barWidth: 1,
                    barRadius: 1,
                    height: 50,
                    normalize: false,
                    cursorWidth: 0,
                    mediaType: "audio",
                    hideScrollbar: true,
                    responsive: true,
                }}
                zoom={1}
                playing={playingMusic}
            />
        </MusicPlayer>
    );
}
