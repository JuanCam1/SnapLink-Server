-- CreateTable
CREATE TABLE "Links" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorId" TEXT NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "lastClicked" DATETIME,
    CONSTRAINT "Links_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tags" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "color" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorId" TEXT NOT NULL,
    CONSTRAINT "Tags_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LinkTags" (
    "linkId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    PRIMARY KEY ("linkId", "tagId"),
    CONSTRAINT "LinkTags_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Links" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "LinkTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tags" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "username" TEXT,
    "email" TEXT,
    "emailVerified" DATETIME,
    "image" TEXT,
    "password" TEXT,
    "limitLinks" INTEGER NOT NULL DEFAULT 30
);

-- CreateIndex
CREATE UNIQUE INDEX "Links_slug_key" ON "Links"("slug");

-- CreateIndex
CREATE INDEX "Links_slug_idx" ON "Links"("slug");

-- CreateIndex
CREATE INDEX "Links_creatorId_idx" ON "Links"("creatorId");

-- CreateIndex
CREATE INDEX "Tags_creatorId_idx" ON "Tags"("creatorId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
