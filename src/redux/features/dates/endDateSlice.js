import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: new Date(),
};

export const endDateSlice = createSlice({
  name: "endDate",
  initialState,
  reducers: {
    setEndDate: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setEndDate } = endDateSlice.actions;

export default endDateSlice.reducer;
