/*
  Warnings:

  - You are about to drop the `Bundle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BundleInTransaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Chip` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ChipInTransaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ChipsInBundle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `isDeleted` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `isPurchase` on the `Transaction` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Chip_price_key";

-- DropIndex
DROP INDEX "Chip_value_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Bundle";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "BundleInTransaction";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Chip";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ChipInTransaction";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ChipsInBundle";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "ProductInTransaction" (
    "productID" INTEGER NOT NULL,
    "transactionID" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    PRIMARY KEY ("productID", "transactionID"),
    CONSTRAINT "ProductInTransaction_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductInTransaction_transactionID_fkey" FOREIGN KEY ("transactionID") REFERENCES "Transaction" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sessionId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorID" INTEGER NOT NULL,
    CONSTRAINT "Transaction_creatorID_fkey" FOREIGN KEY ("creatorID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("createdAt", "creatorID", "id", "sessionId") SELECT "createdAt", "creatorID", "id", "sessionId" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");
