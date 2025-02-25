import { memo } from 'react';
import { Button } from "@/components/ui/button";
import { CustomConnectButton } from "@/components/ui/CustomConnectButton";
import { MarketHeaderProps } from '@/types/market';

const MarketHeaderComponent = ({
  title,
  creatorHandle,
  target,
  onMint,
  isMintPending,
  address
}: MarketHeaderProps) => (
  <div className="flex justify-between items-center border-b border-zinc-700 pb-5">
    <h1 className="text-5xl font-semibold text-black w-2/3">
      {title}
    </h1>
    <div className="text-right space-y-4">
      {creatorHandle && (
        <div className="text-3xl font-semibold text-black">
          Created by:{" "}
          {creatorHandle.slice(0, 4) + "..." + creatorHandle.slice(-4)}
        </div>
      )}
      {target && (
        <div className="text-xl text-zinc-400">
          Target: {(target / 1000000).toFixed(1)}M
        </div>
      )}
      <div className="flex justify-end gap-2 items-center">
        <Button
          variant={"outline"}
          disabled={!address || isMintPending}
          onClick={onMint}
        >
          Faucet xUSDC
        </Button>
        {!address && (
          <div className="justify-end">
            <CustomConnectButton dark />
          </div>
        )}
      </div>
    </div>
  </div>
);

MarketHeaderComponent.displayName = 'MarketHeader';

export const MarketHeader = memo(MarketHeaderComponent);
