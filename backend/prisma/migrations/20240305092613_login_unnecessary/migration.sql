-- DropIndex
DROP INDEX "User_login_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "login" DROP NOT NULL;
