import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import ImageIcon from "@mui/icons-material/Image";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { Button } from "@mui/material";
import React, { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import ReactQuill from "react-quill";
import BallotIcon from "../assets/images/icons/ballotIcon";
import RemoveFile from "../assets/images/icons/removeFile";
import iconVideo from "../assets/images/icons/videoIcon.svg";
import {
  BlocNewPliContent,
  DropZoneBloc,
  ImageUpload,
  SoundUpload,
  ToolBarEditor,
  VideoUpload,
} from "../assets/styles/componentStyle";
import { DetailsItems } from "../assets/styles/globalStyle";
import { useOutsideAlerter } from "../helper/events";
import { removeTags } from "../helper/fonctions";
import AddSoundage from "./addSoundage";
import Emojis from "./emojis";
import ButtonDef from "./ui-elements/buttonDef";
import CountDown from "./ui-elements/countDown";
import EditorToolbar, { formats, modules } from "./ui-elements/editorToolBar";
import InputFile from "./ui-elements/inputFile";

export default function NewOuvertureOptions({
  state,
  setState = () => {},
  submitting,
  setMessage = () => {},
}) {
  const [dropFile, setDropFile] = useState({
    images: {
      accept: "image/jpeg, image/png",
      icon: "img",
      multiple: true,
      file: [],
    },
    video: {
      accept: "video/mp4,video/x-m4v,video/*",
      icon: "mp4",
      multiple: false,
      file: [],
    },
    music: {
      accept: "audio/mpeg",
      icon: "mp3",
      multiple: false,
      file: [],
    },
  });
  const [current, setCurrent] = useState("");
  const [openDrop, setopenDrop] = useState(false);
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: current && dropFile[current] ? dropFile[current].accept : "",
    multiple: current && dropFile[current] ? dropFile[current].multiple : "",
    onDrop: (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles]);
      if (current && dropFile[current]) {
        var element = {};
        element[current] = {
          ...dropFile[current],
          file: [...dropFile[current].file, ...acceptedFiles],
        };
        setDropFile({ ...dropFile, ...element });
        //console.log(element);
      }
      setopenDrop(false);
    },
  });

  const removeFile = (file, current) => () => {
    if (current) {
      const newFiles = [...dropFile[current].file];
      newFiles.splice(newFiles.indexOf(file), 1);
      var element = {};
      element[current] = { ...dropFile[current], file: newFiles };
      setDropFile({ ...dropFile, ...element });
    }
    if (current) {
      const newUpload = [...state.mediaOuverture[current].file];
      newUpload.splice(newUpload.indexOf(file), 1);
      var element = {};
      element[current] = { ...state.mediaOuverture[current], file: newUpload };
      setState({ ...dropFile, ...element });
    }
  };
  const removeAll = (val) => {
    if (current === val) {
      var element = {};
      element[current] = { ...dropFile[current], file: [] };
      setDropFile({ ...dropFile, ...element });
    }
    if (current === val) {
      var element = {};
      element[current] = { ...dropFile[current], file: [] };
      setDropFile({ ...dropFile, ...element });
    }
  };

  const ref = useRef(null);

  useOutsideAlerter(ref, () => {
    setopenDrop(false);
  });

  return (
    <BlocNewPliContent className="pli2-ouverture-bloc" ref={ref}>
      <ReactQuill
        className="wisiwyg-pli2"
        theme="snow"
        value={state.inputEmojiOuverture.value || ""}
        onChange={(e) => {
          const cpState = { ...state };
          const value = e || "";
          if (removeTags(value).length > 2000) {
            cpState.inputEmojiOuverture.value = value
              .replace(/<\/?[^>]+(>|$)/g, "")
              .substring(0, 2000);
          } else {
            cpState.inputEmojiOuverture.value = value;
          }
          setState(cpState);
        }}
        placeholder={state.inputEmojiOuverture.placeholder}
        modules={modules}
        formats={formats}
      />
      {openDrop && (
        <DropZoneBloc {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Déposez les fichiers ici</p>
        </DropZoneBloc>
      )}

      <div className="options-new-pli">
        {state.soundageOuverture.open && (
          <AddSoundage
            maxOption={state.soundageOuverture.maxOptions}
            soundage={state.soundage}
            showSoundage={state.soundageOuverture.open}
            setShowSoundage={(e) => {
              setState({
                ...state,
                soundageOuverture: { ...state.soundageOuverture, open: e },
              });
            }}
            setSoundage={(e) => {
              setState({
                ...state,
                soundageOuverture: e
              }); 
            }}
          />
        )}
        <div className="liste-files">
          {dropFile["images"].file.length > 0 && (
            <div className="bloc-item-image-file">
              {dropFile["images"].file.map((file, i) => (
                <ImageUpload key={i}>
                  <img src={URL.createObjectURL(file)} alt={file.name} />
                  <Button onClick={removeFile(file, "images")}>
                    <RemoveFile />
                  </Button>
                </ImageUpload>
              ))}
            </div>
          )}
          {state.ouvertureMedia.images.file.length > 0 && (
            <div className="bloc-item-image-file">
              {Array.from(state.ouvertureMedia.images.file).map((file, i) => (
                <ImageUpload key={i}>
                  <img src={URL.createObjectURL(file)} alt={file.name} />
                  <Button onClick={removeFile(file, "images")}>
                    <RemoveFile />
                  </Button>
                </ImageUpload>
              ))}
            </div>
          )}

          {state.ouvertureMedia.video.file.length > 0 && (
            <div className="bloc-item-image-file">
              {Array.from(state.ouvertureMedia.video.file).map((file, i) => (
                <VideoUpload>
                  <img src={iconVideo} alt={file.name} />
                  <Button onClick={removeFile(file, "video")}>
                    <RemoveFile />
                  </Button>
                </VideoUpload>
              ))}
            </div>
          )}
          {dropFile["video"].file.length > 0 && (
            <div className="bloc-item-image-file">
              {dropFile["video"].file.map((file, i) => (
                <VideoUpload key={i}>
                  <img src={iconVideo} alt={file.name} />
                  <Button onClick={removeFile(file, "video")}>
                    <RemoveFile />
                  </Button>
                </VideoUpload>
              ))}
            </div>
          )}

          {dropFile["music"].file.length < 2 && (
            <div className="bloc-item-image-file">
              {dropFile["music"].file.map((file, i) => (
                <SoundUpload key={i}>
                  <span className="icon-sound">
                    <GraphicEqIcon />
                  </span>
                  <p className="name-sound">
                    <span>
                      {file.name.substring(0, file.name.lastIndexOf("."))}
                    </span>
                    <span>
                      .{file.name.substring(file.name.indexOf(".") + 1)}
                    </span>
                  </p>
                  <Button onClick={removeFile(file, "music")}>
                    <RemoveFile />
                  </Button>
                </SoundUpload>
              ))}
            </div>
          )}
          {state.ouvertureMedia.music.file.length > 0 && (
            <div className="bloc-item-image-file">
              {state.ouvertureMedia.music.file.map((file, i) => (
                <SoundUpload>
                  <span className="icon-sound">
                    <GraphicEqIcon />
                  </span>
                  <p className="name-sound">
                    <span>
                      {file.name.substring(0, file.name.lastIndexOf("."))}
                    </span>
                    <span>
                      .{file.name.substring(file.name.indexOf(".") + 1)}
                    </span>
                  </p>
                  <Button onClick={removeFile(file, "music")}>
                    <RemoveFile />
                  </Button>
                </SoundUpload>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bloc-footer">
        <ToolBarEditor>
          <EditorToolbar />
        </ToolBarEditor>
        <div className="bloc-toggle-emoji">
          <div className="toggle-action-dropzone">
            <DetailsItems
            // className={`${
            //   openDrop || state.open
            //     ? "is-active-dropzone"
            //     : ""
            // }`}
            >
              <div className={`item-detail image-detail`}>
                <InputFile
                  {...state.ouvertureMedia.images}
                  onChange={(e) => {
                    if (
                      state.ouvertureMedia.images.file.length +
                        e.currentTarget.files.length <=
                      40
                    ) {
                      const cpState = { ...state };
                      cpState.ouvertureMedia.images.file = [
                        ...cpState.ouvertureMedia.images.file,
                        ...e.currentTarget.files,
                      ];
                      setState(cpState);
                      setMessage(null);
                    } else {
                      setMessage("Error Max Images");
                    }
                  }}
                />
                <label htmlFor="file-images-nv2">
                  <ImageIcon />
                </label>
              </div>
              <div className={`item-detail video-detail`}>
                <InputFile
                  {...state.ouvertureMedia.video}
                  onChange={(e) => {
                    if (
                      state.ouvertureMedia.video.file.length +
                        e.currentTarget.files.length <=
                      10
                    ) {
                      const cpState = { ...state };
                      cpState.ouvertureMedia.video.file = [
                        ...cpState.ouvertureMedia.video.file,
                        ...e.currentTarget.files,
                      ];
                      setState(cpState);
                      setMessage(null);
                    } else {
                      setMessage("Error Max Video");
                    }
                  }}
                />
                <label htmlFor="file-video-nv2">
                  <PlayArrowIcon />
                </label>
              </div>
              <Button
                onClick={() => {
                  setCurrent("soundage");
                  setState({
                    ...state,
                    soundageOuverture: {
                      ...state.soundageOuverture,
                      open: true,
                    },
                  });
                }}
                className={`item-detail soundage-detail`}
                // className={`item-detail soundage-detail ${
                //   !current || current === "soundage" ? "active" : ""
                // }`}
              >
                <BallotIcon />
              </Button>
              <div className={`item-detail sound-detail`}>
                <InputFile
                  {...state.ouvertureMedia.music}
                  onChange={(e) => {
                    if (
                      state.ouvertureMedia.music.file.length +
                        e.currentTarget.files.length <=
                      10
                    ) {
                      const cpState = { ...state };
                      cpState.ouvertureMedia.music.file = [
                        ...cpState.ouvertureMedia.music.file,
                        ...e.currentTarget.files,
                      ];
                      setState(cpState);
                      setMessage(null);
                    } else {
                      setMessage("Error Max Music");
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
            setInputEmoji={(e) =>
              setState({ ...state, inputEmojiOuverture: e })
            }
          />
        </div>
        <div className="count-publish-pli2">
          <CountDown
            maxCount={2000}
            setState={
              removeTags(
                state.inputEmojiOuverture.value
                  ? state.inputEmojiOuverture.value
                  : ""
              ).length
            }
          />
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
