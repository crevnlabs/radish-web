'use client'

import { WagmiProvider, http } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConnectKitProvider } from "connectkit";
import { RainbowKitProvider, getDefaultConfig, darkTheme } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'


const lensTestnet = {
    id: 37111,
    name: 'Lens Network Sepolia Testnet',
    network: 'lens-testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'GRASS',
        symbol: 'GRASS',
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.testnet.lens.dev'],
        },
        public: {
            http: ['https://rpc.testnet.lens.dev'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Block Explorer',
            url: 'https://block-explorer.testnet.lens.dev',
        },
    },
} as const


export const config = getDefaultConfig({
    appName: 'Radish',
    projectId: '066465a4f5d400c9eccad76612f98c5a', // Get one at https://cloud.walletconnect.com
    chains: [lensTestnet],
    transports: {

        [lensTestnet.id]: http(),
    }
})

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider theme={darkTheme({
                    accentColor: "#111111",
                    accentColorForeground: "white",
                    borderRadius: "medium",
                    fontStack: "system",
                    overlayBlur: "small",
                })} initialChain={lensTestnet}>
                    <ConnectKitProvider>{children}</ConnectKitProvider>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
} 