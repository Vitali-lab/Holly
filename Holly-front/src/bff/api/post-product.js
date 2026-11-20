import { addProduct } from "../../actions/add-product";

export const postProduct =
  (name, description, price, image, category, season, sizes) =>
  async (dispatch) => {
    console.log(season, "season", category, "category");

    const response = await fetch("http://localhost:3005/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category_id: category,
        images: image,
        name,
        description,
        price,
        sizes,
        rating: { overallRating: 0, users: [] },
        season_id: season,
        sale: null,
      }),
    });
    const products = await response.json();

    dispatch(addProduct(products.data));
  };
