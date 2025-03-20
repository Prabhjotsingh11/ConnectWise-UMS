/*
  Warnings:

  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_GigWorkerId_fkey";

-- DropForeignKey
ALTER TABLE "ReviewDetail" DROP CONSTRAINT "ReviewDetail_Review_id_fkey";

-- DropTable
DROP TABLE "Review";
