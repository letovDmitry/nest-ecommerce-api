/*
  Warnings:

  - You are about to drop the `_BasketToItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ItemToOrder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BasketToItem" DROP CONSTRAINT "_BasketToItem_A_fkey";

-- DropForeignKey
ALTER TABLE "_BasketToItem" DROP CONSTRAINT "_BasketToItem_B_fkey";

-- DropForeignKey
ALTER TABLE "_ItemToOrder" DROP CONSTRAINT "_ItemToOrder_A_fkey";

-- DropForeignKey
ALTER TABLE "_ItemToOrder" DROP CONSTRAINT "_ItemToOrder_B_fkey";

-- AlterTable
ALTER TABLE "baskets" ADD COLUMN     "sizes" TEXT[];

-- AlterTable
ALTER TABLE "items" ADD COLUMN     "art" TEXT;

-- DropTable
DROP TABLE "_BasketToItem";

-- DropTable
DROP TABLE "_ItemToOrder";

-- CreateTable
CREATE TABLE "basketItems" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT,
    "inStock" INTEGER NOT NULL,
    "art" TEXT,
    "price" INTEGER NOT NULL,
    "sale" INTEGER,
    "size" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "publicationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "img" TEXT[],
    "brandName" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "basketItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BasketToBasketItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_BasketItemToOrder" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BasketToBasketItem_AB_unique" ON "_BasketToBasketItem"("A", "B");

-- CreateIndex
CREATE INDEX "_BasketToBasketItem_B_index" ON "_BasketToBasketItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BasketItemToOrder_AB_unique" ON "_BasketItemToOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_BasketItemToOrder_B_index" ON "_BasketItemToOrder"("B");

-- AddForeignKey
ALTER TABLE "_BasketToBasketItem" ADD CONSTRAINT "_BasketToBasketItem_A_fkey" FOREIGN KEY ("A") REFERENCES "baskets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BasketToBasketItem" ADD CONSTRAINT "_BasketToBasketItem_B_fkey" FOREIGN KEY ("B") REFERENCES "basketItems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BasketItemToOrder" ADD CONSTRAINT "_BasketItemToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "basketItems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BasketItemToOrder" ADD CONSTRAINT "_BasketItemToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
