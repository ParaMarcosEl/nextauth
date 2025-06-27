import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "@/lib/slices/userSlice";

import dashboardReducer from '@/lib/slices/dashboardSlice';
import favoritesReducer from '@/lib/slices/favoritesSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    dashboard: dashboardReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
