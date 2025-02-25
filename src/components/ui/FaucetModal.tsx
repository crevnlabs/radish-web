"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Droplets, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { isAddress, formatEther } from "viem";
import { chainConfig, } from "@/config/contracts";
import ERC20_ABI from "@/config/abis/ERC20";
import {
    useAccount,
    useChainId,
    useWriteContract,
    useWatchContractEvent,
    useContractRead,
} from "wagmi";
import { addTokenToWallet } from "@/lib/addTokenToWallet";

// Configuration constants
const MINT_AMOUNT = BigInt(10e18); // 10 tokens

interface FaucetModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function FaucetModal({ open, onOpenChange }: FaucetModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const chainId = useChainId();
    const { address } = useAccount();
    const {
        writeContract,
        data: mintHash,
        isPending: isMinting,
        error: mintError,
    } = useWriteContract();

    const {
        writeContract: approveContract,
        isPending: isApproving,
        error: approveError,
    } = useWriteContract();

    // Get token balance
    const { data: balance } = useContractRead({
        address: chainConfig[chainId].contracts.mockERC20,
        abi: ERC20_ABI,
        functionName: "balanceOf",
        args: address ? [address] : undefined,
    }) as { data: bigint | undefined };

    // Handle mint errors
    useEffect(() => {
        if (mintError) {
            console.error(mintError);
            toast.error(
                mintError?.message || "Failed to process transaction. Please try again."
            );
            setIsLoading(false);
        }
    }, [mintError]);

    // Watch for Transfer events
    useWatchContractEvent({
        address: chainConfig[chainId].contracts.mockERC20,
        abi: ERC20_ABI,
        eventName: "Transfer",
        onLogs(logs) {
            const event = logs[0];
            if (event && event.transactionHash) {
                toast.success(
                    <div className="space-y-2">
                        <div>Tokens minted successfully!</div>
                        <div className="flex flex-col gap-2">
                            <a
                                href={`${chainConfig[chainId].contracts.blockExplorerUrl}/tx/${event.transactionHash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-primary hover:underline"
                            >
                                View transaction <ExternalLink className="h-4 w-4" />
                            </a>
                            <button
                                onClick={() => addTokenToWallet(chainId)}
                                className="flex items-center gap-1 text-primary hover:underline"
                            >
                                Add WARP to wallet <ExternalLink className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                );
                setIsLoading(false);
                onOpenChange(false);
            }
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const contractConfig = chainConfig[chainId].contracts;
        if (
            !contractConfig?.mockERC20 ||
            !isAddress(contractConfig.mockERC20)
        ) {
            toast.info("Contract not deployed on this network");
            return;
        }

        setIsLoading(true);
        if (address) {
            writeContract({
                address: contractConfig.mockERC20,
                abi: ERC20_ABI,
                functionName: "mint",
                args: [address, MINT_AMOUNT],
            });
        } else {
            toast.info("Please connect your wallet to continue");
        }
        console.log(mintHash);
    };

    const approveToken = async () => {
        const approve = await approveContract({
            address: chainConfig[chainId].contracts.mockERC20,
            abi: ERC20_ABI,
            functionName: "approve",
            args: [chainConfig[chainId].contracts.radishCore, MINT_AMOUNT],
        });

        console.log(approve);
    };

    useEffect(() => {
        if (mintHash) {
            approveToken();
        }
    }, [mintHash]);

    const formattedBalance = Number(formatEther(balance || BigInt(0))).toFixed(2);

    // Show warning toast and open faucet modal when balance is 0
    useEffect(() => {
        if (address && balance === BigInt(0)) {
            toast.warning(
                "You need WARP tokens to interact with the platform. Please use the faucet to get started.",
                {
                    duration: 6000,
                }
            );
            onOpenChange(true); // Automatically open the faucet modal
        }
    }, [address, balance, onOpenChange]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="hidden md:flex items-center gap-2 border-neo-green text-neo-green hover:bg-neo-green hover:text-black"
                >
                    <Droplets className="w-4 h-4" />
                    <span>{formattedBalance} USDC</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-black/90 backdrop-blur-xl border-zinc-800 ring-1 ring-white/10">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 justify-center text-2xl">
                        <Droplets className="w-6 h-6 text-neo-green" />
                        <span className="bg-gradient-to-r from-neo-green to-red-300 text-transparent bg-clip-text">
                            USDC Token Faucet
                        </span>
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        {balance === BigInt(0) && (
                            <div className="p-4 rounded-lg bg-neo-green/10 border border-neo-green/20 text-neo-green">
                                <p className="text-sm font-medium">
                                    You need testnet tokens to interact with the platform. These tokens are required for:
                                </p>
                                <ul className="mt-2 text-sm list-disc list-inside">
                                    <li>Creating a market</li>
                                    <li>Betting on a market</li>
                                    <li>Accessing the platform features</li>
                                </ul>
                            </div>
                        )}
                        <Input
                            value={address || ""}
                            disabled={true}
                            placeholder="Connect your wallet to continue"
                            className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-neo-green text-black hover:bg-neo-green/90 font-semibold transition-all duration-300"
                        disabled={isLoading || isMinting}
                    >
                        {isMinting ? (
                            <div className="flex items-center justify-center">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Confirm in Wallet...
                            </div>
                        ) : (
                            "Request Tokens"
                        )}
                    </Button>

                    <div className="text-center text-sm text-zinc-400">
                        <p>Maximum request: 10 USDC per day</p>
                        <p className="mt-1">
                            Please allow a few moments for the transaction to process
                        </p>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
