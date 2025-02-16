-- CreateTable
CREATE TABLE "Coin" (
    "id" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "supply" TEXT NOT NULL,
    "maxSupply" TEXT NOT NULL,
    "marketCapUsd" TEXT NOT NULL,
    "volumeUsd24Hr" TEXT NOT NULL,
    "priceUsd" TEXT NOT NULL,
    "changePercent24Hr" TEXT NOT NULL,
    "vwap24Hr" TEXT NOT NULL,
    "explorer" TEXT NOT NULL,

    CONSTRAINT "Coin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Coin_rank_key" ON "Coin"("rank");

-- CreateIndex
CREATE UNIQUE INDEX "Coin_symbol_key" ON "Coin"("symbol");
