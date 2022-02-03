import React, { useRef, useEffect } from 'react';
import { Player, ControlBar, VolumeMenuButton } from 'video-react';
import { VideoPlayer } from '../../assets/styles/componentStyle';

export default function PlayerVideo({ item }) {

    return (
        <VideoPlayer>
            <Player
                playsInline
                src={item}>
                    <ControlBar autoHide={true}>
                        <VolumeMenuButton vertical />
                    </ControlBar>
                </Player>
        </VideoPlayer>
    );
}
