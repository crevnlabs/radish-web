"use client";

import Link from "next/link";
import { CustomConnectButton } from "@/components/ui/CustomConnectButton";
import { useAccount, useChainId } from "wagmi";
import { readContract } from "@wagmi/core";
import { useEffect, useState } from "react";
import { config } from "@/app/providers";
import { chainConfig } from "@/config/contracts";
import SwitchNetwork from "@/app/SwitchNetwork";
import ERC20_ABI from "@/config/abis/ERC20";
import FaucetModal from "../ui/FaucetModal";


export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { address } = useAccount();
    const chainId = useChainId();
    const [balance, setBalance] = useState(0.0);
    const [faucetOpen, setFaucetOpen] = useState(false);

    useEffect(() => {
        if (address) {
            const fetchBalance = async () => {
                const balance = await readContract(config, {
                    address: chainConfig[chainId].contracts.mockERC20,
                    abi: ERC20_ABI,
                    functionName: "balanceOf",
                    args: [address],
                });
                setBalance(parseFloat(balance.toString()) / 1e18);
            };

            fetchBalance();
        }
    }, [address, chainId]);

    return (
        <div className="min-h-screen bg-white">
            <header className="bg-black text-white py-2 p-shadow relative z-50">
                <div className="mx-10 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <Link href="/">
                                <h1 className="font-bold text-3xl flex items-center gap-2">
                                    <span className="text-neo-green hue-rotate-180">📈🥕</span>
                                    <span className="text-neo-green">RADISH</span>
                                </h1>
                            </Link>
                            <div className="bg-yellow-600 text-black text-xs font-semibold px-2 py-1 rounded-md ml-2">
                                TESTNET
                            </div>
                            <nav className="hidden md:flex items-center gap-6 ml-8">
                                <Link href="/markets">
                                    <span className="text-white hover:text-neo-green transition-colors">
                                        Markets
                                    </span>
                                </Link>
                                <Link href="/create">
                                    <span className="text-white hover:text-neo-green transition-colors">
                                        Create
                                    </span>
                                </Link>
                                <Link href="/my-predictions">
                                    <span className="text-white hover:text-neo-green transition-colors">
                                        My Positions
                                    </span>
                                </Link>
                            </nav>
                        </div>
                        <div className="flex items-center gap-4">
                            <FaucetModal open={faucetOpen} onOpenChange={setFaucetOpen} />
                            <SwitchNetwork />
                            <CustomConnectButton />
                        </div>
                    </div>
                </div>
            </header>

            <main className="mx-auto min-h-[calc(100vh-300px)]">
                {children}
            </main>

            <footer className="bg-black text-white">
                <div className="container mx-auto py-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ml-20">
                        <div>
                            <h3 className="font-bold text-3xl mb-2">RADISH</h3>
                            <p className="text-gray-400">
                                Prediction markets for creators and their fans, earn rewards for
                                betting on your favorite creators.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-xl mb-4">Links</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/markets">
                                        <span className="text-gray-400 hover:text-neo-green transition-colors">
                                            Markets
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/create">
                                        <span className="text-gray-400 hover:text-neo-green transition-colors">
                                            Create Market
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/my-predictions">
                                        <span className="text-gray-400 hover:text-neo-green transition-colors">
                                            My Positions
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-xl mb-4">Community</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a
                                        href="https://twitter.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-neo-green transition-colors"
                                    >
                                        Twitter
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://discord.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-neo-green transition-colors"
                                    >
                                        Discord
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://github.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-neo-green transition-colors"
                                    >
                                        GitHub
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>
                            &copy; {new Date().getFullYear()} radish. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
