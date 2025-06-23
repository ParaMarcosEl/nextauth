// src/hooks/useUser.ts
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

export const useUser = () => useSelector((state: RootState) => state.user);
