-- DropForeignKey
ALTER TABLE "users_on_consultors" DROP CONSTRAINT "users_on_consultors_consultorId_fkey";

-- DropForeignKey
ALTER TABLE "users_on_consultors" DROP CONSTRAINT "users_on_consultors_customerId_fkey";

-- AddForeignKey
ALTER TABLE "users_on_consultors" ADD CONSTRAINT "users_on_consultors_consultorId_fkey" FOREIGN KEY ("consultorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_on_consultors" ADD CONSTRAINT "users_on_consultors_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
