import React, { useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ImageIcon from '@mui/icons-material/Image';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BallotIcon from '../assets/images/icons/ballotIcon';
import { DetailsItems } from '../assets/styles/globalStyle';
import { Button } from '@mui/material';
import { BlocNewPliContent, DropZoneBloc, ImageUpload, SoundUpload, VideoUpload } from '../assets/styles/componentStyle';
import Emojis from './emojis';
import { useOutsideAlerter } from '../helper/events';
import iconVideo from '../assets/images/icons/videoIcon.svg';
import RemoveFile from '../assets/images/icons/removeFile';

export default function NewPilOptions({ state = {}, setState = () => { } }) {
    const [dropFile, setDropFile] = useState({
        images: {
            accept: 'image/jpeg, image/png',
            icon: 'img',
            multiple: true,
            liste: []
        },
        video: {
            accept: 'video/mp4,video/x-m4v,video/*',
            icon: 'mp4',
            multiple: false,
            liste: []
        },
        music: {
            accept: 'audio/mpeg',
            icon: 'mp3',
            multiple: false,
            liste: []
        },
    });
    const [current, setCurrent] = useState('');
    const [openDrop, setopenDrop] = useState(false);
    const [files, setFiles] = useState([]);
    console.log(current);

    const { getRootProps, getInputProps } = useDropzone({
        accept: current ? dropFile[current].accept : '',
        multiple: current ? dropFile[current].multiple : '',
        onDrop: acceptedFiles => {
            setFiles([...files, ...acceptedFiles]);
            console.log('iam ', current);
            if (current) {
                console.log('iam here');
                var element = {};
                element[current] = { ...dropFile[current], liste: [...dropFile[current].liste, ...acceptedFiles] };
                console.log(element);
                setDropFile({ ...dropFile, ...element });
                console.log(element);
            }
            setopenDrop(false);

        },
    })

    const removeFile = file => () => {
        if (current) {
            const newFiles = [...dropFile[current].liste];
            newFiles.splice(newFiles.indexOf(file), 1);
            var element = {};
            element[current] = { ...dropFile[current], liste: newFiles };
            setDropFile({ ...dropFile, ...element });
        }
    }
    const removeAll = () => {
        if (current === 'video') {
            var element = {};
            element[current] = { ...dropFile[current], liste: [] };
            setDropFile({ ...dropFile, ...element });
        }
        if (current === 'music') {
            var element = {};
            element[current] = { ...dropFile[current], liste: [] };
            setDropFile({ ...dropFile, ...element });
        }
    }

    const ref = useRef(null);
    useOutsideAlerter(ref, () => { setopenDrop(false) });

    return (
        <BlocNewPliContent ref={ref}>

            {openDrop && (
                <DropZoneBloc {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p>Déposez les fichiers ici</p>
                </DropZoneBloc>
            )}
            <div className='options-new-pli'>
                <div className='liste-files'>

                    { 
                        current && dropFile[current].liste.map(file => (

                            <div className='bloc-item-image-file' key={file.path}>
                                {current === "images" ?
                                    <ImageUpload>
                                        <img src={URL.createObjectURL(file)} alt={file.name} />
                                        <Button onClick={removeFile(file)}><RemoveFile /></Button>
                                    </ImageUpload>
                                    : null}
                                {current === "video" ?
                                    <VideoUpload>
                                        <img src={iconVideo} alt={file.name}   />
                                        <Button onClick={removeFile(file)}><RemoveFile /></Button>
                                    </VideoUpload>
                                    : null}
                                {current === "music" ?
                                    <SoundUpload>
                                        <span className='icon-sound'><GraphicEqIcon /></span>
                                        <p className='name-sound'><span>{file.name.substring(0, file.name.lastIndexOf('.'))}</span><span>.{file.name.substring(file.name.indexOf('.') + 1)}</span></p>
                                        <Button onClick={removeFile(file)}><RemoveFile /></Button>
                                    </SoundUpload>
                                    : null}

                            </div>
                        ))
                    }

                </div>

                <div className='toggle-action-dropzone'>
                    <DetailsItems className={`${openDrop ? "is-active-dropzone" : ''}`}>
                        <Button onClick={() => { setopenDrop(true); setCurrent('music'); removeAll(); }} className={`item-detail sound-detail ${(!current || current === "music") && openDrop ? "active" : ''}`}>
                            <GraphicEqIcon />
                        </Button>
                        <Button onClick={() => { setCurrent('') }} className={`item-detail soundage-detail ${(!current || current === "") && openDrop ? "active" : ''}`}>
                            <BallotIcon />
                        </Button>
                        <Button onClick={() => { setopenDrop(true); setCurrent('images') }} className={`item-detail image-detail ${(!current || current === "images") && openDrop ? "active" : ''}`}>
                            <ImageIcon />
                        </Button>
                        <Button onClick={() => { setopenDrop(true); setCurrent('video'); removeAll(); }} className={`item-detail video-detail ${(!current || current === "video") && openDrop ? "active" : ''}`}>
                        <PlayArrowIcon />
                    </Button>
                </DetailsItems>
            </div>
            <Emojis setState={setState} state={state} />
        </div>
    </BlocNewPliContent >
    );
}
