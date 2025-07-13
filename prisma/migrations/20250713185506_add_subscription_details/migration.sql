/*
  Warnings:

  - Added the required column `currency` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `frequency` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Subscription_userId_planId_key";

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "category" TEXT,
ADD COLUMN     "currency" TEXT NOT NULL,
ADD COLUMN     "frequency" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "paymentMethod" TEXT,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "planId" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'ACTIVE',
ALTER COLUMN "payments" DROP NOT NULL;
