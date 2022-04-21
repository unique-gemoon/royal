import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import ImageIcon from "@mui/icons-material/Image";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { Button } from "@mui/material";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
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
import EditorToolbar, {
  formats,
  modules,
} from "../components/ui-elements/editorToolBar";
import { useOutsideAlerter } from "../helper/events";
import { removeTags } from "../helper/fonctions";
import AddSoundage from "./addSoundage";
import Emojis from "./emojis";
import ButtonDef from "./ui-elements/buttonDef";
import CountDown from "./ui-elements/countDown";
import Input from "./ui-elements/input";

export default function NewOvertureOptions({ submitting, message, setMessage = () => { } }) {
  const [stateWysiwyg, setStateWysiwyg] = useState({
    inputEmoji: {
      name: "content-pli2",
      placeholder: "Que veux-tu dire, Lys ?",
      value: localStorage.getItem('stateWysiwyg')
    },
    openSoundage: false,
    soundageOptions: [
      {
        name: "option-1",
        label: "Option 1",
        value: "",
      },
    ],
    maxOption: 6
  });
  useEffect(() => {
    localStorage.setItem('stateWysiwyg', stateWysiwyg.inputEmoji.value);
    console.log(selectedFile)
  }, [stateWysiwyg.inputEmoji.value]);

  const [dropFile, setDropFile] = useState({
    images: {
      accept: "image/jpeg, image/png",
      icon: "img",
      multiple: true,
      liste: [],
    },
    video: {
      accept: "video/mp4,video/x-m4v,video/*",
      icon: "mp4",
      multiple: false,
      liste: [],
    },
    music: {
      accept: "audio/mpeg",
      icon: "mp3",
      multiple: false,
      liste: [],
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
          liste: [...dropFile[current].liste, ...acceptedFiles],
        };
        setDropFile({ ...dropFile, ...element });
        //console.log(element);
      }
      setopenDrop(false);
    },
  });

  const removeFile = (file, current) => () => {
    if (current) {
      const newFiles = [...dropFile[current].liste];
      newFiles.splice(newFiles.indexOf(file), 1);
      var element = {};
      element[current] = { ...dropFile[current], liste: newFiles };
      setDropFile({ ...dropFile, ...element });
    }
    if (current) {
      const newUpload = [...selectedFile[current].liste];
      newUpload.splice(newUpload.indexOf(file), 1);
      var element = {};
      element[current] = { ...selectedFile[current], liste: newUpload };
      setSelectedFile({ ...dropFile, ...element });
    }
  };
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
  };

  const ref = useRef(null);
  
  useOutsideAlerter(ref, () => {
    setopenDrop(false);
  });



  const [selectedFile, setSelectedFile] = useState({
    images: {
      id: "file-images-nv2",
      type: 'file',
      accept: "image/jpeg, image/png",
      multiple: true,
      liste: [],
    },
    video: {
      id: "file-video-nv2",
      type: 'file',
      accept: "video/mp4,video/x-m4v,video/*",
      multiple: true,
      liste: [],
    },
    music: {
      id: "file-music-nv2",
      type: 'file',
      accept: "audio/mpeg",
      multiple: true,
      liste: [],
    },
  });
  
  return (
    <BlocNewPliContent className="pli2-ouverture-bloc" ref={ref}>
      <ReactQuill
        className="wisiwyg-pli2"
        theme="snow"
        value={stateWysiwyg.inputEmoji.value || ""}
        onChange={(e) => {
          const cpState = { ...stateWysiwyg };
          const value = e || "";

          if (removeTags(value).length > 2000) {
            console.log("tt");
            cpState.inputEmoji.value = value
              .replace(/<\/?[^>]+(>|$)/g, "")
              .substring(0, 2000);
          } else {
            cpState.inputEmoji.value = value;
          }

          setStateWysiwyg(cpState);
        }}
        placeholder={stateWysiwyg.inputEmoji.placeholder}
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
        {stateWysiwyg.openSoundage && (
          <AddSoundage
            maxOption={stateWysiwyg.maxOption}
            state={stateWysiwyg.soundageOptions}
            showSoundage={stateWysiwyg.openSoundage}
            setShowSoundage={(e) =>
              setStateWysiwyg({ ...stateWysiwyg, openSoundage: e })
            }
            setState={(e) =>
              setStateWysiwyg({ ...stateWysiwyg, soundageOptions: e })
            }
          />
        )}
        <div className="liste-files">
          {dropFile["images"].liste.length > 0 && (
            <div className="bloc-item-image-file">
              {dropFile["images"].liste.map((file, i) => (
                <ImageUpload key={i}>
                  <img src={URL.createObjectURL(file)} alt={file.name} />
                  <Button onClick={removeFile(file, "images")}>
                    <RemoveFile />
                  </Button>
                </ImageUpload>
              ))}
            </div>
          )}
          {selectedFile.images.liste.length > 0 && (
            <div className="bloc-item-image-file">
              {Array.from(selectedFile.images.liste).map((file, i) => (
                <ImageUpload key={i}>
                  <img src={URL.createObjectURL(file)} alt={file.name} />
                  <Button onClick={removeFile(file, "images")}>
                    <RemoveFile />
                  </Button>
                </ImageUpload>
              ))}
            </div>
          )}

          {selectedFile.video.liste.length > 0 && (
            <div className="bloc-item-image-file">
              {Array.from(selectedFile.video.liste).map((file, i) => (
                <VideoUpload>
                  <img src={iconVideo} alt={file.name} />
                  <Button onClick={removeFile(file, "video")}>
                    <RemoveFile />
                  </Button>
                </VideoUpload>
              ))}
            </div>
          )}
          {dropFile["video"].liste.length > 0 && (
            <div className="bloc-item-image-file">
              {dropFile["video"].liste.map((file, i) => (
                <VideoUpload key={i}>
                  <img src={iconVideo} alt={file.name} />
                  <Button onClick={removeFile(file, "video")}>
                    <RemoveFile />
                  </Button>
                </VideoUpload>
              ))}
            </div>
          )}

          {dropFile["music"].liste.length < 2 && (
            <div className="bloc-item-image-file">
              {dropFile["music"].liste.map((file, i) => (
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
          {selectedFile.music.liste.length > 0 && (
            <div className="bloc-item-image-file">
              {selectedFile.music.liste.map((file, i) => (
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
              //   openDrop || stateWysiwyg.openSoundage
              //     ? "is-active-dropzone"
              //     : ""
              // }`}
            >
              
              
              
              <div className={`item-detail image-detail`}>
                <input
                  {...selectedFile.images}
                  onChange={(e) => {
                    if ((selectedFile.images.liste.length + e.currentTarget.files.length) <= 40) { 
                      const cpState = { ...selectedFile };
                      cpState.images.liste = [...cpState.images.liste, ...e.currentTarget.files]; 
                      setSelectedFile(cpState);
                      setMessage(null);
                    }else{
                      setMessage('Error Max Images');
                    }
                  }}
                />
                <label htmlFor="file-images-nv2">
                  <ImageIcon />
                </label>
              </div>
              <div className={`item-detail video-detail`}>
                <input
                  {...selectedFile.video}
                  onChange={(e) => {
                    if ((selectedFile.video.liste.length + e.currentTarget.files.length) <= 10) {
                      console.log('df');
                      const cpState = { ...selectedFile };
                      cpState.video.liste = [...cpState.video.liste, ...e.currentTarget.files];
                      setSelectedFile(cpState);
                      setMessage(null);
                    } else {
                      setMessage('Error Max Video');
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
                  setStateWysiwyg({
                    ...stateWysiwyg,
                    openSoundage: true,
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
                <input
                  {...selectedFile.music}
                  onChange={(e) => {
                    if ((selectedFile.music.liste.length + e.currentTarget.files.length) <= 10) {
                      const cpState = { ...selectedFile };
                      cpState.music.liste = [...cpState.music.liste, ...e.currentTarget.files];
                      setSelectedFile(cpState);
                    } else {
                      setMessage('Error Max Music');
                    }
                  }}
                />
                <label htmlFor="file-music-nv2">
                  <GraphicEqIcon />
                </label>
              </div>
            </DetailsItems>
          </div>
          <Emojis setState={setStateWysiwyg} state={stateWysiwyg} />
        </div>
        <div className="count-publish-pli2">
          <CountDown
            maxCount={2000}
            setState={
              removeTags(
                stateWysiwyg.inputEmoji.value
                  ? stateWysiwyg.inputEmoji.value
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
