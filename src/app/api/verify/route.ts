import { createJob, createTransactions } from '@/actions/job.action';
import { NextRequest, NextResponse } from 'next/server';
import { validateWebhookSignature } from 'razorpay/dist/utils/razorpay-utils';

export async function POST(req: NextRequest) {
  const jsonBody = await req.json();
  const razorpay_signature: string | null = req.headers.get(
    'X-Razorpay-Signature'
  );

  if (!razorpay_signature)
    return NextResponse.json({ error: 'Signature not found' }, { status: 404 });

  const isPaymentValid: boolean = validateWebhookSignature(
    JSON.stringify(jsonBody),
    razorpay_signature,
    process.env.RAZORPAY_WEBHOOK_SECRET!
  );

  if (!isPaymentValid) {
    return NextResponse.json(
      { error: 'Payment not verified. Payment signature invalid' },
      { status: 404 }
    );
  }

  const jobData = jsonBody.payload.payment.entity.notes;

  try {
    const response = await createJob(jobData);

    if (!response.status) {
      return NextResponse.json({ error: response.message }, { status: 404 });
    }

    const transactionData = {
      razorpayOrderId: jsonBody.payload.payment.entity.order_id,
      razorpayPaymentId: jsonBody.payload.payment.entity.id,
      razorpaySignature: razorpay_signature,
      jobId: response?.additional?.jobId,
      status: jsonBody.payload.payment.entity.status,
    };
    await createTransactions(transactionData);

    return NextResponse.json(
      { message: 'Purchase Successful' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 409 });
  }
}
