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
  stateFolowersMessage,
  setFolowersMessage = () => {},
  updateSubscriberStatus = () => {},
  activeItemNV2={},
  clearPliElapsed=() => {},
  typingCitation={}
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
  const [height, setHeight] = useState(0);
  const refHeight = useRef(null);

  const getShowNV2 = (i) => {
    return activeItemNV2 && i.id == activeItemNV2.id && activeItemNV2.showNV2 ;
  };

  const [state, setState] = useState({
    showModal: false,
    showComment: true,
    showCitation: false,
    showNV2: false,
    item: {},
  });

  useEffect(() => {
    setStateModal(state);
  }, [state]);


  useEffect(() => {
    setState({...state, showNV2: !getShowNV2(item)});
  }, [activeItemNV2]);

  useEffect(() => {
    if (refHeight?.current?.clientHeight){
      setTimeout(() => {
        setHeight(refHeight.current.clientHeight);
      }, 1000);
    }
  }, []);

  useEffect(() => {
    const cpData = { ...initData };
    for (let i = 0; i < item.medias.length; i++) {
      const cpItem = item.medias[i];
      if (cpItem.isOuverture) {
        cpData.mediaOuverture[cpItem.type] = [
          ...cpData.mediaOuverture[cpItem.type],
          { ...cpItem },
        ];
        cpData.mediaOuverture.count = cpData.mediaOuverture.count + 1;
      } else {
        cpData.media[cpItem.type] = [
          ...cpData.media[cpItem.type],
          { ...cpItem },
        ];
        cpData.media.count = cpData.media.count + 1;
      }
    }
    setData(cpData);
  }, [item.medias]);

  const isOpenNV2 = (i) => {
    return activeItemNV2 && i.id == activeItemNV2.id && state.showNV2 ;
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
          stateFolowersMessage={stateFolowersMessage}
          setFolowersMessage={setFolowersMessage}
          updateSubscriberStatus={updateSubscriberStatus}
        />
        <div className="bloc-miniature">
          {item.content ? (
            <div className="descripton-miniature">{parse(item.content)}</div>
          ) : null}

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
          className={state.showModal ? "" : isOpenNV2(item) ? "" : "nv-hide"}
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
            {item.ouverture && (
              <div className="descripton-miniature">
                {parse(item.ouverture)}
              </div>
            )}

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
                <ImagesGallery items={data.mediaOuverture.image} />
                {data.mediaOuverture.video.map((video, index) => (
                  <PlayerVideo
                    setActiveItemPlayer={setActiveItemPlayer}
                    activeItemPlayer={activeItemPlayer}
                    item={video}
                    key={index}
                  />
                ))}
                {data.mediaOuverture.music.map((music, index) => (
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
                    Retour au pli ouvert{" "}
                    <CloseFullscreenTwoToneIcon className="open-zoom-icon" />
                  </span>
                </div>
                <div className={`${state.showCitation ? "d-none" : ""}`}>
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
        <div
          className={`bloc-NV1 ${height > 700 ? "is-larg-nv1" : ""}`}
          ref={refHeight}
        >
          {renderContentNV1()}
        </div>
        <div className="Bloc-NV2">
          <div className={`${isOpenNV2(item) ? "" : "d-none"}`}>
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
      </MasonryItem>
    </>
  );
}
