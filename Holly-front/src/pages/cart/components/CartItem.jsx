import { Icon } from "../../../components/icon/Icon";
import { useDispatch } from "react-redux";
import { putCartItemCount } from "../../../bff/api/back-end/put-cart-item-count";
import styled from "styled-components";
import { deleteCatrItem } from "../../../bff/api/back-end/delete-from-cart";
import { notifySuccess } from "../../../func/notification";
import { calcDiscount } from "../../../utils/calcDiscount";

const CartItemContainer = ({ className, item, currentUser }) => {
  const dispatch = useDispatch();

  const delItemCart = (userId, productId) => {
    dispatch(deleteCatrItem(userId, productId));
    notifySuccess(`Товар ${item.name} удален из корзины`);
  };

  const addCount = (userId, item) => {
    const size = item.size;
    if (item.count < item.sizes[size]) {
      dispatch(putCartItemCount(userId, item.id, item.count + 1));
    } else {
      dispatch(
        putCartItemCount(userId, item.id, (item.count = item.sizes[size])),
      );
    }
  };

  const delCount = (userId, item) => {
    if (item.count > 1) {
      dispatch(putCartItemCount(userId, item.id, item.count - 1));
    } else {
      dispatch(putCartItemCount(userId, item.id, (item.count = 1)));
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
          <button
            type="button"
            className="remove"
            aria-label={`Удалить ${item.name}`}
            onClick={() => {
              delItemCart(currentUser.id, item.id);
            }}
          >
            <Icon id="trash" size="15" color="currentColor" />
            <span>Удалить</span>
          </button>
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
        {hasSale && (
          <span className="price-old">{item.price} руб.</span>
        )}
        <span className="price-current">{finalPrice} руб.</span>
        <span className="price-note">за {item.count} шт.</span>
      </div>
    </div>
  );
};

export const CartItem = styled(CartItemContainer)`
  display: grid;
  grid-template-columns: 110px minmax(0, 1fr) 140px;
  gap: clamp(16px, 2vw, 28px);
  width: 100%;
  padding: 24px 0;
  border-bottom: 1px solid var(--line);

  & .product-media img {
    width: 110px;
    height: 140px;
    object-fit: cover;
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
      margin: 0;
      font-size: clamp(18px, 2vw, 23px);
      line-height: 1.2;
    }

    & .remove {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 0;
      border: none;
      background: none;
      color: var(--grey-color);
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      cursor: pointer;
      transition: color 0.2s ease;

      &:hover {
        color: var(--red-color);
      }
    }
  }

  & .product-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    color: var(--grey-color);
    font-size: 12px;

    span {
      padding: 0;
      background: none;
    }
  }

  & .product-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    margin-top: auto;
  }

  & .count {
    display: inline-flex;
    align-items: center;
    border: 1px solid var(--line-strong);

    & p {
      margin: 0;
      min-width: 38px;
      text-align: center;
      font-size: 14px;
    }

    & button {
      width: 34px;
      height: 34px;
      padding: 0;
      border: none;
      background: transparent;
      color: var(--ink);
      font-size: 18px;
      cursor: pointer;
      transition: background-color 0.2s ease;

      &:hover:not(:disabled) {
        background-color: var(--paper-deep);
      }

      &:disabled {
        opacity: 0.3;
        cursor: default;
      }
    }
  }

  & .count-info {
    font-size: 11px;
    letter-spacing: 0.04em;
    color: var(--grey-color);
  }

  & .price-block {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    gap: 4px;
    text-align: right;

    .price-old {
      text-decoration: line-through;
      color: var(--grey-color);
      font-size: 13px;
    }

    .price-current {
      font-size: 20px;
      font-weight: 600;
      color: var(--ink);
    }

    .price-note {
      font-size: 11px;
      color: var(--grey-color);
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 88px minmax(0, 1fr);
    align-items: start;

    & .product-media img {
      width: 88px;
      height: 112px;
    }

    & .price-block {
      grid-column: 2;
      align-items: flex-start;
      margin-top: 0;
      text-align: left;
    }

    & .product-controls {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      margin-top: 8px;
    }
  }
`;
