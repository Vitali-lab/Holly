import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserSelector, ordersSelector } from '../../entities/selectors';
import { fetchOrders } from '../../features/orders/orders';

export const useGetCreatedOrdersCount = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(currentUserSelector);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const orders = useSelector(ordersSelector);
  const createdOrdersCount = () => {
    return orders.filter((order) => order.status === 'created').length;
  };
  const userOrders = orders.filter((order) => order.userId === currentUser?.id);

  const createdUserOrdersCount = () => {
    const createdUserOrdersCount = userOrders.filter((order) => order.status === 'created').length;

    return createdUserOrdersCount;
  };

  return { createdOrdersCount, createdUserOrdersCount };
};
