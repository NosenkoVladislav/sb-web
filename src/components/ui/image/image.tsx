import React from "react";

import styles from "./image.module.css";

interface ImageProps {
  src: any;
  altText?: string;
  link?: string;
  isBlank?: boolean;
  className?: string;
}

const Image = ( { src, altText, link, isBlank, className }: ImageProps ) => {
  const isLink = link?.length;
  const alt = altText && altText?.length > 0 ? altText : "image";
  const isNewTab = isBlank ? "_blank" : "";
  const imageStyle = `${styles.image} ${className}`;

  return (
    <div>
      {isLink ? (
        <a href={link} target={isNewTab} rel="nofollow noopener">
          <img src={src} alt={alt} className={imageStyle}/>
        </a>
      ) : (<img src={src} alt={alt} className={imageStyle}/>)}
    </div>
  )
};

export default Image;