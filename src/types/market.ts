export interface Market {
  id: string;
  title: string;
  description?: string;
  platform?: string;
  metric?: string;
  currentMetric?: number;
  target?: number;
  yesPrice: number;
  noPrice: number;
  volume24h: number;
  liquidity: number;
  endDate: string;
  creatorHandle?: string;
  isOnChain: boolean;
}

export interface PlatformIconProps {
  platform?: string;
}

export interface MarketDetailsProps {
  market: Market;
  formattedMetrics: {
    currentMetric: string | null;
    target: string | null;
    volume: string;
    liquidity: string;
  };
}

export interface PriceBoxProps {
  type: string;
  price: number;
  className: string;
  textColor: string;
}

export interface MarketStatsProps {
  volume: string;
  liquidity: string;
} 