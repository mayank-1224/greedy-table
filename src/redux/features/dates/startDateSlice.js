import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: new Date(),
};

export const startDateSlice = createSlice({
  name: "startDate",
  initialState,
  reducers: {
    setStartDate: (state, action) => {
      state.value = action.payload;
      console.log("Start Date: ", state.value);
    },
  },
});

export const { setStartDate } = startDateSlice.actions;

export default startDateSlice.reducer;
