/*
  Warnings:

  - Changed the type of `expirationTime` on the `ResetPasswordCodes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ResetPasswordCodes" DROP COLUMN "expirationTime",
ADD COLUMN     "expirationTime" TIMESTAMP(3) NOT NULL;
