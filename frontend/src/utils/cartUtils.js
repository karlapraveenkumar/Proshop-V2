export const addDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // calculate the item price
  state.itemsPrice = addDecimal(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  // calculate the shipping price (if order is more than $100 then free shipping else 10$)
  state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10);
  // calculate the tax price
  state.taxPrice = addDecimal(Number(0.15 * state.itemsPrice).toFixed(2));
  // calculate the total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
