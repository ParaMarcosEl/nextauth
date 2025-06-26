import { NextRequest, NextResponse } from "next/server";

type PolygonResult = {
    t: number;
    c: number;
};

export async function GET(// eslint-disable-next-line @typescript-eslint/no-unused-vars
    req: NextRequest,
    context: { params: { symbol: string } }
) {
    const param = await context.params;
    const symbol = param.symbol.toUpperCase();
    const apiKey = process.env.POLYGON_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: "Missing API key" }, { status: 500 });
    }

    try {
        const res = await fetch(
        `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/2024-06-01/2024-06-25?adjusted=true&sort=desc&limit=30&apiKey=${apiKey}`
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
