import CloseFullscreenTwoToneIcon from "@mui/icons-material/CloseFullscreenTwoTone";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import OpenInFullOutlinedIcon from "@mui/icons-material/OpenInFullOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import parse from "html-react-parser";
import React, { useEffect, useRef, useState } from "react";
import { MasonryItem, ModalItem } from "../../assets/styles/componentStyle";
import BarTemporelle from "../barTemporelle";
import BlocComments from "../comments/blocComments";
import HeadItem from "./headItem";
import ImagesGallery from "./imagesGallery";
import PlayerMusic from "./playerMusic";
import PlayerVideo from "./playerVideo";
import Sondage from "./sondage";
import BlocCitations from "../citations/blocCitations";

export default function ItemMasonry({
    item,
    indexItem,
    setItem = () => {},
    action,
    setAction = () => {},
    activeItem = null,
    setActiveItem = () => {},
    setActiveItemPlayer = () => {},
    activeItemPlayer = null,
    setMsgNotifTopTime = () => {},
    setStateModal = () => {},
    folowersMessage,
    setFolowersMessage = () => {},
    updateSubscriberStatus = () => {},
    clearPliElapsed = () => {},
    typingCitation = {},
}) {
    const initData = {
        media: {
            sondage: [],
            image: [],
            video: [],
            music: [],
            count: 0,
        },
        mediaOuverture: {
            sondage: [],
            image: [],
            video: [],
            music: [],
            count: 0,
        },
    };
    const [data, setData] = useState({ ...initData });
    const [dataOuverture, setDataOuverture] = useState([]);
    const [height, setHeight] = useState(0);
    const refHeight = useRef(null);

    const [state, setState] = useState({
        showModal: false,
        showCitation: true,
        showNV2: false,
        item: {},
    });

    useEffect(() => {
        setStateModal(state);
    }, [state]);

    useEffect(() => {
        if (refHeight?.current?.clientHeight) {
            setTimeout(() => {
                setHeight(refHeight.current.clientHeight);
            }, 1100);
        }
    }, []);

    useEffect(() => {
        const cpData = { ...initData };
        for (let i = 0; i < item.medias.length; i++) {
            const cpItem = item.medias[i];
            if (cpItem.isOuverture) {
                cpData.mediaOuverture[cpItem.type] = [...cpData.mediaOuverture[cpItem.type], { ...cpItem }];
                cpData.mediaOuverture.count = cpData.mediaOuverture.count + 1;
            } else {
                cpData.media[cpItem.type] = [...cpData.media[cpItem.type], { ...cpItem }];
                cpData.media.count = cpData.media.count + 1;
            }
        }
        setData(cpData);
        setDataOuverture(getDataOuverture(item.ouverture));
    }, [item.medias]);

    const isOpenNV2 = () => {
        return activeItem && item.id == activeItem.id && state.showNV2;
    };

    const setMedia = (media) => {
        let cpMedias = [...item.medias];
        for (var i = 0; i < cpMedias.length; i++) {
            if (cpMedias[i].id == media.id) {
                cpMedias[i] = media;
            }
        }
        setItem({ ...item, medias: cpMedias, action: "update" });
    };

    useEffect(() => {
        if (activeItem && activeItem.showNV2 != undefined && item.id == activeItem.id) {
            setState({
                ...state,
                showNV2: activeItem.showNV2,
            });
        }
    }, [activeItem]);

    const getDataOuverture = (ouverture) => {
        let el = document.createElement("html");
        if (ouverture.indexOf("blockquote")) {
            ouverture = ouverture
                .replace("<blockquote>", '<p class="blockquote">')
                .replace("</blockquote>", "</p>");
        }

        el.innerHTML = ouverture;
        const listP = el.getElementsByTagName("p");
        let newOuverture = [];
        let currentElement = "";

        for (let i = 0; i < listP.length; i++) {
            const p = listP[i];

            if (p.classList.contains("block-image")) {
                const listImg = p.getElementsByTagName("img");
                if (listImg.length) {
                    const url = listImg[0].src;
                    const image = getMediaOuvertureByUrl(url, "image");

                    if (currentElement == "image") {
                        newOuverture[newOuverture.length - 1].data = [
                            ...newOuverture[newOuverture.length - 1].data,
                            image,
                        ];
                    } else {
                        newOuverture.push({ type: "image", data: [image] });
                    }
                }

                currentElement = "image";
            } else if (p.classList.contains("block-video")) {
                const listVideo = p.getElementsByTagName("video");
                if (listVideo.length) {
                    const url = listVideo[0].src;
                    const video = getMediaOuvertureByUrl(url, "video");
                    newOuverture.push({ type: "video", data: [video] });
                }
                currentElement = "video";
            } else if (p.classList.contains("block-audio")) {
                const listMusic = p.getElementsByTagName("audio");
                if (listMusic.length) {
                    const url = listMusic[0].src;
                    const music = getMediaOuvertureByUrl(url, "music");
                    newOuverture.push({ type: "music", data: [music] });
                }
                currentElement = "audio";
            }else if (p.classList.contains("blockquote")) {
              currentElement = "blockquote";
              newOuverture.push({ type: "blockquote", content: p.innerHTML });
            }else if (p.innerHTML == "<br>" && currentElement == "image") {
            } else {
                currentElement = "text";
                newOuverture.push({ type: "text", content: p.innerHTML });
            }
        }

        return newOuverture;
    };

    const getMediaOuvertureByUrl = (url, type) => {
        let media = { type };
        if (data.mediaOuverture[type].length) {
            for (let i = 0; i < data.mediaOuverture[type].length; i++) {
                const cpMedia = data.mediaOuverture[type][i];
                if (url.indexOf(cpMedia.path) != -1) {
                    media = cpMedia;
                    break;
                }
            }
        }
        return media;
    };

    const renderContentNV1 = () => {
        return (
            <>
                <HeadItem
                    item={item}
                    setItem={setItem}
                    state={state}
                    setState={setState}
                    action={action}
                    setAction={setAction}
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                    setMsgNotifTopTime={setMsgNotifTopTime}
                    folowersMessage={folowersMessage}
                    setFolowersMessage={setFolowersMessage}
                    updateSubscriberStatus={updateSubscriberStatus}
                />
                <div className="bloc-miniature">
                    {item.content ? <div className="descripton-miniature">{parse(item.content)}</div> : null}

                    {data.media.count > 0 && (
                        <div>
                            {data.media.sondage.map((sondage, index) => (
                                <Sondage
                                    name={`bloc_${sondage.id}`}
                                    item={sondage}
                                    setItem={setMedia}
                                    key={index}
                                    setMsgNotifTopTime={setMsgNotifTopTime}
                                />
                            ))}
                            <ImagesGallery items={data.media.image} />
                            {data.media.video.map((video, index) => (
                                <PlayerVideo
                                    setActiveItemPlayer={setActiveItemPlayer}
                                    activeItemPlayer={activeItemPlayer}
                                    item={video}
                                    key={index}
                                />
                            ))}
                            {data.media.music.map((music, index) => (
                                <PlayerMusic
                                    setActiveItemMusic={setActiveItemPlayer}
                                    activeItemMusic={activeItemPlayer}
                                    item={music}
                                    key={index}
                                />
                            ))}
                        </div>
                    )}
                </div>
                <BarTemporelle
                    item={item}
                    indexItem={indexItem}
                    setItem={setItem}
                    state={state}
                    setState={setState}
                    action={action}
                    setAction={setAction}
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                    className={state.showModal ? "" : isOpenNV2() ? "" : "nv-hide"}
                    setMsgNotifTopTime={setMsgNotifTopTime}
                    clearPliElapsed={clearPliElapsed}
                />
            </>
        );
    };

    const renderContentNV2 = () => {
        return (
            <>
                {item.ouverture || data.mediaOuverture.count > 0 ? (
                    <div className="content-bloc-NV2">

                        {data.mediaOuverture.count > 0 && (
                            <div>
                                {data.mediaOuverture.sondage.map((sondage) => (
                                    <Sondage
                                        name={`bloc_${sondage.id}`}
                                        item={sondage}
                                        setItem={setMedia}
                                        key={sondage.id}
                                        setMsgNotifTopTime={setMsgNotifTopTime}
                                    />
                                ))}
                            </div>
                        )}
                        {item.ouverture && (
                            <div className="descripton-miniature">
                                {dataOuverture.length > 0 &&
                                    dataOuverture.map((media, index) => (
                                        <span key={index}>
                                            {media.type == "text" && <p>{parse(media.content)}</p>}
                                            {media.type == "blockquote" && <blockquote>{parse(media.content)}</blockquote>}
                                            {media.type == "image" && <ImagesGallery items={media.data} />}
                                            {media.type == "video" &&
                                                media.data.map((video, index) => (
                                                    <PlayerVideo
                                                        setActiveItemPlayer={setActiveItemPlayer}
                                                        activeItemPlayer={activeItemPlayer}
                                                        item={video}
                                                        key={index}
                                                        isOpenOuverture={isOpenNV2()}
                                                    />
                                                ))}
                                            {media.type == "music" &&
                                                media.data.map((music, index) => (
                                                    <PlayerMusic
                                                        setActiveItemMusic={setActiveItemPlayer}
                                                        activeItemMusic={activeItemPlayer}
                                                        item={music}
                                                        key={index}
                                                        isOpenOuverture={isOpenNV2()}
                                                    />
                                                ))}
                                        </span>
                                    ))}
                            </div>
                        )}

                    </div>
                ) : null}
            </>
        );
    };

    return (
        <>
            <ModalItem
                show={state.showModal}
                onHide={() => {
                    setState({ ...state, showModal: false, item });
                }}
            >
                <ModalItem.Body>
                    <MasonryItem height={height}>
                        <div className="bloc-NV1" ref={refHeight}>
                            {renderContentNV1()}
                        </div>
                        <div className="Bloc-NV2">
                            <>
                                {renderContentNV2()}
                                <div
                                    className="toggle-pli2"
                                    onClick={() => setState({ ...state, showModal: false, item })}
                                >
                                    <span className="users-views">
                                        {item.totalCitations} <CommentOutlinedIcon />
                                    </span>{" "}
                                    .
                                    <span className="toggle-zoom">
                                        Retour au pli ouvert <CloseFullscreenTwoToneIcon className="open-zoom-icon" />
                                    </span>
                                </div>
                                <div className={`${state.showCitation ? "" : "d-none"}`}>
                                    <BlocCitations
                                        item={item}
                                        state={state}
                                        setState={setState}
                                        setMsgNotifTopTime={setMsgNotifTopTime}
                                        typingCitation={typingCitation}
                                    />
                                </div>
                            </>
                        </div>
                    </MasonryItem>
                </ModalItem.Body>
            </ModalItem>
            <MasonryItem height={height} id={`masonryItem_${item.id}`}>
                <div className={`bloc-NV1 ${height > 700 ? "is-larg-nv1" : ""}`} ref={refHeight}>
                    {renderContentNV1()}
                </div>
                <div className="Bloc-NV2">
                    <div className="content-Bloc-NV2">
                    <div className={`${isOpenNV2() ? "" : "d-none"}`}>
                        {renderContentNV2()}

                        <div
                            className="toggle-pli2"
                            onClick={() => {
                                setState({ ...state, showModal: true });
                            }}
                        >
                            <span className="users-views">
                                {item?.countOpened ? item.countOpened : 0} <VisibilityIcon />
                            </span>{" "}
                            .{" "}
                            <span className="toggle-zoom">
                                Etendre le pli
                                <OpenInFullOutlinedIcon className="open-zoom-icon" />
                            </span>
                        </div>
                        <BlocComments
                            item={item}
                            state={state}
                            setState={setState}
                            setMsgNotifTopTime={setMsgNotifTopTime}
                        />
                    </div>
                    </div>
                </div>
            </MasonryItem>
        </>
    );
}
