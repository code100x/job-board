-- CreateEnum
CREATE TYPE "ProjectStack" AS ENUM ('GO', 'PYTHON', 'MERN', 'NEXTJS', 'AI_GPT_APIS', 'SPRINGBOOT', 'OTHERS');

-- DropForeignKey
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_userId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_userId_fkey";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "projectThumbnail" TEXT,
ADD COLUMN     "stack" "ProjectStack" NOT NULL DEFAULT 'OTHERS';

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
