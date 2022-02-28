import React from "react";
import { BlocGalleryImages } from "../../assets/styles/componentStyle";

export default function GalerieSlide({ children = [], onClick }) {
  
  return (
    <BlocGalleryImages className={`${children.length === 2 ? 'tow-item' : children.length === 3 ? 'three-item' : children.length === 4 ? 'four-item' : 'one-item'}`}>
      
          {children.map((val, index) => (
              <div
                key={index}
                className="item-gallery"
                onClick={() => {onClick(val.source, index);}}
              >
                <img src={val.source} alt="" />
              </div>
            ))}
    </BlocGalleryImages>
  );
}
