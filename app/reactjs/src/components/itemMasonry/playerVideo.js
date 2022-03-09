// import React from 'react';
// import { Player, ControlBar, VolumeMenuButton } from 'video-react';
// import { VideoPlayer } from '../../assets/styles/componentStyle';

// export default function PlayerVideo({ item }) {

//     return (
//         <VideoPlayer>
//             <Player
//                 playsInline
//                 src={item}>
//                     <ControlBar autoHide={true}>
//                         <VolumeMenuButton vertical />
//                     </ControlBar>
//                 </Player>
//         </VideoPlayer>
//     );
// }
import React, { useRef } from 'react';
import VideoPlayer from 'react-video-js-player';
import { BlocVideoPlayer } from '../../assets/styles/componentStyle';

export default function PlayerVideo({ item }) {
    
    return (
        <BlocVideoPlayer>
            <VideoPlayer src={item}  height="221" />
        </BlocVideoPlayer>
    );
}
