import { createSlice } from "@reduxjs/toolkit";
import { userRequest } from "../requestMethods";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        total: 0,
        quantity: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;
        },
        replaceCart: (state, action) => {
            state.quantity = action.payload.quantity;
            state.total = action.payload.total;
            state.products = action.payload.products;
        }
    }
});

export const addProductToCart = (product) => async (dispatch, getState) => {
    try {
        // Dispatch the addProduct action to update the cart state
        dispatch(addProduct(product));
        console.log(product);
        const cart = getState().cart;
        const User = getState().user;
        const user1 = User.currentUser;
        if (user1) {
            const res = await userRequest.put(`carts/${user1._id}`, { userId: user1._id, products: cart.products, quantity: cart.quantity, total: cart.total});
        }

    } catch (err) {
        console.error(err);
    }
};

export const { addProduct, replaceCart } = cartSlice.actions;
export default cartSlice.reducer;

