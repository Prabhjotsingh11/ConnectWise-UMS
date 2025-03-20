/*
  Warnings:

  - You are about to drop the column `ResidentId` on the `ReviewDetail` table. All the data in the column will be lost.
  - You are about to drop the column `WorkerId` on the `ReviewDetail` table. All the data in the column will be lost.
  - Added the required column `GigId` to the `ReviewDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ResidentEmail` to the `ReviewDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `WorkerEmail` to the `ReviewDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReviewDetail" DROP COLUMN "ResidentId",
DROP COLUMN "WorkerId",
ADD COLUMN     "GigId" TEXT NOT NULL,
ADD COLUMN     "ResidentEmail" TEXT NOT NULL,
ADD COLUMN     "WorkerEmail" TEXT NOT NULL;
