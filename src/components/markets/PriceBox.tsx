import { memo } from 'react';
import { PriceBoxProps } from '@/types/market';

export const PriceBox = memo(({ type, price, className, textColor }: PriceBoxProps) => (
  <div className={className + " p-3"}>
    <div className="text-sm font-medium">{type} Price</div>
    <div className={`text-3xl text-white font-bold ${textColor}`}>
      ${price.toFixed(3)}
    </div>
  </div>
));

PriceBox.displayName = 'PriceBox'; 