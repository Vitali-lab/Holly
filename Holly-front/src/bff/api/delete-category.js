import { removeCategory } from "../../actions/remove-category";
export const deleteCategory = (id) => async (dispatch) => {
  await fetch(`http://localhost:3005/categories/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  dispatch(removeCategory(id));
};
