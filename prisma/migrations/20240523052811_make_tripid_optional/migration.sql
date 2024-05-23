-- DropForeignKey
ALTER TABLE "travelBuddies" DROP CONSTRAINT "travelBuddies_tripId_fkey";

-- AlterTable
ALTER TABLE "travelBuddies" ALTER COLUMN "tripId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "travelBuddies" ADD CONSTRAINT "travelBuddies_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "trips"("id") ON DELETE SET NULL ON UPDATE CASCADE;
