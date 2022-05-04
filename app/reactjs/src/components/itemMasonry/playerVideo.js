
import React, { useEffect } from 'react';
import { BlocVideoPlayer } from '../../assets/styles/componentStyle';
import VideoJs from '../videoJs';

export default function PlayerVideo({ item, activeItemPlayer, setActiveItemPlayer = () => { }, }) {
    const playerRef = React.useRef(null);

    const videoJsOptions = { // lookup the options in the docs for more options
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
            src: item.src,
            type: 'video/mp4'
        }]
    }


    const handlePlayerReady = (player) => {
        playerRef.current = player;

        // you can handle player events here
        player.on('waiting', () => {
            setActiveItemPlayer(item);
        });

        player.on('dispose', () => {
            setActiveItemPlayer(item);
        });
        
        player.on('play', () => {
            setActiveItemPlayer(item);
        })
    };
    useEffect(() => {

        if (activeItemPlayer && activeItemPlayer.src && activeItemPlayer.id != item.id) {
            if (playerRef.current != null) {
                playerRef.current.pause()
            }
        }
    }, [activeItemPlayer])

    // const changePlayerOptions = () => {
    //   // you can update the player through the Video.js player instance
    //   if (!playerRef.current) {
    //     return;
    //   }
    //   // [update player through instance's api]
    //   playerRef.current.src([{src: 'http://ex.com/video.mp4', type: 'video/mp4'}]);
    //   playerRef.current.autoplay(false);
    // };

    return (
        <BlocVideoPlayer>
            <VideoJs options={videoJsOptions} onReady={handlePlayerReady} />
        </BlocVideoPlayer>
    );
}
