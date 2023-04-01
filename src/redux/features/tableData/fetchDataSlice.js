import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

var tempApps;
export const fetchApps = createAsyncThunk("api/fetchApps", async () => {
  const response = await axios.get(
    "http://go-dev.greedygame.com/v3/dummy/apps"
  );

  tempApps = response.data.data;
  return response.data;
});

export const fetchReport = createAsyncThunk(
  "api/fetchReport",
  async (payload) => {
    const response = await axios.get(
      `http://go-dev.greedygame.com/v3/dummy/report?startDate=${payload.sDate}&endDate=${payload.eDate}`
    );
    const data = response.data.data;
    const originalData = data;

    return {
      data: data,
      originalData: data,
    };
  }
);

const initialState = {
  apps: [],
  report: {
    data: [],
    finalData: [],
    originalData: [],
    totalValues: {
      date: {
        total: 0,
        max: 0,
        min: 0,
      },
      appName: {
        total: 0,
        max: 0,
        min: 0,
      },
      clicks: {
        total: 0,
        max: 0,
        min: 0,
      },
      requests: {
        total: 0,
        max: 0,
        min: 0,
      },
      responses: {
        total: 0,
        max: 0,
        min: 0,
      },
      impressions: {
        total: 0,
        max: 0,
        min: 0,
      },
      revenue: {
        total: 0,
        max: 0,
        min: 0,
      },
      fillRate: {
        total: 0,
        max: 0,
        min: 0,
      },
      ctr: {
        total: 0,
        max: 0,
        min: 0,
      },
    },
  },
  loading: false,
  error: null,
};

