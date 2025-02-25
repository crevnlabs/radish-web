import { useState, useEffect } from "react";
import { Trade } from "@/types/market";
import { request } from "graphql-request";
import { chainConfig } from "@/config/contracts";
import { mockTrades } from "@/constants/mockData";

export function useTrades(marketId: string, chainId: number) {
  const [trades, setTrades] = useState<Trade[]>(mockTrades);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchTrades = async () => {
    try {
      const data: any = await request(
        chainConfig[chainId].contracts.subgraphUrl,
        `
        query MyQuery {
          orders(where: { market: "${marketId}" }) {
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
      console.error("Fetch trades failed:", err);
      setError(err as Error);
      setTrades(mockTrades);
    }
  };

  useEffect(() => {
    fetchTrades();
  }, [marketId, chainId]);

  return { trades, isLoading, error, refetchTrades: fetchTrades };
}
