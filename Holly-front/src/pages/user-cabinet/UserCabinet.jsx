import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "../../components/icon/Icon";
import { Button } from "../../components/button/Button";
import { getUserOrders } from "../../bff/api/get-user-orders";
import { correctDate } from "../../utils/correctDate";
import { userOrdersSelector, userSelector } from "../../selectors";
import { pluralize } from "../../utils/pluralize";

const UserCabinetContainer = ({ className }) => {
  const currentUser = useSelector(userSelector);
  const userOrders = useSelector(userOrdersSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ordersStatus = {
    created: "Создан",
    confirmed: "Подтверждён",
    delivery: "Доставка",
    completed: "Выполнен",
  };

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(getUserOrders(currentUser.id));
    }
  }, [dispatch, currentUser?.id]);

  if (!currentUser) {
    return (
      <div className={className}>
        <header className="cabinet-header">
          <p className="eyebrow">Личный кабинет</p>
          <h1>Сначала войдите</h1>
        </header>
        <div className="empty">
          <p>После входа здесь появятся ваши заказы и избранные вещи.</p>
          <Button width="260px" onClick={() => navigate("/catalog")}>
            Перейти в каталог
          </Button>
        </div>
      </div>
    );
  }

  const cartCount = (currentUser.cart || []).length;
  const favoritesCount = (currentUser.favorites || []).length;

  return (
    <div className={className}>
      <header className="cabinet-header">
        <p className="eyebrow">Личный кабинет</p>
        <h1>Здравствуйте, {currentUser.name}</h1>
      </header>

      <div className="profile">
        <div className="profile-main">
          <span className="profile-avatar">{currentUser.name.slice(0, 1)}</span>
          <div>
            <p className="profile-name">{currentUser.name}</p>
            <p className="profile-email">{currentUser.email}</p>
          </div>
        </div>

        <div className="profile-links">
          <button type="button" onClick={() => navigate("/favorites")}>
            <Icon id="heart-o" size="16" color="currentColor" />
            <span>Избранное</span>
            <b>{favoritesCount}</b>
          </button>
          <button type="button" onClick={() => navigate("/cart")}>
            <Icon id="shopping-bag" size="16" color="currentColor" />
            <span>Корзина</span>
            <b>{cartCount}</b>
          </button>
          <button type="button" onClick={() => navigate("/catalog")}>
            <Icon id="search" size="16" color="currentColor" />
            <span>Каталог</span>
            <b>→</b>
          </button>
        </div>
      </div>

      <section className="orders">
        <div className="orders-header">
          <h2>Ваши заказы</h2>
          <span>
            {userOrders.length}{" "}
            {pluralize(userOrders.length, ["заказ", "заказа", "заказов"])}
          </span>
        </div>

        {userOrders.length > 0 ? (
          <div className="orders-list">
            {userOrders.map((item) => (
              <article key={item.orderNum} className="order">
                <div className="order-number">
                  <p>Заказ</p>
                  <b>№ {item.orderNum}</b>
                </div>
                <div className="order-info">
                  <p>Дата</p>
                  <b>{correctDate(item.createdAt)}</b>
                </div>
                <div className="order-info">
                  <p>Статус</p>
                  <span className={`status status-${item.status}`}>
                    {ordersStatus[item.status] || item.status}
                  </span>
                </div>
                <div className="order-total">
                  <p>Сумма</p>
                  <b>{item.sum ? `${item.sum} руб.` : "—"}</b>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty">
            <p>У вас пока нет заказов. Самое время это исправить.</p>
            <Button width="260px" onClick={() => navigate("/catalog")}>
              Смотреть каталог
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};

export const UserCabinet = styled(UserCabinetContainer)`
  width: var(--page-width);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: clamp(28px, 4vw, 48px);

  & .cabinet-header {
    padding-bottom: 24px;
    border-bottom: 1px solid var(--line-strong);

    & .eyebrow {
      margin-bottom: 14px;
    }

    & h1 {
      margin: 0;
      font-size: clamp(32px, 4vw, 52px);
      line-height: 1.1;
    }
  }

  & .profile {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
    gap: clamp(24px, 4vw, 56px);
    align-items: center;
    padding: clamp(24px, 3vw, 36px);
    background-color: var(--paper-deep);
  }

  & .profile-main {
    display: flex;
    align-items: center;
    gap: 18px;
  }

  & .profile-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    border: 1px solid var(--ink);
    border-radius: 50%;
    font-family: var(--font-display);
    font-size: 26px;
  }

  & .profile-name {
    margin: 0;
    color: var(--ink);
    font-family: var(--font-display);
    font-size: clamp(20px, 2.2vw, 26px);
  }

  & .profile-email {
    margin: 4px 0 0;
    color: var(--grey-color);
    font-size: 12px;
  }

  & .profile-links {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;

    & button {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      padding: 16px;
      border: 1px solid var(--line-strong);
      background-color: transparent;
      color: var(--ink);
      text-align: left;
      cursor: pointer;
      transition:
        border-color 0.2s ease,
        background-color 0.2s ease;

      &:hover {
        border-color: var(--ink);
        background-color: var(--surface);
      }

      & span {
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
      }

      & b {
        color: var(--grey-color);
        font-size: 12px;
        font-weight: 500;
      }
    }
  }

  & .orders {
    display: flex;
    flex-direction: column;
  }

  & .orders-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 16px;
    padding-bottom: 18px;
    border-bottom: 1px solid var(--line-strong);

    & h2 {
      margin: 0;
      font-size: clamp(24px, 2.6vw, 32px);
    }

    & span {
      color: var(--grey-color);
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.16em;
      text-transform: uppercase;
    }
  }

  & .orders-list {
    display: flex;
    flex-direction: column;
  }

  & .order {
    display: grid;
    grid-template-columns: 1.2fr 1fr 0.9fr 0.8fr;
    gap: 20px;
    align-items: center;
    padding: 22px 0;
    border-bottom: 1px solid var(--line);

    & p {
      margin: 0 0 4px;
      color: var(--grey-color);
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }

    & b {
      color: var(--ink);
      font-size: 14px;
      font-weight: 500;
    }
  }

  & .order-number b {
    font-family: var(--font-display);
    font-size: 19px;
    font-weight: 400;
  }

  & .order-total {
    text-align: right;
  }

  & .status {
    display: inline-flex;
    padding: 5px 10px;
    border: 1px solid var(--line-strong);
    color: var(--ink-soft);
    font-size: 10px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  & .status-completed {
    border-color: var(--ink);
    color: var(--ink);
  }

  & .status-created {
    border-color: var(--red-color);
    color: var(--red-color);
  }

  & .empty {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    margin-top: 24px;
    padding: clamp(28px, 4vw, 52px);
    background-color: var(--paper-deep);
  }

  & .empty p {
    max-width: 460px;
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(20px, 2.4vw, 28px);
    line-height: 1.3;
    color: var(--ink);
  }

  @media (max-width: 992px) {
    & .profile {
      grid-template-columns: 1fr;
      align-items: stretch;
    }

    & .order {
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    & .order-total {
      text-align: left;
    }
  }

  @media (max-width: 576px) {
    & .profile-links {
      grid-template-columns: 1fr;
    }

    & .order {
      grid-template-columns: 1fr;
      gap: 12px;
    }
  }
`;
