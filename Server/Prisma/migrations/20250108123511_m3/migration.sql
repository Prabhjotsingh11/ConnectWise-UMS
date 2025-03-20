/*
  Warnings:

  - Added the required column `BookedDate` to the `Query` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BookedSlot` to the `Query` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Query" ADD COLUMN     "BookedDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "BookedSlot" TIMESTAMP(3) NOT NULL;
