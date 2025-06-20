import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/users/:id
export async function GET(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  req: NextRequest,
  context: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: { id: context.params.id },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

// PUT /api/users/:id
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const updatedUser = await prisma.user.update({
      where: { id: context.params.id },
      data: {
        name: body.name,
        email: body.email,
        // include other fields if needed
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

// DELETE /api/users/:id
export async function DELETE(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await prisma.user.delete({
      where: { id: context.params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
