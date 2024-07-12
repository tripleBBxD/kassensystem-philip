/*
  Warnings:

  - You are about to drop the `_BundleToChip` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_BundleToChip";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ChipsInBundle" (
    "chipID" INTEGER NOT NULL,
    "bundleID" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    PRIMARY KEY ("chipID", "bundleID"),
    CONSTRAINT "ChipsInBundle_chipID_fkey" FOREIGN KEY ("chipID") REFERENCES "Chip" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ChipsInBundle_bundleID_fkey" FOREIGN KEY ("bundleID") REFERENCES "Bundle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
