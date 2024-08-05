/*
  Warnings:

  - You are about to drop the column `description` on the `Job` table. All the data in the column will be lost.
  - Added the required column `company` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobDescription` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobType` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requirements` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salaryRange` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "description",
ADD COLUMN     "company" TEXT NOT NULL,
ADD COLUMN     "jobDescription" TEXT NOT NULL,
ADD COLUMN     "jobType" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "requirements" TEXT NOT NULL,
ADD COLUMN     "salaryRange" TEXT NOT NULL;
