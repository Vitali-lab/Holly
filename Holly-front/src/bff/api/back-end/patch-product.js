import { updateProduct } from "../../../actions/update-product";
import { API_URL } from "../../../constants/api";

export const patchProduct = (id, upadtedProduct) => async (dispatch) => {
  try {
    const { name, description, price, image, sizes, categoty, season, sale } =
      upadtedProduct;

    const product = await fetch(`${API_URL}/products/${id}`).then((res) =>
      res.json(),
    );

    if (!product) {
      throw new Error("Товар не найден");
    }

    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...product,
        name: name || product.name,
        description: description || product.description,
        price: price || product.price,
        images: image || product.images,
        sizes: sizes || product.sizes,
        category_id: categoty || product.category_id,
        season_id: season || product.season_id,
        sale: sale === "" ? null : sale || product.sale,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }

    const updated = await response.json();

    if (!updated) {
      throw new Error("Товар не найден");
    }

    dispatch(updateProduct(id, updated.data));
  } catch (e) {
    throw new Error(e.message);
  }
};
