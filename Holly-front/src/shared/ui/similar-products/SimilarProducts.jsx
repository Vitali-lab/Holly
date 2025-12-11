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
  width: 100%;
  max-width: 1200px;
  padding: 0 clamp(12px, 4vw, 32px);
  margin: 50px 0;
  border-radius: 20px;
  background-color: var(--white-color);
  & h1 {
    text-align: center;
    font-size: clamp(22px, 4vw, 34px);
    margin-bottom: 20px;
  }

  & .nothing {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
    margin-top: 50px;
    width: 100%;
  }

  @media (max-width: 768px) {
    margin: 30px 0;
  }

  @media (max-width: 450px) {
    padding: 0 12px;
    & h1 {
      font-size: 22px;
      margin-bottom: 12px;
    }
  }
`;
