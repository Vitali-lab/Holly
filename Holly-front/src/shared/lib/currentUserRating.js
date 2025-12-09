export const currentUserRating = (product, currentUser) => {
  if (product?.rating?.users.find((user) => user.userId === currentUser.id)) {
    return product.rating.users.find((user) => user.userId === currentUser.id).userRating;
  }
};
