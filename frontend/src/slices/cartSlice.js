import { createSlice } from "@reduxjs/toolkit";

const addDecimal = (num) =>{
    return (Math.round(num * 100) / 100).toFixed(2);
}

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] };

const cartSlice = createSlice({
    name: "cart",
    initialState : {
        cartItems : initialState.cartItems,
        itemsPrice: 0,
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: 0
    },
    reducers : {
        addToCart: (state,action)=>{
            const item = action.payload;
            const existItem = state.cartItems.find(x=> x._id === item._id);
            if(existItem){
                state.cartItems = state.cartItems.map(x=> x._id === existItem._id ? item : x);
            }else{
                state.cartItems = [...state.cartItems, item];
            }

            // calculate the item price
            state.itemsPrice = addDecimal(state.cartItems.reduce((acc,item)=> acc + item.price * item.qty, 0));
            // calculate the shipping price (if order is more than $100 then free shipping else 10$)
            state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10);
            // calculate the tax price
            state.taxPrice = addDecimal(Number((0.15 * state.itemsPrice)).toFixed(2));
            // calculate the total price
            state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2);

            localStorage.setItem("cart", JSON.stringify(state));
        }
    }
});

export const {addToCart} = cartSlice.actions;
export default cartSlice.reducer;