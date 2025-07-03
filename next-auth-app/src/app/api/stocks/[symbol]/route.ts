import { NextRequest, NextResponse } from "next/server";

type PolygonResult = {
  t: number;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
};

type TickerDetails = {
  name: string;
  primary_exchange: string;
};

type tParams = Promise<{ symbol: string }>;

export async function GET(
  req: NextRequest,
  context: { params: tParams }
) {
  const param = await context.params;
  const symbol = param.symbol.toUpperCase();
  const apiKey = process.env.POLYGON_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  try {
    const today = new Date();
    const pastDate = new Date();
    pastDate.setDate(today.getDate() - 30);

    const formatDate = (date: Date) =>
      date.toISOString().split("T")[0];

    const from = formatDate(pastDate);
    const to = formatDate(today);

    // Fetch price data
    const aggRes = await fetch(
      `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/${from}/${to}?adjusted=true&sort=desc&limit=30&apiKey=${apiKey}`
    );
    const aggJson = await aggRes.json();

    if (!aggJson.results || aggJson.results.length === 0) {
      return NextResponse.json(
        { error: "Invalid symbol or no data found" },
        { status: 400 }
      );
    }

    // Fetch metadata
    const infoRes = await fetch(
      `https://api.polygon.io/v3/reference/tickers/${symbol}?apiKey=${apiKey}`
    );
    const infoJson = await infoRes.json();
    const tickerInfo: TickerDetails = infoJson.results;

    const data = (aggJson.results as PolygonResult[]).reverse().map((item) => ({
      date: new Date(item.t).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      open: item.o,
      high: item.h,
      low: item.l,
      close: item.c,
      volume: item.v,
    }));

    return NextResponse.json({
      symbol,
      name: tickerInfo.name,
      exchange: tickerInfo.primary_exchange,
      data,
    });
  } catch (error) {
    if (error) console.log({error});
    return NextResponse.json(
      { error: "Failed to fetch stock data" },
      { status: 500 }
    );
  }
}
