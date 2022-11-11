import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CoinExtended } from './../../models/models';
import { Coin } from "../../models/models";

export const fetchCoins = createAsyncThunk(
  "coins/fetchCoins",
  async (): Promise<Coin[]> => {
    try {
      const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true");
      const data = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchCoin = createAsyncThunk(
  "coins/fetchCoin",
  async (coinId: string): Promise<CoinExtended> => {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&sparkline=true`);
      const data = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }
);

interface CoinsState {
  coins: Coin[];
  isLoading: boolean;
  error: string;
  currentCoin: CoinExtended | null;
  currentIsLoading: boolean;
  currentError: string
}

const initialState: CoinsState = {
  coins: [],
  isLoading: false,
  error: "",
  currentCoin: null,
  currentIsLoading: false,
  currentError: "",
};

const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {
    setCoins: (state, action: PayloadAction<Coin[]>) => {
      state.coins = action.payload;
    },
    setCoin: (state, action: PayloadAction<CoinExtended | null>) => {
      state.currentCoin = action.payload;
    }
  },
  extraReducers: {
    [`${fetchCoins.pending}`]: (state) => {
      state.isLoading = true;
    },
    [`${fetchCoins.fulfilled}`]: (state, action: PayloadAction<Coin[]>) => {
      state.isLoading = false;
      state.error = "";
      state.coins = action.payload;
    },
    [`${fetchCoins.rejected}`]: (state, action) => {
      state.isLoading = false;
      state.error = `[${action.error.name}] ${action.error.message}`;
    },
    [`${fetchCoin.pending}`]: (state) => {
      state.currentIsLoading = true;
    },
    [`${fetchCoin.fulfilled}`]: (state, action: PayloadAction<CoinExtended>) => {
      state.currentIsLoading = false;
      state.currentError = "";
      state.currentCoin = action.payload;
    },
    [`${fetchCoin.rejected}`]: (state, action) => {
      state.currentIsLoading = false;
      state.currentError = `[${action.error.name}] ${action.error.message}`;
    },
  },
});

export const { setCoins } = coinsSlice.actions;
export default coinsSlice.reducer;
