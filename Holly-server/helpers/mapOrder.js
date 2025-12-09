export const mapOrder = (order) => {
  return {
    id: order._id,
    orderNum: order.orderNum,
    userId: order.userId,
    userEmail: order.userEmail,
    userPhone: order.userPhone,
    userName: order.userName,
    userPatronymic: order.userPatronymic,
    userSurname: order.userSurname,
    deliveryMethod: order.deliveryMethod,
    deliveryAddress: order.deliveryAddress,
    products: order.products,
    status: order.status,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    sum: order.sum,
  };
};
