import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import ImageIcon from "@mui/icons-material/Image";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { Button } from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import ReactQuill from "react-quill";
import BallotIcon from "../assets/images/icons/ballotIcon";
import { BlocNewPliContent, ToolBarEditor } from "../assets/styles/componentStyle";
import { DetailsItems } from "../assets/styles/globalStyle";
import { useDragover, useDrop, useOutsideAlerter } from "../helper/events";
import { removeTags, scrollTop } from "../helper/fonctions";
import AddSondage from "./addSondage";
import Emojis from "./emojis";
import ButtonDef from "./ui-elements/buttonDef";
import CountDown from "./ui-elements/countDown";
import EditorToolbar, { formats, modules } from "./ui-elements/editorToolBar";
import InputFile from "./ui-elements/inputFile";
import DropZone from "./dropZone";

export default function NewOuvertureOptions({ state, setState = () => {}, submitting, setMessage = () => {} }) {
    const [openDrop, setOpenDrop] = useState(false);
    const [loadingMedia, setLoadingMedia] = useState(false);
    const [reactQuillRef, setReactQuillRef] = useState(null);
    const [range, setRange] = useState({ index: 0 });

    const ref = useRef(null);

    useOutsideAlerter(ref, () => {
        setOpenDrop(false);
    });

    useDragover(ref, () => {
        if (reactQuillRef) {
            setOpenDrop(true);
        }
    });

    useDrop(ref, () => {
        setOpenDrop(false);
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
        if (reactQuillRef) {
            const quillRef = reactQuillRef.getEditor();
            let index = range.index;
            const url = URL.createObjectURL(file);
            const title = file.name;
            cpState.mediaOuverture[key].value.push(url);
            quillRef.insertEmbed(index, cpState.mediaOuverture[key].blotName, { url, title });
            index += 1;
            quillRef.setSelection(index);
        }
        return cpState;
    };

    const checkDeletedMedias = (cpState) => {
        if (!loadingMedia) {
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
        }
        return cpState;
    };

    return (
        <BlocNewPliContent className="pli2-ouverture-bloc has-scroll" ref={ref}>
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
                            const cpState = { ...state };
                            cpState.sondageOuverture.open = e;
                            setState(cpState);
                        }}
                    />
                )}
            </div>
            <ReactQuill
                ref={(el) => {
                    setReactQuillRef(el);
                }}
                className="wisiwyg-pli2"
                theme="snow"
                value={state.inputEmojiOuverture.value || ""}
                onChange={(e) => {
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
                }}
                placeholder={state.inputEmojiOuverture.placeholder}
                modules={modules}
                formats={formats}
                onChangeSelection={(e) => {
                    if (reactQuillRef) {
                        const quillRef = reactQuillRef.getEditor();
                        if(quillRef.getSelection()){
                            setRange({index:0,...quillRef.getSelection()});
                        }
                        
                    }
                }}
            />
            {openDrop &&  (
                <DropZone
                    state={state}
                    setState={setState}
                    setMessage={setMessage}
                    setOpenDrop={setOpenDrop}
                    addMediaToWysiwyg={addMediaToWysiwyg}
                    setLoadingMedia={setLoadingMedia}
                    showText={true}
                />
            )}

            <div className="bloc-footer">
                <ToolBarEditor>
                    <EditorToolbar />
                </ToolBarEditor>
                <div className="bloc-toggle-emoji">
                    <div className="toggle-action-dropzone">
                        <DetailsItems>
                            <div className={`item-detail image-detail`}>
                                <label>
                                    <ImageIcon />
                                    <DropZone
                                        state={state}
                                        setState={setState}
                                        setMessage={setMessage}
                                        setOpenDrop={setOpenDrop}
                                        addMediaToWysiwyg={addMediaToWysiwyg}
                                        setLoadingMedia={setLoadingMedia}
                                        accept={state.mediaOuverture.images.accept}
                                    />
                                </label>
                            </div>
                            <div className={`item-detail video-detail`}>
                                <label>
                                    <PlayArrowIcon />
                                    <DropZone
                                        state={state}
                                        setState={setState}
                                        setMessage={setMessage}
                                        setOpenDrop={setOpenDrop}
                                        addMediaToWysiwyg={addMediaToWysiwyg}
                                        setLoadingMedia={setLoadingMedia}
                                        accept={state.mediaOuverture.video.accept}
                                    />
                                </label>
                            </div>
                            <Button
                                onClick={() => {
                                    setState({
                                        ...state,
                                        sondageOuverture: {
                                            ...state.sondageOuverture,
                                            open: !state.sondageOuverture.open,
                                        },
                                    });
                                    scrollTop();
                                }}
                                className={`item-detail sondage-detail`}
                            >
                                <BallotIcon />
                            </Button>
                            <div className={`item-detail sound-detail`}>
                                <label>
                                    <GraphicEqIcon />
                                    <DropZone
                                        state={state}
                                        setState={setState}
                                        setMessage={setMessage}
                                        setOpenDrop={setOpenDrop}
                                        addMediaToWysiwyg={addMediaToWysiwyg}
                                        setLoadingMedia={setLoadingMedia}
                                        accept={state.mediaOuverture.music.accept}
                                    />
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
