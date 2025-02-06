import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async ({ month, search, page, perPage }) => {
    const response = await axios.get("http://localhost:5000/api/transactions", {
      params: { month, search, page, perPage },
    });
    return response.data;
  }
);


export const fetchStatistics = createAsyncThunk(
  "transactions/fetchStatistics",
  async (month) => {
    const response = await axios.get("http://localhost:5000/api/statistics", {
      params: { month },
    });
    return response.data;
  }
);


export const fetchBarChartData = createAsyncThunk(
  "transactions/fetchBarChartData",
  async (month) => {
    const response = await axios.get("http://localhost:5000/api/bar-chart", {
      params: { month },
    });
    return response.data;
  }
);


export const fetchPieChartData = createAsyncThunk(
  "transactions/fetchPieChartData",
  async (month) => {
    const response = await axios.get("http://localhost:5000/api/pie-chart", {
      params: { month },
    });
    return response.data;
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    transactions: [],
    statistics: {},
    barChartData: [],
    pieChartData: [],
    loading: false,
    error: null,
    total: 0,
    page: 1,
    perPage: 10,
    search: "",
    month: "March",
  },
  reducers: {
    setMonth: (state, action) => {
      state.month = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.transactions;
        state.total = action.payload.total;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.statistics = action.payload;
      })
      .addCase(fetchBarChartData.fulfilled, (state, action) => {
        state.barChartData = action.payload;
      })
      .addCase(fetchPieChartData.fulfilled, (state, action) => {
        state.pieChartData = action.payload;
      });
  },
});

export const { setMonth, setSearch, setPage } = transactionsSlice.actions;
export default transactionsSlice.reducer;
