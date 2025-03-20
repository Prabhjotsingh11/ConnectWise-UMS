/*
  Warnings:

  - You are about to drop the column `comment` on the `ReviewDetail` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `ReviewDetail` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `ReviewDetail` table. All the data in the column will be lost.
  - Added the required column `Rating` to the `ReviewDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReviewDetail" DROP COLUMN "comment",
DROP COLUMN "createdAt",
DROP COLUMN "rating",
ADD COLUMN     "Comment" TEXT,
ADD COLUMN     "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "Rating" DOUBLE PRECISION NOT NULL;
