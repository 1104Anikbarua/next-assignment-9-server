/*
  Warnings:

  - Added the required column `travelId` to the `travelBuddies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "travelBuddies" ADD COLUMN     "travelId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "travelBuddies" ADD CONSTRAINT "travelBuddies_travelId_fkey" FOREIGN KEY ("travelId") REFERENCES "travels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
