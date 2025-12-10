export const mapProduct = (product) => {
  return {
    id: product._id,
    name: product.name,
    images: product.images || [],
    description: product.description,
    price: product.price,
    sizes: product.sizes,
    rating: product.rating,
    seasonId: product.season_id,
    categoryId: product.category_id,
    sale: product.sale,
    publishedAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  };
};
