import React, { useEffect, useRef, useState } from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { Button } from "@mui/material";
import WaveSurfer from "wavesurfer.js";
import { MusicPlayer } from "../assets/styles/componentStyle";

export default function Wavefrom({url, name, genre}) {
    const formWaveSurferOptions = ref => ({
        container: ref,
        waveColor: "#A0A0A0",
        progressColor: "OrangeRed",
        cursorColor: "OrangeRed",
        barWidth: 1,
        barRadius: 1,
        responsive: true,
        height: 50,
        // If true, normalize by the maximum peak instead of 1.0.
        normalize: true,
        // Use the PeakCache to improve rendering speed of large waveforms.
        partialRender: true
    });

    const waveformRef = useRef(null);
    const wavesurfer = useRef(null);
    const [playing, setPlay] = useState(false);
    const [volume, setVolume] = useState(1);

    // create new WaveSurfer instance
    // On component mount and when url changes
    useEffect(() => {
        setPlay(false);

        const options = formWaveSurferOptions(waveformRef.current);
        wavesurfer.current = WaveSurfer.create(options);

        wavesurfer.current.load(url);

        wavesurfer.current.on("ready", function () {
            // https://wavesurfer-js.org/docs/methods.html
            // wavesurfer.current.play();
            // setPlay(true);

            // make sure object stillavailable when file loaded
            if (wavesurfer.current) {
                wavesurfer.current.setVolume(volume);
                setVolume(volume);
            }
        });

        // Removes events, elements and disconnects Web Audio nodes.
        // when component unmount
        return () => wavesurfer.current.destroy();
    }, [url]);

    const handlePlayPause = () => {
        setPlay(!playing);
        wavesurfer.current.playPause();
    };

    
  return (
      <MusicPlayer>
          <div className="controls-player">
                <Button onClick={handlePlayPause}>{!playing ? <PlayArrowIcon /> : <PauseIcon />}</Button> 
                <div>
                  <span className="name-player">{name}{genre ? ',' : null} </span>
                    {genre ? <span className="genre-player">{genre}</span> : null}
                </div>
          </div>
          <div id="waveform" ref={waveformRef} />
      </MusicPlayer>
  );
}
