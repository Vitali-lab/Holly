import { removeUserLikes } from "../../actions/remove-user-likes";
export const deleteUserLikes = (userId, productId) => async (dispatch) => {
  await fetch(`http://localhost:3005/users/${userId}/favorites/${productId}`, {
    method: "DELETE",
  });

  dispatch(removeUserLikes(productId));
};
