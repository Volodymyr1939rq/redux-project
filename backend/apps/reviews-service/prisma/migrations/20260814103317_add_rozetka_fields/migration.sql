/*
  Warnings:

  - Added the required column `authorEmail` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorName` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "advantages" TEXT,
ADD COLUMN     "authorEmail" TEXT NOT NULL,
ADD COLUMN     "authorName" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT[],
ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "notifyOrReply" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "replyToId" TEXT,
ADD COLUMN     "videoUrl" TEXT[];

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_replyToId_fkey" FOREIGN KEY ("replyToId") REFERENCES "Review"("id") ON DELETE SET NULL ON UPDATE CASCADE;
