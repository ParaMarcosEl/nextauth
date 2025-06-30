import { NextRequest, NextResponse } from "next/server";

type PolygonResult = {
    t: number;
    c: number;
};

type tParams = Promise<{ symbol: string }>;

export async function GET(// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        date.toISOString().split("T")[0]; // YYYY-MM-DD

      const from = formatDate(pastDate);
      const to = formatDate(today);
        const res = await fetch(
        `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/${from}/${to}?adjusted=true&sort=desc&limit=30&apiKey=${apiKey}`
        );
        const json = await res.json();

        if (!json.results) {
        return NextResponse.json(
            { error: "Invalid symbol or data not found" },
            { status: 400 }
        );
        }

        const data = (json.results as PolygonResult[]).reverse().map((item) => ({
        date: new Date(item.t).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        }),
        close: item.c,
        }));

        return NextResponse.json({ data });
    } catch {
        return NextResponse.json(
        { error: "Failed to fetch stock data" },
        { status: 500 }
        );
    }
}