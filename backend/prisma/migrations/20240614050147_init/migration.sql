/*
  Warnings:

  - You are about to drop the column `electionId` on the `Candidate` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_electionId_fkey";

-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "electionId";
