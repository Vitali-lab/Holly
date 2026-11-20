import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getOrders } from "../../../../bff/api/back-end/get-orders";
import { useDispatch } from "react-redux";
import { Icon } from "../../../../components/icon/Icon";
import { userOrdersSelector } from "../../../../selectors";
import styled from "styled-components";

const UsersOrdersContainer = ({ className }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const orders = useSelector(userOrdersSelector);

  console.log(orders, "orders");

  return (
    <div className={className}>
      <div className="title">
        <h2>Заказы пользователей</h2>
      </div>
      <table className="orders-table">
        <tr>
          <th>Номер заказа</th>
          <th>Статус</th>
          <th>Имя</th>
          <th>Почта</th>
          <th>Телефон</th>
          <th>Способ доставки</th>
          <th>Адрес доставки</th>
          <th>Дата создания</th>
        </tr>
        {orders.map((order) => {
          return (
            <tr>
              <td>{order.orderNum}</td>
              <td>
                {order.status === "created" ? "Создан" : "Выполнен"}
                <Icon
                  id={order.status === "created" ? "clock-o" : "check"}
                  color={order.status === "created" ? "#c0c0c0" : "green"}
                />
              </td>
              <td>{order.userName}</td>
              <td>{order.userEmail}</td>
              <td>{order.userPhone}</td>
              <td>{order.deliveryMethod}</td>
              <td>{order.deliveryAddress}</td>
              <td>
                {order.createdAt.split("T")[0].split("-").reverse().join(".")}
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export const UsersOrders = styled(UsersOrdersContainer)`
  width: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 10px;
  border-radius: 10px;

  & .orders-table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #ccccccff;
    margin-top: 30px;
    & th {
      padding: 40px;
      border: 1px solid #ccccccff;
    }
    & td {
      padding: 10px;
      border: 1px solid #ccccccff;
      text-align: center;
    }
  }
`;
