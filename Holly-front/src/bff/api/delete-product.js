import { removeProduct } from "../../actions/remove-product";
export const deleteProduct = (id) => async (dispatch) => {
  await fetch(`http://localhost:3005/products/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  dispatch(removeProduct(id));
};
