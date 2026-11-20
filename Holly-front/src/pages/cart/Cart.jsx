import { Button } from "../../components/button/Button";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../actions/create-order";
import { CartItem } from "./components/CartItem";
import { useEffect, useMemo } from "react";
import Loader from "../../components/loader/Loader";
import { scrollTop } from "../../utils/scrollTop";
import { productsSelector, userSelector } from "../../selectors";
import { pluralize } from "../../utils/pluralize";

const CartContainer = ({ className }) => {
  const currentUser = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector(productsSelector);

  useEffect(() => {
    scrollTop();
  }, []);

  const cartAndProduct = useMemo(() => {
    if (!currentUser || !products || products.length === 0) return [];
    return (currentUser.cart || []).map((item) => {
      const product = products.find((product) => product.id === item.productId);
      return {
        id: item.customId,
        name: product?.name,
        images: product?.images,
        rating: product?.rating,
        description: product?.description,
        size: item.size,
        price: product?.price,
        count: item.count,
        sizes: product?.sizes,
        sale: product?.sale,
      };
    });
  }, [currentUser, products]);

  if (!currentUser) {
    return (
      <div className={className}>
        <header className="cart-header">
          <p className="eyebrow">Заказ</p>
          <h1>Корзина</h1>
        </header>
        <div className="cart-null">
          <p>Войдите в аккаунт, чтобы увидеть корзину.</p>
          <Button
            onClick={() => {
              navigate("/catalog");
            }}
            width="300px"
          >
            Перейти в каталог
          </Button>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return <Loader />;
  }

  const postInServer = (cart) => {
    const orderNum = new Date().getTime();
    const post = cart.reduce((acc, item) => {
      acc.push({
        id: item.id,
        name: item.name,
        size: item.size,
        price: item.price,
        count: item.count,
        sale: item.sale,
        finishPrice: Math.floor(finishPrice()),
      });
      return acc;
    }, []);

    dispatch(createOrder(orderNum, currentUser, post));
    navigate(`/cart/order/${orderNum}`);
  };

  const finishPrice = () => {
    return cartAndProduct.reduce((acc, item) => {
      const count = Number(item.count) || 0;
      const price = Number(item.price) || 0;
      const sale = Number(item.sale) || 0;
      const finalPrice = price * (1 - sale / 100);
      return acc + count * finalPrice;
    }, 0);
  };

  const totalItems = cartAndProduct.reduce(
    (acc, item) => acc + (Number(item.count) || 0),
    0,
  );

  const totalSavings = cartAndProduct.reduce((acc, item) => {
    if (!item.sale) return acc;
    const count = Number(item.count) || 0;
    const price = Number(item.price) || 0;
    const sale = Number(item.sale) || 0;
    const savingsPerItem = price * (sale / 100);
    return acc + count * savingsPerItem;
  }, 0);

  return (
    <div className={className}>
      <header className="cart-header">
        <div>
          <p className="eyebrow">Заказ</p>
          <h1>Корзина</h1>
        </div>
        <div className="cart-header-meta">
          <span>
            {totalItems} {pluralize(totalItems, ["товар", "товара", "товаров"])}
          </span>
          <button type="button" onClick={() => navigate("/catalog")}>
            Продолжить покупки
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </header>
      {currentUser ? (
        <div className="cart">
          <div className="cart-list">
            {cartAndProduct.length === 0 ? (
              <div className="cart-null">
                <p>Корзина пуста</p>
                <Button
                  onClick={() => {
                    navigate("/catalog");
                  }}
                  width={"300"}
                >
                  Вперед за покупками!
                </Button>
              </div>
            ) : (
              cartAndProduct.map((item) => {
                return (
                  <CartItem
                    key={item.id}
                    currentUser={currentUser}
                    item={item}
                    cart={cartAndProduct}
                  />
                );
              })
            )}
          </div>
          {cartAndProduct.length > 0 && (
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
                <div className="summary-row">
                  <span>Доставка</span>
                  <b>{finishPrice() >= 200 ? "Бесплатно" : "по тарифу"}</b>
                </div>
                <div className="summary-total">
                  <span>К оплате</span>
                  <span className="summary-amount">
                    {Math.floor(finishPrice())} руб.
                  </span>
                </div>
                <Button
                  onClick={() => {
                    postInServer(cartAndProduct);
                  }}
                  width="100%"
                >
                  Оформить заказ
                </Button>
                <p className="summary-hint">
                  Нажимая кнопку, вы перейдёте к оформлению заказа.
                </p>
              </div>
            </aside>
          )}
        </div>
      ) : (
        <div className="cart-null">
          <p>Войдите в аккаунт, чтобы увидеть корзину.</p>
          <Button
            onClick={() => {
              navigate("/catalog");
            }}
            width="300px"
          >
            Перейти в каталог
          </Button>
        </div>
      )}
    </div>
  );
};

export const Cart = styled(CartContainer)`
  width: var(--page-width);
  margin: 0 auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: clamp(24px, 3vw, 40px);

  & .cart-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--line-strong);

    & .eyebrow {
      margin-bottom: 14px;
    }

    & h1 {
      margin: 0;
      font-size: clamp(38px, 4.6vw, 62px);
      line-height: 1;
    }
  }

  & .cart-header-meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;

    & span {
      color: var(--grey-color);
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.16em;
      text-transform: uppercase;
    }

    & button {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 0 0 4px;
      border: none;
      border-bottom: 1px solid var(--ink);
      background: none;
      color: var(--ink);
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      cursor: pointer;
      transition: gap 0.2s ease;

      &:hover {
        gap: 14px;
      }
    }
  }

  & .cart {
    width: 100%;
    display: grid;
    grid-template-columns: minmax(0, 1fr) 340px;
    justify-content: space-between;
    align-items: start;
    gap: clamp(32px, 4vw, 64px);
  }

  & .cart-list {
    display: flex;
    flex-direction: column;
    border-top: 1px solid var(--line);
  }

  & .cart-summary {
    position: sticky;
    top: calc(var(--header-offset) + 24px);
    align-self: flex-start;
  }

  & .summary-card {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 28px;
    background-color: var(--paper-deep);
  }

  & .summary-row {
    display: flex;
    justify-content: space-between;
    color: var(--ink-soft);
    font-size: 13px;
  }

  & .summary-total {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 16px 0 4px;
    border-top: 1px solid var(--line-strong);
    font-size: 14px;
    font-weight: 600;
    color: var(--ink);
  }

  & .summary-amount {
    font-family: var(--font-display);
    font-size: 28px;
    font-weight: 400;
    color: var(--ink);
  }

  & .summary-hint {
    font-size: 11px;
    color: var(--grey-color);
    margin: 0;
    line-height: 1.6;
  }

  & .cart-null {
    grid-column: 1 / -1;
    width: 100%;
    min-height: 320px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 18px;
    padding: clamp(32px, 5vw, 64px);
    background-color: var(--paper-deep);
    text-align: left;

    & p {
      max-width: 420px;
      margin: 0;
      font-family: var(--font-display);
      font-size: clamp(20px, 2.6vw, 30px);
      line-height: 1.25;
      color: var(--ink);
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
    & .cart-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 14px;
    }

    & .cart-header-meta {
      align-items: flex-start;
    }

    & .summary-card {
      padding: 20px;
    }
  }
`;
