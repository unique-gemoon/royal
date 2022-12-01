import CloseFullscreenTwoToneIcon from "@mui/icons-material/CloseFullscreenTwoTone";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import parse from "html-react-parser";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MasonryItem, ModalItem } from "../../assets/styles/componentStyle";
import BarTemporelle from "../barTemporelle";
import BlocCitations from "../citations/blocCitations";
import HeadItem from "./headItem";
import ImagesGallery from "./imagesGallery";
import PlayerMusic from "./playerMusic";
import PlayerVideo from "./playerVideo";
import Sondage from "./sondage";
import * as actionTypes from "../../store/functions/actionTypes";
import { getDataOuverture } from "../../helper/fonctions";

export default function ItemMasonryModal({
    item,
    setItem = () => {},
    action,
    setAction = () => {},
    setMsgNotifTopTime = () => {},
    folowersMessage,
    setFolowersMessage = () => {},
    updateSubscriberStatus = () => {},
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
        dataOuverture: [],
    };
    const [data, setData] = useState({ ...initData });

    const [height, setHeight] = useState(0);
    const refHeight = useRef(null);
    const dispatch = useDispatch();
    const pli = useSelector((store) => store.pli);

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
        setData({ ...cpData, dataOuverture: getDataOuverture(item.ouverture, cpData.mediaOuverture) });
    }, [item.medias]);

    const setMedia = (media) => {
        let cpMedias = [...item.medias];
        for (var i = 0; i < cpMedias.length; i++) {
            if (cpMedias[i].id == media.id) {
                cpMedias[i] = media;
            }
        }
        setItem({ ...item, medias: cpMedias, action: "update" });
    };

    return (
        <>
            <ModalItem
                show={pli.showModal}
                onHide={() => {
                    dispatch({
                        type: actionTypes.LOAD_PLI,
                        showModal: false,
                    });
                }}
            >
                <ModalItem.Body>
                    <MasonryItem height={height}>
                        <div className="bloc-NV1" ref={refHeight}>
                            <HeadItem
                                item={item}
                                setItem={setItem}
                                action={action}
                                setAction={setAction}
                                setMsgNotifTopTime={setMsgNotifTopTime}
                                folowersMessage={folowersMessage}
                                setFolowersMessage={setFolowersMessage}
                                updateSubscriberStatus={updateSubscriberStatus}
                                countOpened={pli.countOpened}
                            />
                            <div className="bloc-miniature">
                                {item.content ? <div className="descripton-miniature">{parse(item.content)}</div> : null}

                                {data.media.count > 0 && (
                                    <div>
                                        {data.media.sondage.map((sondage, index) => (
                                            <Sondage name={`bloc_${sondage.id}`} item={sondage} setItem={setMedia} key={index} setMsgNotifTopTime={setMsgNotifTopTime} />
                                        ))}
                                        <ImagesGallery items={data.media.image} />
                                        {data.media.video.map((video, index) => video?.path && <PlayerVideo item={video} key={index} />)}
                                        {data.media.music.map((music, index) => music?.path && <PlayerMusic item={music} key={index} />)}
                                    </div>
                                )}
                            </div>
                            <BarTemporelle
                                item={item}
                                setItem={setItem}
                                action={action}
                                setAction={setAction}
                                className={pli.showModal ? "" : pli.showNV2 ? "" : "nv-hide"}
                                setMsgNotifTopTime={setMsgNotifTopTime}
                            />
                        </div>
                        <div className="Bloc-NV2">
                            <>
                                {item.ouverture || data.mediaOuverture.count > 0 ? (
                                    <div className="content-bloc-NV2">
                                        {data.mediaOuverture.count > 0 && (
                                            <div>
                                                {data.mediaOuverture.sondage.map((sondage) => (
                                                    <Sondage name={`bloc_${sondage.id}`} item={sondage} setItem={setMedia} key={sondage.id} setMsgNotifTopTime={setMsgNotifTopTime} />
                                                ))}
                                            </div>
                                        )}
                                        {item.ouverture && (
                                            <div className="descripton-miniature">
                                                {data.dataOuverture.length > 0 &&
                                                    data.dataOuverture.map((media, index) => (
                                                        <span key={index}>
                                                            {media.type == "text" && <p>{parse(media.content)}</p>}
                                                            {media.type == "blockquote" && <blockquote>{parse(media.content)}</blockquote>}
                                                            {media.type == "image" && <ImagesGallery items={media.data} />}
                                                            {media.type == "video" && media.data.map((video, index) => video?.path && <PlayerVideo item={video} key={index} />)}
                                                            {media.type == "music" && media.data.map((music, index) => music?.path && <PlayerMusic item={music} key={index} />)}
                                                        </span>
                                                    ))}
                                            </div>
                                        )}
                                    </div>
                                ) : null}
                                <div
                                    className="toggle-pli2"
                                    onClick={() => {
                                        dispatch({
                                            type: actionTypes.LOAD_PLI,
                                            showModal: false,
                                        });
                                    }}
                                >
                                    <span className="users-views">
                                        {item.totalCitations} <CommentOutlinedIcon />
                                    </span>{" "}
                                    .
                                    <span className="toggle-zoom">
                                        Retour au pli ouvert <CloseFullscreenTwoToneIcon className="open-zoom-icon" />
                                    </span>
                                </div>
                                <div className={`${pli.showCitation ? "" : "d-none"}`}>
                                    <BlocCitations item={item} setMsgNotifTopTime={setMsgNotifTopTime} typingCitation={typingCitation} />
                                </div>
                            </>
                        </div>
                    </MasonryItem>
                </ModalItem.Body>
            </ModalItem>
        </>
    );
}