export const fetchSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    filterByColumn(state, action) {
      const { column, value } = action.payload;
      console.log(column, value);
      if (column === "appName") {
        const filteredData = state.report.finalData.filter((item) => {
          console.log(item.appName, value);
          if (item.appName === value) {
            return item;
          }
        });
        state.report.finalData = filteredData;
        return;
      }
      // if (column === "date") {
      //   const filteredData = state.report.data.filter((item) => {
      //     const itemDate = new Date(item.date);
      //     return (
      //       itemDate >= new Date(startDate) && itemDate <= new Date(endDate)
      //     );
      //   });
      // }
      console.log(column, value);
      const filteredData = state.report.data.filter((item) => {
        if (item[column] <= value) {
          console.log(item[column]);
          return item;
        }
      });
      console.log(filteredData);
      state.report.data = filteredData;
    },
    formatData(state) {
      const finalData = state.report.data.map((item) => {
        const appName = state.apps.find((app) => app.app_id === item.app_id);
        return { ...item, appName: appName.app_name };
      });
      const totalValues = {
        date: {
          total: 0,
          max: 0,
          min: 9999999999,
        },
        appName: {
          total: 0,
          max: 0,
          min: 9999999999,
        },
        clicks: {
          total: 0,
          max: 0,
          min: 9999999999,
        },
        requests: {
          total: 0,
          max: 0,
          min: 9999999999,
        },
        responses: {
          total: 0,
          max: 0,
          min: 9999999999,
        },
        impressions: {
          total: 0,
          max: 0,
          min: 9999999999,
        },
        revenue: {
          total: 0,
          max: 0,
          min: 9999999999,
        },
        fillRate: {
          total: 0,
          max: 0,
          min: 999,
        },
        ctr: {
          total: 0,
          max: 0,
          min: 999,
        },
      };

      finalData.forEach((data) => {
        totalValues.appName.total += 1;
        totalValues.date.total += 1;
        totalValues.clicks.total += data.clicks;
        totalValues.clicks.min = Math.min(totalValues.clicks.min, data.clicks);
        totalValues.clicks.max = Math.max(totalValues.clicks.max, data.clicks);

        totalValues.requests.total += data.requests;
        totalValues.requests.min = Math.min(
          totalValues.requests.min,
          data.requests
        );
        totalValues.requests.max = Math.max(
          totalValues.requests.max,
          data.requests
        );

        totalValues.responses.total += data.responses;
        totalValues.responses.min = Math.min(
          totalValues.responses.min,
          data.responses
        );
        totalValues.responses.max = Math.max(
          totalValues.responses.max,
          data.responses
        );

        totalValues.impressions.total += data.impressions;
        totalValues.impressions.min = Math.min(
          totalValues.impressions.min,
          data.impressions
        );
        totalValues.impressions.max = Math.max(
          totalValues.impressions.max,
          data.impressions
        );

        totalValues.revenue.total += data.revenue;
        totalValues.revenue.min = Math.min(
          totalValues.revenue.min,
          data.revenue
        );
        totalValues.revenue.max = Math.max(
          totalValues.revenue.max,
          data.revenue
        );

        totalValues.fillRate.total += (data.responses / data.requests) * 100;
        totalValues.fillRate.min = Math.min(
          totalValues.fillRate.min,
          (data.responses / data.requests) * 100
        );
        totalValues.fillRate.max = Math.max(
          totalValues.fillRate.max,
          (data.responses / data.requests) * 100
        );

        totalValues.ctr.total += (data.clicks / data.impressions) * 100;
        totalValues.ctr.min = Math.min(
          totalValues.ctr.min,
          (data.clicks / data.impressions) * 100
        );
        totalValues.ctr.max = Math.max(
          totalValues.ctr.max,
          (data.clicks / data.impressions) * 100
        );
      });

      totalValues.clicks.total =
        (totalValues.clicks.total / 1000000).toLocaleString(undefined, {
          maximumFractionDigits: 1,
        }) + "M";
      totalValues.requests.total =
        (totalValues.requests.total / 1000000).toLocaleString(undefined, {
          maximumFractionDigits: 1,
        }) + "M";
      totalValues.responses.total =
        (totalValues.responses.total / 1000000).toLocaleString(undefined, {
          maximumFractionDigits: 1,
        }) + "M";
      totalValues.impressions.total =
        (totalValues.impressions.total / 1000000).toLocaleString(undefined, {
          maximumFractionDigits: 1,
        }) + "M";
      totalValues.revenue.total =
        "$" +
        totalValues.revenue.total.toLocaleString(undefined, {
          maximumFractionDigits: 1,
        });
      totalValues.fillRate.total =
        totalValues.fillRate.total.toLocaleString(undefined, {
          maximumFractionDigits: 1,
        }) + "%";
      totalValues.ctr.total =
        totalValues.ctr.total.toLocaleString(undefined, {
          maximumFractionDigits: 1,
        }) + "%";

      finalData.forEach((item) => {
        const dateObj = new Date(item.date);
        const month = dateObj.toLocaleString("default", { month: "short" });
        const formattedDate = `${dateObj.getDate()} ${month} ${dateObj.getFullYear()}`;
        item.date = formattedDate;
        item.fillRate =
          ((item.responses / item.requests) * 100).toFixed(2) + "%";
        item.ctr = ((item.clicks / item.impressions) * 100).toFixed(2) + "%";
        item.clicks = item.clicks.toLocaleString();
        item.requests = item.requests.toLocaleString();
        item.responses = item.responses.toLocaleString();
        item.impressions = item.impressions.toLocaleString();
        item.revenue = "$" + item.revenue.toFixed(2);
      });
      state.report.finalData = finalData;
      state.report.totalValues = totalValues;
    },
    resetData(state) {
      state.report.data = state.report.originalData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApps.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchApps.fulfilled, (state, action) => {
        state.loading = false;
        state.apps = action.payload.data;
      })
      .addCase(fetchApps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReport.fulfilled, (state, action) => {
        state.loading = false;
        state.report.data = action.payload.data;
        state.report.originalData = action.payload.originalData;
        // state.report.totalValues = action.payload.totalValues;
        state.report.cache_time = action.payload.cache_time;
      })
      .addCase(fetchReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { filterByColumn, formatData, resetData } = fetchSlice.actions;

export default fetchSlice.reducer;
