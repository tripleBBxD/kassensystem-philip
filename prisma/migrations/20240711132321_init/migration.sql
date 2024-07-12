/*
  Warnings:

  - You are about to drop the `_BundleToTransaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ChipToTransaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_BundleToTransaction";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ChipToTransaction";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "BundleInTransaction" (
    "bundleID" INTEGER NOT NULL,
    "transactionID" INTEGER NOT NULL,

    PRIMARY KEY ("bundleID", "transactionID"),
    CONSTRAINT "BundleInTransaction_bundleID_fkey" FOREIGN KEY ("bundleID") REFERENCES "Bundle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BundleInTransaction_transactionID_fkey" FOREIGN KEY ("transactionID") REFERENCES "Transaction" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ChipInTransaction" (
    "chipID" INTEGER NOT NULL,
    "transactionID" INTEGER NOT NULL,

    PRIMARY KEY ("chipID", "transactionID"),
    CONSTRAINT "ChipInTransaction_chipID_fkey" FOREIGN KEY ("chipID") REFERENCES "Chip" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ChipInTransaction_transactionID_fkey" FOREIGN KEY ("transactionID") REFERENCES "Transaction" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
