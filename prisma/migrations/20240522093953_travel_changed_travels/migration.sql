/*
  Warnings:

  - You are about to drop the `Travel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Travel" DROP CONSTRAINT "Travel_userId_fkey";

-- DropTable
DROP TABLE "Travel";

-- CreateTable
CREATE TABLE "travels" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "itinerary" TEXT[],
    "location" TEXT[],
    "travelType" "TravelType" NOT NULL DEFAULT 'adventure',
    "photos" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "travels_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "travels" ADD CONSTRAINT "travels_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
