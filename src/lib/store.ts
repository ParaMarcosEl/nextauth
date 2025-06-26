import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "@/lib/slices/userSlice";

import dashboardReducer from '@/lib/slices/dashboardSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    dashboard: dashboardReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
