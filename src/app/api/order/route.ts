import Razorpay from 'razorpay';
import { NextRequest, NextResponse } from 'next/server';

import { z } from 'zod';

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_ID || '',
  key_secret: process.env.RAZORPAY_SECRET || '',
});

const payloadSchema = z.object({
  amount: z.string(),
  currency: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    const { amount, currency } = payloadSchema.parse(payload);
    const options = {
      amount,
      currency,
      receipt: 'rcp1',
    };
    const order = await razorpayInstance.orders.create(options);

    return NextResponse.json(
      {
        id: order.id,
        currency: order.currency,
        amount: order.amount,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
