/*
  Warnings:

  - You are about to drop the column `sizes` on the `baskets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "basketItems" ADD COLUMN     "baseItem" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "baskets" DROP COLUMN "sizes";
