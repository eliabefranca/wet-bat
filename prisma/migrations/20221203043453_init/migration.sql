/*
  Warnings:

  - You are about to drop the `Quote` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Quote";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "quotes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "departDate" DATETIME NOT NULL,
    "returnDate" DATETIME NOT NULL,
    "travellers" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
