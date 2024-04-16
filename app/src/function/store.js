import { configureStore } from "@reduxjs/toolkit";
import textSlice from "./textSlice";
import cartSlice from "./cartSlice";

const store = configureStore({
  reducer: {
    textSlice: textSlice,
    cartSlice: cartSlice,
  },
});

export default store;
