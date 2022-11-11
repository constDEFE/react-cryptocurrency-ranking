import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Trending, TrendingCoin } from "../../models/models";
import type { PayloadAction } from "@reduxjs/toolkit";

export const fetchTrending = createAsyncThunk(
  "coins/fetchTrending",
  async (): Promise<TrendingCoin[]> => {
    try {
      const response = await fetch("https://api.coingecko.com/api/v3/search/trending");
      const data: Trending = await response.json();
      const { coins } = data;
      
      coins.length--;

      return coins;
    } catch (error) {
      throw error;
    }
  }
);

interface CoinsState {
  trending: TrendingCoin[];
  isLoading: boolean;
  error: string;
}

const initialState: CoinsState = {
  trending: [],
  isLoading: false,
  error: "",
};

const trendingSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {
    setTrending: (state, action: PayloadAction<TrendingCoin[]>) => {
      state.trending = action.payload
    }
  },
  extraReducers: {
    [`${fetchTrending.pending}`]: (state) => {
      state.isLoading = true;
    },
    [`${fetchTrending.fulfilled}`]: (state, action: PayloadAction<TrendingCoin[]>) => {
      state.isLoading = false;
      state.error = "";
      state.trending = action.payload;
    },
    [`${fetchTrending.rejected}`]: (state, action) => {
      state.isLoading = false;
      state.error = `[${action.error.name}] ${action.error.message}`;
    },
  },
});

export const { setTrending } = trendingSlice.actions;
export default trendingSlice.reducer;
