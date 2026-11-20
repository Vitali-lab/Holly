import { useDispatch, useSelector } from "react-redux";
import { deleteUserLikes } from "../bff/api/delete-user-likes";
import { notifySuccess, notifyError } from "../func/notification";
import { addToFavorites } from "../bff/api/back-end/add-to-favorites";
import { useNavigate } from "react-router-dom";

export const useToggleFavorites = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const id = currentUser?.id;

  const isUserLike = (post) => {
    if (!currentUser) {
      return false;
    }
    if (currentUser.favorites.find((item) => item.id === post.id)) {
      return true;
    }
  };

  const toggleFavorites = (post) => {
    if (currentUser) {
      if (currentUser.favorites.find((item) => item.id === post.id)) {
        dispatch(deleteUserLikes(id, post.id));
        notifySuccess(`${post.name} удален из избранного`, () =>
          navigate("/favorites"),
        );
      } else {
        dispatch(addToFavorites(id, post.id));
        notifySuccess(`${post.name} добавлен в избранное`, () =>
          navigate("/favorites"),
        );
      }
    } else {
      notifyError(`Войдите в аккаунт чтобы добавить в избранное`);
    }
  };

  return { toggleFavorites, isUserLike };
};
