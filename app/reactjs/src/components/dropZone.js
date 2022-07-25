import React, { useRef } from "react";
import { useDropzone } from "react-dropzone";
import { DropZoneBloc } from "../assets/styles/componentStyle";

export default function DropZone({
    state = {},
    setState = () => {},
    setMessage = () => {},
    setOpenDrop = () => {},
    addMediaToWysiwyg = () => {},
    setLoadingMedia = () => {},
}) {
    const ref = useRef(null);

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

                            cpState = addMediaToWysiwyg([file], key, cpState);
                            
                            setState(cpState);
                            setOpenDrop(false);
                            setLoadingMedia(false);
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
        },
    });

    return (
        <DropZoneBloc {...getRootProps({ className: "dropzone" })} ref={ref}>
            <p>Déposez les fichiers ici</p>
        </DropZoneBloc>
    );
}
