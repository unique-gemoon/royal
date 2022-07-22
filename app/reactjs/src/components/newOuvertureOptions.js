import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import ImageIcon from "@mui/icons-material/Image";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { Button } from "@mui/material";
import React, { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import ReactQuill, { Quill } from "react-quill";
import BallotIcon from "../assets/images/icons/ballotIcon";
import { BlocNewPliContent, DropZoneBloc, ToolBarEditor } from "../assets/styles/componentStyle";
import { DetailsItems } from "../assets/styles/globalStyle";
import { useDragover, useDrop, useOutsideAlerter } from "../helper/events";
import { removeTags } from "../helper/fonctions";
import AddSondage from "./addSondage";
import Emojis from "./emojis";
import ButtonDef from "./ui-elements/buttonDef";
import CountDown from "./ui-elements/countDown";
import EditorToolbar, { formats, modules } from "./ui-elements/editorToolBar";
import InputFile from "./ui-elements/inputFile";

export default function NewOuvertureOptions({ state, setState = () => {}, submitting, setMessage = () => {} }) {
    const [openDrop, setopenDrop] = useState(false);

    const { getRootProps } = useDropzone({
        accept: "image/jpeg, image/png, video/mp4,video/x-m4v,video/*, audio/mpeg",
        multiple: true,
        onDrop: (acceptedFiles) => {
            acceptedFiles.map((file) => {
                for (const key in state.mediaOuverture) {
                    if (state.mediaOuverture[key].accept.indexOf(file.type) !== -1) {
                        if (state.mediaOuverture[key].file.length < state.mediaOuverture[key].maxFiles) {
                            let cpState = { ...state };
                            cpState.mediaOuverture[key].file = [...cpState.mediaOuverture[key].file, file];
                            cpState = addMediaToWysiwyg(file, key, cpState);
                            setState(cpState);
                        } else {
                            setMessage(
                                <>
                                    Veuillez sélectionner maximun {state.mediaOuverture[key].maxFiles}{" "}
                                    {state.mediaOuverture[key].name}{" "}
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

    const ref = useRef(null);
    let quillObj = null;

    useOutsideAlerter(ref, () => {
        setopenDrop(false);
    });

    useDragover(ref, () => {
        setopenDrop(true);
    });
    useDrop(ref, () => {
        setopenDrop(false);
    });

    const removeFile = (file, current, cpState) => {
        if (current) {
            const files = [...cpState.mediaOuverture[current].file];
            const index = files.indexOf(file);
            files.splice(index, 1);
            const values = [...cpState.mediaOuverture[current].value];
            values.splice(index, 1);
            var element = {};
            element[current] = { ...cpState.mediaOuverture[current], file: files, value: values };
            return { ...cpState, mediaOuverture: { ...cpState.mediaOuverture, ...element } };
        }
        return cpState;
    };

    const addMediaToWysiwyg = (file, key, cpState) => {
        const url = URL.createObjectURL(file);
        cpState.mediaOuverture[key].value.push(url);
        cpState.inputEmojiOuverture.value += "<" + state.mediaOuverture[key].balise + ' src="' + url + '"/>';
        return cpState;
    };

    const checkDeletedMedias = (cpState) => {
        console.log("checkDeletedMedias");
        return cpState;
        for (const key in cpState.mediaOuverture) {
            if (cpState.mediaOuverture[key].file.length > 0) {
                Array.from(cpState.mediaOuverture[key].file).map((file, index) => {
                    const url = state.mediaOuverture[key].value[index];
                    if (cpState.inputEmojiOuverture.value.indexOf(url) == -1) {
                        cpState = removeFile(file, key, cpState);
                    }
                });
            }
        }
        console.log(cpState.mediaOuverture);
        return cpState;
    };

    return (
        <BlocNewPliContent className="pli2-ouverture-bloc" ref={ref}>
            <ReactQuill
                ref={(el) => {
                    quillObj = el;
                }}
                className="wisiwyg-pli2"
                theme="snow"
                value={state.inputEmojiOuverture.value || ""}
                onChange={(e) => {
                    // TODO:
                    let cpState = { ...state };
                    const value = e || "";
                    if (removeTags(value).length <= 2000) {
                        cpState.inputEmojiOuverture.value = value;
                    }
                    cpState = checkDeletedMedias({
                        ...cpState,
                        inputEmojiOuverture: { ...cpState.inputEmojiOuverture, value },
                    });
                    setState(cpState);
                    console.log("inputEmojiOuverture", cpState.inputEmojiOuverture.value);
                }}
                placeholder={state.inputEmojiOuverture.placeholder}
                modules={modules}
                formats={formats}
            />
            {openDrop && (
                <DropZoneBloc {...getRootProps({ className: "dropzone" })}>
                    <p>Déposez les fichiers ici</p>
                </DropZoneBloc>
            )}

            <div className="options-new-pli">
                {state.sondageOuverture.open && (
                    <AddSondage
                        maxOption={state.sondageOuverture.maxOptions}
                        sondage={state.sondageOuverture}
                        setSondage={(e) => {
                            setState({
                                ...state,
                                sondageOuverture: e,
                            });
                        }}
                        showSondage={state.sondageOuverture.open}
                        setShowSondage={(e) => {
                            setState({
                                ...state,
                                sondageOuverture: { ...state.sondageOuverture, open: e },
                            });
                        }}
                    />
                )}
            </div>

            <div className="bloc-footer">
                <ToolBarEditor>
                    <EditorToolbar />
                </ToolBarEditor>
                <div className="bloc-toggle-emoji">
                    <div className="toggle-action-dropzone">
                        <DetailsItems>
                            <div className={`item-detail image-detail`}>
                                <InputFile
                                    {...state.mediaOuverture.images}
                                    onChange={(e) => {
                                        if (
                                            state.mediaOuverture.images.file.length + e.currentTarget.files.length <=
                                            state.mediaOuverture.images.maxFiles
                                        ) {
                                            let cpState = { ...state };
                                            cpState.mediaOuverture.images.file = [
                                                ...cpState.mediaOuverture.images.file,
                                                ...e.currentTarget.files,
                                            ];

                                            Array.from(e.currentTarget.files).map((file, index) => {
                                                cpState = addMediaToWysiwyg(file, "images", cpState);
                                            });

                                            setState(cpState);
                                            setMessage(null);
                                        } else {
                                            setMessage(
                                                <>
                                                    Veuillez sélectionner maximun {state.mediaOuverture.images.maxFiles}{" "}
                                                    {state.mediaOuverture.images.name}{" "}
                                                </>
                                            );
                                        }
                                    }}
                                />
                                <label htmlFor="file-images-nv2">
                                    <ImageIcon />
                                </label>
                            </div>
                            <div className={`item-detail video-detail`}>
                                <InputFile
                                    {...state.mediaOuverture.video}
                                    onChange={(e) => {
                                        if (
                                            state.mediaOuverture.video.file.length + e.currentTarget.files.length <=
                                            state.mediaOuverture.video.maxFiles
                                        ) {
                                            let cpState = { ...state };
                                            cpState.mediaOuverture.video.file = [
                                                ...cpState.mediaOuverture.video.file,
                                                ...e.currentTarget.files,
                                            ];

                                            //TODO
                                            const range = { index: 0, ...quillObj.getEditor().getSelection() };

                                            Array.from(e.currentTarget.files).map((file, index) => {
                                                const url = URL.createObjectURL(file);
                                                cpState.mediaOuverture.video.value.push(url);
                                                range.index += 1;
                                                quillObj.getEditor().insertEmbed(range.index, "video", url);
                                                quillObj.getEditor().setSelection(range.index+1);
                                                console.log(range);
                                            });

                                            setState(cpState);
                                            setMessage(null);
                                        } else {
                                            setMessage(
                                                <>
                                                    Veuillez sélectionner maximun {state.mediaOuverture.video.maxFiles}{" "}
                                                    {state.mediaOuverture.video.name}{" "}
                                                </>
                                            );
                                        }
                                    }}
                                />
                                <label htmlFor="file-video-nv2">
                                    <PlayArrowIcon />
                                </label>
                            </div>
                            <Button
                                onClick={() => {
                                    setState({
                                        ...state,
                                        sondageOuverture: {
                                            ...state.sondageOuverture,
                                            open: true,
                                        },
                                    });
                                }}
                                className={`item-detail sondage-detail`}
                            >
                                <BallotIcon />
                            </Button>
                            <div className={`item-detail sound-detail`}>
                                <InputFile
                                    {...state.mediaOuverture.music}
                                    onChange={(e) => {
                                        if (
                                            state.mediaOuverture.music.file.length + e.currentTarget.files.length <=
                                            state.mediaOuverture.music.maxFiles
                                        ) {
                                            let cpState = { ...state };
                                            cpState.mediaOuverture.music.file = [
                                                ...cpState.mediaOuverture.music.file,
                                                ...e.currentTarget.files,
                                            ];

                                            Array.from(e.currentTarget.files).map((file, index) => {
                                                cpState = addMediaToWysiwyg(file, "music", cpState);
                                            });

                                            setState(cpState);
                                            setMessage(null);
                                        } else {
                                            setMessage(
                                                <>
                                                    Veuillez sélectionner maximun {state.mediaOuverture.music.maxFiles}{" "}
                                                    {state.mediaOuverture.music.name}{" "}
                                                </>
                                            );
                                        }
                                    }}
                                />
                                <label htmlFor="file-music-nv2">
                                    <GraphicEqIcon />
                                </label>
                            </div>
                        </DetailsItems>
                    </div>
                    <Emojis
                        inputEmoji={state.inputEmojiOuverture}
                        setInputEmoji={(e) => setState({ ...state, inputEmojiOuverture: e })}
                    />
                </div>
                <div className="count-publish-pli2">
                    <CountDown maxCount={2000} size={removeTags(String(state.inputEmojiOuverture.value)).length} />
                    <div className="bloc-btn-publish">
                        <ButtonDef
                            spinner={submitting}
                            textButton={"Publier"}
                            className="btn-publish"
                            icon={<SendRoundedIcon />}
                        />
                    </div>
                </div>
            </div>
        </BlocNewPliContent>
    );
}
