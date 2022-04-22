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
    VideoUpload
} from "../assets/styles/componentStyle";
import { DetailsItems } from "../assets/styles/globalStyle";
import { useOutsideAlerter } from "../helper/events";
import Emojis from "./emojis";
import InputFile from "./ui-elements/inputFile";

export default function NewPliOptions({
  state,
  setState = () => {},
  setMessage = () => {},
}) {
  const [dropFile, setDropFile] = useState({
    images: {
      accept: "image/jpeg, image/png",
      icon: "img",
      multiple: true,
      value: [],
      file: [],
    },
    video: {
      accept: "video/mp4,video/x-m4v,video/*",
      icon: "mp4",
      multiple: false,
      value: [],
      file: [],
    },
    music: {
      accept: "audio/mpeg",
      icon: "mp3",
      multiple: false,
      value: [],
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
        console.log(element);
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
      const newUpload = [...state.media[current].file];
      newUpload.splice(newUpload.indexOf(file), 1);
      var element = {};
      element[current] = { ...state.media[current], file: newUpload };
      setState({ ...state.media, ...element });
    }
  };
  const removeAll = () => {
    if (current === "video") {
      var element = {};
      element[current] = { ...dropFile[current], file: [] };
      setDropFile({ ...dropFile, ...element });
    }
    if (current === "music") {
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
    <>
      <div className="liste-files">
        {/* { TODO : Drag and drop file
                        current && dropFile[current] && dropFile[current].file.map(file => (

                            <div className='bloc-item-image-file' key={file.path}>
                                {current === "images" ?
                                    <ImageUpload>
                                        <img src={URL.createObjectURL(file)} alt={file.name} />
                                        <Button onClick={()=>removeFile(file)}><RemoveFile /></Button>
                                    </ImageUpload>
                                    : null}
                                {current === "video" ?
                                    <VideoUpload>
                                        <img src={iconVideo} alt={file.name}   />
                                        <Button onClick={()=>removeFile(file)}><RemoveFile /></Button>
                                    </VideoUpload>
                                    : null}
                                {current === "music" ?
                                    <SoundUpload>
                                        <span className='icon-sound'><GraphicEqIcon /></span>
                                        <p className='name-sound'><span>{file.name.substring(0, file.name.lastIndexOf('.'))}</span><span>.{file.name.substring(file.name.indexOf('.') + 1)}</span></p>
                                        <Button onClick={()=>removeFile(file)}><RemoveFile /></Button>
                                    </SoundUpload>
                                    : null}

                            </div>
                        ))
                    } */}
        {state.media.images.file.length > 0 && (
          <div className="bloc-item-image-file">
            {Array.from(state.media.images.file).map((file, i) => (
              <ImageUpload key={i}>
                <img src={URL.createObjectURL(file)} alt={file.name} />
                <Button onClick={()=>removeFile(file, "images")}>
                  <RemoveFile />
                </Button>
              </ImageUpload>
            ))}
          </div>
        )}
        {state.media.video.file.length > 0 && (
          <div className="bloc-item-video-file">
            {Array.from(state.media.video.file).map((file, i) => (
              <VideoUpload key={i}>
                <img src={iconVideo} alt={file.name} />
                <Button onClick={()=>removeFile(file, "video")}>
                  <RemoveFile />
                </Button>
              </VideoUpload>
            ))}
          </div>
        )}
        {state.media.music.file.length > 0 && (
          <div className="bloc-item-sound-file">
            {state.media.music.file.map((file, i) => (
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
      <BlocNewPliContent ref={ref}>
        {openDrop && (
          <DropZoneBloc {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Déposez les fichiers ici</p>
          </DropZoneBloc>
        )}
        <div className="options-new-pli">
          <div className="toggle-action-dropzone">
            <DetailsItems>
              {/* TODO : Drag and drop file
                        <Button onClick={() => { setopenDrop(true); setCurrent('images') }} className={`item-detail image-detail ${(!current || current === "images") && openDrop ? "active" : ''}`}>
                            <ImageIcon />
                        </Button> */}
              <div className={`item-detail image-detail`}>
                <InputFile
                  {...state.media.images}
                  onChange={(e) => {
                    if (
                      state.media.images.file.length +
                        e.currentTarget.files.length <=
                      4
                    ) {
                      const cpState = { ...state };
                      cpState.media.images.file = [
                        ...cpState.media.images.file,
                        ...e.currentTarget.files,
                      ];
                      setState(cpState);
                      setMessage(null);
                    } else {
                      setMessage("Error Max Images");
                    }
                  }}
                />
                <label htmlFor="file-images-nv1">
                  <ImageIcon />
                </label>
              </div>

              {/* TODO : Drag and drop file
                        <Button onClick={() => { setopenDrop(true); setCurrent('video'); removeAll(); }} className={`item-detail video-detail ${(!current || current === "video") && openDrop ? "active" : ''}`}>
                            <PlayArrowIcon />
                        </Button> */}
              <div className={`item-detail video-detail`}>
                <InputFile
                  {...state.media.video}
                  onChange={(e) => {
                    if (
                      state.media.video.file.length +
                        e.currentTarget.files.length <=
                      1
                    ) {
                      console.log("df");
                      const cpState = { ...state };
                      cpState.media.video.file = [
                        ...cpState.media.video.file,
                        ...e.currentTarget.files,
                      ];
                      setState(cpState);
                      setMessage(null);
                    } else {
                      setMessage("Error Max Video");
                    }
                  }}
                />
                <label htmlFor="file-video-nv1">
                  <PlayArrowIcon />
                </label>
              </div>
              <Button
                onClick={() => {
                  setCurrent("soundage");
                  setState({ ...state, soundage: {...state.soundage, open: !state.soundage.open} });
                }}
                className={`item-detail soundage-detail ${
                  !current || current === "soundage" ? "active" : ""
                }`}
              >
                <BallotIcon />
              </Button>
              {/* TODO : Drag and drop file
                        <Button onClick={() => { setopenDrop(true); setCurrent('music'); removeAll(); }} className={`item-detail sound-detail ${(!current || current === "music") && openDrop ? "active" : ''}`}>
                            <GraphicEqIcon />
                        </Button> */}
              <div className={`item-detail sound-detail`}>
                <InputFile
                  {...state.media.music}
                  onChange={(e) => {
                    if (
                      state.media.music.file.length +
                        e.currentTarget.files.length <=
                      1
                    ) {
                      const cpState = { ...state };
                      cpState.media.music.file = [
                        ...cpState.media.music.file,
                        ...e.currentTarget.files,
                      ];
                      setState(cpState);
                    } else {
                      setMessage("Error Max Music");
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
