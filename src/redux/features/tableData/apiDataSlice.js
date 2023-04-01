import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Create an async thunk for fetching the apps data
var tempApps;
export const fetchApps = createAsyncThunk("api/fetchApps", async () => {
  const response = await axios.get(
    "http://go-dev.greedygame.com/v3/dummy/apps"
  );
  tempApps = response.data.data;
  return response.data;
});

// Create an async thunk for fetching the report data
export const fetchReport = createAsyncThunk(
  "api/fetchReport",
  async (payload) => {
    const response = await axios.get(
      `http://go-dev.greedygame.com/v3/dummy/report?startDate=${payload.sDate}&endDate=${payload.eDate}`
    );

    const Data = {
      date: {
        id: 1,
        total: 0,
        content: [],
        sValue: 0,
        lValue: 0,
      },
      appName: {
        id: 2,
        total: 0,
        content: [],
        sValue: 0,
        lValue: 0,
      },
      click: {
        id: 3,
        total: 0,
        content: [],
        sValue: 0,
        lValue: 0,
      },

      request: {
        id: 4,
        total: 0,
        content: [],
        sValue: 0,
        lValue: 0,
      },
      response: {
        id: 5,
        total: 0,
        content: [],
        sValue: 0,
        lValue: 0,
      },
      impression: {
        id: 6,
        total: 0,
        content: [],
        sValue: 0,
        lValue: 0,
      },
      revenue: {
        id: 7,
        total: 0,
        content: [],
        sValue: 0,
        lValue: 0,
      },
      fillRate: {
        id: 8,
        total: 0,
        content: [],
        sValue: 0,
        lValue: 0,
      },
      ctr: {
        id: 9,
        total: 0,
        content: [],
        sValue: 0,
        lValue: 0,
      },
    };

    response.data.data.forEach((item) => {
      const dateObj = new Date(item.date);
      const month = dateObj.toLocaleString("default", {
        month: "short",
      });

      const formattedDate = `${dateObj.getDate()} ${month} ${dateObj.getFullYear()}`;
      Data.date.content.push(formattedDate);
      Data.date.total += 1;

      const appName = tempApps.find((app) => app.app_id === item.app_id);
      Data.appName.content.push(appName.app_name);
      Data.appName.total += 1;

      Data.click.content.push(item.clicks.toLocaleString());
      Data.click.total += parseInt(item.clicks);
      Data.click.sValue =
        item.clicks < Data.click.sValue ? item.clicks : Data.click.sValue;
      Data.click.lValue =
        item.clicks > Data.click.lValue ? item.clicks : Data.click.lValue;

      Data.request.content.push(item.requests.toLocaleString());
      Data.request.total += parseInt(item.requests);
      Data.request.sValue =
        item.requests < Data.request.sValue
          ? item.requests
          : Data.request.sValue;
      Data.request.lValue =
        item.requests > Data.request.lValue
          ? item.requests
          : Data.request.lValue;

      Data.response.content.push(item.responses.toLocaleString());
      Data.response.total += parseInt(item.responses);
      Data.response.sValue =
        item.responses < Data.response.sValue
          ? item.responses
          : Data.response.sValue;
      Data.response.lValue =
        item.responses > Data.response.lValue
          ? item.responses
          : Data.response.lValue;

      Data.impression.content.push(item.impressions.toLocaleString());
      Data.impression.total += parseInt(item.impressions);
      Data.impression.sValue =
        item.impressions < Data.impression.sValue
          ? item.impressions
          : Data.impression.sValue;
      Data.impression.lValue =
        item.impressions > Data.impression.lValue
          ? item.impressions
          : Data.impression.lValue;

      Data.revenue.content.push("$" + item.revenue.toFixed(2));
      Data.revenue.total += parseInt(item.revenue);
      Data.revenue.sValue =
        item.revenue < Data.revenue.sValue ? item.revenue : Data.revenue.sValue;
      Data.revenue.lValue =
        item.revenue > Data.revenue.lValue ? item.revenue : Data.revenue.lValue;

      Data.fillRate.content.push(
        ((item.requests / item.responses) * 100).toFixed(2) + "%"
      );
      Data.fillRate.lValue =
        ((item.requests / item.responses) * 100).toFixed(2) >
        Data.fillRate.lValue
          ? ((item.requests / item.responses) * 100).toFixed(2)
          : Data.fillRate.lValue;
      Data.fillRate.sValue =
        ((item.requests / item.responses) * 100).toFixed(2) <
        Data.fillRate.sValue
          ? ((item.requests / item.responses) * 100).toFixed(2)
          : Data.fillRate.sValue;

      Data.ctr.content.push(
        ((item.clicks / item.impressions) * 100).toFixed(2) + "%"
      );
      Data.ctr.lValue =
        ((item.clicks / item.impressions) * 100).toFixed(2) > Data.ctr.lValue
          ? ((item.clicks / item.impressions) * 100).toFixed(2)
          : Data.ctr.lValue;
      Data.ctr.sValue =
        ((item.clicks / item.impressions) * 100).toFixed(2) < Data.ctr.sValue
          ? ((item.clicks / item.impressions) * 100).toFixed(2)
          : Data.ctr.sValue;
    });
    Data.fillRate.total = Data.fillRate.content.reduce((a, b) => a + b, 0);
    Data.fillRate.total =
      parseInt(Data.fillRate.total) / Data.fillRate.content.length;
    Data.fillRate.total = Data.fillRate.total.toFixed(2) + "%";

    Data.ctr.total = Data.ctr.content.reduce((a, b) => a + b, 0);
    Data.ctr.total = parseInt(Data.ctr.total) / Data.ctr.content.length;
    Data.ctr.total = Data.ctr.total.toFixed(2) + "%";

    Data.click.total = (Data.click.total / 1000000).toFixed(2) + "M";

    Data.revenue.total = "$" + Data.revenue.total;

    Data.request.total = (Data.request.total / 1000000).toFixed(2) + "M";

    Data.response.total = (Data.response.total / 1000000).toFixed(2) + "M";

    Data.impression.total = (Data.impression.total / 1000000).toFixed(2) + "M";

    return {
      data: Data,
    };
  }
);

