import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { allProductsSelector, userSelector } from '../../entities/selectors';

export const useProductAtCart = () => {
  const currentUser = useSelector(userSelector);
  const { allProducts } = useSelector(allProductsSelector);

  const productAtCart = useMemo(() => {
    if (!currentUser || !allProducts || allProducts.length === 0) return [];
    return (currentUser.cart || []).map((item) => {
      const product = allProducts.find((product) => product.id === item.productId);
      return {
        customId: item.customId,
        id: item.productId,
        name: product?.name,
        images: product?.images,
        rating: product?.rating,
        description: product?.description,
        size: item.size,
        price: product?.price,
        count: item.count,
        sizes: product?.sizes,
        sale: product?.sale,
      };
    });
  }, [currentUser, allProducts]);

  const finishPrice = () => {
    return productAtCart.reduce((acc, item) => {
      const count = Number(item.count) || 0;
      const price = Number(item.price) || 0;
      const sale = Number(item.sale) || 0;
      const finalPrice = price * (1 - sale / 100);
      return acc + count * finalPrice;
    }, 0);
  };

  return { productAtCart, finishPrice };
};
