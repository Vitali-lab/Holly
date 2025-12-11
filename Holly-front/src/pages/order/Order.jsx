import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, ModalWindow } from '../../shared/ui';
import { emptyCart } from '../../features/user/user';
import { allProductsSelector, userSelector } from '../../entities/selectors';
import { updateProduct } from '../../features/products/products';
import { postOrder } from '../../features/orders/orders';
import { useProductAtCart } from '../../shared/hooks/use-product-at-cart';
import { notifyError } from '../../shared/lib/notification';
import styled from 'styled-components';

const OrderContainer = ({ className }) => {
  const { orderId } = useParams();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [surname, setSurname] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(userSelector);
  const { allProducts } = useSelector(allProductsSelector);
  const { productAtCart, finishPrice } = useProductAtCart();

  const onSubmit = () => {
    const complitedOrder = {
      orderNum: orderId,
      userId: currentUser.id,
      userEmail: email,
      userPhone: phone,
      userName: name,
      userPatronymic: patronymic,
      userSurname: surname,
      status: 'created',
      deliveryMethod: deliveryMethod,
      deliveryAddress: deliveryAddress,
      products: productAtCart,
      sum: finishPrice(),
    };
    if (
      !email ||
      !phone ||
      !name ||
      !patronymic ||
      !surname ||
      !deliveryMethod ||
      !deliveryAddress
    ) {
      notifyError('Заполните все поля и выберите способ доставки');
      return;
    }
    currentUser.cart.forEach((item) => {
      const product = allProducts.find((product) => product.id === item.productId);
      const upProduct = {
        ...product,
        sizes: {
          ...product.sizes,
          [item.size]: product.sizes[item.size] - item.count,
        },
      };
      dispatch(updateProduct({ productId: upProduct.id, updatedProduct: upProduct }));
    });
    dispatch(postOrder(complitedOrder));
    dispatch(emptyCart(currentUser.id));
    // postN8n(complitedOrder)
    setShowModal(true);
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  return (
    <div className={className}>
      {showModal && (
        <ModalWindow setOpenModal={setShowModal}>
          <div className="order-modal">
            <h2>{`Спасибо за заказ!🥳`}</h2>
            <p>за статусом заказа можно следить в вашем профиле</p>
            <p>через 3 секунды вы будете перенаправлены на главную</p>
          </div>
        </ModalWindow>
      )}
      <div className="complite-order">
        <h2> Заказ номер {orderId}</h2>
        <div className="order-inputs">
          <p>Введите данные</p>
          <Input
            value={email}
            placeholder={'email'}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            value={phone}
            placeholder={'Телефон'}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <Input
            value={surname}
            placeholder={'Фамилия'}
            onChange={(e) => {
              setSurname(e.target.value);
            }}
          />
          <Input
            value={name}
            placeholder={'Имя'}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Input
            value={patronymic}
            placeholder={'Отчество'}
            onChange={(e) => {
              setPatronymic(e.target.value);
            }}
          />
        </div>
        <h2>Доставка</h2>
        <div className="delivery">
          <div
            className={
              deliveryMethod === 'Доставка по минску' ? 'delivery-item-active' : 'delivery-item'
            }
            onClick={() => {
              setDeliveryMethod('Доставка по минску');
            }}
          >
            <p>Доставка по Минску</p>
          </div>
          <div
            className={deliveryMethod === 'Европочта' ? 'delivery-item-active' : 'delivery-item'}
            onClick={() => {
              setDeliveryMethod('Европочта');
            }}
          >
            <img
              src={'https://europemall.by/wp-content/uploads/2022/08/logo.91bd432c-895x160.png'}
              alt="euroPost"
            />
          </div>
          <div
            className={deliveryMethod === 'Белпочта' ? 'delivery-item-active' : 'delivery-item'}
            onClick={() => {
              setDeliveryMethod('Белпочта');
            }}
          >
            <img
              src={'https://export.by/upload/company/2017/01/18/13689/50026-1485180237.png'}
              alt="belPost"
            />
          </div>
        </div>
        <div>
          {deliveryMethod === 'Доставка по минску' && <p>Доставка по Минску</p>}
          {deliveryMethod === 'Европочта' && <p>Доставка по Европочте</p>}
          {deliveryMethod === 'Белпочта' && <p>Доставка по Белпочте</p>}
        </div>
        <div>
          <Input
            onChange={(e) => {
              setDeliveryAddress(e.target.value);
            }}
            placeholder={
              deliveryMethod === 'Доставка по минску'
                ? 'Адрес доставки'
                : 'Адрес и номер пункта выдачи '
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
  width: 100%;
  position: relative;
  height: 100vh;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  & .order-inputs {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
  }

  & .complite-order {
    position: absolute;
    top: 100px;
    display: flex;
    width: 700px;
    height: auto;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    box-shadow: var(--box-shadow);
    border-radius: 10px;
    padding: 20px;
  }
  & .delivery {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    gap: 20px;
  }
  & .delivery-item {
    width: 180px;
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border: 1px solid #ccccccff;
    background-color: #dddddd6d;
    border-radius: 10px;
    padding: 10px;
    cursor: pointer;
    img {
      width: 150px;
    }
  }
  & .delivery-item-active {
    width: 180px;
    height: 110px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border: 1px solid #ccccccff;
    box-shadow: 0 0 10px #ccccccff;
    border-radius: 10px;
    padding: 10px;
    img {
      width: 150px;
    }
  }

  @media (max-width: 430px) {
    & .complite-order {
      z-index: 10;
      width: 430px;
      padding: 0;
      padding-bottom: 140px;
    }
    & .delivery {
      flex-direction: column;
    }
  }
  @media (max-width: 390px) {
    & .complite-order {
      z-index: 10;
      width: 390px;
      padding: 0;
      padding-bottom: 140px;
    }
    & .delivery {
      flex-direction: column;
    }
  }
`;
