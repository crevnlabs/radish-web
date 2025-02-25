import { useState, useEffect } from "react";
import { writeContract } from "@wagmi/core";
import { config } from "@/app/providers";
import { PREDICTION_MARKET_ABI } from "@/config/contracts";
import { getUserMarkets } from "@/hooks/getUserMarket";
// import { mockPredictions } from "@/constants/mockData";
import type { Prediction } from "@/types/market";

export function usePredictions(address: string | undefined, chainId: number) {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  const fetchPredictions = async () => {
    if (!address) return;
    setIsLoading(true);

    try {
      console.log(address, chainId);
      const data = await getUserMarkets(address, chainId);
      console.log(data);
      const parsedPredictions = data.marketsParticipated.map((market: any) => ({
        marketId: market.market.id,
        marketTitle: market.market.question,
        prediction:
          parseFloat(market.yesInMarket) /
          (parseFloat(market.market.totalYes) +
            parseFloat(market.market.totalNo)),
        timestamp: new Date().toISOString(),
        endDate: market.market.endDate,
        currentProbability:
          parseFloat(market.market.totalYes) /
          (parseFloat(market.market.totalYes) +
            parseFloat(market.market.totalNo)),
        resolved: market.market.resolved,
        contractAddress: market.market.marketContract,
        position: market.market.won
          ? (market.yesInMarket *
              (market.market.totalYes + market.market.totalNo)) /
            market.market.totalYes /
            1e18
          : (market.noInMarket *
              (market.market.totalYes + market.market.totalNo)) /
            market.market.totalNo /
            1e18,
      }));

      setPredictions([...parsedPredictions]);
    } catch (error) {
      console.error("Failed to fetch predictions:", error);
      setPredictions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClaim = async (prediction: Prediction) => {
    setIsClaiming(true);
    try {
      await writeContract(config, {
        address: prediction.contractAddress as `0x${string}`,
        abi: PREDICTION_MARKET_ABI,
        functionName: "claimReward",
      });
    } catch (error) {
      console.error("Failed to claim:", error);
    } finally {
      setIsClaiming(false);
    }
  };

  useEffect(() => {
    fetchPredictions();
  }, [address, chainId]);

  return {
    predictions,
    isLoading,
    isClaiming,
    handleClaim,
  };
}
