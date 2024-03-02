-- DropForeignKey
ALTER TABLE "Music" DROP CONSTRAINT "Music_playlistId_fkey";

-- AddForeignKey
ALTER TABLE "Music" ADD CONSTRAINT "Music_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
