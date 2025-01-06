/*
  Warnings:

  - You are about to drop the column `description` on the `Links` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Links" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    CONSTRAINT "Links_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Links" ("creatorId", "id", "slug", "url") SELECT "creatorId", "id", "slug", "url" FROM "Links";
DROP TABLE "Links";
ALTER TABLE "new_Links" RENAME TO "Links";
CREATE UNIQUE INDEX "Links_slug_key" ON "Links"("slug");
CREATE INDEX "Links_slug_idx" ON "Links"("slug");
CREATE INDEX "Links_creatorId_idx" ON "Links"("creatorId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
