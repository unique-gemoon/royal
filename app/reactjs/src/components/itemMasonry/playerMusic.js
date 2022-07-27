import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { MusicPlayer } from "../../assets/styles/componentStyle";
import { getPathMedia } from "../../helper/fonctions";

export default function PlayerMusic({
  item,
  isOpenOuverture = false,
  activeItemMusic = {},
  setActiveItemMusic = () => {},
}) {
  const formWaveSurferOptions = (ref) => ({
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
    partialRender: true,
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

    wavesurfer.current.load(getPathMedia(item.path, "music"));

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
      setActiveItemMusic(item);
    });

    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => wavesurfer.current.destroy();
  }, [item, refresh]);

  useEffect(() => {
    if (isOpenOuverture) {
      setTimeout(() => {
        setRefresh(true);
      }, 100);
    }
  }, [isOpenOuverture]);

  useEffect(() => {
    if (wavesurfer && activeItemMusic && activeItemMusic.id !== item.id) {
      wavesurfer.current.stop();
      setPlayingMusic(false);
    }
  }, [activeItemMusic]);

  const handlePlayPause = () => {
    if (wavesurfer && playingMusic) {
      setPlayingMusic(false);

      wavesurfer.current.pause();
    } else {
      setPlayingMusic(true);

      wavesurfer.current.play();
    }
  };

  return (
    <MusicPlayer>
      <div className="controls-player">
        <Button onClick={handlePlayPause}>
          {!playingMusic ? <PlayArrowIcon /> : <PauseIcon />}
        </Button>
        <div>
          <span className="name-player">
            {item.name}
          </span>
        </div>
      </div>
      <div id="waveform" ref={waveformRef} />
    </MusicPlayer>
  );
}
