"use client";
import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useFavorites } from "@/hooks/useFavorites";
import MintButton from "./mintButton";

type Props = {
  symbol: string;
  saved?: boolean; // optional if it's known to be saved
};

export default function StockCard({ symbol }: Props) {
  const [data, setData] = useState<{ date: string; close: number }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    isFavorite,
    updateFavorites,
    deleteFavorite,
    saved,
  } = useFavorites();

  const favorite = isFavorite(symbol);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/stocks/${symbol}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Failed to fetch");

        setData(json.data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchStock();
  }, [symbol]);

  const handleSave = () => {
    updateFavorites([...saved, { symbol, data }]);
    // Optional: Add a POST request to persist it server-side
    fetch("/api/favorites", {
      method: "POST",
      body: JSON.stringify({ symbol }),
      headers: { "Content-Type": "application/json" },
    }).catch(() => {
      // Rollback optimistic update if needed
      updateFavorites(saved.filter((s) => s.symbol !== symbol));
    });
  };

  const handleRemove = () => {
    deleteFavorite(symbol);
  };


  return (
    <div className="bg-white p-5 shadow rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-900">{symbol}</h3>
        {favorite ? (
          <button onClick={handleRemove} className="text-sm text-red-500 hover:underline">
            Remove
          </button>
        ) : (
          <button onClick={handleSave} className="text-sm text-blue-500 hover:underline">
            Save
          </button>
        )}
      </div>

      {loading ? (
        <p>Loading chart...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <YAxis
              domain={[
                (dataMin: number) => Math.floor(dataMin - (dataMin * 0.01)),
                (dataMax: number) => Math.ceil(dataMax + (dataMax * 0.01)),
              ]}
              tick={{ fontSize: 10 }} 
            />
            <Tooltip />
            <Line
              type="linear"
              dataKey="close"
              stroke="#6366F1"
              strokeWidth={1}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
      <MintButton metadataURI={symbol}/>
    </div>
  );
}
