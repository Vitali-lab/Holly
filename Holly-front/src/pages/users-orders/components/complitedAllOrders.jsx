import { showCorretDate } from '../../../shared/utils/showCorretDate';
import { ORDER_STATUS } from '../../../shared/config/appInfo';
import styled from 'styled-components';

const ComplitedAllOrdersContainer = ({ className, orders }) => {
  const complitedOrders = () => {
    return orders.filter((order) => order.status === 'completed');
  };

  return (
    <div className={className}>
      <h2>Выполненные заказы: {complitedOrders().length}</h2>
      <div className="completed-orders">
        {complitedOrders().map((order) => {
          return (
            <div className="completed-order" key={order.id}>
              <h2>Номер заказа: {order.orderNum}</h2>
              <div className="order-info">
                <h2>Информация о заказе</h2>
                <p>Имя: {order.userName}</p>
                <p>Почта: {order.userEmail}</p>
                <p>Телефон: {order.userPhone}</p>
                <p>Способ доставки: {order.deliveryMethod}</p>
                <p>Адрес доставки: {order.deliveryAddress}</p>
                <p>Дата создания: {showCorretDate(order.createdAt)}</p>
                <h3>Статус: {ORDER_STATUS[order.status]}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const ComplitedAllOrders = styled(ComplitedAllOrdersContainer)`
  min-width: 1200px;
  width: 100%;
  .orders {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 40px;
    justify-content: start;
    align-items: center;
  }
  .completed-order {
    background: #e6e6e69a;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    padding: 24px;
    margin-bottom: 32px;
    transition: all 0.3s ease-in-out;
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
    &:hover {
      transform: var(--transform);
      & h2 {
        color: var(--black-color);
      }
      & p {
        color: var(--back-color);
      }
    }
  }
`;
