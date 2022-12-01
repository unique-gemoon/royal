import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BlocVideoPlayer } from "../../assets/styles/componentStyle";
import { getPathMedia } from "../../helper/fonctions";
import * as actionTypes from "../../store/functions/actionTypes";
import VideoJs from "../videoJs";

export default function PlayerVideo({ item }) {
    const dispatch = useDispatch();
    const pli = useSelector((store) => store.pli);

    const [height, setHeight] = useState(0);
    const refHeight = useRef(null);
    const playerRef = React.useRef(null);

    const videoJsOptions = {
        // lookup the options in the docs for more options
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [
            {
                src: getPathMedia(item.path, "video"),
                type: "video/mp4",
            },
        ],
    };

    const handlePlayerReady = (player) => {
        playerRef.current = player;
        // you can handle player events here
        player.on("waiting", () => {
            dispatch({
                type: actionTypes.LOAD_PLI,
                activeItemPlayer: item,
            });
        });

        player.on("dispose", () => {
            dispatch({
                type: actionTypes.LOAD_PLI,
                activeItemPlayer: item,
            }); 
        });

        player.on("play", () => {
            dispatch({
                type: actionTypes.LOAD_PLI,
                activeItemPlayer: item,
            }); 
        });
    };
    useEffect(() => {
        if (pli.activeItemPlayer?.path && pli.activeItemPlayer?.id !== item.id) {
            if (playerRef.current !== null) {
                playerRef.current.pause();
            }
        }
    }, [pli.activeItemPlayer]);

    useEffect(() => {
        if (!(pli.showNV2 && pli.activeItem?.id == item.id)) {
            playerRef?.current?.pause();
        }
        if (refHeight?.current?.clientHeight) {
            if (refHeight.current.clientHeight > 470) {
                setHeight(refHeight.current.clientHeight);
            }
        }
    }, [pli.showNV2, pli.activeItem, pli.activeItemPlayer, refHeight?.current?.clientHeight]);

    return (
        <BlocVideoPlayer className={`${height > 470 ? "is-larg-video" : ""}`}>
            <div ref={refHeight}>
                <VideoJs options={videoJsOptions} onReady={handlePlayerReady} />
            </div>
        </BlocVideoPlayer>
    );
}
