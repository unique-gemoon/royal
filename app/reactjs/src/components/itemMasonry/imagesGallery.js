import React, { useState } from "react";
import Carousel, { Modal, ModalGateway } from "react-images";
import GalerieSlide from "./galerieSlide";
import { getPathMedia } from '../../helper/fonctions';

export default function ImagesGallery({ items }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stateImage, setStateImage] = useState(false);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setStateImage(true);
  };

  const closeLightbox = () => {
    setCurrentIndex(0);
    setStateImage(false);
  };
  const getSources = () => {
    const sources = [];
    for (let i = 0; i < items.length; i++) {
      sources.push({ source: getPathMedia(items[i],"image"), alt: items[i].name });
    }
    return sources;
  };

  return (
    items &&
    items.length > 0 && (
      <div>
        <GalerieSlide children={items} onClick={openLightbox} />
        <ModalGateway>
          {stateImage && items ? (
            <Modal onClose={closeLightbox}>
              <Carousel currentIndex={currentIndex} views={getSources()} />
            </Modal>
          ) : null}
        </ModalGateway>
      </div>
    )
  );
}
