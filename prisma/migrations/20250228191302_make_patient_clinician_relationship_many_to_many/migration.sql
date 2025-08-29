/*
  Warnings:

  - You are about to drop the column `clinicianId` on the `Patient` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_clinicianId_fkey";

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "clinicianId";

-- CreateTable
CREATE TABLE "_CliniciansOnPatients" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_CliniciansOnPatients_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CliniciansOnPatients_B_index" ON "_CliniciansOnPatients"("B");

-- AddForeignKey
ALTER TABLE "_CliniciansOnPatients" ADD CONSTRAINT "_CliniciansOnPatients_A_fkey" FOREIGN KEY ("A") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CliniciansOnPatients" ADD CONSTRAINT "_CliniciansOnPatients_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
