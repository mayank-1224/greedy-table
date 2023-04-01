import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    { id: "date", name: "Date", selected: true },
    { id: "appName", name: "App", selected: true },
    { id: "clicks", name: "Clicks", selected: true },
    { id: "requests", name: "Ad Requests", selected: true },
    { id: "responses", name: "Ad Response", selected: true },
    { id: "impressions", name: "Impression", selected: true },
    { id: "revenue", name: "Revenue", selected: true },
    { id: "fillRate", name: "Fill Rate", selected: true },
    { id: "ctr", name: "CTR", selected: true },
  ],
  finalItems: [
    { id: "date", name: "Date", selected: true },
    { id: "appName", name: "App", selected: true },
    { id: "clicks", name: "Clicks", selected: true },
    { id: "requests", name: "Ad Requests", selected: true },
    { id: "responses", name: "Ad Response", selected: true },
    { id: "impressions", name: "Impression", selected: true },
    { id: "revenue", name: "Revenue", selected: true },
    { id: "fillRate", name: "Fill Rate", selected: true },
    { id: "ctr", name: "CTR", selected: true },
  ],
};

const metricsOrderSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    moveItem(state, action) {
      const { dragIndex, hoverIndex } = action.payload;
      const items = [...state.items];
      const dragItem = items[dragIndex];
      items.splice(dragIndex, 1);
      items.splice(hoverIndex, 0, dragItem);
      state.items = items;
    },
    addSelectedItem(state, action) {
      state.items = state.items.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            selected: true,
          };
        }
        return item;
      });
    },
    removeSelectedItem(state, action) {
      state.items = state.items.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            selected: false,
          };
        }
        return item;
      });
    },
    copyToFinalItems(state) {
      state.finalItems = state.items;
    },
    resetSettings(state) {
      state.items = state.finalItems;
    },
  },
});

export const {
  moveItem,
  addSelectedItem,
  removeSelectedItem,
  copyToFinalItems,
  resetSettings,
} = metricsOrderSlice.actions;

export default metricsOrderSlice.reducer;
