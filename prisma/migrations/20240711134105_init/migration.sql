/*
  Warnings:

  - Added the required column `amount` to the `BundleInTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `ChipInTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BundleInTransaction" (
    "bundleID" INTEGER NOT NULL,
    "transactionID" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    PRIMARY KEY ("bundleID", "transactionID"),
    CONSTRAINT "BundleInTransaction_bundleID_fkey" FOREIGN KEY ("bundleID") REFERENCES "Bundle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BundleInTransaction_transactionID_fkey" FOREIGN KEY ("transactionID") REFERENCES "Transaction" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BundleInTransaction" ("bundleID", "transactionID") SELECT "bundleID", "transactionID" FROM "BundleInTransaction";
DROP TABLE "BundleInTransaction";
ALTER TABLE "new_BundleInTransaction" RENAME TO "BundleInTransaction";
CREATE TABLE "new_ChipInTransaction" (
    "chipID" INTEGER NOT NULL,
    "transactionID" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    PRIMARY KEY ("chipID", "transactionID"),
    CONSTRAINT "ChipInTransaction_chipID_fkey" FOREIGN KEY ("chipID") REFERENCES "Chip" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ChipInTransaction_transactionID_fkey" FOREIGN KEY ("transactionID") REFERENCES "Transaction" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ChipInTransaction" ("chipID", "transactionID") SELECT "chipID", "transactionID" FROM "ChipInTransaction";
DROP TABLE "ChipInTransaction";
ALTER TABLE "new_ChipInTransaction" RENAME TO "ChipInTransaction";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
