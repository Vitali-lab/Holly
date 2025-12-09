

export const calcDiscount = (post) => {
const discountPercent = post.sale; 
const currentPrice = post.price;
const discountedPrice = Math.floor(currentPrice * (1 - discountPercent / 100));
return discountedPrice
}