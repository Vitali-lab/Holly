import { setProduct } from "../../actions/set-product";

export const getProduct = (id) => async (dispatch) => {
  const res = await fetch(`http://localhost:3005/products/${id}`);
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const product = await res.json();

  console.log(product);

  dispatch(setProduct(product.data));
};
