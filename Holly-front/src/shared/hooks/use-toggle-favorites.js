import { useDispatch, useSelector } from 'react-redux';
import { notifySuccess, notifyError } from '../lib/notification';
import { addToFavorites, deleteFromFavorites } from '../../features/user/user';
import { useNavigate } from 'react-router-dom';
import { userSelector } from '../../entities/selectors';

export const useToggleFavorites = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(userSelector);
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
        dispatch(deleteFromFavorites({ userId: id, productId: post.id }));
        notifySuccess(`${post.name} удален из избранного`, () => navigate('/favorites'));
      } else {
        dispatch(addToFavorites({ userId: id, productId: post.id }));
        notifySuccess(`${post.name} добавлен в избранное`, () => navigate('/favorites'));
      }
    } else {
      notifyError(`Войдите в аккаунт чтобы добавить в избранное`);
    }
  };

  return { toggleFavorites, isUserLike };
};
