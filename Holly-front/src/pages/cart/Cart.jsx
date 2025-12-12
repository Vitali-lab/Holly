import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../shared/ui';
import { CartItem } from './components/CartItem';
import { scrollTop } from '../../shared/utils/scrollTop';
import { allProductsSelector, userSelector } from '../../entities/selectors';
import { useProductAtCart } from '../../shared/hooks/use-product-at-cart';
import Loader from '../../shared/ui/loader/Loader';
import styled from 'styled-components';

const CartContainer = ({ className }) => {
  const navigate = useNavigate();
  const currentUser = useSelector(userSelector);
  const { allProducts } = useSelector(allProductsSelector);

  useEffect(() => {
    scrollTop();
  }, []);

  const { productAtCart, finishPrice } = useProductAtCart();

  if (!currentUser) {
    return (
      <div className={className}>
        <div className="no-auth">
          <h1>Корзина</h1>
          <p>Вы не авторизованы</p>
        </div>
      </div>
    );
  }

  if (currentUser.cart.length === 0) {
    return (
      <div className={className}>
        <div className="no-auth">
          <h1>Корзина 🛒</h1>
          <p>Ваша корзина пуста :(</p>
          <Button
            onClick={() => {
              navigate('/catalog');
            }}
            width={'300'}
          >
            Вперед за покупками 🛍️
          </Button>
        </div>
      </div>
    );
  }

  if (!allProducts || allProducts.length === 0) {
    return <Loader />;
  }

  const createUserOrder = () => {
    const orderNum = new Date().getTime();

    navigate(`/cart/order/${orderNum}`);
  };

  const totalItems = productAtCart.reduce((acc, item) => acc + (Number(item.count) || 0), 0);

  const totalSavings = productAtCart.reduce((acc, item) => {
    if (!item.sale) return acc;
    const count = Number(item.count) || 0;
    const price = Number(item.price) || 0;
    const sale = Number(item.sale) || 0;
    const savingsPerItem = price * (sale / 100);
    return acc + count * savingsPerItem;
  }, 0);

  return (
    <div className={className}>
      <h1>Корзина 🛒</h1>
      <div className="cart">
        <div className="cart-list">
          {productAtCart.map((item) => {
            return (
              <CartItem
                key={`${item.customId}`}
                currentUser={currentUser}
                item={item}
                cart={productAtCart}
              />
            );
          })}
        </div>
        <aside className="cart-summary">
          <div className="summary-card">
            <div className="summary-row">
              <span>Товары</span>
              <b>{totalItems}</b>
            </div>
            <div className="summary-row">
              <span>Экономия</span>
              <b>{Math.floor(totalSavings)} руб.</b>
            </div>
            <div className="summary-total">
              <span>К оплате</span>
              <span className="summary-amount">{Math.floor(finishPrice())} руб.</span>
            </div>
            <Button onClick={createUserOrder} width="100%">
              Оформить заказ
            </Button>
            <p className="summary-hint">Нажимая кнопку, вы перейдёте к оформлению заказа.</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export const Cart = styled(CartContainer)`
  width: 100%;
  margin: 0 auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;

  h1 {
    margin-bottom: 0;
  }

  & .no-auth {
    width: 700px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 20px;
    font-weight: bold;
    & p {
      color: var(--grey-color);
      font-size: 16px;
      font-weight: 400;
    }
  }

  & .cart {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 60px;
  }

  & .cart-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  & .cart-summary {
    position: sticky;
    top: 190px;
    align-self: flex-start;
  }

  & .summary-card {
    background: #ffffff;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 20px 45px rgba(15, 23, 42, 0.08);
    border: 1px solid rgba(15, 23, 42, 0.05);
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-width: 300px;
  }

  & .summary-row {
    display: flex;
    justify-content: space-between;
    color: #6b7280;
    font-size: 15px;
  }

  & .summary-total {
    padding: 12px 0 4px;
    border-top: 1px solid rgba(15, 23, 42, 0.07);
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    font-weight: 600;
    color: #111827;
  }

  & .summary-amount {
    font-size: 22px;
    color: var(--main-color);
  }

  & .summary-hint {
    font-size: 13px;
    color: #9ca3af;
    margin: 0;
  }

  & .cart-null {
    width: 100%;
    min-height: 320px;
    background: linear-gradient(135deg, #f8fafc, #eef2ff);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    text-align: center;
    padding: 32px;

    & p {
      font-size: clamp(20px, 3vw, 26px);
      margin: 0;
      color: #374151;
    }
  }

  @media (max-width: 992px) {
    & .cart {
      grid-template-columns: 1fr;
    }

    & .cart-summary {
      position: static;
      width: 100%;
    }
  }

  @media (max-width: 576px) {
    width: min(500px, 100%);
    h1 {
      font-size: 28px;
    }
  }
  @media (max-width: 450px) {
    width: min(390px, 100%);
    margin: 100px auto;

    & .cart {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }
    & .cart-summary {
      position: static;
      width: min(390px, 100%);
    }
    & .no-auth {
      width: min(390px, 100%);
    }
    & .cart-list {
      width: min(390px, 100%);
      margin: 0 auto;
      & img {
        width: min(390px, 100%);
        height: auto;
      }
    }
  }
`;
