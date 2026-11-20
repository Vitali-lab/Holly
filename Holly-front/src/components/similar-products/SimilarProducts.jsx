import { useSelector } from "react-redux";
import styled from "styled-components";
import { ProductsSlider } from "../slider/Slider";
import Loader from "../loader/Loader";

const SimilarProductsContainer = ({ className, product }) => {
  const products = useSelector((state) => state.products.products);

  if (!products) {
    return <Loader />;
  }

  const isSimilar = products.filter(
    (item) => item.categoryId === product.categoryId && item.id !== product.id,
  );

  if (isSimilar.length === 0) {
    return null;
  }

  return (
    <section className={className}>
      <header className="section-header">
        <div>
          <p className="eyebrow">Ещё из категории</p>
          <h2 className="section-title">Похожие вещи</h2>
        </div>
      </header>
      <ProductsSlider key={product.id} products={isSimilar} />
    </section>
  );
};

export const SimilarProducts = styled(SimilarProductsContainer)`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;

  & .section-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 24px;
    padding-bottom: 24px;
    margin-bottom: 32px;
    border-bottom: 1px solid var(--line-strong);

    & .eyebrow {
      margin-bottom: 10px;
    }
  }
`;
