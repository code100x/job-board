-- CreateEnum
CREATE TYPE "DegreeType" AS ENUM ('BTech', 'MTech', 'BCA', 'MCA');

-- CreateEnum
CREATE TYPE "FieldOfStudyType" AS ENUM ('AI', 'Machine_Learning', 'CS', 'Mechanical');

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "isFeature" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "about" TEXT,
ADD COLUMN     "contactEmail" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "discordLink" TEXT,
ADD COLUMN     "githubLink" TEXT,
ADD COLUMN     "linkedinLink" TEXT,
ADD COLUMN     "portfolioLink" TEXT,
ADD COLUMN     "twitterLink" TEXT;

-- CreateTable
CREATE TABLE "Education" (
    "id" SERIAL NOT NULL,
    "instituteName" TEXT NOT NULL,
    "degree" "DegreeType" NOT NULL,
    "fieldOfStudy" "FieldOfStudyType" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
