/*
  Warnings:

  - You are about to drop the column `isCanceled` on the `Billings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Billings" DROP COLUMN "isCanceled",
ADD COLUMN     "pendingPlan" "Plans";
