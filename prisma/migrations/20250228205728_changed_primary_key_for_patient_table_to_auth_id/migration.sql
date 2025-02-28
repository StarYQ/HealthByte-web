/*
  Warnings:

  - The primary key for the `Patient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Patient` table. All the data in the column will be lost.
  - The primary key for the `_CliniciansOnPatients` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_CliniciansOnPatients" DROP CONSTRAINT "_CliniciansOnPatients_A_fkey";

-- DropIndex
DROP INDEX "Patient_authId_key";

-- AlterTable
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Patient_pkey" PRIMARY KEY ("authId");

-- AlterTable
ALTER TABLE "_CliniciansOnPatients" DROP CONSTRAINT "_CliniciansOnPatients_AB_pkey",
ALTER COLUMN "A" SET DATA TYPE TEXT,
ADD CONSTRAINT "_CliniciansOnPatients_AB_pkey" PRIMARY KEY ("A", "B");

-- AddForeignKey
ALTER TABLE "_CliniciansOnPatients" ADD CONSTRAINT "_CliniciansOnPatients_A_fkey" FOREIGN KEY ("A") REFERENCES "Patient"("authId") ON DELETE CASCADE ON UPDATE CASCADE;
