import { updateCartItemCount } from "../../../actions/update-cart-item-count";
import { API_URL } from "../../../constants/api";

export const putCartItemCount = (userId, itemId, count) => async (dispatch) => {
  console.log(userId, itemId, count);

  await fetch(`${API_URL}/users/${userId}/cart/${itemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ count }),
  }).then((res) => res.json());

  dispatch(updateCartItemCount(itemId, count));
};
