/*
  Warnings:

  - The primary key for the `items_organization` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `items_organization` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "items_organization" DROP CONSTRAINT "items_organization_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "items_organization_pkey" PRIMARY KEY ("item_id", "organization_id");

-- CreateTable
CREATE TABLE "customervendors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "email" TEXT,
    "phone" VARCHAR,
    "street" TEXT,
    "city" TEXT,
    "district" TEXT,
    "province" TEXT,
    "isVendor" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customervendors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customervendors_email_key" ON "customervendors"("email");
