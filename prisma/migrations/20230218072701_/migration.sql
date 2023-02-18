/*
  Warnings:

  - You are about to drop the column `size` on the `basketItems` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "basketItems" DROP COLUMN "size",
ADD COLUMN     "sizes" TEXT[];
