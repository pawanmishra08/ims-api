-- CreateEnum
CREATE TYPE "organizationType" AS ENUM ('retail', 'wholesale');

-- CreateTable
CREATE TABLE "organizations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "organizationType" NOT NULL DEFAULT 'retail',
    "adress" TEXT,
    "phone" VARCHAR(15),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);
