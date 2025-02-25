import { memo } from 'react';
import { Trade } from '@/types/market';

interface RecentTradesProps {
  trades: Trade[];
}

export const RecentTrades = memo(({ trades }: RecentTradesProps) => (
  <div className="mt-8 p-shadow p-6 rounded bg-black text-white">
    <h3 className="font-semibold text-lg mb-4">Recent Trades</h3>
    <div className="space-y-2">
      {trades.map((trade, index) => (
        <div
          key={index}
          className="flex justify-between items-center text-sm p-3 rounded bg-zinc-900"
        >
          <div>
            <span
              className={
                trade.type === "buy" ? "text-green-400" : "text-red-400"
              }
            >
              {trade.type.toUpperCase()} {trade.outcome.toUpperCase()}
            </span>
            <span className="text-zinc-400 ml-2">by {trade.trader}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white">
              ${trade.amount.toLocaleString()} USDC
            </span>
            <span className="text-zinc-400">{trade.timestamp}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
));

RecentTrades.displayName = 'RecentTrades'; 