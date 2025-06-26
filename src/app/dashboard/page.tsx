"use client";

import { useUser } from "@/hooks/useUser";
import { useAlert } from "@/context/AlertContext";
import Redirector from "@/components/redirector";
import SearchBar from "@/components/searchbar";
import { signOut } from "next-auth/react";
import StockCard from "@/components/stockCard";
import { useAppSelector } from "@/hooks/redux";

export default function DashboardPage() {
  const user = useUser();
  const { setAlert } = useAlert();
  const savedCards = useAppSelector((state) => state.dashboard.savedCards);
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
          </div>

          {/* Search */}
          <SearchBar />

          {/* Search Result Card (if not saved) */}
          {searchCard && !savedCards.includes(searchCard) && (
            <div className="mt-4">
              <StockCard symbol={searchCard} />
            </div>
          )}

          {/* Saved Stock Cards */}
          {savedCards.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedCards.map((symbol) => (
                <StockCard key={symbol} symbol={symbol} />
              ))}
            </div>
          )}
        </div>
      </main>
    </Redirector>
  );
}
