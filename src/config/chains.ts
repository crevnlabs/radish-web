import { avalancheFuji, type Chain } from "viem/chains";

export type ChainConfig = {
  radishCore: `0x${string}`;
  mockERC20: `0x${string}`;
  noToken: `0x${string}`;
  yesToken: `0x${string}`;
  subgraphUrl: string;
};

type ChainConfigType = {
  [chainId: number]: {
    chain: Chain;
    contracts: ChainConfig;
  };
};

// Configuration object containing both chain configs and contract addresses
export const chainConfig: ChainConfigType = {
  // Avalanche Fuji
  [avalancheFuji.id]: {
    chain: avalancheFuji,
    contracts: {
      radishCore: "0xb0352D0c03852F4abac565d420046a4BB105b2D2",
      mockERC20: "0x182A62a168Ff361C21B6A7a180bF847ca0BB34ce",
      noToken: "0xb9fC506955C7b55c40Bed8554a6def33C305078E",
      yesToken: "0x2bFB96Ad6F7Da10ba90bb2aEC4550f0EC548C709",
      subgraphUrl:
        "https://api.studio.thegraph.com/query/73364/radish-fuji/version/latest",
    },
  },
};

// Helper to get supported chains
export const supportedChains = Object.values(chainConfig).map(
  (config) => config.chain
) as [Chain, ...Chain[]];

// Helper to get contract config for a chain
export const getContractsConfig = (
  chainId: number
): ChainConfig | undefined => {
  return chainConfig[chainId]?.contracts;
};

// For backward compatibility
export const contractsConfig: Record<number, ChainConfig> = Object.entries(
  chainConfig
).reduce(
  (acc, [chainId, config]) => ({
    ...acc,
    [chainId]: config.contracts,
  }),
  {} as Record<number, ChainConfig>
);
