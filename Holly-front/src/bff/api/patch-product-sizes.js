import { getProduct } from "./get-product";

export const updateProductSize = async (products) => {
  const updates = [];

  for (const product of products) {
    const { id, size, count } = {
      id: product.id.split("-")[0],
      size: product.size,
      count: product.count,
    };

    const productData = await getProduct(id);

    const newSizeValue = Number(productData.sizes[size]) - Number(count);

    const newSizes = {
      ...productData.sizes,
      [size]: String(newSizeValue),
    };

    const response = await fetch(`http://localhost:4000/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sizes: newSizes }),
    });

    const updated = await response.json();
    updates.push(updated);
  }

  return updates;
};
