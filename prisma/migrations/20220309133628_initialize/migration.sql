-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Candidate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstname" TEXT NOT NULL,
    "middlename" TEXT,
    "lastname" TEXT NOT NULL,
    "alias" TEXT,
    "bio" TEXT,
    "photo" TEXT,
    "party" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "deputy" TEXT,
    "countyId" INTEGER NOT NULL,
    "constituencyId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Candidate_countyId_fkey" FOREIGN KEY ("countyId") REFERENCES "County" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Candidate_constituencyId_fkey" FOREIGN KEY ("constituencyId") REFERENCES "Constituency" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Candidate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "County" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Constituency" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "countyId" INTEGER NOT NULL,
    CONSTRAINT "Constituency_countyId_fkey" FOREIGN KEY ("countyId") REFERENCES "County" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_userId_key" ON "Candidate"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "County_name_key" ON "County"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Constituency_name_key" ON "Constituency"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");
