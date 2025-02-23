"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Layout from "@/components/layouts/MainLayout";
import { useMarket, useMarketActions } from "@/hooks/useMarkets";
import { useTrades } from "@/hooks/useTrades";
import { useAccount, useWriteContract } from "wagmi";
import { useChainId } from "wagmi";
import { parseEther } from "viem";
import { readContract } from "@wagmi/core";
import { config } from "@/app/providers";
import { CONTRACT_ADDRESSES, ERC20_ABI, PREDICTION_MARKET_ABI } from "@/config/contracts";
import { MarketHeader } from "@/components/markets/detail/MarketHeader";
import { MarketChart } from "@/components/markets/detail/MarketChart";
import { TradingInterface } from "@/components/markets/detail/TradingInterface";
import { RecentTrades } from "@/components/markets/detail/RecentTrades";
import { ResolutionDialog } from "@/components/markets/detail/ResolutionDialog";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { CustomConnectButton } from "@/components/ui/CustomConnectButton";

export default function MarketPage() {
  const { id } = useParams();
  const chainId = useChainId();
  const { address } = useAccount();

  // Market data and actions
  const { market, isLoading: marketLoading, error: marketError } = useMarket(id as string);
  const { buy, sell, approve, resolve, isLoading: actionLoading, error: actionError } = useMarketActions(id as string);
  const { trades, refetchTrades } = useTrades(id as string, chainId);

  // Local state
  const [activeTab, setActiveTab] = useState("yes");
  const [amount, setAmount] = useState("");
  const [estimatedCost, setEstimatedCost] = useState(0);

  // Handlers
  const handleAmountChange = async (value: string) => {
    setAmount(value);
    if (!market?.contractAddress) return;

    const numericAmount = parseFloat(value) || 0;
    if (numericAmount === 0) {
      setEstimatedCost(0);
      return;
    }

    try {
      const cost = await readContract(config, {
        address: market.contractAddress as `0x${string}`,
        abi: PREDICTION_MARKET_ABI,
        functionName: "getCost",
        args: [activeTab === "yes", BigInt(numericAmount * 1e18)],
      });

      setEstimatedCost(Number(cost) / 1e18);
    } catch (error) {
      console.error("Error calculating cost:", error);
      setEstimatedCost(0);
    }
  };

  const handleTrade = async (tradeType: "buy" | "sell") => {
    if (!market?.contractAddress || !amount) return;
    try {
      const action = tradeType === "buy" ? buy : sell;
      await action(
        activeTab === "yes",
        parseFloat(amount),
        market.contractAddress as `0x${string}`
      );
      await refetchTrades();
    } catch (err) {
      console.error("Trade failed:", err);
    }
  };

  const handleApprove = async () => {
    if (!market?.contractAddress) return;
    try {
      await approve(market.contractAddress as `0x${string}`);
    } catch (err) {
      console.error("Approve failed:", err);
    }
  };

  const handleResolution = async (proof: string, resolution: boolean) => {
    if (!market?.contractAddress) return;
    try {
      await resolve(market.contractAddress as `0x${string}`, proof, resolution);
    } catch (err) {
      console.error("Resolution failed:", err);
    }
  };

  const {
    writeContractAsync: mint,
    isPending: mintIsPending,
  } = useWriteContract();

  const handleMint = async () => {
    if (!address) return;
    try {
      await mint({
        address: CONTRACT_ADDRESSES[chainId].mockERC20,
        abi: ERC20_ABI,
        functionName: "mint",
        chainId: chainId as any,
        args: [address as `0x${string}`, parseEther("1000")],
      });
    } catch (error) {
      console.error("Mint failed:", error);
    }
  };

  // Loading states
  if (marketLoading) return <Layout><LoadingSpinner /></Layout>;
  if (marketError) return <Layout><div className="text-center text-red-500">Error: {marketError.message}</div></Layout>;
  if (!market) return <Layout><div className="text-center">Market not found</div></Layout>;

  return (
    <Layout>
      <MarketHeader
        title={market.title}
        creatorHandle={market.creatorHandle}
        target={market.target}
        onMint={handleMint}
        isMintPending={mintIsPending}
        address={address}
      />

      <section className="mt-5">
        <div className="grid grid-cols-3 gap-8">
          <MarketChart
            marketId={market.id}
            trades={trades}
            activeTab={activeTab}
          />

          <div className="p-shadow p-6 rounded bg-black text-white">
            {!address ? (
              <div className="text-center space-y-4">
                <p className="text-zinc-400">Connect your wallet to trade</p>
                <CustomConnectButton dark />
              </div>
            ) : (
              <>
                <TradingInterface
                  market={market}
                  activeTab={activeTab}
                  onTrade={handleTrade}
                  onApprove={handleApprove}
                  onAmountChange={handleAmountChange}
                  onTabChange={setActiveTab}
                  amount={amount}
                  estimatedCost={estimatedCost}
                  isLoading={actionLoading}
                  error={actionError as Error | undefined}
                />

                {address.toLowerCase() === market.creatorHandle?.toLowerCase() && (
                  <ResolutionDialog
                    isLoading={actionLoading}
                    onResolve={handleResolution}
                  />
                )}
              </>
            )}
          </div>
        </div>

        <RecentTrades trades={trades} />
      </section>
    </Layout>
  );
}
