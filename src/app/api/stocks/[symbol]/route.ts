// src/app/api/stocks/[symbol]/route.ts

import { NextRequest, NextResponse } from "next/server";

type PolygonResult = {
  t: number; // timestamp in ms
  c: number; // closing price
};

export async function GET(
  _req: NextRequest,
  context: { params: { symbol: string } }
) {
    const param = await context.params;
  const symbol = param.symbol?.toUpperCase();
  const apiKey = process.env.POLYGON_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  // Calculate date range (last 30 days)
  const now = new Date();
  const to = now.toISOString().split("T")[0];
  const from = new Date(now.setDate(now.getDate() - 30))
    .toISOString()
    .split("T")[0];

  const url = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/${from}/${to}?adjusted=true&sort=asc&apiKey=${apiKey}`;

  try {
    const res = await fetch(url);
    const json = await res.json();

    if (!res.ok || json.status !== "DELAYED") {
      return NextResponse.json({ error: json.error || "Invalid symbol" }, { status: 400 });
    }

    const data = (json.results as PolygonResult[]).map((item) => ({
      date: new Date(item.t).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      close: item.c,
    }));

    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: "Failed to fetch stock data" }, { status: 500 });
  }
}
