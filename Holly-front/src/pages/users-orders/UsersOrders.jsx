import { useSelector } from 'react-redux';
import { userOrdersSelector } from '../../entities/selectors';
import { useGetCreatedOrdersCount } from '../../shared/hooks/use-get-createt-orders-count';
import { UnprocessedAllOrders } from './components/unprocessedAllOrders';
import { ComplitedAllOrders } from './components/complitedAllOrders';
import styled from 'styled-components';

const UsersOrdersContainer = ({ className }) => {
  const orders = useSelector(userOrdersSelector);
  const { createdOrdersCount } = useGetCreatedOrdersCount();

  const decodingOrderStatus = (order) => {
    if (order.status === 'created') {
      return 'Подтвердить';
    } else if (order.status === 'confirmed') {
      return 'Доставка';
    } else if (order.status === 'delivery') {
      return 'Выполнен';
    } else {
      return 'Выполнен';
    }
  };

  return (
    <div className={className}>
      <h1>Заказы</h1>
      <div className="orders-container">
        <div className="orders-info">
          <p>Новые заказы: {createdOrdersCount()}</p>
          <p>Всего заказов: {orders.length}</p>
        </div>
        <UnprocessedAllOrders orders={orders} decodingOrderStatus={decodingOrderStatus} />
        <ComplitedAllOrders orders={orders} />
      </div>
    </div>
  );
};

export const UsersOrders = styled(UsersOrdersContainer)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
  gap: 10px;
  border-radius: 10px;

  & .orders-info {
    width: 100%;
    color: var(--grey-color);
    font-size: 18px;
    font-weight: 600;
  }
  & .orders-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .order {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    padding: 24px;
    margin-bottom: 32px;
  }
  .completed-order {
    background: #e6e6e69a;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    padding: 24px;
    margin-bottom: 32px;
    & h2 {
      color: #c3c0c0b1;
    }
    & .order-info h2 {
      color: #c3c0c0b1;
    }
    & .order-info p {
      color: #c3c0c0e9;
    }
    & .order-info h3 {
      color: var(--main-color);
    }
  }

  .order h2 {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 16px;
    color: #222;
  }

  .order-status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 12px 16px;
    border-radius: 8px;
    background: #f9fafb;
  }

  .order-status p {
    font-weight: 500;
    color: #555;
  }

  .order-status button {
    background: var(--main-color);
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 8px 16px;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .order-info {
    border-top: 1px solid #eee;
    padding-top: 16px;
  }

  .order-info h2 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 12px;
    color: #333;
  }

  .order-info p {
    margin: 6px 0;
    font-size: 0.95rem;
    color: #444;
  }

  .order-info p span {
    font-weight: 500;
    color: #111;
  }
`;
