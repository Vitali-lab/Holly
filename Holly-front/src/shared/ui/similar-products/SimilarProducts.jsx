import { useSelector } from 'react-redux';
import { ProductsSlider } from '../slider/Slider';
import Loader from '../loader/Loader';
import styled from 'styled-components';
import { allProductsSelector } from '../../../entities/selectors';

const SimilarProductsContainer = ({ className, product }) => {
  const { allProducts } = useSelector(allProductsSelector);

  if (!allProducts) {
    return <Loader />;
  }

  const isSimilar = allProducts.filter(
    (item) => item.categoryId === product.categoryId && item.id !== product.id
  );

  return (
    <div className={className}>
      <h1>Похожие </h1>
      <ProductsSlider key={product.id} products={isSimilar} />
    </div>
  );
};

export const SimilarProducts = styled(SimilarProductsContainer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: min(1000px, 100%);
  padding: 0 20px;
  margin: 50px 0 50px 0;
  border-radius: 20px;
  background-color: var(--white-color);
  & h1 {
    text-align: center;
    font-size: 40px;
  }

  & .nothing {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
    margin-top: 50px;
    width: 1600px;
  }

  @media (max-width: 1600px) {
    & .nothing {
      width: 100%;
    }
  }

  @media (max-width: 1200px) {
    & .nothing {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    & .nothing {
      width: 100%;
    }
  }

  @media (max-width: 450px) {
    width: min(400px, 100%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
`;
