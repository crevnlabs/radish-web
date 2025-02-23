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
  default: 3,
  1100: 3,
  700: 1,
  500: 1,
};

// Page Component
const MarketsPage = () => {
  const { markets, isLoading, error } = useMarkets();

  if (isLoading) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="text-center text-red-500">Error: {error.message}</div>
      </Layout>
    );
  }

  return (
    <Layout>
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
    </Layout>
  );
};

export default memo(MarketsPage);
