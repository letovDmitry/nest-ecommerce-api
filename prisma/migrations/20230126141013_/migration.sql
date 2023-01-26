-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "phoneNumber" TEXT,
    "city" TEXT,
    "pointOfIssue" TEXT,
    "role" BOOLEAN NOT NULL DEFAULT false,
    "hash" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "baskets" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "baskets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT,
    "inStock" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "sale" INTEGER,
    "sizes" TEXT[],
    "sex" TEXT NOT NULL,
    "publicationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "img" TEXT NOT NULL,
    "brandName" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favourites" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "favourites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BasketToItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ItemToOrder" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FavouritesToItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "baskets_userId_key" ON "baskets"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "favourites_userId_key" ON "favourites"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_name_key" ON "Brand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_BasketToItem_AB_unique" ON "_BasketToItem"("A", "B");

-- CreateIndex
CREATE INDEX "_BasketToItem_B_index" ON "_BasketToItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ItemToOrder_AB_unique" ON "_ItemToOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemToOrder_B_index" ON "_ItemToOrder"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FavouritesToItem_AB_unique" ON "_FavouritesToItem"("A", "B");

-- CreateIndex
CREATE INDEX "_FavouritesToItem_B_index" ON "_FavouritesToItem"("B");

-- AddForeignKey
ALTER TABLE "baskets" ADD CONSTRAINT "baskets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_brandName_fkey" FOREIGN KEY ("brandName") REFERENCES "Brand"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favourites" ADD CONSTRAINT "favourites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BasketToItem" ADD CONSTRAINT "_BasketToItem_A_fkey" FOREIGN KEY ("A") REFERENCES "baskets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BasketToItem" ADD CONSTRAINT "_BasketToItem_B_fkey" FOREIGN KEY ("B") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToOrder" ADD CONSTRAINT "_ItemToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToOrder" ADD CONSTRAINT "_ItemToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavouritesToItem" ADD CONSTRAINT "_FavouritesToItem_A_fkey" FOREIGN KEY ("A") REFERENCES "favourites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavouritesToItem" ADD CONSTRAINT "_FavouritesToItem_B_fkey" FOREIGN KEY ("B") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
