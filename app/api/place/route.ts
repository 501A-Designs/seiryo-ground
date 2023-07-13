import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { NextResponse } from "next/server";

export interface PlaceTypes {
  title: string;
  description: string;
  iso: number;
  website: string;
  category: "b" | "g" | "o" | "p";

  restroom: boolean;
  parking: boolean;

  cash: boolean;
  credit: boolean;
  digital: boolean;

  created: string;
  modified: string;
  // reviews  Review[]

  // User   User? @relation(fields: [userId], references: [id])
}

export async function POST(request: Request) {
  const data: PlaceTypes = await request.json();
  console.log("data: ", data);

  const {
    title,
    description,
    website,
    category,
    iso,
    restroom,
    parking,
    cash,
    credit,
    digital,
  } = data;

  const newEntry = await prisma.place.create({
    data: {
      title: title,
      description: description,
      website: website,
      category: category,
      iso: iso,
      restroom: restroom,
      parking: parking,
      cash: cash,
      credit: credit,
      digital: digital,
    },
  });

  // return NextResponse.json({
  //   title,
  //   description,
  //   website,
  //   category,
  //   restroom,
  //   parking,
  //   cash,
  //   credit,
  //   digital,
  // });
}

export async function GET(request: Request) {
  // const { searchParams } = new URL(request.url);
  // const id = searchParams.get("id");
  // const product = await prisma.place.findUnique({
  //   where: {
  //     id: Number(id),
  //   },
  // });

  const product = await prisma.place.findMany();
  return NextResponse.json(product);
}
