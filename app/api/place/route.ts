import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

import { NextResponse } from "next/server";

export interface PlaceForm {
  title: string;
  description: string;
  // iso         String
  website: string;
  category: string;

  restroom: boolean;
  parking: boolean;

  cash: boolean;
  credit: boolean;
  digital: boolean;

  // created  DateTime @default(now())
  // modified DateTime @updatedAt
  // reviews  Review[]

  // User   User? @relation(fields: [userId], references: [id])
  // userId Int?
}

export async function POST(request: Request) {
  const data: PlaceForm = await request.json();
  console.log("data: ", data);

  const {
    title,
    description,
    website,
    category,
    restroom,
    parking,
    cash,
    credit,
    digital,
  } = data;

  return NextResponse.json({
    title,
    description,
    website,
    category,
    restroom,
    parking,
    cash,
    credit,
    digital,
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  // const obj = Object.fromEntries(searchParams.entries());

  const product = await prisma.place.findUnique({
    where: {
      id: Number(id),
      // obj,
    },
  });

  return NextResponse.json(product);
}

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "POST") {
//     return await addPlace(req, res);
//   } else if (req.method === "GET") {
//     return await readPlace(req, res);
//   } else {
//     return res.status(405).json({
//       message: "Method not allowed",
//       success: false,
//     });
//   }
// }

// async function readPlace(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const places = await prisma.place.findMany();
//     return res.status(200).json({ places, success: true });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: "Error from db", success: false });
//   }
// }

// async function addPlace(req: NextApiRequest, res: NextApiResponse) {
//   const body = req.body;
//   try {
//     const newEntry = await prisma.place.create({
//       data: {
//         title: body.placeTitle,
//         description: body.placeDescription,
//         iso: body.placeIso,
//         website: body.placeWebsite,
//         category: body.placeCategory,

//         restroom: body.placeRestroom,
//         parking: body.placeParking,

//         cash: body.placePayment.cash,
//         credit: body.placePayment.credit,
//         digital: body.placePayment.digital,

//         created: body.placeCreated,
//         modified: body.placeModified,
//       },
//     });
//     return res.status(200).json({ newEntry, success: true });
//   } catch (error) {
//     console.error("Request error", error);
//     res.status(500).json({ error: "Error creating data", success: false });
//   }
// }
