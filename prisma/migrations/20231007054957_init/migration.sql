-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "company" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sector" (
    "id" SERIAL NOT NULL,
    "sector" TEXT NOT NULL,

    CONSTRAINT "Sector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subsector" (
    "id" SERIAL NOT NULL,
    "subsector" TEXT NOT NULL,

    CONSTRAINT "Subsector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Segment" (
    "id" SERIAL NOT NULL,
    "segment" TEXT NOT NULL,

    CONSTRAINT "Segment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Realestatefund" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "ticker" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "sector_id" INTEGER NOT NULL,
    "subsector_id" INTEGER NOT NULL,
    "segment_id" INTEGER NOT NULL,
    "management" INTEGER NOT NULL,
    "management_f" TEXT NOT NULL,
    "dividend_yeld" DECIMAL(6,4) NOT NULL,
    "p_vp" DECIMAL(6,4) NOT NULL,
    "equity_share_value" DECIMAL(10,2) NOT NULL,
    "avg_daily_liquidity" DECIMAL(15,2) NOT NULL,
    "cash_percentage" DECIMAL(6,4) NOT NULL,
    "dividend_cagr" DECIMAL(6,4) NOT NULL,
    "share_cagr" DECIMAL(6,4) NOT NULL,
    "number_of_shareholders" DECIMAL(10,2) NOT NULL,
    "share_quantity" DECIMAL(10,2) NOT NULL,
    "patrimony" DECIMAL(15,2) NOT NULL,
    "last_dividend" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Realestatefund_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Refhistory" (
    "id" SERIAL NOT NULL,
    "realstatefund_id" INTEGER NOT NULL,
    "ticker" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "sector_id" INTEGER NOT NULL,
    "subsector_id" INTEGER NOT NULL,
    "segment_id" INTEGER NOT NULL,
    "management" INTEGER NOT NULL,
    "management_f" TEXT NOT NULL,
    "dividend_yeld" DECIMAL(6,4) NOT NULL,
    "p_vp" DECIMAL(6,4) NOT NULL,
    "equity_share_value" DECIMAL(10,2) NOT NULL,
    "avg_daily_liquidity" DECIMAL(15,2) NOT NULL,
    "cash_percentage" DECIMAL(6,4) NOT NULL,
    "dividend_cagr" DECIMAL(6,4) NOT NULL,
    "share_cagr" DECIMAL(6,4) NOT NULL,
    "number_of_shareholders" DECIMAL(10,2) NOT NULL,
    "share_quantity" DECIMAL(10,2) NOT NULL,
    "patrimony" DECIMAL(15,2) NOT NULL,
    "last_dividend" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Refhistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Realestatefund" ADD CONSTRAINT "Realestatefund_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Realestatefund" ADD CONSTRAINT "Realestatefund_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "Sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Realestatefund" ADD CONSTRAINT "Realestatefund_subsector_id_fkey" FOREIGN KEY ("subsector_id") REFERENCES "Subsector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Realestatefund" ADD CONSTRAINT "Realestatefund_segment_id_fkey" FOREIGN KEY ("segment_id") REFERENCES "Segment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Refhistory" ADD CONSTRAINT "Refhistory_realstatefund_id_fkey" FOREIGN KEY ("realstatefund_id") REFERENCES "Realestatefund"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Refhistory" ADD CONSTRAINT "Refhistory_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "Sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Refhistory" ADD CONSTRAINT "Refhistory_subsector_id_fkey" FOREIGN KEY ("subsector_id") REFERENCES "Subsector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Refhistory" ADD CONSTRAINT "Refhistory_segment_id_fkey" FOREIGN KEY ("segment_id") REFERENCES "Segment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
