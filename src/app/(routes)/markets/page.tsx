"use client";

import { memo } from "react";
import Layout from "@/components/layouts/MainLayout";
import Masonry from "react-masonry-css";
import { useMarkets } from "@/hooks/useMarkets";
import { MarketCard } from "@/components/markets/MarketCard";
import { Header } from "@/components/markets/Header";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

// Constants
const MASONRY_BREAKPOINTS = {
  default: 1,
  1100: 1,
  700: 1,
  500: 1,
};

// Page Component
const MarketsPage = () => {
  const { markets = [], isLoading, error } = useMarkets();

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-[60vh]">
          <LoadingSpinner />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="text-center text-violet-500">Error: {error.message}</div>
      </Layout>
    );
  }

  if (!markets || markets.length === 0) {
    return (
      <Layout>
        <div className="text-center text-gray-500 mt-8">No markets available</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="m-10">
        <Header />
        <Masonry
          breakpointCols={MASONRY_BREAKPOINTS}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column p-wall-tilt"
        >
          {markets.map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </Masonry>
      </main>
    </Layout>
  );
};

export default memo(MarketsPage);
