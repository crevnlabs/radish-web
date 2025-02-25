import { memo } from 'react';
import dynamic from "next/dynamic";
import { Trade } from '@/types/market';

const TradingViewWidget = dynamic(
  () => import("@/components/TradingViewWidget"),
  { ssr: false }
);

interface MarketChartProps {
  marketId: string;
  trades: Trade[];
  activeTab: string;
}

export const MarketChart = memo(({ marketId, trades, activeTab }: MarketChartProps) => {
  const filteredTrades = trades.filter((t) => t.outcome === activeTab);

  return (
    <div className="col-span-2 p-shadow p-6 rounded bg-black text-white">
      <div className="h-[400px]">
        <TradingViewWidget
          marketId={marketId}
          trades={filteredTrades}
        />
      </div>
    </div>
  );
});

MarketChart.displayName = 'MarketChart'; 