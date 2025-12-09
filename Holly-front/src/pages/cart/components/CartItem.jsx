import { useDispatch } from 'react-redux';
import { Icon } from '../../../shared/ui';
import { notifySuccess } from '../../../shared/lib/notification';
import { calcDiscount } from '../../../shared/utils/calcDiscount';
import { updateCartItemCount, deleteFromCart } from '../../../features/user/user';
import styled from 'styled-components';

const CartItemContainer = ({ className, item, currentUser }) => {
  const dispatch = useDispatch();

  const delItemCart = (userId, productId) => {
    dispatch(deleteFromCart({ userId, productId }));
    notifySuccess(`Товар ${item.name} удален из корзины`);
  };

  const addCount = (userId, item) => {
    const size = item.size;
    if (item.count < item.sizes[size]) {
      dispatch(updateCartItemCount({ userId, itemId: item.customId, count: item.count + 1 }));
    } else {
      dispatch(updateCartItemCount({ userId, itemId: item.customId, count: item.sizes[size] }));
    }
  };

  const delCount = (userId, item) => {
    if (item.count > 1) {
      dispatch(updateCartItemCount({ userId, itemId: item.customId, count: item.count - 1 }));
    } else {
      dispatch(updateCartItemCount({ userId, itemId: item.customId, count: 1 }));
    }
  };

  const hasSale = item.sale !== null && item.sale > 0;
  const finalPrice = hasSale ? calcDiscount(item) : item.price;

  return (
    <div className={className}>
      <div className="product-media">
        <img src={item.images[0]} alt={item.name} loading="lazy" />
      </div>
      <div className="product-content">
        <div className="product-header">
          <h2>{item.name}</h2>
          <Icon
            id="close"
            onClick={() => {
              delItemCart(currentUser.id, item.customId);
            }}
          />
        </div>
        <div className="product-meta">
          <span>Размер: {item.size}</span>
          <span>Цена: {item.price} руб.</span>
          {hasSale && <span>Скидка: {item.sale}%</span>}
        </div>
        <div className="product-controls">
          <div className="count">
            <button
              disabled={item.count === 1}
              onClick={() => {
                delCount(currentUser.id, item);
              }}
            >
              -
            </button>
            <p>{item.count}</p>
            <button
              disabled={item.count === item.sizes[item.size]}
              onClick={() => {
                addCount(currentUser.id, item);
              }}
            >
              +
            </button>
          </div>
          <div className="count-info">
            <p>В наличии: {item.sizes[item.size]}</p>
          </div>
        </div>
      </div>
      <div className="price-block">
        {hasSale && <span className="price-old">{item.price} руб.</span>}
        <span className="price-current">{finalPrice} руб.</span>
        <span className="price-note">за {item.count} шт.</span>
      </div>
    </div>
  );
};

export const CartItem = styled(CartItemContainer)`
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr) 140px;
  gap: 24px;
  width: 100%;
  padding: 20px;
  border-radius: 20px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: var(--white-color);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);

  & .product-media img {
    width: 120px;
    height: 140px;
    object-fit: cover;
    border-radius: 16px;
  }

  & .product-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  & .product-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;

    h2 {
      font-size: clamp(18px, 2vw, 22px);
      margin: 0;
    }

    & i {
      cursor: pointer;
      color: #9ca3af;
      transition: color 0.2s ease;

      &:hover {
        color: #ef4444;
      }
    }
  }

  & .product-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    color: #6b7280;
    font-size: 14px;

    span {
      background: #f3f4f6;
      border-radius: 999px;
      padding: 4px 10px;
    }
  }

  & .product-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
  }

  & .count {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    background: #f8fafc;
    border-radius: 999px;
    padding: 6px;

    & p {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
    }

    & button {
      border: none;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--main-color);
      color: #fff;
      font-size: 20px;
      cursor: pointer;
      transition: opacity 0.3s ease;

      &:disabled {
        opacity: 0.5;
        cursor: default;
      }
    }
  }

  & .count-info {
    font-size: 13px;
    color: #9ca3af;
  }

  & .price-block {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    gap: 6px;
    text-align: right;

    .price-old {
      text-decoration: line-through;
      color: #9ca3af;
    }

    .price-current {
      font-size: 22px;
      font-weight: 700;
      color: #111827;
    }

    .price-note {
      font-size: 12px;
      color: #9ca3af;
    }
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    justify-content: flex-start;
    text-align: left;

    & .product-media img {
      width: 100%;
      height: 220px;
    }

    & .product-controls {
      flex-direction: column;
      align-items: flex-start;
    }

    & .price-block {
      align-items: flex-start;
    }
  }
  @media (max-width: 480px) {
    width: min(390px, 100%);
    padding: 10px 0;
    & .product-controls {
      flex-direction: column;
      align-items: center;
    }
    & .product-media img {
      width: 200px;
      height: 380px;
    }
    & .price-block {
      align-items: center;
    }
  }
`;
