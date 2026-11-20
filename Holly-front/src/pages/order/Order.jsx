import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Button, Input } from "../../components";
import { postN8n } from "../../bff/api/back-end/post-n8n";
import { useNavigate } from "react-router-dom";
import { ModalWindow } from "../../components/modal-window/ModalWindow";
import { useDispatch } from "react-redux";
import { clearCart } from "../../actions/clear-cart";
import { postOrders } from "../../bff/api/post-orders";
import { updateProductSize } from "../../bff/api/patch-product-sizes";
import styled from "styled-components";
import { emptyCart } from "../../bff/api/back-end/clear-cart";
import { del, p } from "framer-motion/client";
import {
  ordersSelector,
  productsSelector,
  userSelector,
} from "../../selectors";

const OrderContainer = ({ className }) => {
  const { orderId } = useParams();
  const order = useSelector(ordersSelector);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [surname, setSurname] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(order);

  const currentUser = useSelector(userSelector);
  const products = useSelector(productsSelector);

  const onSubmit = () => {
    const complitedOrder = {
      orderNum: order.orderNum,
      userId: currentUser.id,
      userEmail: email,
      userPhone: phone,
      userName: name,
      userPatronymic: patronymic,
      userSurname: surname,
      status: "created",
      deliveryMethod: deliveryMethod,
      deliveryAddress: deliveryAddress,
      products: order.products,
    };
    postOrders(complitedOrder);
    postN8n(complitedOrder)
      .then(() => {
        setShowModal(true);
        setError("");
        updateProductSize(order.products);
        setTimeout(() => {
          navigate("/");
          dispatch(emptyCart(currentUser.id));
        }, 5000);
      })
      .catch((err) => {
        setShowModal(true);
        setError(err.message);
      });
  };

  return (
    <div className={className}>
      {showModal && (
        <ModalWindow
          text={error}
          onClose={() => {
            setShowModal(false);
          }}
        >
          {error ? <p>{error}</p> : <p>Заказ успешно отправлен</p>}
        </ModalWindow>
      )}
      <div className="complite-order">
        <h2> Заказ номер {orderId}</h2>
        <div>
          <p>Проверьте данные</p>
          <Input
            value={email}
            text={"email"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            value={phone}
            text={"Телефон"}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <Input
            value={surname}
            text={"Фамилия"}
            onChange={(e) => {
              setSurname(e.target.value);
            }}
          />
          <Input
            value={name}
            text={"Имя"}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Input
            value={patronymic}
            text={"Отчество"}
            onChange={(e) => {
              setPatronymic(e.target.value);
            }}
          />
        </div>
        <h2>Доставка</h2>
        <div className="delivery">
          <div
            className={
              deliveryMethod === "Доставка по минску"
                ? "delivery-item-active"
                : "delivery-item"
            }
            onClick={() => {
              setDeliveryMethod("Доставка по минску");
            }}
          >
            <p>Доставка по Минску</p>
          </div>
          <div
            className={
              deliveryMethod === "Европочта"
                ? "delivery-item-active"
                : "delivery-item"
            }
            onClick={() => {
              setDeliveryMethod("Европочта");
            }}
          >
            <p>Европочта</p>
          </div>
          <div
            className={
              deliveryMethod === "Белпочта"
                ? "delivery-item-active"
                : "delivery-item"
            }
            onClick={() => {
              setDeliveryMethod("Белпочта");
            }}
          >
            <p>Белпочта</p>
          </div>
        </div>
        <div>
          {deliveryMethod === "Доставка по минску" && <p>Доставка по Минску</p>}
          {deliveryMethod === "Европочта" && <p>Доставка по Европочте</p>}
          {deliveryMethod === "Белпочта" && <p>Доставка по Белпочте</p>}
        </div>
        <div>
          <Input
            onChange={(e) => {
              setDeliveryAddress(e.target.value);
            }}
            text={
              deliveryMethod === "Доставка по минску"
                ? "Адрес доставки"
                : "Адрес пункта выдачи"
            }
          />
        </div>
        <Button onClick={onSubmit} width="200px">
          Заказать
        </Button>
      </div>
    </div>
  );
};

export const Order = styled(OrderContainer)`
  width: var(--page-width);
  margin: 0 auto;
  padding: 0;

  & .complite-order {
    display: flex;
    width: min(820px, 100%);
    margin: 0 auto;
    flex-direction: column;
    align-items: stretch;
    gap: 24px;
    padding: clamp(24px, 4vw, 48px);
    border: 1px solid var(--line);
    background-color: var(--surface);

    & > div {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 18px 24px;

      & p {
        grid-column: 1 / -1;
        margin: 0;
        color: var(--grey-color);
        font-size: 13px;
      }
    }

    & h2 {
      margin: 0;
      font-size: clamp(22px, 2.4vw, 30px);
    }
  }

  & .delivery {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
  }

  & .delivery-item,
  & .delivery-item-active {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 10px;
    border: 1px solid var(--line-strong);
    font-size: 12px;
    text-align: center;
    cursor: pointer;
    transition:
      border-color 0.2s ease,
      background-color 0.2s ease;

    & p {
      margin: 0;
      color: var(--ink);
      font-size: 12px;
    }

    &:hover {
      border-color: var(--ink);
    }
  }

  & .delivery-item-active {
    border-color: var(--ink);
    background-color: var(--ink);

    & p {
      color: var(--paper);
    }
  }

  @media (max-width: 768px) {
    & .complite-order > div {
      grid-template-columns: 1fr;
    }

    & .delivery {
      grid-template-columns: 1fr;
    }
  }
`;
