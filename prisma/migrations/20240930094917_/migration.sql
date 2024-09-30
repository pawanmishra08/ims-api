/*
  Warnings:

  - The primary key for the `items_organization` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "items_organization" DROP CONSTRAINT "items_organization_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "items_organization_pkey" PRIMARY KEY ("id");
