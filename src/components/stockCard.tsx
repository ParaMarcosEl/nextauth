"use client";

import { useAlert } from "@/context/AlertContext";
import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";
import { useAppDispatch } from "@/hooks/redux";
import { deleteFavoriteStock } from "@/lib/slices/favoritesSlice";

interface StockCardProps {
  symbol: string;
  saved?: boolean;
}

interface StockDataPoint {
  date: string;
  close: number;
}

export default function StockCard({ symbol, saved = false }: StockCardProps) {
  const [data, setData] = useState<StockDataPoint[]>([]);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { setAlert } = useAlert();

  useEffect(() => {
    const fetchStock = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/stocks/${symbol}`);
        const result = await res.json();

        if (!res.ok) throw new Error(result.error || "Failed to fetch");

        setData(result.data);
      }catch (err: unknown) {
        if (err instanceof Error) {
            console.log({ err });
            setError(err.message);
        } else {
            console.log("Unknown error", err);
            setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStock();
  }, [symbol]);

  const handleDelete = () => {
    dispatch(deleteFavoriteStock(symbol))
    .unwrap()
    .then(() => setAlert({ type: "success", message: `${symbol} removed from favorites.` }))
    .catch((err) => setAlert({ type: "error", message: err }));
  };

  const handleSave = async () => {
      const res = await fetch("/api/favorites", {
          method: "POST",
          body: JSON.stringify({ symbol }),
          headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
          // Show alert or update state to reflect saved status
          setAlert({ type: "success", message: `${symbol} saved to favorites!` });
          // add to favorites
      } else {
          const { error } = await res.json();
          setAlert({ type: "error", message: error || "Failed to save." });
      }
  };

  if (loading) {
    return (
      <div className="bg-white p-4 shadow rounded-lg text-gray-500">
        Loading {symbol}...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 shadow rounded-lg">
        Error loading {symbol}: {error}
      </div>
    );
  }

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-indigo-600">{symbol.toUpperCase()}</h3>
        {!saved ? (
            <button
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={handleSave}
            >
            Save
            </button>
        )
    : (
        <button onClick={handleDelete} className="text-red-500 mt-2">
          Remove
        </button>
    )}
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={(v) => typeof v === "string" ? v.slice(5) : ""} />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Line type="linear" dataKey="close" stroke="#6366f1" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