// Define the initial state of the store
const initialState = {
  apps: [],
  report: {
    data: {
      date: {
        id: 1,
        total: 0,
        content: [],
        sValue: 0,
        lValue: 0,
      },
      appName: {
        id: 2,
        total: 0,
        content: [],
        sValue: 0,
        lValue: 0,
      },
      click: {
        id: 3,
        total: 0,
        content: [],
        sValue: 0,
        lValue: 0,
      },

      request: {
        id: 4,
        total: 0,
        content: [],
        sValue: 0,
        lValue: 0,
      },
      response: {
        id: 5,
        total: 0,
        content: [],
        sValue: 0,
        lValue: 0,
      },
      impression: {
        id: 6,
        total: 0,
        content: [],
        sValue: 0,
        lValue: 0,
      },
      revenue: {
        id: 7,
        total: 0,
        content: [],
        sValue: 0,
        lValue: 0,
      },
      fillRate: {
        id: 8,
        total: 0,
        content: [],
        sValue: 0,
        lValue: 0,
      },
      ctr: {
        id: 9,
        total: 0,
        content: [],
        sValue: 0,
        lValue: 0,
      },
    },
  },
  loading: false,
  error: null,
};

// Define a slice of the store for handling the API calls
export const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    filterDataByClicks: (state, action) => {
      const start = action.payload.start;
      const end = action.payload.end;
      const data = state.report.data;
      const filteredClicks = data.click.content.filter((item, index) => {
        return index >= start && index <= end;
      });
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
        state.report.cache_time = action.payload.cache_time;
      })
      .addCase(fetchReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default apiSlice.reducer;

/* 
const sortedData = {
      Date: [],
      Clicks: [],
      "Ad Requests": [],
      "Ad Response": [],
      Impression: [],
      Revenue: [],
      "Fill Rate": [],
      CTR: [],
    };

    response.data.data.forEach((item) => {
      const app = initialState.apps.find((app) => app.app_id === item.app_id);
      const appName = app ? app.app_name : "Unknown";

      sortedData.Date.push({ date: item.date, name: "Date" });
      sortedData.Clicks.push({
        date: item.date,
        name: "Clicks",
        value: item.clicks,
        appName,
      });
      sortedData["Ad Requests"].push({
        date: item.date,
        name: "Ad Requests",
        value: item.requests,
        appName,
      });
      sortedData["Ad Response"].push({
        date: item.date,
        name: "Ad Response",
        value: item.responses,
        appName,
      });
      sortedData.Impression.push({
        date: item.date,
        name: "Impression",
        value: item.impression,
        appName,
      });
      sortedData.Revenue.push({
        date: item.date,
        name: "Revenue",
        value: item.revenue,
        appName,
      });
      sortedData["Fill Rate"].push({
        date: item.date,
        name: "Fill Rate",
        value: item.responses / item.requests,
        appName,
      });
      sortedData.CTR.push({
        date: item.date,
        name: "CTR",
        value: item.clicks / item.impression,
        appName,
      });
    });

    return sortedData;


*/
