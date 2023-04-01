import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  items: ["Date", "App", "Revenue"],
};

const metricsSelectionSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItem(state, action) {
      const item = action.payload;
      state.items.push(item);
    },
    removeItem(state, action) {
      const item = action.payload;
      state.items = state.items.filter((i) => i !== item);
    },
    updateSelectedItems(state, action) {},
  },
});

export const { addItem, removeItem } = metricsSelectionSlice.actions;

export default metricsSelectionSlice.reducer;
