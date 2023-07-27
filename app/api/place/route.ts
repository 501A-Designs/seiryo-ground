import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");
  const place = await prisma.place.findUnique({
    where: { id: Number(id) },
    select: {
      title: true,
      description: true,
      iso: true,
      website: true,
      category: true,
      restroom: true,
      parking: true,
      cash: true,
      credit: true,
      digital: true,
      created: true,
      modified: true,
      reviews: true,
    },
  });

  return NextResponse.json(place);
}
