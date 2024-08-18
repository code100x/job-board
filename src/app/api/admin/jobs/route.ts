import prisma from '@/config/prisma.config';
import { NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  // return NextResponse.json("erroor", { status: 500 })

  const products = await prisma.job.findMany({});
  return NextResponse.json(products, { status: 200 });
}
