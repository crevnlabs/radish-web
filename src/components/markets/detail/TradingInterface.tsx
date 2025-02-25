import { memo } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TradingInterfaceProps } from '@/types/market';

export const TradingInterface = memo(({
  market,
  activeTab,
  onTrade,
  onApprove,
  onAmountChange,
  onTabChange,
  amount,
  estimatedCost,
  isLoading,
  error
}: TradingInterfaceProps) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold">{activeTab.toUpperCase()}</h1>
      <p className="text-zinc-400 text-xl font-semibold">
        {(Number(market.yesPrice.toFixed(3)) * 100)}% chance
      </p>
    </div>
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-2 bg-zinc-900">
        <TabsTrigger
          value="yes"
          className="text-zinc-300 data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
        >
          YES (${market.yesPrice.toFixed(3)})
        </TabsTrigger>
        <TabsTrigger
          value="no"
          className="text-zinc-300 data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400"
        >
          NO (${market.noPrice.toFixed(3)})
        </TabsTrigger>
      </TabsList>

      {/* Trading Form */}
      <div className="space-y-4 mt-6">
        <div>
          <label className="text-sm font-medium text-zinc-300">
            No of Shares
          </label>
          <Input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
          />
        </div>

        {/* Cost Information */}
        <div className="text-sm space-y-2">
          <div className="flex justify-between text-zinc-300">
            <span>Cost:</span>
            <span className="text-white">
              ${estimatedCost.toFixed(2)} USDC
            </span>
          </div>
          <div className="flex justify-between text-zinc-300">
            <span>Number of Shares:</span>
            <span className="text-white">{amount || "0"}</span>
          </div>
        </div>

        {/* Trading Buttons */}
        <Button
          onClick={onApprove}
          className="w-full text-white"
          variant={activeTab === "yes" ? "success" : "destructive"}
          disabled={isLoading}
        >
          {isLoading
            ? "Processing..."
            : `Approve Contract to Trade ${activeTab.toUpperCase()} Shares`}
        </Button>

        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => onTrade("buy")}
            className="w-full text-white"
            variant={activeTab === "yes" ? "success" : "destructive"}
            disabled={isLoading || !amount}
          >
            {isLoading ? "Processing..." : `Buy ${activeTab.toUpperCase()}`}
          </Button>
          <Button
            onClick={() => onTrade("sell")}
            className="w-full text-white"
            variant={activeTab === "yes" ? "success" : "destructive"}
            disabled={isLoading || !amount}
          >
            {isLoading ? "Processing..." : `Sell ${activeTab.toUpperCase()}`}
          </Button>
        </div>

        {error && (
          <p className="text-red-500 text-sm">
            Error: {error.message}
          </p>
        )}
      </div>
    </Tabs>
  </div>
));

TradingInterface.displayName = 'TradingInterface'; 