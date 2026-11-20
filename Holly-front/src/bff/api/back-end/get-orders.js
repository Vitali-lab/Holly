import { setOrders } from "../../../actions/set-orders";
import { API_URL } from "../../../constants/api";

export const getOrders = () => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/orders`);
    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }
    const orders = await response.json();

    if (!orders) {
      throw new Error("Заказы не найдены");
    }
    dispatch(setOrders(orders.orders));
  } catch (e) {
    console.error(e);
  }
};
