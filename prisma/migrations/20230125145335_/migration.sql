/*
  Warnings:

  - You are about to drop the column `art` on the `items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "items" DROP COLUMN "art",
ALTER COLUMN "desc" DROP NOT NULL,
ALTER COLUMN "sale" DROP NOT NULL;
