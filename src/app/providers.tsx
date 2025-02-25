"use client";

import { WagmiProvider, http } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RainbowKitProvider,
  getDefaultConfig,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { avalancheFuji } from "viem/chains";
import { ThemeProvider as NextThemesProvider } from "next-themes"


export const config = getDefaultConfig({
  appName: "Radish",
  projectId: "066465a4f5d400c9eccad76612f98c5a", // Get one at https://cloud.walletconnect.com/app
  chains: [avalancheFuji],
  transports: {
    [avalancheFuji.id]: http(),
  },
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={lightTheme({
            accentColor: "#7CFC00", // Light green accent color
            accentColorForeground: "black",
            borderRadius: "medium",
            fontStack: "system",
            overlayBlur: "small",
          })}
          initialChain={avalancheFuji}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
