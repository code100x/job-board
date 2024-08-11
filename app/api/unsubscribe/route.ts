import { createHmac } from "crypto";

import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../lib/db";

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  if (!searchParams.get("email") || !searchParams.get("signature")) {
    return NextResponse.json({
      status: 400,
      message: "Missing required parameters",
    });
  }
  const email = searchParams.get("email") as string;
  const signature = searchParams.get("signature") as string;

  const expectedSignature = createHmac("sha256", process.env.UNSUB_SECRET!)
    .update(email)
    .digest("hex");

  if (signature !== expectedSignature) {
    return NextResponse.json({ status: 403, message: "Invalid signature" });
  }

  try {
    const existingUnsubscription = await prisma.unsubscribedEmail.findUnique({
      where: { email },
    });

    if (existingUnsubscription) {
      return NextResponse.json({
        status: 200,
        message: "Already unsubscribed",
      });
    }

    await prisma.unsubscribedEmail.create({
      data: { email },
    });

    return NextResponse.json({
      status: 202,
      message: "You have been successfully unsubscribed",
    });
  } catch (error) {
    console.error("Error updating subscription status:", error);
    return NextResponse.json({ status: 500, message: "Internal server error" });
  }
};
