import { useState } from 'react';
import styled from 'styled-components';

const ImagesContainer = ({ className, product }) => {
  const [currentImage, setCurrentImage] = useState(0);

  console.log(product);

  return (
    <div className={className}>
      <div className="image">
        <img src={product.images[currentImage]} alt="" />
        {product.images.length > 1 && (
          <div className="small-images">
            {product.images.map((image, index) => (
              <img key={index} src={image} alt="" onClick={() => setCurrentImage(index)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const Images = styled(ImagesContainer)`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin: 40px 0 40px 0;
  transition: all ease 0.5s;

  & .image {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    overflow: hidden;
    border-radius: 10px;
  }

  & .image img {
    width: 500px;
    border-radius: 10px;
    object-fit: contain;
    transition: all ease 0.5s;
    &:hover {
      transform: scale(1.05);
      transition: all ease 0.5s;
    }
  }

  & .small-images {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    & img {
      width: 80px;
      height: auto;
      border-radius: 10px;
      object-fit: contain;
      cursor: pointer;

      padding: 5px;
    }
  }
  @media (max-width: 768px) {
    margin-top: 120px;
    & .image img {
      width: 300px;
    }
    & .small-images {
      & img {
        width: 50px;
      }
    }
  }
`;
