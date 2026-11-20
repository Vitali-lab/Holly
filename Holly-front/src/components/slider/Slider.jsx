import styled from "styled-components";
import Loader from "../loader/Loader";
import { ProductCard } from "../product-card/ProductCard";

const ProductsSliderContainer = ({ className, products }) => {
  if (!products) {
    return <Loader />;
  }

  return (
    <div className={className}>
      <div className="products">
        {products.map((post) => (
          <ProductCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export const ProductsSlider = styled(ProductsSliderContainer)`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;

  & .products {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: clamp(24px, 3vw, 44px) clamp(16px, 2.2vw, 32px);
  }

  @media (max-width: 992px) {
    & .products {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  @media (max-width: 768px) {
    & .products {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 28px 14px;
    }
  }
`;
