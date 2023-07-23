import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const product = await prisma.place.findMany();
  return NextResponse.json(product);
}
