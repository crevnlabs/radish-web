import { memo } from 'react';
import { PlatformIconProps } from '@/types/market';

export const PLATFORM_ICONS: Record<string, string> = {
  youtube: "📺",
  twitter: "🐦",
  tiktok: "📱",
  instagram: "📸",
  onchain: "⛓️",
};

export const PlatformIcon = memo(({ platform }: PlatformIconProps) => (
  <span className="mr-2">{PLATFORM_ICONS[platform || "onchain"]}</span>
)); 