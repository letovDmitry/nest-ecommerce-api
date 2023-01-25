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
    "art" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "sale" INTEGER NOT NULL,
    "sizes" TEXT[],
    "sex" BOOLEAN NOT NULL,
    "publicationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "img" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
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
CREATE TABLE "_BasketToItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FavouritesToItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "baskets_userId_key" ON "baskets"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "favourites_userId_key" ON "favourites"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_BasketToItem_AB_unique" ON "_BasketToItem"("A", "B");

-- CreateIndex
CREATE INDEX "_BasketToItem_B_index" ON "_BasketToItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FavouritesToItem_AB_unique" ON "_FavouritesToItem"("A", "B");

-- CreateIndex
CREATE INDEX "_FavouritesToItem_B_index" ON "_FavouritesToItem"("B");

-- AddForeignKey
ALTER TABLE "baskets" ADD CONSTRAINT "baskets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favourites" ADD CONSTRAINT "favourites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BasketToItem" ADD CONSTRAINT "_BasketToItem_A_fkey" FOREIGN KEY ("A") REFERENCES "baskets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BasketToItem" ADD CONSTRAINT "_BasketToItem_B_fkey" FOREIGN KEY ("B") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavouritesToItem" ADD CONSTRAINT "_FavouritesToItem_A_fkey" FOREIGN KEY ("A") REFERENCES "favourites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavouritesToItem" ADD CONSTRAINT "_FavouritesToItem_B_fkey" FOREIGN KEY ("B") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
