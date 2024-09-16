-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "transactionId" TEXT;

-- CreateTable
CREATE TABLE "RazorpayTransactions" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "razorpayPaymentId" TEXT NOT NULL,
    "razorpayOrderId" TEXT NOT NULL,
    "razorpaySignature" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "jobId" TEXT,

    CONSTRAINT "RazorpayTransactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RazorpayTransactions_razorpayPaymentId_key" ON "RazorpayTransactions"("razorpayPaymentId");

-- CreateIndex
CREATE UNIQUE INDEX "RazorpayTransactions_razorpayOrderId_key" ON "RazorpayTransactions"("razorpayOrderId");

-- CreateIndex
CREATE UNIQUE INDEX "RazorpayTransactions_razorpaySignature_key" ON "RazorpayTransactions"("razorpaySignature");

-- CreateIndex
CREATE UNIQUE INDEX "RazorpayTransactions_jobId_key" ON "RazorpayTransactions"("jobId");

-- AddForeignKey
ALTER TABLE "RazorpayTransactions" ADD CONSTRAINT "RazorpayTransactions_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE SET NULL ON UPDATE CASCADE;
