import { addRating } from "../../../actions/add-rating";
import { API_URL } from "../../../constants/api";
import { getProductRating } from "./get-product-rating";

export const editRating = (data) => async (dispatch) => {
  try {
    const { userId, userRating, postId, userComment, date } = data;
    const productRating = (await getProductRating(postId)) || {
      overallRating: 0,
      users: [],
    };
    const totalUsersRating = productRating.users.reduce(
      (acc, user) => acc + user.userRating,
      0,
    );

    if (productRating.users.find((user) => user.userId === userId)) {
      throw new Error("Вы уже оставили оценку");
    }

    const newProductRating =
      (totalUsersRating + userRating) / (productRating.users.length + 1);

    const response = await fetch(`${API_URL}/products/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating: {
          overallRating: Number(newProductRating),
          users: [
            ...productRating.users,
            { userId, userRating, postId, userComment, date },
          ],
        },
      }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const updatedProduct = await response.json();

    dispatch(addRating(updatedProduct.data.rating));
  } catch (e) {
    throw new Error(e.message);
  }
};
