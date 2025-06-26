"use client";

import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStock = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/stocks/${symbol}`);
        const result = await res.json();

        if (!res.ok) throw new Error(result.error || "Failed to fetch");

        setData(result.data);
      } catch (err: any) {
        console.log({err});
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStock();
  }, [symbol]);

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
        {!saved && (
          <button className="text-sm text-blue-500 hover:underline">
            Save
          </button>
        )}
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={(v) => typeof v === "string" ? v.slice(5) : ""} />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Line type="monotone" dataKey="close" stroke="#6366f1" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
