/*
  Warnings:

  - You are about to drop the column `UserId` on the `Query` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Accounts" DROP CONSTRAINT "Accounts_AccUserId_fkey";

-- DropForeignKey
ALTER TABLE "Query" DROP CONSTRAINT "Query_UserId_fkey";

-- AlterTable
ALTER TABLE "Query" DROP COLUMN "UserId",
ADD COLUMN     "OperatorId" TEXT,
ADD COLUMN     "ResidentId" TEXT;

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Resident" (
    "ResidentId" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "FlatNumber" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "ContactNumber" TEXT NOT NULL,

    CONSTRAINT "Resident_pkey" PRIMARY KEY ("ResidentId")
);

-- CreateTable
CREATE TABLE "GigWorkers" (
    "WorkerId" TEXT NOT NULL,
    "Category" TEXT NOT NULL,
    "Username" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Rating" INTEGER NOT NULL,
    "Pricing" INTEGER NOT NULL,
    "ContactNumber" TEXT NOT NULL,

    CONSTRAINT "GigWorkers_pkey" PRIMARY KEY ("WorkerId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Resident_Email_key" ON "Resident"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "GigWorkers_Username_key" ON "GigWorkers"("Username");

-- AddForeignKey
ALTER TABLE "Query" ADD CONSTRAINT "Query_ResidentId_fkey" FOREIGN KEY ("ResidentId") REFERENCES "Resident"("ResidentId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Query" ADD CONSTRAINT "Query_OperatorId_fkey" FOREIGN KEY ("OperatorId") REFERENCES "GigWorkers"("WorkerId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accounts" ADD CONSTRAINT "Accounts_AccUserId_fkey" FOREIGN KEY ("AccUserId") REFERENCES "Resident"("ResidentId") ON DELETE RESTRICT ON UPDATE CASCADE;
