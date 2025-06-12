-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_cryptoId_fkey" FOREIGN KEY ("cryptoId") REFERENCES "Coin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
