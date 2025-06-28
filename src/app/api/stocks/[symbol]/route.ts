// src/app/api/favorites/[symbol]/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // adjust if your path is different
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions"; // adjust based on your setup

export async function DELETE(
  request: Request,
  { params }: { params: { symbol: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const deleted = await prisma.favoriteStock.deleteMany({
      where: {
        userId: user.id,
        symbol: params.symbol.toUpperCase(),
      },
    });

    return NextResponse.json({ success: true, deleted });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete favorite" },
      { status: 500 }
    );
  }
}
