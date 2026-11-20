import styled from "styled-components";
import { calcDiscount } from "../../utils/calcDiscount";

const SalePriceContainer = ({ className, post }) => {
  return (
    <div className={className}>
      {post.sale === null ? (
        <span>{post.price} руб.</span>
      ) : (
        <>
          <span className="saleOn">{post.price} руб.</span>
          <span className="sale">{calcDiscount(post)} руб.</span>
        </>
      )}
    </div>
  );
};

export const SalePrice = styled(SalePriceContainer)`
  display: flex;
  font-size: ${({ size = "14" }) => size}px;
  font-weight: 500;
  margin: 6px 0 0;
  width: 100%;
  justify-content: flex-start;
  align-items: baseline;
  gap: 8px;

  & span {
    color: var(--ink);
  }

  & .saleOn {
    text-decoration: line-through;
    color: var(--grey-color);
  }

  & .sale {
    color: var(--red-color);
  }
`;
