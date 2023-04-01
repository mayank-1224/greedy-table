import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  startDate: new Date(),
  endDate: new Date(),
};

export const endDateSlice = createSlice({
  name: "dates",
  initialState,
  reducers: {
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
  },
});

export const { setEndDate, setStartDate } = endDateSlice.actions;

export default endDateSlice.reducer;
