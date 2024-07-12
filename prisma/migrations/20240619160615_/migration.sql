/*
  Warnings:

  - Added the required column `value` to the `Chip` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Chip" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" INTEGER NOT NULL,
    "price" INTEGER NOT NULL
);
INSERT INTO "new_Chip" ("id", "price") SELECT "id", "price" FROM "Chip";
DROP TABLE "Chip";
ALTER TABLE "new_Chip" RENAME TO "Chip";
CREATE UNIQUE INDEX "Chip_value_key" ON "Chip"("value");
CREATE UNIQUE INDEX "Chip_price_key" ON "Chip"("price");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
