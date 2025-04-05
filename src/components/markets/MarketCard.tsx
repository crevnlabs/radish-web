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
          y: -5,
          filter: "brightness(1.1)",
        }}
        className="flex p-shadow p-6 w-full mb-6 items-center rounded bg-black text-white hover:shadow-lg transition-all duration-200"
      >
        <div className="flex flex-col gap-2 mb-4 w-full">
          <div className="flex items-center gap-2 mb-4 w-full">
            <PlatformIcon platform={market.platform} />
            <h2 className="text-4xl font-semibold flex-1">{market.title}</h2>
          </div>

          {market.description && (
            <p className="mb-4 font-light text-2xl text-zinc-400 w-full">{market.description}</p>
          )}
        </div>

        <div className="flex flex-col">
          <div className="grid grid-cols-2 gap-4 mb-4 w-full">
            <PriceBox
              type="YES"
              price={market.yesPrice}
              className="bg-green-500/20 text-2xl"
              textColor="text-green-700"
            />
            <PriceBox
              type="NO"
              price={market.noPrice}
              className="bg-violet-500/20 text-2xl"
              textColor="text-violet-700"
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
        </div>

        {market.isOnChain && (
          <div className="mt-4 text-sm text-green-400">
            On-chain Market ⛓️
          </div>
        )}
      </motion.div>
    </Link>
  );
});

MarketCard.displayName = 'MarketCard'; 