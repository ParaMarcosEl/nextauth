// src/app/api/favorites/[symbol]/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";

type tParams = {
  symbol: string
}
export async function DELETE(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  req: Request,
  { params }: { params: tParams }
) {
  const session = await getServerSession(authOptions);
  const symbol = params.symbol?.toUpperCase();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!symbol) {
    return NextResponse.json({ error: "Symbol is required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const deleted = await prisma.favoriteStock.deleteMany({
    where: {
      userId: user.id,
      symbol,
    },
  });

  if (deleted.count === 0) {
    return NextResponse.json({ message: "Symbol not found in favorites" }, { status: 404 });
  }

  return NextResponse.json({ message: "Favorite deleted successfully" });
}
