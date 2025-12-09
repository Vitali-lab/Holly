import { calcDiscount } from '../../utils/calcDiscount';
import styled from 'styled-components';

const PriceContainer = ({ className, post }) => {
  return (
    <div className={className}>
      {post.sale === null ? (
        <span>{post.price} руб.</span>
      ) : (
        <>
          <span className={post.sale === null ? '' : 'saleOn'}>{post.price} руб.</span>
          <span className="sale">{<span>{calcDiscount(post)} руб.</span>} </span>
        </>
      )}
    </div>
  );
};

export const Price = styled(PriceContainer)`
  display: flex;
  font-size: ${({ size = '14' }) => size}px;
  font-weight: 600;
  margin: 5px 0 0 0;
  width: 100%;
  justify-content: ${({ justifyContent = 'start' }) => justifyContent};
  align-items: center;
  gap: 4px;
  height: 20px;

  & .saleOn {
    text-decoration: line-through;
    color: var(--grey-color);
  }
  & .sale {
    color: var(--red-color);
    font-weight: 500;
  }
`;
