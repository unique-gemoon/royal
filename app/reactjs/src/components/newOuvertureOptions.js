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
import { useDragover, useDrop, useOutsideAlerter } from "../helper/events";
import { removeTags } from "../helper/fonctions";
import AddSondage from "./addSondage";
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
  const [current, setCurrent] = useState("");
  const [openDrop, setopenDrop] = useState(false);

  const { getRootProps} = useDropzone({
    accept: "image/jpeg, image/png, video/mp4,video/x-m4v,video/*, audio/mpeg",
    multiple: true,
    onDrop: (acceptedFiles) => {
      acceptedFiles.map((file) => {
        console.log(file);
        for (const key in state.mediaOuverture) {
          console.log(state.mediaOuverture[key]);
          console.log(state.mediaOuverture[key].file.length);
          console.log(state.mediaOuverture[key].maxFiles);
          if (state.mediaOuverture[key].accept.indexOf(file.type) !== -1) {
            if (state.mediaOuverture[key].file.length < state.mediaOuverture[key].maxFiles) {
              const cpState = { ...state };
              cpState.mediaOuverture[key].file = [...cpState.mediaOuverture[key].file, file];
              console.log(cpState);
              setState(cpState);
            }
            else {
              setMessage(<>Veuillez sélectionner maximun {state.mediaOuverture[key].maxFiles} {state.mediaOuverture[key].name} </>);
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
       const newUpload = [...state.mediaOuverture[current].file];
      newUpload.splice(newUpload.indexOf(file), 1);
      var element = {};
      element[current] = { ...state.mediaOuverture[current], file: newUpload };
      setState({ ...state, mediaOuverture:{...state.mediaOuverture, ...element} });
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
                sondageOuverture: e
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
        <div className="liste-files">
          {state.mediaOuverture.images.file.length > 0 && (
            <div className="bloc-item-image-file">
              {Array.from(state.mediaOuverture.images.file).map((file, i) => (
                <ImageUpload key={i}>
                  <img src={URL.createObjectURL(file)} alt={file.name} />
                  <Button onClick={()=>removeFile(file, "images")}>
                    <RemoveFile />
                  </Button>
                </ImageUpload>
              ))}
            </div>
          )}

          {state.mediaOuverture.video.file.length > 0 && (
            <div className="bloc-item-image-file">
              {Array.from(state.mediaOuverture.video.file).map((file, i) => (
                <VideoUpload key={i}>
                  <img src={iconVideo} alt={file.name} />
                  <Button onClick={()=>removeFile(file, "video")}>
                    <RemoveFile />
                  </Button>
                </VideoUpload>
              ))}
            </div>
          )}

          {state.mediaOuverture.music.file.length > 0 && (
            <div className="bloc-item-image-file">
              {state.mediaOuverture.music.file.map((file, i) => (
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
                  <Button onClick={()=>removeFile(file, "music")}>
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
            <DetailsItems>
              <div className={`item-detail image-detail`}>
                <InputFile
                  {...state.mediaOuverture.images}
                  onChange={(e) => {
                    if (
                      state.mediaOuverture.images.file.length +
                      e.currentTarget.files.length <= state.mediaOuverture.images.maxFiles
                    ) {
                      const cpState = { ...state };
                      cpState.mediaOuverture.images.file = [
                        ...cpState.mediaOuverture.images.file,
                        ...e.currentTarget.files,
                      ];
                      setState(cpState);
                      setMessage(null);
                    } else {
                      setMessage(<>Veuillez sélectionner maximun {state.mediaOuverture.images.maxFiles} {state.mediaOuverture.images.name} </>);
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
                      state.mediaOuverture.video.file.length +
                      e.currentTarget.files.length <= state.mediaOuverture.video.maxFiles
                    ) {
                      const cpState = { ...state };
                      cpState.mediaOuverture.video.file = [
                        ...cpState.mediaOuverture.video.file,
                        ...e.currentTarget.files,
                      ];
                      setState(cpState);
                      setMessage(null);
                    } else {
                      setMessage(<>Veuillez sélectionner maximun {state.mediaOuverture.video.maxFiles} {state.mediaOuverture.video.name} </>);
                    }
                  }}
                />
                <label htmlFor="file-video-nv2">
                  <PlayArrowIcon />
                </label>
              </div>
              <Button
                onClick={() => {
                  setCurrent("sondage");
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
                      state.mediaOuverture.music.file.length +
                      e.currentTarget.files.length <= state.mediaOuverture.music.maxFiles
                    ) {
                      const cpState = { ...state };
                      cpState.mediaOuverture.music.file = [
                        ...cpState.mediaOuverture.music.file,
                        ...e.currentTarget.files,
                      ];
                      setState(cpState);
                      setMessage(null);
                    } else {
                      setMessage(<>Veuillez sélectionner maximun {state.mediaOuverture.music.maxFiles} {state.mediaOuverture.music.name} </>);
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
            size={
              removeTags(String(state.inputEmojiOuverture.value)).length
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
