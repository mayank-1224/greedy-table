import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  durationPickerOpen: false,
  settingsOpen: false,
  fetchAPI: false,
};

export const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    setDurationPicker: (state, action) => {
      state.durationPickerOpen = action.payload;
    },
    setSettings: (state, action) => {
      state.settingsOpen = action.payload;
    },
    setFetchAPI: (state, action) => {
      state.fetchAPI = action.payload;
    },
  },
});

export const { setDurationPicker, setSettings, setFetchAPI } =
  miscSlice.actions;

export default miscSlice.reducer;
