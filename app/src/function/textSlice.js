import { createSlice } from "@reduxjs/toolkit";

const textSlice = createSlice({
  name: "filters",
  initialState: "", // Початкове значення тексту

  reducers: {
    setText(state, action) {
      return action.payload; // Замінюємо initialState на переданий текст
    },
    clearText() {
      return ""; // Очищаємо текст, задаючи порожній рядок
    },
  },
});

export const { setText, clearText } = textSlice.actions;

export default textSlice.reducer;
