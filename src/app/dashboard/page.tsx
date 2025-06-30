"use client";
import React from "react";
import { useUser } from "@/hooks/useUser";
import { useAlert } from "@/context/AlertContext";
import Redirector from "@/components/redirector";
import SearchBar from "@/components/searchbar";
import { signOut } from "next-auth/react";
import StockCard from "@/components/stockCard";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useFavorites } from "@/hooks/useFavorites";
import { useEffect } from "react";
import { useAccount } from 'wagmi';

export default function DashboardPage() {
  const { user } = useUser();
  const dispatch = useAppDispatch();
  const {
    saved,
    fetchFavorites,
  } = useFavorites();
  const { address, isConnected } = useAccount();
  
  if (isConnected) console.log({address});

  useEffect(() => {
    if (user?.id) {
      fetchFavorites(user.id);
    }
  }, [user?.id, dispatch]);

  const { setAlert } = useAlert();
  const searchCard = useAppSelector((state) => state.dashboard.searchCard);

  return (
    <Redirector>
      <main className="page min-h-screen bg-gray-50 px-6 py-10">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <button
              onClick={() => {
                signOut();
                setAlert({
                  type: "info",
                  message: "You have successfully logged out.",
                });
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>

          {/* Welcome Section */}
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-xl font-semibold">
              Welcome{user?.name ? `, ${user.name}` : ""}!
            </h2>
            <p className="text-gray-600">
              You&apos;re signed in with <strong>{user?.email}</strong>
            </p>

            {/* Instructions Section */}
            <div className="bg-blue-50 border-l-4 border-blue-400 text-blue-800 p-4 rounded-xl">
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Use the <strong>search bar</strong> below to look up stock symbols (e.g. AAPL, MSFT).</li>
                <li>A chart will appear for your selected stock. You can click <strong>&quot;Save&quot;</strong> to pin it to your dashboard.</li>
                <li>Saved stocks are <strong>persistent</strong> and will always show up when you return.</li>
                <li>You can <strong>delete</strong> a saved stock anytime by clicking the &quot;Remove&quot; button on its card.</li>
              </ul>
            </div>
          </div>

          {/* Search */}
          <SearchBar />

          {/* Search Result Card (if not saved) */}
          {searchCard && !saved.find((card) => card.symbol === searchCard) && (
            <div className="mt-4">
              <StockCard symbol={searchCard} />
            </div>
          )}

          {/* Saved Stock Cards */}
          
          {saved.length > 0 && (
            <>
              <h2>Saved Stocks</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {saved.map(({ symbol }) => (
                  <StockCard key={symbol} symbol={symbol} saved />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </Redirector>
  );
}
