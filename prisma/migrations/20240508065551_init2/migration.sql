/*
  Warnings:

  - You are about to alter the column `newPrice` on the `product` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `price` on the `product` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "category" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "newPrice" INTEGER,
    "mainImage" TEXT NOT NULL,
    "secondaryImages" TEXT NOT NULL,
    "old_url" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_product" ("category", "created_at", "description", "id", "mainImage", "newPrice", "old_url", "price", "secondaryImages", "title", "updated_at") SELECT "category", "created_at", "description", "id", "mainImage", "newPrice", "old_url", "price", "secondaryImages", "title", "updated_at" FROM "product";
DROP TABLE "product";
ALTER TABLE "new_product" RENAME TO "product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
