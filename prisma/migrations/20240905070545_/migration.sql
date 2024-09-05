/*
  Warnings:

  - Changed the type of `location` on the `Job` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "location",
ADD COLUMN     "location" TEXT NOT NULL;

-- DropEnum
DROP TYPE "JobLocations";
