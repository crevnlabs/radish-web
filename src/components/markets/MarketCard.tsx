import { memo, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Market } from '@/types/market';
import { PlatformIcon } from './PlatformIcon';
import { PriceBox } from './PriceBox';
import { MarketDetails } from './MarketDetails';
import { MarketStats } from './MarketStats';

export const MarketCard = memo(({ market }: { market: Market }) => {
  const formattedMetrics = useMemo(() => ({
    currentMetric: market.currentMetric ? (market.currentMetric / 1000000).toFixed(1) : null,
    target: market.target ? (market.target / 1000000).toFixed(1) : null,
    volume: market.volume24h.toLocaleString(),
    liquidity: market.liquidity.toLocaleString(),
  }), [market]);

  return (
    <Link href={`/markets/${market.id}`} className="h-full">
      <motion.div
        whileHover={{
          y: 10,
          x: 10,
          filter: "invert(1) hue-rotate(20deg)",
        }}
        className="p-shadow p-6 w-full mb-6 flex flex-col items-center rounded bg-black text-white"
      >
        <div className="flex items-center mb-2">
          <PlatformIcon platform={market.platform} />
          <h2 className="text-xl font-semibold">{market.title}</h2>
        </div>

        {market.description && (
          <p className="mb-4 font-light text-zinc-400">{market.description}</p>
        )}

        <div className="grid grid-cols-2 gap-4 mb-4 w-full">
          <PriceBox 
            type="YES" 
            price={market.yesPrice} 
            className="bg-green-500/20" 
            textColor="text-green-700" 
          />
          <PriceBox 
            type="NO" 
            price={market.noPrice} 
            className="bg-red-500/20" 
            textColor="text-red-700" 
          />
        </div>

        <MarketDetails 
          market={market} 
          formattedMetrics={formattedMetrics} 
        />

        <MarketStats 
          volume={formattedMetrics.volume} 
          liquidity={formattedMetrics.liquidity} 
        />

        {market.isOnChain && (
          <div className="mt-4 text-sm text-green-400">
            On-chain Market ⛓️
          </div>
        )}
      </motion.div>
    </Link>
  );
}); 