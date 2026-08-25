/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CARD', 'BANK', 'MOBILE_BANKING', 'WALLET');

-- CreateEnum
CREATE TYPE "PaymentProvider" AS ENUM ('STRIPE', 'SSL_COMMERZ');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "bookings" (
    "bookingId" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    "technician_id" TEXT NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "bookingDate" TIMESTAMP(3) NOT NULL,
    "serviceAddress" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("bookingId")
);

-- CreateTable
CREATE TABLE "categories" (
    "categoryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("categoryId")
);

-- CreateTable
CREATE TABLE "Payment" (
    "paymentId" TEXT NOT NULL,
    "transaction_id" TEXT NOT NULL,
    "booking_id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "method" "PaymentMethod" NOT NULL,
    "provider" "PaymentProvider" NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paidAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("paymentId")
);

-- CreateTable
CREATE TABLE "reviews" (
    "reviewId" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "technician_id" TEXT NOT NULL,
    "reviewText" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("reviewId")
);

-- CreateTable
CREATE TABLE "services" (
    "serviceId" TEXT NOT NULL,
    "technician_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("serviceId")
);

-- CreateTable
CREATE TABLE "technician_profiles" (
    "technicianId" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "bio" TEXT,
    "location" TEXT,
    "experience" TEXT,
    "rating" DOUBLE PRECISION DEFAULT 0,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "technician_profiles_pkey" PRIMARY KEY ("technicianId")
);

-- CreateTable
CREATE TABLE "users" (
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CUSTOMER',
    "phone" TEXT,
    "address" TEXT,
    "isBanned" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_transaction_id_key" ON "Payment"("transaction_id");

-- CreateIndex
CREATE UNIQUE INDEX "technician_profiles_user_id_key" ON "technician_profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("serviceId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_technician_id_fkey" FOREIGN KEY ("technician_id") REFERENCES "technician_profiles"("technicianId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings"("bookingId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_technician_id_fkey" FOREIGN KEY ("technician_id") REFERENCES "technician_profiles"("technicianId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_technician_id_fkey" FOREIGN KEY ("technician_id") REFERENCES "technician_profiles"("technicianId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("categoryId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "technician_profiles" ADD CONSTRAINT "technician_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
