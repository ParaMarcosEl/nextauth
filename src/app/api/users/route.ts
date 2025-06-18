import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Create a user
export async function POST(req: Request) {
  const body = await req.json();

  if (!body.email || !body.name) {
    return NextResponse.json({ error: "Missing name or email" }, { status: 400 });
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
      },
    });

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

// Get all users
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
