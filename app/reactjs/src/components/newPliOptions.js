import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import ImageIcon from "@mui/icons-material/Image";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Button } from "@mui/material";
import React, { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import BallotIcon from "../assets/images/icons/ballotIcon";
import RemoveFile from "../assets/images/icons/removeFile";
import iconVideo from "../assets/images/icons/videoIcon.svg";
import {
    BlocNewPliContent,
    DropZoneBloc,
    ImageUpload,
    SoundUpload,
    VideoUpload,
} from "../assets/styles/componentStyle";
import { DetailsItems } from "../assets/styles/globalStyle";
import { useDragover, useDrop, useOutsideAlerter } from "../helper/events";
import Emojis from "./emojis";
import InputFile from "./ui-elements/inputFile";

export default function NewPliOptions({ state, setState = () => {}, setMessage = () => {} }) {
    const [openDrop, setopenDrop] = useState(false);

    const { getRootProps } = useDropzone({
        accept: "image/jpeg, image/png, video/mp4,video/x-m4v,video/*, audio/mpeg",
        multiple: true,
        onDrop: (acceptedFiles) => {
            let typesMedia = [];
            acceptedFiles.map((file) => {
                for (const key in state.media) {
                    if (state.media[key].accept.indexOf(file.type) !== -1) {
                        if (!typesMedia.includes(key)) {
                            typesMedia.push(key);
                            if (typesMedia.length > 1) {
                                setMessage(
                                    "Vous ne pouvez ajouter qu’un seul type de média, accompagné de texte (ou pas)."
                                );
                                break;
                            }
                        }
                        if (state.media[key].file.length < state.media[key].maxFiles) {
                            const cpState = { ...state };
                            cpState.media[key].file = [...cpState.media[key].file, file];
                            setState(cpState);
                        } else {
                            setMessage(
                                <>
                                    Veuillez sélectionner maximun {state.media[key].maxFiles} {state.media[key].name}{" "}
                                </>
                            );
                        }
                        break;
                    }
                }
            });
            setopenDrop(false);
        },
    });

    const removeFile = (file, current) => {
        if (current) {
            const newUpload = [...state.media[current].file];
            newUpload.splice(newUpload.indexOf(file), 1);
            var element = {};
            element[current] = { ...state.media[current], file: newUpload };
            setState({ ...state, media: { ...state.media, ...element } });
        }
    };

    const ref = useRef(null);

    useOutsideAlerter(ref, () => {
        setopenDrop(false);
    });

    useDragover(ref, () => {
        setopenDrop(true);
    });

    useDrop(ref, () => {
        setopenDrop(false);
    });

    const disabledMediaIcon = (type) => {
        if (
            state.media.images.file.length ||
            state.media.video.file.length ||
            state.sondage.value.length ||
            state.media.music.file.length
        ) {
            if (
                (type == "sondage" &&
                    state.sondage.value.length &&
                    state.sondage.value.length < state.sondage.maxOptions) ||
                (type != "sondage" &&
                    state.media[type].file.length &&
                    state.media[type].file.length < state.media[type].maxFiles)
            ) {
                return "";
            }
            return "disabled";
        }
        return "";
    };

    return (
        <>
            <div className="liste-files">
                {state.media.images.file.length > 0 && (
                    <div className="bloc-item-image-file">
                        {Array.from(state.media.images.file).map((file, index) => (
                            <ImageUpload key={index}>
                                <img src={URL.createObjectURL(file)} alt={file.name} />
                                <Button onClick={() => removeFile(file, "images")}>
                                    <RemoveFile />
                                </Button>
                            </ImageUpload>
                        ))}
                    </div>
                )}
                {state.media.video.file.length > 0 && (
                    <div className="bloc-item-video-file">
                        {Array.from(state.media.video.file).map((file, index) => (
                            <VideoUpload key={index}>
                                <img src={iconVideo} alt={file.name} />
                                <Button onClick={() => removeFile(file, "video")}>
                                    <RemoveFile />
                                </Button>
                            </VideoUpload>
                        ))}
                    </div>
                )}
                {state.media.music.file.length > 0 && (
                    <div className="bloc-item-sound-file">
                        {state.media.music.file.map((file, index) => (
                            <SoundUpload key={index}>
                                <span className="icon-sound">
                                    <GraphicEqIcon />
                                </span>
                                <p className="name-sound">
                                    <span>{file.name.substring(0, file.name.lastIndexOf("."))}</span>
                                    <span>.{file.name.substring(file.name.indexOf(".") + 1)}</span>
                                </p>
                                <Button onClick={() => removeFile(file, "music")}>
                                    <RemoveFile />
                                </Button>
                            </SoundUpload>
                        ))}
                    </div>
                )}
            </div>
            <BlocNewPliContent ref={ref}>
                {openDrop && (
                    <DropZoneBloc {...getRootProps({ className: "dropzone" })}>
                        <p>Déposez les fichiers ici</p>
                    </DropZoneBloc>
                )}
                <div className="options-new-pli">
                    <div className="toggle-action-dropzone">
                        <DetailsItems>
                            <div className={`item-detail image-detail ${disabledMediaIcon("images")}`}>
                                <InputFile
                                    {...state.media.images}
                                    onChange={(e) => {
                                        if (
                                            state.media.images.file.length + e.currentTarget.files.length <=
                                            state.media.images.maxFiles
                                        ) {
                                            const cpState = { ...state };
                                            cpState.media.images.file = [
                                                ...cpState.media.images.file,
                                                ...e.currentTarget.files,
                                            ];
                                            setState(cpState);
                                            setMessage(null);
                                        } else {
                                            setMessage(
                                                <>
                                                    Veuillez sélectionner maximun {state.media.images.maxFiles}{" "}
                                                    {state.media.images.name}{" "}
                                                </>
                                            );
                                        }
                                    }}
                                />
                                <label htmlFor="file-images-nv1">
                                    <ImageIcon />
                                </label>
                            </div>
                            <div className={`item-detail video-detail ${disabledMediaIcon("video")}`}>
                                <InputFile
                                    {...state.media.video}
                                    onChange={(e) => {
                                        if (
                                            state.media.video.file.length + e.currentTarget.files.length <=
                                            state.media.video.maxFiles
                                        ) {
                                            const cpState = { ...state };
                                            cpState.media.video.file = [
                                                ...cpState.media.video.file,
                                                ...e.currentTarget.files,
                                            ];
                                            setState(cpState);
                                            setMessage(null);
                                        } else {
                                            setMessage(
                                                <>
                                                    Veuillez sélectionner maximun {state.media.video.maxFiles}{" "}
                                                    {state.media.video.name}{" "}
                                                </>
                                            );
                                        }
                                    }}
                                />
                                <label htmlFor="file-video-nv1">
                                    <PlayArrowIcon />
                                </label>
                            </div>
                            <Button
                                onClick={() => {
                                    setState({ ...state, sondage: { ...state.sondage, open: !state.sondage.open } });
                                }}
                                className={`item-detail sondage-detail ${disabledMediaIcon("sondage")}`}
                            >
                                <BallotIcon />
                            </Button>
                            <div className={`item-detail sound-detail ${disabledMediaIcon("music")}`}>
                                <InputFile
                                    {...state.media.music}
                                    onChange={(e) => {
                                        if (
                                            state.media.music.file.length + e.currentTarget.files.length <=
                                            state.media.music.maxFiles
                                        ) {
                                            const cpState = { ...state };
                                            cpState.media.music.file = [
                                                ...cpState.media.music.file,
                                                ...e.currentTarget.files,
                                            ];
                                            setState(cpState);
                                        } else {
                                            setMessage(
                                                <>
                                                    Veuillez sélectionner maximun {state.media.music.maxFiles}{" "}
                                                    {state.media.music.name}{" "}
                                                </>
                                            );
                                        }
                                    }}
                                />
                                <label htmlFor="file-music-nv1">
                                    <GraphicEqIcon />
                                </label>
                            </div>
                            <Emojis
                                inputEmoji={state.inputEmoji}
                                setInputEmoji={(e) => setState({ ...state, inputEmoji: e })}
                            />
                        </DetailsItems>
                    </div>
                </div>
            </BlocNewPliContent>
        </>
    );
}
