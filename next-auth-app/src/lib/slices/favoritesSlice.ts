import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export type Stock = {
  symbol: string;
  data: { date: string; close: number }[];
};

interface FavoritesState {
  saved: Stock[];
  loading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  saved: [],
  loading: false,
  error: null,
};

// Async thunk to delete favorite
export const deleteFavoriteStock = createAsyncThunk<
  string, // returns the symbol
  string, // accepts the symbol
  { rejectValue: string }
>("favorites/delete", async (symbol, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/favorites/${symbol}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Failed to delete favorite");
    }

    return symbol;
  } catch (err: unknown) {
    return rejectWithValue(err instanceof Error ? err.message : "An unknown error occurred.");
  }
});

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorites(state, action: PayloadAction<Stock[]>) {
      state.saved = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteFavoriteStock.fulfilled, (state, action) => {
      state.saved = state.saved.filter((s) => s.symbol !== action.payload);
    }).addCase(fetchUserFavorites.fulfilled, (state, action) => {
      // Set saved with empty data arrays for now
      state.saved = action.payload.map((symbol) => ({
        symbol,
        data: [],
      }));
    });
  },
});

export const fetchUserFavorites = createAsyncThunk<
  string[], // array of symbols
  string,   // userId
  { rejectValue: string }
>("favorites/fetchUserFavorites", async (userId, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/favorites?userId=${userId}`);
    const json = await res.json();

    if (!res.ok) throw new Error(json.error || "Failed to fetch");
    
    return json.favorites.map((f: { symbol: string }) => f.symbol);
  } catch (err: unknown) {
    return rejectWithValue(err instanceof Error ? err.message : "An unknown error occurred");
  }
});


export const { setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
