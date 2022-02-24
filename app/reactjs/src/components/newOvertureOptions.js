import React, { useRef, useState } from 'react';
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../components/ui-elements/editorToolBar";
import { useDropzone } from 'react-dropzone';
import ImageIcon from '@mui/icons-material/Image';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BallotIcon from '../assets/images/icons/ballotIcon';
import { DetailsItems } from '../assets/styles/globalStyle';
import { Button } from '@mui/material';
import { BlocNewPliContent, DropZoneBloc, ImageUpload, SoundUpload, ToolBarEditor, VideoUpload } from '../assets/styles/componentStyle';
import Emojis from './emojis';
import { useOutsideAlerter } from '../helper/events';
import iconVideo from '../assets/images/icons/videoIcon.svg';
import RemoveFile from '../assets/images/icons/removeFile';
import { removeTags } from '../helper/fonctions';
import CountDown from './ui-elements/countDown';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import AddSoundage from './addSoundage';

export default function NewOvertureOptions({ state = {}, setState = () => { } }) {

    const [stateWysiwyg, setStateWysiwyg] = useState({
        inputEmoji: {
            name: "content-pli2",
            placeholder: "Que veux-tu dire, Lys ?",
            value: "",
        },
        openSoundage: false,
        soundageOptions: [
            {
                name: "option-1",
                label: "Option 1",
                value: "",
            }
        ]
    });
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

    const { getRootProps, getInputProps } = useDropzone({
        accept: (current && dropFile[current]) ? dropFile[current].accept : '',
        multiple: (current && dropFile[current]) ? dropFile[current].multiple : '',
        onDrop: acceptedFiles => {
            setFiles([...files, ...acceptedFiles]);
            if (current && dropFile[current]) {
                var element = {};
                element[current] = { ...dropFile[current], liste: [...dropFile[current].liste, ...acceptedFiles] };
                setDropFile({ ...dropFile, ...element });
                console.log(element);
            }
            setopenDrop(false);

        },
    })

    const removeFile = (file, current) => () => {
        if (current) {
            const newFiles = [...dropFile[current].liste];
            newFiles.splice(newFiles.indexOf(file), 1);
            var element = {};
            element[current] = { ...dropFile[current], liste: newFiles };
            setDropFile({ ...dropFile, ...element });
        }
    }
    const removeAll = (val) => {
        if (current === val) {
            var element = {};
            element[current] = { ...dropFile[current], liste: [] };
            setDropFile({ ...dropFile, ...element });
        }
        if (current === val) {
            var element = {};
            element[current] = { ...dropFile[current], liste: [] };
            setDropFile({ ...dropFile, ...element });
        }
    }

    const ref = useRef(null);
    useOutsideAlerter(ref, () => { setopenDrop(false) });
    return (
        <BlocNewPliContent className='pli2-ouverture-bloc' ref={ref}>
            <ReactQuill
                className='wisiwyg-pli2'
                theme="snow"
                value={stateWysiwyg.inputEmoji.value || ""}
                onChange={(e) => {
                    const cpState = { ...stateWysiwyg };
                    const value = e || "";

                    if (removeTags(value).length <= 280) {
                        cpState.inputEmoji.value = value;
                        setStateWysiwyg(cpState);
                    }
                }}
                placeholder={stateWysiwyg.inputEmoji.placeholder}
                modules={modules}
                formats={formats}
            />
            {openDrop && (
                <DropZoneBloc {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p>Déposez les fichiers ici</p>
                </DropZoneBloc>
            )}

            <div className='options-new-pli'>
                {stateWysiwyg.openSoundage ? <AddSoundage state={stateWysiwyg.soundageOptions} setState={(e) => setStateWysiwyg({ ...stateWysiwyg, soundageOptions: e })} /> : null}
                <div className='liste-files'>
                    {dropFile["images"].liste.length > 0 ? <div className='bloc-item-image-file'>
                        {dropFile["images"].liste.map((file, i) => (
                            <ImageUpload key={i}>
                                <img src={URL.createObjectURL(file)} alt={file.name} />
                                <Button onClick={removeFile(file, "images")}><RemoveFile /></Button>
                            </ImageUpload>
                        ))}
                    </div> : null}
                    {dropFile["video"].liste.length > 0 ?
                        <div className='bloc-item-image-file'>
                            {dropFile["video"].liste.map((file, i) => (
                                <VideoUpload>
                                    <img src={iconVideo} alt={file.name} />
                                    <Button onClick={removeFile(file, "video")}><RemoveFile /></Button>
                                </VideoUpload>
                            ))}
                        </div> : null
                    }
                    {dropFile["music"].liste.length > 0 ? <div className='bloc-item-image-file'>
                        {dropFile["music"].liste.map((file, i) => (
                            <SoundUpload>
                                <span className='icon-sound'><GraphicEqIcon /></span>
                                <p className='name-sound'><span>{file.name.substring(0, file.name.lastIndexOf('.'))}</span><span>.{file.name.substring(file.name.indexOf('.') + 1)}</span></p>
                                <Button onClick={removeFile(file, "music")}><RemoveFile /></Button>
                            </SoundUpload>
                        ))}

                    </div> : null}

                </div>
            </div>

            <div className='bloc-footer'>
                <ToolBarEditor>
                    <EditorToolbar />
                </ToolBarEditor>
                <div className='bloc-toggle-emoji'>
                    <div className='toggle-action-dropzone'>
                        <DetailsItems className={`${openDrop || stateWysiwyg.openSoundage ? "is-active-dropzone" : ''}`}>
                            <Button onClick={() => { setopenDrop(true); setCurrent('images') }} className={`item-detail image-detail ${(!current || current === "images") && openDrop ? "active" : ''}`}>
                                <ImageIcon />
                            </Button>
                            <Button onClick={() => { setopenDrop(true); setCurrent('video'); removeAll("video") }} className={`item-detail video-detail ${(!current || current === "video") && openDrop ? "active" : ''}`}>
                                <PlayArrowIcon />
                            </Button>
                            <Button onClick={() => { setCurrent('soundage'); setStateWysiwyg({ ...stateWysiwyg, openSoundage: !stateWysiwyg.openSoundage }) }} className={`item-detail soundage-detail ${(!current || current === "soundage") ? "active" : ''}`}>
                                <BallotIcon />
                            </Button>
                            <Button onClick={() => { setopenDrop(true); setCurrent('music'); removeAll("music") }} className={`item-detail sound-detail ${(!current || current === "music") && openDrop ? "active" : ''}`}>
                                <GraphicEqIcon />
                            </Button>
                        </DetailsItems>
                    </div>
                    <Emojis setState={setStateWysiwyg} state={stateWysiwyg} />
                </div>
                <div className='count-publish-pli2'>
                    <CountDown maxCount={2000} setState={removeTags(stateWysiwyg.inputEmoji.value ? stateWysiwyg.inputEmoji.value : '').length} />
                    <div className='bloc-btn-publish'>
                        <Button className='btn-publish'>Publier <SendRoundedIcon /></Button>
                    </div>
                </div>
            </div>
        </BlocNewPliContent >
    );
}
