import { memo } from 'react';
import { CustomConnectButton } from "@/components/ui/CustomConnectButton";

export const Header = memo(() => (
  <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0 mb-8 border-b border-gray-200 pb-8">
    <h1 className="text-4xl md:text-6xl font-bold text-center md:text-left">
      Rad or Not?
    </h1>
    <div className="space-y-4 text-center md:text-right">
      <h3 className="text-xl md:text-3xl font-semibold">
        Bet on your favorite creators and earn 💸
      </h3>
      <div className="flex justify-center md:justify-end">
        <CustomConnectButton dark />
      </div>
    </div>
  </div>
)); 