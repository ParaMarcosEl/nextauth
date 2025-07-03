"use client";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useFavorites } from "@/hooks/useFavorites";
import MintButton from "./mintButton";

type DailyStat = {
  date: string;
  close: number;
  open?: number;
  high?: number;
  low?: number;
  volume?: number;
};

type StockMeta = {
  name: string;
  exchange: string;
  symbol: string;
  data: DailyStat[];
};

type Props = {
  symbol: string;
  saved?: boolean;
};

export default function StockCard({ symbol }: Props) {
  const [stock, setStock] = useState<StockMeta | null>(null);
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
        setStock(json);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchStock();
  }, [symbol]);

  const handleSave = () => {
    if (!stock) return;
    updateFavorites([...saved, { symbol, data: stock.data }]);
    fetch("/api/favorites", {
      method: "POST",
      body: JSON.stringify({ symbol }),
      headers: { "Content-Type": "application/json" },
    }).catch(() => {
      updateFavorites(saved.filter((s) => s.symbol !== symbol));
    });
  };

  const handleRemove = () => {
    deleteFavorite(symbol);
  };

  const getLineColor = () => {
    if (!stock || stock.data.length < 2) return "#000";
    const start = stock.data[0].close;
    const end = stock.data[stock.data.length - 1].close;
    if (end > start) return "#16a34a";
    if (end < start) return "#dc2626";
    return "#000000";
  };

  const formatPrice = (value: number) => `$${value.toFixed(2)}`;

  const latest = stock?.data?.[stock.data.length - 1];

  return (
    <div className="bg-white p-5 shadow rounded-xl space-y-4">
      {loading ? (
        <p>Loading chart...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : stock ? (
        <>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{stock.name}</h3>
              <p className="text-sm text-gray-500">{stock.exchange} • {stock.symbol}</p>
            </div>
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

          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={stock.data}>
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis
                domain={[
                  (dataMin: number) => Math.floor(dataMin - dataMin * 0.01),
                  (dataMax: number) => Math.ceil(dataMax + dataMax * 0.01),
                ]}
                tick={{ fontSize: 10 }}
                tickFormatter={(value) => `$${value.toFixed(2)}`}
              />
              <Tooltip
                formatter={(value: unknown) => formatPrice(value as number)}
                labelClassName="text-xs"
              />
              <Line
                type="linear"
                dataKey="close"
                stroke={getLineColor()}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>

          {latest && (
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
              <div><strong>Open:</strong> {formatPrice(latest.open || 0)}</div>
              <div><strong>Close:</strong> {formatPrice(latest.close)}</div>
              <div><strong>High:</strong> {formatPrice(latest.high || 0)}</div>
              <div><strong>Low:</strong> {formatPrice(latest.low || 0)}</div>
              <div><strong>Volume:</strong> {latest.volume?.toLocaleString() || "—"}</div>
            </div>
          )}

          <MintButton metadataURI={symbol} />
        </>
      ) : null}
    </div>
  );
}
