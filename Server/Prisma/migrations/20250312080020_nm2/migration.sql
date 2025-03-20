/*
  Warnings:

  - You are about to drop the column `Avg_rating` on the `Review` table. All the data in the column will be lost.
  - Added the required column `WorkerId` to the `ReviewDetail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ReviewDetail" DROP CONSTRAINT "ReviewDetail_ResidentId_fkey";

-- AlterTable
ALTER TABLE "GigWorkers" ADD COLUMN     "AvgRating" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "Avg_rating";

-- AlterTable
ALTER TABLE "ReviewDetail" ADD COLUMN     "WorkerId" TEXT NOT NULL;
