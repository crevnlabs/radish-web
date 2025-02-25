import { memo } from 'react';
import { MarketDetailsProps } from '@/types/market';

export const MarketDetails = memo(({ market, formattedMetrics }: MarketDetailsProps) => (
  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
    {market.creatorHandle && (
      <div>
        <span className="font-medium">Creator:</span> {market.creatorHandle}
      </div>
    )}
    {formattedMetrics.currentMetric && (
      <div>
        <span className="font-medium">Current {market.metric}:</span>{" "}
        {formattedMetrics.currentMetric}M
      </div>
    )}
    {formattedMetrics.target && (
      <div>
        <span className="font-medium">Target:</span> {formattedMetrics.target}M
      </div>
    )}
    <div>
      <span className="font-medium">End Date:</span> {market.endDate}
    </div>
  </div>
));

MarketDetails.displayName = 'MarketDetails'; 