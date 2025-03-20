/*
  Warnings:

  - You are about to drop the column `Username` on the `GigWorkers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Email]` on the table `GigWorkers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Email` to the `GigWorkers` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "GigWorkers_Username_key";

-- AlterTable
ALTER TABLE "GigWorkers" DROP COLUMN "Username",
ADD COLUMN     "Email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GigWorkers_Email_key" ON "GigWorkers"("Email");
