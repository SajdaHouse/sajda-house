-- CreateTable
CREATE TABLE "product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "category" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "price" BIGINT NOT NULL,
    "newPrice" BIGINT,
    "mainImage" TEXT NOT NULL,
    "secondaryImages" TEXT NOT NULL,
    "old_url" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
