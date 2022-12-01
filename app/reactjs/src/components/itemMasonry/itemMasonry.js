import OpenInFullOutlinedIcon from "@mui/icons-material/OpenInFullOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import parse from "html-react-parser";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MasonryItem } from "../../assets/styles/componentStyle";
import BarTemporelle from "../barTemporelle";
import BlocComments from "../comments/blocComments";
import HeadItem from "./headItem";
import ImagesGallery from "./imagesGallery";
import PlayerMusic from "./playerMusic";
import PlayerVideo from "./playerVideo";
import Sondage from "./sondage";
import * as actionTypes from "../../store/functions/actionTypes";
import { getDataOuverture } from "../../helper/fonctions";

export default function ItemMasonry({
    item,
    indexItem,
    setItem = () => {},
    action,
    setAction = () => {},
    setMsgNotifTopTime = () => {},
    folowersMessage,
    setFolowersMessage = () => {},
    updateSubscriberStatus = () => {},
    clearPliElapsed = () => {},
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
        <div className="item-masonry">
            <MasonryItem height={height} id={`masonryItem_${item.id}`}>
                    <div className={`bloc-NV1 ${height > 700 ? "is-larg-nv1" : ""}`} ref={refHeight}>
                        <HeadItem
                            item={item}
                            setItem={setItem}
                            action={action}
                            setAction={setAction}
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
                            indexItem={indexItem}
                            setItem={setItem}
                            action={action}
                            setAction={setAction}
                            className={pli.showModal ? "" : pli.activeItem?.id == item.id && pli.showNV2 ? "" : "nv-hide"}
                            setMsgNotifTopTime={setMsgNotifTopTime}
                            clearPliElapsed={clearPliElapsed}
                        />
                    </div>
                    <div className="Bloc-NV2">
                        <div className="content-Bloc-NV2">
                            <div className={`${pli.activeItem?.id == item.id && pli.showNV2 ? "" : "d-none"}`}>
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
                                            activeItem: item,
                                            showModal: true,
                                        }); 
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
                                <BlocComments item={item} setMsgNotifTopTime={setMsgNotifTopTime} />
                            </div>
                        </div>
                    </div>
            </MasonryItem>
        </div>
    );
}
