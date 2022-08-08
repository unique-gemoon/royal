import React, { useEffect, useRef, useState } from "react";
import { BlocVideoPlayer } from "../../assets/styles/componentStyle";
import VideoJs from "../videoJs";
import { getPathMedia } from "../../helper/fonctions";

export default function PlayerVideo({
  item,
  activeItemPlayer,
  isOpenOuverture = false,
  setActiveItemPlayer = () => {},
}) {
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
      setActiveItemPlayer(item);
    });

    player.on("dispose", () => {
      setActiveItemPlayer(item);
    });

    player.on("play", () => {
      setActiveItemPlayer(item);
    });
  };
  useEffect(() => {
    if (
      activeItemPlayer &&
      activeItemPlayer.path &&
      activeItemPlayer.id !== item.id
    ) {
      if (playerRef.current !== null) {
        playerRef.current.pause();
      }
    }
  }, [activeItemPlayer]);

  useEffect(() => {
    if (refHeight?.current?.clientHeight) {
      setTimeout(() => {
        setHeight(refHeight.current.clientHeight);
      }, 2500);
    }
  }, []);
  useEffect(() => {
    if (isOpenOuverture) {
      if (refHeight?.current?.clientHeight) {
        setTimeout(() => {
          setHeight(refHeight.current.clientHeight);
        }, 100);
      }
    }
  }, [isOpenOuverture]);
  return (
    <BlocVideoPlayer  height={height} className={`${height > 500 ? "is-larg-video" : ""}`}>
      <div ref={refHeight} >
        <VideoJs options={videoJsOptions} onReady={handlePlayerReady} />
      </div>
    </BlocVideoPlayer>
  );
}
