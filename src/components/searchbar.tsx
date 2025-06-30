'use client';

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setSearchCard } from '@/lib/slices/dashboardSlice';

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState('');
  const savedCards = useAppSelector((state) => state.dashboard.savedCards);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const symbol = input.trim().toUpperCase();
    if (symbol && !savedCards.includes(symbol)) {
      dispatch(setSearchCard(symbol));
    }
    setInput('');
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2 mb-6">
      <input
        type="text"
        placeholder="Enter stock symbol (e.g., AAPL)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 w-full max-w-sm focus:outline-none focus:ring focus:border-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  );
}
