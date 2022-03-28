import CloseFullscreenTwoToneIcon from "@mui/icons-material/CloseFullscreenTwoTone";
import OpenInFullOutlinedIcon from "@mui/icons-material/OpenInFullOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import React, { useEffect, useRef, useState } from "react";
import { MasonryItem, ModalItem } from "../../assets/styles/componentStyle";
import BarTemporelle from "../barTemporelle";
import BlocComments from "../comments/blocComments";
import HeadItem from "./headItem";
import ImagesGallery from "./imagesGallery";
import PlayerMusic from "./playerMusic";
import PlayerVideo from "./playerVideo";
import Soundage from "./soundage";

export default function ItemMasonry({
  item,
  setItem = () => { },
  open = false,
  action,
  setAction = () => { },
  activeItem = null,
  setActiveItem = () => { },
  setActiveItemPlayer = () => { },
  activeItemPlayer = null

}) {

  const [state, setState] = useState({
    showModal: false,
    showComment: true,
  });
  const [height, setHeight] = useState(0);
  const refHeight = useRef(null);

  useEffect(() => {
    if (refHeight.current) {
      setTimeout(() => {
        setHeight(refHeight.current.clientHeight);
      }, 1000);
    }
  }, []);

  const isCheck = (item) => {
    return activeItem && item.id == activeItem.id;
  }


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
                setActiveItem={setActiveItem}
              />
              <div className="bloc-miniature">
                {item.nv1.description ? (
                  <div className="descripton-miniature">
                    {item.nv1.description}
                  </div>
                ) : null}
                {item.nv1.soundage ? (
                  <Soundage
                    name={`modal_${item.id}_1`}
                    niveau={1}
                    item={item}
                    setItem={setItem}
                  />
                ) : null}
                {item.nv1.photos ? (
                  <ImagesGallery items={item.nv1.photos} />
                ) : null}
                {item.nv1.video ? <PlayerVideo setActiveItemPlayer={setActiveItemPlayer} activeItemPlayer={activeItemPlayer} item={item.nv1.video} /> : null}
                {item.nv1.music ? <PlayerMusic setActiveItemMusic={setActiveItemPlayer} activeItemMusic={activeItemPlayer} item={item.nv1.music} /> : null}
              </div>
              <BarTemporelle state={state} setState={setState} />
            </div>
            <div className="Bloc-NV2">
              {isCheck(item) ?
                <>
                  {item.nv2 ?
                    <div className="content-bloc-NV2">
                      {item.nv2.description ? (
                        <div className="descripton-miniature">
                          {item.nv2.description}
                        </div>
                      ) : null}
                      {item.nv2.music ? (
                        <PlayerMusic setActiveItemMusic={setActiveItemPlayer} activeItemMusic={activeItemPlayer} item={item.nv2.music} />
                      ) : null}
                      {item.nv2.soundage ? (
                        <Soundage
                          name={`modal_${item.id}_2`}
                          niveau={2}
                          item={item}
                          setItem={setItem}
                        />
                      ) : null}
                      {item.nv2.photos ? (
                        <ImagesGallery items={item.nv2.photos} />
                      ) : null}
                      {item.nv2.video ? (
                        <PlayerVideo setActiveItemPlayer={setActiveItemPlayer} activeItemPlayer={activeItemPlayer} item={item.nv2.video} />
                      ) : null}
                    </div>
                    : null}
                  <div
                    className="toggle-pli2"
                    onClick={() =>
                      setState({ ...state, showComment: false, showModal: false })
                    }
                  >
                    <span className="users-views">
                      14 <VisibilityIcon />
                    </span>{" "}
                    .
                    {!state.showComment ? (
                      <span className="toggle-zoom">
                        Etendre le pli{" "}
                        <OpenInFullOutlinedIcon className="open-zoom-icon" />
                      </span>
                    ) : (
                      <span className="toggle-zoom">
                        Retour au pli ouvert{" "}
                        <CloseFullscreenTwoToneIcon className="open-zoom-icon" />
                      </span>
                    )}
                  </div>
                  {state.showComment ? (
                    <BlocComments
                      item={item}
                      state={state}
                      setState={setState}
                    />
                  ) : null}
                </>
                : null}
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
            {item.nv1.description ? (
              <div className="descripton-miniature">{item.nv1.description}</div>
            ) : null}
            {item.nv1.soundage ? (
              <Soundage
                name={`bloc_${item.id}_1`}
                niveau={1}
                item={item}
                setItem={setItem}
              />
            ) : null}
            {item.nv1.photos ? <ImagesGallery items={item.nv1.photos} /> : null}
            {item.nv1.video ? <PlayerVideo setActiveItemPlayer={setActiveItemPlayer} activeItemPlayer={activeItemPlayer} item={item.nv1.video}  /> : null}
            {item.nv1.music ? <PlayerMusic setActiveItemMusic = { setActiveItemPlayer } activeItemMusic = { activeItemPlayer } item={item.nv1.music} /> : null}
          </div>
          <BarTemporelle
            item={item}
            state={state}
            setState={setState}
            action={action}
            setAction={setAction}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            className={isCheck(item) && item.nv2 ? "" : "nv-hide"}
          />
        </div>

        <div className="Bloc-NV2">
          {isCheck(item) ?
            <>
              {item.nv2 ?
                <div className="content-bloc-NV2">
                  {item.nv2.description ? (
                    <div className="descripton-miniature">
                      {item.nv2.description}
                    </div>
                  ) : null}
                  {item.nv2.music ? <PlayerMusic setActiveItemMusic={setActiveItemPlayer} activeItemMusic={activeItemPlayer} item={item.nv2.music} /> : null}
                  {item.nv2.soundage ? (
                    <Soundage
                      name={`bloc_${item.id}_2`}
                      niveau={2}
                      item={item}
                      setItem={setItem}
                    />
                  ) : null}
                  {item.nv2.photos ? (
                    <ImagesGallery items={item.nv2.photos} />
                  ) : null}
                  {item.nv2.video ? <PlayerVideo setActiveItemPlayer={setActiveItemPlayer} activeItemPlayer={activeItemPlayer} item={item.nv2.video} /> : null}
                </div>
                : null}
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
            </>
            : null}
        </div>
      </MasonryItem>
    </>
  );
}
