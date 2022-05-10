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

export default function ItemMasonry({
  item,
  setItem = () => {},
  action,
  setAction = () => {},
  activeItem = null,
  setActiveItem = () => {},
  setActiveItemPlayer = () => {},
  activeItemPlayer = null,
}) {
  const [state, setState] = useState({
    showModal: false,
    showComment: true,
  });
  const [height, setHeight] = useState(0);
  const refHeight = useRef(null);

  useEffect(() => {
    if (
      refHeight.current &&
      (refHeight.current.clientHeight !== null ||
        refHeight.current.clientHeight !== undefined)
    ) {
      setTimeout(() => {
        setHeight(refHeight.current.clientHeight);
      }, 1000);
    }
  }, []);

  const isCheck = (i) => {
    return activeItem && i.id == activeItem.id;
  };

  const getMedias = (type, isOuverture = false) => {
    let medias = [];
    for (let i = 0; i < item.medias.length; i++) {
      if (
        (!type || type === item.medias[i].type) &&
        isOuverture == item.medias[i].isOuverture
      ) {
        medias.push(item.medias[i]);
      }
    }
    return medias;
  };

  const setMedia = (media) => {
    let cpMedias = [...item.medias];
    for (var i = 0; i < cpMedias.length; i++) {
      if (cpMedias[i].id == media.id) {
        cpMedias[i] = media;
      }
    }
    setItem({ ...item, medias: cpMedias });
  };

  return (
    <>
      <ModalItem
        show={state.showModal}
        onHide={() => {
          setState({ ...state, showModal: false });
        }}
      >
        <ModalItem.Body>
          <MasonryItem height={height}>
            <div className="bloc-NV1" ref={refHeight}>
              <HeadItem
                item={item}
                setItem={setItem}
                state={state}
                setState={setState}
                action={action}
                setAction={setAction}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              />
              <div className="bloc-miniature">
                {item.content ? (
                  <div className="descripton-miniature">
                    {parse(item.content)}
                  </div>
                ) : null}

                {getMedias("").length > 0 && (
                  <div>
                    {getMedias("sondage").map((sondage) => (
                      <Sondage
                        name={`bloc_${sondage.id}`}
                        item={sondage}
                        setItem={setMedia}
                        key={sondage.id}
                      />
                    ))}
                    <ImagesGallery items={getMedias("image")} />
                    {getMedias("video").map((video) => (
                      <PlayerVideo
                        setActiveItemPlayer={setActiveItemPlayer}
                        activeItemPlayer={activeItemPlayer}
                        item={video}
                        key={video.id}
                      />
                    ))}
                    {getMedias("music").map((music) => (
                      <PlayerMusic
                        setActiveItemMusic={setActiveItemPlayer}
                        activeItemMusic={activeItemPlayer}
                        item={music}
                        key={music.id}
                      />
                    ))}
                  </div>
                )}
              </div>
              <BarTemporelle
                item={item}
                setItem={setItem}
                state={state}
                setState={setState}
                action={action}
                setAction={setAction}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                className={isCheck(item) ? "" : "nv-hide"}
              />
            </div>
            <div className="Bloc-NV2">
              <>
                {item.ouverture || getMedias("", true).length > 0 ? (
                  <div className="content-bloc-NV2">
                    {item.ouverture && (
                      <div className="descripton-miniature">
                        {parse(item.ouverture)}
                      </div>
                    )}

                    {getMedias("", true).length > 0 && (
                      <div>
                        {getMedias("sondage", true).map((sondage) => (
                          <Sondage
                            name={`bloc_${sondage.id}`}
                            item={sondage}
                            setItem={setMedia}
                            key={sondage.id}
                          />
                        ))}
                        <ImagesGallery items={getMedias("image", true)} />
                        {getMedias("video", true).map((video) => (
                          <PlayerVideo
                            setActiveItemPlayer={setActiveItemPlayer}
                            activeItemPlayer={activeItemPlayer}
                            item={video}
                            key={video.id}
                          />
                        ))}
                        {getMedias("music", true).map((music) => (
                          <PlayerMusic
                            setActiveItemMusic={setActiveItemPlayer}
                            activeItemMusic={activeItemPlayer}
                            item={music}
                            key={music.id}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ) : null}

                <div
                  className="toggle-pli2"
                  onClick={() => setState({ ...state, showModal: false })}
                >
                  {!state.showComment ? (
                    <>
                      <span className="users-views">
                        14 <VisibilityIcon />
                      </span>{" "}
                      .
                      <span className="toggle-zoom">
                        Etendre le pli{" "}
                        <OpenInFullOutlinedIcon className="open-zoom-icon" />
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="users-views">
                        14 <CommentOutlinedIcon />
                      </span>{" "}
                      .
                      <span className="toggle-zoom">
                        Retour au pli ouvert{" "}
                        <CloseFullscreenTwoToneIcon className="open-zoom-icon" />
                      </span>
                    </>
                  )}
                </div>
                {state.showComment ? (
                  <BlocComments item={item} state={state} setState={setState} />
                ) : null}
              </>
            </div>
          </MasonryItem>
        </ModalItem.Body>
      </ModalItem>
      <MasonryItem height={height}>
        <div className="bloc-NV1" ref={refHeight}>
          <HeadItem
            item={item}
            setItem={setItem}
            state={state}
            setState={setState}
            action={action}
            setAction={setAction}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
          <div className="bloc-miniature">
            {item.content ? (
              <div className="descripton-miniature">{parse(item.content)}</div>
            ) : null}

            {getMedias("").length > 0 && (
              <div>
                {getMedias("sondage").map((sondage) => (
                  <Sondage
                    name={`bloc_${sondage.id}`}
                    item={sondage}
                    setItem={setMedia}
                    key={sondage.id}
                  />
                ))}
                <ImagesGallery items={getMedias("image")} />
                {getMedias("video").map((video) => (
                  <PlayerVideo
                    setActiveItemPlayer={setActiveItemPlayer}
                    activeItemPlayer={activeItemPlayer}
                    item={video}
                    key={video.id}
                  />
                ))}
                {getMedias("music").map((music) => (
                  <PlayerMusic
                    setActiveItemMusic={setActiveItemPlayer}
                    activeItemMusic={activeItemPlayer}
                    item={music}
                    key={music.id}
                  />
                ))}
              </div>
            )}
          </div>
          <BarTemporelle
            item={item}
            setItem={setItem}
            state={state}
            setState={setState}
            action={action}
            setAction={setAction}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            className={isCheck(item) ? "" : "nv-hide"}
          />
        </div>
        <div className="Bloc-NV2">
          {isCheck(item) && (
            <>
              {item.ouverture || getMedias("", true).length > 0 ? (
                <div className="content-bloc-NV2">
                  {item.ouverture && (
                    <div className="descripton-miniature">
                      {parse(item.ouverture)}
                    </div>
                  )}

                  {getMedias("", true).length > 0 && (
                    <div>
                      {getMedias("sondage", true).map((sondage) => (
                        <Sondage
                          name={`bloc_${sondage.id}`}
                          item={sondage}
                          setItem={setMedia}
                          key={sondage.id}
                        />
                      ))}
                      <ImagesGallery items={getMedias("image", true)} />
                      {getMedias("video", true).map((video) => (
                        <PlayerVideo
                          setActiveItemPlayer={setActiveItemPlayer}
                          activeItemPlayer={activeItemPlayer}
                          item={video}
                          key={video.id}
                        />
                      ))}
                      {getMedias("music", true).map((music) => (
                        <PlayerMusic
                          setActiveItemMusic={setActiveItemPlayer}
                          activeItemMusic={activeItemPlayer}
                          item={music}
                          key={music.id}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : null}

              <div
                className="toggle-pli2"
                onClick={() =>
                  setState({ ...state, showModal: true, showComment: true })
                }
              >
                <span className="users-views">
                  14 <VisibilityIcon />
                </span>{" "}
                .{" "}
                <span className="toggle-zoom">
                  Etendre le pli
                  <OpenInFullOutlinedIcon className="open-zoom-icon" />
                </span>
              </div>
              <BlocComments item={item} state={state} setState={setState} />
            </>
          )}
        </div>
      </MasonryItem>
    </>
  );
}
