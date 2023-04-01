import { configureStore } from "@reduxjs/toolkit";
import startDateReducer from "./features/dates/startDateSlice";
import endDateReducer from "./features/dates/endDateSlice";
import metricsOrderReducer from "./features/metrics/metricsOrderSlice";
import metricsSelectionReducer from "./features/metrics/metricsSelectionSlice";
import apiSlice from "./features/tableData/apiDataSlice";
import fetchSlice from "./features/tableData/fetchDataSlice";
import miscSlice from "./features/miscSlice";

export const store = configureStore({
  reducer: {
    startDate: startDateReducer,
    endDate: endDateReducer,
    metricsOrder: metricsOrderReducer,
    metricsSelection: metricsSelectionReducer,
    api: apiSlice,
    fetch: fetchSlice,
    misc: miscSlice,
  },
});

export default store;
