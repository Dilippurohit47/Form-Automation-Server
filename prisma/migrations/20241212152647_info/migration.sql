/*
  Warnings:

  - You are about to drop the column `city` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `experience` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `githubUrl` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `linkedInUrl` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `portfolioUrl` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "email",
DROP COLUMN "experience",
DROP COLUMN "firstName",
DROP COLUMN "fullName",
DROP COLUMN "githubUrl",
DROP COLUMN "lastName",
DROP COLUMN "linkedInUrl",
DROP COLUMN "phoneNumber",
DROP COLUMN "portfolioUrl",
DROP COLUMN "state",
ADD COLUMN     "information" TEXT[];
