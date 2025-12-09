import { getProductRating } from '../../features/products/products';

export const getAverageProductRating = async (postId, userRating, userId) => {
  const productRating = (await getProductRating(postId)) || {
    overallRating: 0,
    users: [],
  };
  const totalUsersRating = productRating.users.reduce((acc, user) => acc + user.userRating, 0);

  if (productRating.users.find((user) => user.userId === userId)) {
    throw new Error('Вы уже оставили оценку');
  }

  const newProductRating =
    (totalUsersRating + Number(userRating)) / (Number(productRating.users.length) + 1);

  return { newProductRating, productRating };
};
