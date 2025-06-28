// src/hooks/useUser.ts
import { useSelector } from "react-redux";
import type { RootState } from "@/lib/store";
import { useUserController } from "./userController";

export const useUser = () => ({user: useSelector((state: RootState) => state.user), userController: useUserController()});
