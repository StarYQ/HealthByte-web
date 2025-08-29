/*
  Warnings:

  - A unique constraint covering the columns `[authId]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "authId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Patient_authId_key" ON "Patient"("authId");
