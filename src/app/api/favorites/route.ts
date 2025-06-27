// src/app/api/favorites/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";

// GET: return all favorite stocks for the current user
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const favorites = await prisma.favoriteStock.findMany({
    where: { user: { email: session.user.email } },
    select: { symbol: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ favorites });
}

// POST: add a new favorite stock
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const symbol = body.symbol?.toUpperCase();

  if (!symbol) {
    return NextResponse.json({ error: "Symbol is required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const existing = await prisma.favoriteStock.findFirst({
    where: { symbol, userId: user.id },
  });
  console.log({existing});

  if (existing) {
    return NextResponse.json({ message: "Stock already in favorites" }, { status: 200 });
  }


  const favorite = await prisma.favoriteStock.create({
    data: {
      symbol,
      userId: user.id,
    },
  });
  console.log({ favorite });
  return NextResponse.json({ favorite });
}
