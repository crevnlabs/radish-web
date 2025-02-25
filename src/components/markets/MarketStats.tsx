import { memo } from 'react';
import { MarketStatsProps } from '@/types/market';

export const MarketStats = memo(({ volume, liquidity }: MarketStatsProps) => (
  <div className="flex w-full justify-between text-sm border-t pt-4 border-zinc-700">
    <div>
      <span className="font-medium">24h Volume:</span> ${volume}
    </div>
    <div>
      <span className="font-medium">Liquidity:</span> ${liquidity}
    </div>
  </div>
));

MarketStats.displayName = 'MarketStats'; 