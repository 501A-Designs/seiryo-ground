import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { PlaceFormTypes } from "../../components/create/CreatePlace";
import { PrismaClient } from "@prisma/client";
import admin from "../../../firebase/server";

const prisma = new PrismaClient();

interface PlaceTypes extends PlaceFormTypes {
  reviews: any[];
  authorId: number;
}

export async function POST(request: Request) {
  try {
    const data: PlaceTypes = await request.json();
    const authorizationHeader = request.headers.get("authorization");
    if (!authorizationHeader) {
      return new Response("Unauthorized", { status: 401 });
    }

    const user = await admin
      .auth()
      .verifyIdToken(authorizationHeader.split(" ")[1])
      .then(async (decodedIdToken: DecodedIdToken) => {
        const { uid } = decodedIdToken;
        console.log(uid);
        return prisma.user.findFirst({
          where: {
            uid,
          },
          select: {
            id: true,
          },
        });
      });

    await prisma.place.create({
      data: {
        title: data.title,
        description: data.description,
        website: data.website,
        category: data.category,
        iso: data.iso,
        restroom: data.restroom,
        parking: data.parking,
        cash: data.cash,
        credit: data.credit,
        digital: data.digital,
        authorId: user.id,
      },
    });

    return new Response("Success", { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
