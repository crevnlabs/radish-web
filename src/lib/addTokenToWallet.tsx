import { contractsConfig } from "@/config/contracts";
import { toast } from "sonner";


export const addTokenToWallet = async (chainId: number) => {

    try {
        // @ts-ignore - window.ethereum is injected by the wallet
        const ethereum = window.ethereum;
        if (ethereum) {

            await ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20',
                    options: {
                        address: contractsConfig[chainId]?.mockERC20,
                        symbol: 'USDC',
                        decimals: 18,
                    },
                },
            });
            toast.success('WARP token added to your wallet!');
        }
    } catch (error) {
        console.error('Error adding token to wallet:', error);
        toast.error('Failed to add token to wallet. Please try adding it manually.');
    }
};