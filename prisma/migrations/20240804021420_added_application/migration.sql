-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "applicantName" TEXT NOT NULL,
    "applicantEmail" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "coverLetter" TEXT NOT NULL,
    "resumeUrl" TEXT NOT NULL,
    "jobId" INTEGER NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Application_jobId_idx" ON "Application"("jobId");

-- CreateIndex
CREATE INDEX "Job_authorId_idx" ON "Job"("authorId");

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
