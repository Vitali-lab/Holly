export const mapCartProduct = (product) => {
  return {
    id: product._id,
    name: product.name,
    images: product.images,
    description: product.description,
    price: product.price,
    rating: product.rating,
    customId: product.customId,
    size: product.size,
    count: product.count,
    sale: product.sale,
  };
};
