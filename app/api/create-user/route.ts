import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface NewUserTypes {
  uid: string;
  name: string;
}

export async function POST(request: Request) {
  try {
    const data: NewUserTypes = await request.json();
    await prisma.user.create({
      data: {
        uid: data.uid,
        name: data.name,
      },
    });
    return new Response("Success", { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
