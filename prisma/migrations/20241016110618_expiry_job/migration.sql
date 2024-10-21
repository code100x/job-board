/*
  Warnings:

  - You are about to drop the column `onBoard` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `resume` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Experience` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_userId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_userId_fkey";

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "expired" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "expiryDate" TIMESTAMP(3),
ADD COLUMN     "has_expiry_date" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "onBoard",
DROP COLUMN "resume",
DROP COLUMN "skills";

-- DropTable
DROP TABLE "Experience";

-- DropTable
DROP TABLE "Project";
