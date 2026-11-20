export const postOrders = (order) =>
  fetch("http://localhost:3005/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
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
    }),
  })
    .then((res) => res.json())
    .then((res) => console.log(res, "order"));
