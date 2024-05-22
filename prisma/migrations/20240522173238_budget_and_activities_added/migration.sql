/*
  Warnings:

  - Added the required column `budget` to the `travels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "travels" ADD COLUMN     "activities" TEXT[],
ADD COLUMN     "budget" INTEGER NOT NULL;
