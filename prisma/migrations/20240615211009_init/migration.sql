-- CreateTable
CREATE TABLE "Chip" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "price" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Bundle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isPurchase" BOOLEAN NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorID" INTEGER NOT NULL,
    CONSTRAINT "Transaction_creatorID_fkey" FOREIGN KEY ("creatorID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ChipToTransaction" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ChipToTransaction_A_fkey" FOREIGN KEY ("A") REFERENCES "Chip" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ChipToTransaction_B_fkey" FOREIGN KEY ("B") REFERENCES "Transaction" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_BundleToChip" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_BundleToChip_A_fkey" FOREIGN KEY ("A") REFERENCES "Bundle" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_BundleToChip_B_fkey" FOREIGN KEY ("B") REFERENCES "Chip" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_BundleToTransaction" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_BundleToTransaction_A_fkey" FOREIGN KEY ("A") REFERENCES "Bundle" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_BundleToTransaction_B_fkey" FOREIGN KEY ("B") REFERENCES "Transaction" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Chip_price_key" ON "Chip"("price");

-- CreateIndex
CREATE UNIQUE INDEX "Bundle_name_key" ON "Bundle"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ChipToTransaction_AB_unique" ON "_ChipToTransaction"("A", "B");

-- CreateIndex
CREATE INDEX "_ChipToTransaction_B_index" ON "_ChipToTransaction"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BundleToChip_AB_unique" ON "_BundleToChip"("A", "B");

-- CreateIndex
CREATE INDEX "_BundleToChip_B_index" ON "_BundleToChip"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BundleToTransaction_AB_unique" ON "_BundleToTransaction"("A", "B");

-- CreateIndex
CREATE INDEX "_BundleToTransaction_B_index" ON "_BundleToTransaction"("B");
