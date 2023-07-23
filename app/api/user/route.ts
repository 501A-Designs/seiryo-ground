import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const uid = searchParams.get("uid");
  const profile = await prisma.user.findUnique({
    where: { uid: String(uid) },
    select: { name: true, level: true, reviews: true, places: true },
  });

  return NextResponse.json(profile);
}
