/*
  Warnings:

  - Changed the type of `location` on the `Job` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "JobLocations" AS ENUM ('BANGLORE', 'DELHI', 'MUMBAI', 'PUNE', 'CHENNAI', 'HYDERABAD', 'KOLKATA', 'AHMEDABAD', 'JAIPUR', 'SURAT');

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "location",
ADD COLUMN     "location" "JobLocations" NOT NULL;

-- DropEnum
DROP TYPE "Location";
