import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCartRed(state, action) {
      state.items.push(action.payload);
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateCartQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.id === productId);
      if (item) {
        item.quantity = quantity;
      }
    },
    // Додайте дію для завантаження товарів у корзину
    loadCartItems(state, action) {
      state.items = action.payload;
    },
  },
});

export const {
  addToCartRed,
  removeFromCart,
  updateCartQuantity,
  loadCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
