"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  fetchUserFavorites,
  deleteFavoriteStock,
  setFavorites,
} from "@/lib/slices/favoritesSlice";
import { useCallback } from "react";
import { Stock } from "@/lib/slices/favoritesSlice";

export const useFavorites = () => {
  const dispatch = useAppDispatch();
  const saved = useAppSelector((state) => state.favorites.saved);
  const loading = useAppSelector((state) => state.favorites.loading);
  const error = useAppSelector((state) => state.favorites.error);

  const fetchFavorites = useCallback((userId: string) => {
    dispatch(fetchUserFavorites(userId));
  }, [dispatch]);

  const deleteFavorite = useCallback((symbol: string) => {
    dispatch(deleteFavoriteStock(symbol));
  }, [dispatch]);

  const updateFavorites = useCallback((favorites: Stock[]) => {
    dispatch(setFavorites(favorites));
  }, [dispatch]);

  const isFavorite = useCallback(
    (symbol: string) => saved.some((stock) => stock.symbol === symbol),
    [saved]
  );

  return {
    saved,
    loading,
    error,
    fetchFavorites,
    deleteFavorite,
    updateFavorites,
    isFavorite,
  };
};
