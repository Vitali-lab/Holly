import { setUserOrders } from "../../actions/set-user-orders";

export const getUserOrders = (id) => async (dispatch) => {
  const response = await fetch(`http://localhost:3005/orders`);
  const orders = await response.json();

  const userOrders = orders.orders.filter((order) => order.userId === id);

  dispatch(setUserOrders(userOrders));
};
