/*
  Warnings:

  - Changed the type of `notification` on the `UserSetting` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."UserSetting" DROP COLUMN "notification",
ADD COLUMN     "notification" BOOLEAN NOT NULL;
