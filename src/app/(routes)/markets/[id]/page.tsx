"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import Layout from "@/components/layouts/MainLayout";
import { useMarket, useMarketActions } from "@/hooks/useMarkets";
import { useAccount, useWriteContract } from "wagmi";
import { CustomConnectButton } from "@/components/ui/CustomConnectButton";
import { request, gql } from "graphql-request";
import {
  CONTRACT_ADDRESSES,
  ERC20_ABI,
  PREDICTION_MARKET_ABI,
  SUBGRAPH_URL,
} from "@/config/contracts";
import { useChainId } from "wagmi";
import { parseEther } from "viem";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Label } from "@/components/ui/label";
import { readContract } from "@wagmi/core";
import { config } from "@/app/providers";
import { Trade } from "@/types/market";
import { MarketHeader } from "@/components/markets/detail/MarketHeader";
import { MarketChart } from "@/components/markets/detail/MarketChart";
import { TradingInterface } from "@/components/markets/detail/TradingInterface";
import { RecentTrades } from "@/components/markets/detail/RecentTrades";
import { ResolutionDialog } from "@/components/markets/detail/ResolutionDialog";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

// Dynamically import TradingView chart to avoid SSR issues
const TradingViewWidget = dynamic(
  () => import("@/components/TradingViewWidget"),
  { ssr: false }
);

// Mock trades data for demo purposes
const mockTrades: Trade[] = [
  {
    type: "buy",
    outcome: "yes",
    amount: 1000,
    price: 0.65,
    timestamp: "2023-12-24 10:30",
    trader: "0x1234...5678",
  },
  {
    type: "sell",
    outcome: "no",
    amount: 500,
    price: 0.35,
    timestamp: "2023-12-24 09:15",
    trader: "0x8765...4321",
  },
  {
    type: "buy",
    outcome: "yes",
    amount: 2000,
    price: 0.64,
    timestamp: "2023-12-23 22:45",
    trader: "0x9876...1234",
  },
];

export default function MarketPage() {
  const { id } = useParams();
  const chainId = useChainId();
  const { address } = useAccount();
  const {
    market,
    isLoading: marketLoading,
    error: marketError,
  }: { market: any; isLoading: boolean; error: any } = useMarket(id as string);
  const {
    buy,
    sell,
    approve,
    resolve,
    isLoading: actionLoading,
    error: actionError,
  }: {
    buy: any;
    sell: any;
    approve: any;
    resolve: any;
    isLoading: boolean;
    error: any;
  } = useMarketActions(id as string);
  const [activeTab, setActiveTab] = useState("yes");
  const [amount, setAmount] = useState("");
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [maxCost, setMaxCost] = useState(0);
  const [trades, setTrades] = useState<Trade[]>(mockTrades);
  const [resolveValue, setResolveValue] = useState("Yes");
  const [proof, setProof] = useState("");

  const getMarketPrice = (type: string) => {
    if (type === "yes") {
      return market.yesPrice;
    } else {
      return market.noPrice;
    }
  };

  const fetchData = async () => {
    try {
      const data: any = await request(
        SUBGRAPH_URL[chainId],
        `
                query MyQuery {
                                orders(where: { market: "${id}" }) {
                                    id
                                    amount
                                    price
                                    timestamp
                                    tokenType
                                    type
                                    user {
      id
    }
                                }
                                }
                `
      );
      console.log(data.orders);
      const latestTrades = data.orders.map((order: any) => ({
        type: order.type.toLowerCase(),
        outcome: order.tokenType.toLowerCase(),
        amount: order.amount / 10 ** 18,
        price: order.price / 10 ** 18,
        timestamp: new Date(Number(order.timestamp) * 1000).toISOString(),
        trader: order.user.id,
      }));
      setTrades(latestTrades);
    } catch (err) {
      console.error("Fetch data failed:", err);
      setTrades(mockTrades);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleAmountChange = async (value: string) => {
    setAmount(value);
    if (!market) return;

    const numericAmount = parseFloat(value) || 0;

    if (numericAmount !== 0) {
      try {
        console.log("market", market);
        // Get the actual cost from the smart contract for both yes and no tokens
        const cost = await readContract(config, {
          address: market.contractAddress,
          abi: PREDICTION_MARKET_ABI,
          functionName: "getCost",
          args: [activeTab === "yes", BigInt(numericAmount * 1e18)],
        });

        // Convert the returned cost from wei to USDC (18 decimals)
        const actualCost = Number(cost) / 1e18;

        console.log("actualCost", actualCost);
        // Update both estimated and max cost to be the same since this is the actual cost
        setEstimatedCost(actualCost);
        setMaxCost(actualCost);

      } catch (error) {
        console.error("Error calculating cost:", error);
        setEstimatedCost(0);
        setMaxCost(0);
      }
    } else {
      setEstimatedCost(0);
      setMaxCost(0);
    }
  };

  const handleTrade = async (tradeType: "buy" | "sell") => {
    if (!market || !amount) return;
    try {
      if (tradeType === "buy") {
        if (activeTab === "yes") {
          await buy(true, parseFloat(amount), market.contractAddress);
        } else {
          await buy(false, parseFloat(amount), market.contractAddress);
        }
      } else {
        if (activeTab === "yes") {
          await sell(true, parseFloat(amount), market.contractAddress);
        } else {
          await sell(false, parseFloat(amount), market.contractAddress);
        }
      }
      await fetchData();
    } catch (err) {
      console.error("Trade failed:", err);
    }
  };

  const handleApprove = async () => {
    console.log("market", market);
    if (!market) return;

    try {
      console.log("approving");

      console.log("market.contractAddress", market.contractAddress);
      
      const res = await approve(market.contractAddress);
      console.log("res", res);
    } catch (err) {
      console.error("Approve failed:", err);
    }
  };

  const handleResolution = async (proof: string, resolution: boolean) => {
    if (!market) return;
    try {
      await resolve(market.contractAddress, proof, resolution);
    } catch (err) {
      console.error("Resolution failed:", err);
    }
  };
  const {
    writeContractAsync: mint,
    isPending: mintIsPending,
    error: mintError,
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

  if (marketLoading) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  if (marketError) {
    return (
      <Layout>
        <div className="text-center text-red-500">
          Error: {marketError.message}
        </div>
      </Layout>
    );
  }

  if (!market) {
    return (
      <Layout>
        <div className="text-center">Market not found</div>
      </Layout>
    );
  }

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
                  error={actionError}
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
