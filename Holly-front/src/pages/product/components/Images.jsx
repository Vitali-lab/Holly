import { useState } from "react";
import styled from "styled-components";

const ImagesContainer = ({ className, product }) => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className={className}>
      <div className="image">
        <img src={product.images[currentImage]} alt={product.name} />
      </div>
      {product.images.length > 1 && (
        <div className="small-images">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt=""
              className={index === currentImage ? "active" : ""}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const Images = styled(ImagesContainer)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;

  & .image {
    width: 100%;
    aspect-ratio: 4 / 5;
    overflow: hidden;
    background-color: var(--paper-deep);

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  & .small-images {
    display: flex;
    flex-direction: row;
    gap: 10px;
    overflow-x: auto;

    & img {
      width: 72px;
      height: 90px;
      object-fit: cover;
      border: 1px solid transparent;
      cursor: pointer;
      opacity: 0.7;
      transition:
        opacity 0.2s ease,
        border-color 0.2s ease;

      &:hover,
      &.active {
        opacity: 1;
        border-color: var(--ink);
      }
    }
  }
`;
