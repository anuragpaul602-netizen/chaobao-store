-- CreateEnum
CREATE TYPE "ProductBadge" AS ENUM ('new', 'bestseller', 'trending', 'sale', 'limited');

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "pricePaise" INTEGER NOT NULL,
    "mrpPaise" INTEGER NOT NULL,
    "unitLabel" TEXT NOT NULL,
    "unitsPerCase" INTEGER NOT NULL,
    "grams" INTEGER,
    "isLiquid" BOOLEAN NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "reviewCount" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "badges" "ProductBadge"[],
    "image" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "countryOfOrigin" TEXT NOT NULL,
    "supplier" TEXT NOT NULL,
    "sourceCode" TEXT NOT NULL,
    "casePack" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE INDEX "Product_category_idx" ON "Product"("category");

-- CreateIndex
CREATE INDEX "Product_brand_idx" ON "Product"("brand");
