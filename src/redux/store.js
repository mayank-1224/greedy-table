import { configureStore } from "@reduxjs/toolkit";
import endDateReducer from "./features/dates/endDateSlice";
import metricsOrderReducer from "./features/metrics/metricsOrderSlice";
import fetchSlice from "./features/tableData/fetchDataSlice";
import miscSlice from "./features/miscSlice";

export const store = configureStore({
  reducer: {
    dates: endDateReducer,
    metricsOrder: metricsOrderReducer,
    fetch: fetchSlice,
    misc: miscSlice,
  },
});

export default store;
