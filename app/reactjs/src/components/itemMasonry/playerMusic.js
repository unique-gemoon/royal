import React, { useEffect, useRef, useState } from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { Button } from "@mui/material";
import WaveSurfer from "wavesurfer.js";
import { MusicPlayer } from "../../assets/styles/componentStyle";

export default function PlayerMusic({ item, isClick = false, activeItemMusic, setActiveItemMusic = () => { } }) {
    const formWaveSurferOptions = ref => ({
        container: ref,
        waveColor: "#A0A0A0",
        progressColor: "OrangeRed",
        cursorColor: "OrangeRed",
        barWidth: 1,
        barRadius: 1,
        height: 50,
        width: 60,
        // If true, normalize by the maximum peak instead of 1.0.
        normalize: true,
        // Use the PeakCache to improve rendering speed of large waveforms.
        partialRender: true
    });

    const waveformRef = useRef(null);
    const wavesurfer = useRef(null);
    const [playingMusic, setPlayingMusic] = useState(false);
    const [volumeMusic, setVolumeMusic] = useState(1);
    const [refresh, setRefresh] = useState(false);

    // create new WaveSurfer instance
    // On component mount and when lien changes
    useEffect(() => {

        setPlayingMusic(false);

        const options = formWaveSurferOptions(waveformRef.current);
        wavesurfer.current = WaveSurfer.create(options);

        wavesurfer.current.load(item.lien);

        wavesurfer.current.on("ready", function () {
            // https://wavesurfer-js.org/docs/methods.html
            // wavesurfer.current.play();
            // setPlayingMusic(true);

            // make sure object stillavailable when file loaded
            if (wavesurfer.current) {
                wavesurfer.current.setVolumeMusic(volumeMusic);
                setVolumeMusic(volumeMusic);
            }
        });
        wavesurfer.current.on("play", function () {
            //console.log('music read');
            setActiveItemMusic(item);
        });

        // Removes events, elements and disconnects Web Audio nodes.
        // when component unmount
        return () => wavesurfer.current.destroy();
    }, [item, refresh]);

    useEffect(() => {
        if (!isClick) {
            setTimeout(() => {
                setRefresh(true);
            }, 100);
        }
    }, []);

    useEffect(() => {

        
        if (wavesurfer && activeItemMusic && activeItemMusic.id !== item.id) {
            wavesurfer.current.stop()
            setPlayingMusic(false);
        }
    }, [activeItemMusic])

    const handlePlayPause = () => {


        if (wavesurfer && playingMusic){

        setPlayingMusic(false);

            wavesurfer.current.pause();
        }else{
            setPlayingMusic(true);

            wavesurfer.current.play();
        }
    };


    return (
        <MusicPlayer>
            <div className="controls-player">
                <Button onClick={handlePlayPause}>{!playingMusic ? <PlayArrowIcon /> : <PauseIcon />}</Button>
                <div>
                    <span className="name-player">{item.name}{item.genre ? ',' : null} </span>
                    {item.genre ? <span className="genre-player">{item.genre}</span> : null}
                </div>
            </div>
            <div id="waveform" ref={waveformRef} />
        </MusicPlayer>
    );
}
