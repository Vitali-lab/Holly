import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ProductInfo, ProductSizes, ProductLables } from '../../ui';
import { selectCategories, seasonsSelector } from '../../../entities/selectors';
import styled from 'styled-components';

const ProductFormContainer = ({
  className,
  children,
  name,
  setName,
  description,
  setDescription,
  price,
  setPrice,
  image,
  setImage,
  sizes,
  setSizes,
  category,
  setCategory,
  season,
  setSeason,
  sale,
  setSale,
}) => {
  const { categories } = useSelector(selectCategories);
  const { seasons } = useSelector(seasonsSelector);
  const [imageUrl, setImageUtl] = useState('');

  return (
    <div className={className}>
      <h1>{children}</h1>
      <div className="container">
        <div className="inputs">
          <ProductInfo
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            price={price}
            setPrice={setPrice}
            image={image}
            setImage={setImage}
            imageUrl={imageUrl}
            setImageUtl={setImageUtl}
            sale={sale}
            setSale={setSale}
          />
        </div>
        <div>
          <div className="product-sizes">
            <ProductSizes setSizes={setSizes} sizes={sizes} />
          </div>
          <div className="selects">
            <ProductLables
              categories={categories}
              category={category}
              setCategory={setCategory}
              seasons={seasons}
              season={season}
              setSeason={setSeason}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductForm = styled(ProductFormContainer)`
  & .container {
    width: 1300px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    gap: 50px;
  }

  & .selects {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    gap: 20px;
  }
  & .product-prewiew {
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: end;
    width: 270px;
    height: 541px;

    & img {
      width: 270px;
      height: 400px;
      object-fit: cover;
      border-radius: 10px;
      transition: all ease-in 0.5s;
      &:hover {
        transform: scale(0.9);
        transition: all ease 0.5s;
      }
    }
    & h2 {
      margin: 10px 0;
      font-size: 16px;
      font-weight: 500;
    }
    & p {
      margin: 5px 0;
    }
  }
`;
