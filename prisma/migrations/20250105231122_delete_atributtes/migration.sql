/*
  Warnings:

  - You are about to drop the column `clicks` on the `Links` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Links` table. All the data in the column will be lost.
  - You are about to drop the column `lastClicked` on the `Links` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Tags` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - Made the column `color` on table `Tags` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Links" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "creatorId" TEXT NOT NULL,
    CONSTRAINT "Links_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Links" ("creatorId", "description", "id", "slug", "url") SELECT "creatorId", "description", "id", "slug", "url" FROM "Links";
DROP TABLE "Links";
ALTER TABLE "new_Links" RENAME TO "Links";
CREATE UNIQUE INDEX "Links_slug_key" ON "Links"("slug");
CREATE INDEX "Links_slug_idx" ON "Links"("slug");
CREATE INDEX "Links_creatorId_idx" ON "Links"("creatorId");
CREATE TABLE "new_Tags" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'public',
    "password" TEXT,
    "creatorId" TEXT NOT NULL,
    CONSTRAINT "Tags_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tags" ("color", "creatorId", "id", "name") SELECT "color", "creatorId", "id", "name" FROM "Tags";
DROP TABLE "Tags";
ALTER TABLE "new_Tags" RENAME TO "Tags";
CREATE INDEX "Tags_creatorId_idx" ON "Tags"("creatorId");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "username" TEXT,
    "email" TEXT,
    "password" TEXT,
    "limitLinks" INTEGER NOT NULL DEFAULT 30
);
INSERT INTO "new_User" ("email", "id", "limitLinks", "name", "password", "username") SELECT "email", "id", "limitLinks", "name", "password", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
