// lib/features/dashboardSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DashboardState {
  searchCard: string | null;
  savedCards: string[];
}

const initialState: DashboardState = {
  searchCard: null,
  savedCards: [],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setSearchCard(state, action: PayloadAction<string>) {
      state.searchCard = action.payload;
    },
    setSavedCards(state, action: PayloadAction<string[]>) {
      state.savedCards = action.payload;
    },
    addSavedCard(state, action: PayloadAction<string>) {
      if (!state.savedCards.includes(action.payload)) {
        state.savedCards.push(action.payload);
      }
      if (state.searchCard === action.payload) {
        state.searchCard = null;
      }
    },
    clearSearchCard(state) {
      state.searchCard = null;
    },
  },
});

export const {
  setSearchCard,
  setSavedCards,
  addSavedCard,
  clearSearchCard,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
