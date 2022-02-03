import React, { useState } from 'react';
import Carousel, { Modal, ModalGateway } from 'react-images'
import GalerieSlide from './galerieSlide';

export default function ImagesGallery({items}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [stateImage, setStateImage] = useState(false);
    
    const openLightbox = (photo, index) => {
        setCurrentIndex(index);
        setStateImage(true);
    };

    const closeLightbox = () => {
        setCurrentIndex(0);
        setStateImage(false);
    };
    return (
        <div>
            <GalerieSlide
                children={items}
                onClick={openLightbox}
            />
            <ModalGateway>
                {stateImage && items ? (
                    <Modal onClose={closeLightbox}>
                        <Carousel currentIndex={currentIndex} views={items} />
                    </Modal>
                ) : null}
            </ModalGateway>
        </div>
    );
}
