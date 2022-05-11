import React from "react";
import { BlocGalleryImages } from "../../assets/styles/componentStyle";
import { getPathMedia } from '../../helper/fonctions';

export default function GalerieSlide({ children = [], onClick }) {
  
  return (
    <BlocGalleryImages className={`${children.length === 2 ? 'tow-item' : children.length === 3 ? 'three-item' : children.length === 4 ? 'four-item' : 'one-item'}`}>
          {children.map((image, index) => (
              <div
                key={index}
                className="item-gallery"
                onClick={() => {onClick(index);}}
              >
                <img src={getPathMedia(image,"image")} alt="" />
              </div>
            ))}
    </BlocGalleryImages>
  );
}
