-- CreateTable
CREATE TABLE "User" (
    "_id" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "bookmarks" TEXT[],
    "liked" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userEmail_key" ON "User"("userEmail");
