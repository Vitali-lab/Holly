import { useDispatch, useSelector } from 'react-redux';
import { acSetCart } from '../../features/user/userSlice';

export const useMapCart = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  const cart = (currentUser.cart || []).map((item) => {
    const product = products.find((product) => product.id === item.productId);
    return {
      id: item.customId,
      name: product?.name,
      images: product?.images,
      rating: product?.rating,
      description: product?.description,
      size: item.size,
      price: product?.price,
      count: item.count,
      sizes: product?.sizes,
    };
  });

  dispatch(acSetCart(cart));

  return { cart };
};
