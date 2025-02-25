"use client";

import { useAccount, useChainId } from "wagmi";
import Masonry from "react-masonry-css";
import Layout from "@/components/layouts/MainLayout";
import { PredictionCard } from "@/components/predictions/PredictionCard";
import { usePredictions } from "@/hooks/usePredictions";
import { EmptyState } from "./components/EmptyState";
import { LoadingState } from "./components/LoadingState";

const MASONRY_BREAKPOINTS = {
  default: 3,
  1100: 3,
  700: 1,
  500: 1,
} as const;

export default function MyPredictionsPage() {
  const { address } = useAccount();
  const chainId = useChainId();
  const { predictions, isLoading, isClaiming, handleClaim } = usePredictions(address, chainId);

  console.log({ predictions, isLoading });

  if (isLoading) return (
    <Layout>
      <LoadingState />
    </Layout>
  );

  if (!predictions || predictions.length === 0) return (
    <Layout>
      <EmptyState />
    </Layout>
  );

  return (
    <Layout>
      <main className="m-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0 mb-8 border-b border-gray-200 pb-8">
          <h1 className="text-4xl md:text-6xl font-semibold text-center md:text-left">
            Your positions
          </h1>
          <div className="flex flex-col items-center md:items-end gap-4">
            <h3 className="text-xl md:text-3xl font-semibold text-center md:text-right">
              Track your bets and earnings 💰
            </h3>
          </div>
        </div>

        <Masonry
          breakpointCols={MASONRY_BREAKPOINTS}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column p-wall-tilt"
        >
          {predictions.map((prediction) => (
            <div key={prediction.marketId}>
              <PredictionCard
                prediction={prediction}
                onClaim={handleClaim}
                isClaiming={isClaiming}
              />
            </div>
          ))}
        </Masonry>
      </main>
    </Layout>
  );
}
