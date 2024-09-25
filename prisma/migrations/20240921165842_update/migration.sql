/*
  Warnings:

  - Changed the type of `type` on the `Job` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EmployementType" AS ENUM ('Full_time', 'Part_time', 'Internship', 'Contract');

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "has_experience_range" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "maxExperience" INTEGER,
ADD COLUMN     "minExperience" INTEGER,
ADD COLUMN     "skills" TEXT[],
DROP COLUMN "type",
ADD COLUMN     "type" "EmployementType" NOT NULL;
