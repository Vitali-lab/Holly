import { showCorretDate } from '../../../shared/utils/showCorretDate';
import { ORDER_STATUS } from '../../../shared/config/appInfo';
import { useDispatch } from 'react-redux';
import { updateOrderStatus } from '../../../features/orders/orders';
import styled from 'styled-components';

const UnprocessedAllOrdersContainer = ({ className, orders, decodingOrderStatus }) => {
  const dispatch = useDispatch();

  const unprocessedOrders = () => {
    return orders.filter(
      (order) =>
        order.status === 'created' || order.status === 'confirmed' || order.status === 'delivery'
    );
  };
  const nextStatus = (order) => {
    if (order.status === 'created') {
      return 'confirmed';
    } else if (order.status === 'confirmed') {
      return 'delivery';
    } else if (order.status === 'delivery') {
      return 'completed';
    }
  };
  const updatedOrderStatus = (payload) => {
    dispatch(updateOrderStatus(payload));
  };

  return (
    <div className={className}>
      <h2>Заказы в работе : {unprocessedOrders().length}</h2>
      <div className="orders">
        {unprocessedOrders().map((order) => {
          return (
            <div className="order" key={order.id}>
              <h2>Номер заказа: {order.orderNum}</h2>
              <div className="order-status">
                <p>Статус: {ORDER_STATUS[order.status]}</p>
                <button
                  disabled={order.status === 'completed'}
                  onClick={() => updatedOrderStatus({ id: order.id, status: nextStatus(order) })}
                >
                  {decodingOrderStatus(order)}
                </button>
              </div>
              <div className="order-info">
                <h2>Информация о заказе</h2>
                <p>Имя: {order.userName}</p>
                <p>Почта: {order.userEmail}</p>
                <p>Телефон: {order.userPhone}</p>
                <p>Способ доставки: {order.deliveryMethod}</p>
                <p>Адрес доставки: {order.deliveryAddress}</p>
                <p>Дата создания: {showCorretDate(order.createdAt)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const UnprocessedAllOrders = styled(UnprocessedAllOrdersContainer)`
  width: 100%;
  .orders {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 40px;
    justify-content: start;
    align-items: center;
  }
`;
