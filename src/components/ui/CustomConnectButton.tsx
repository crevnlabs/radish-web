import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "@/components/ui/button";
import Image from 'next/image';

export const CustomConnectButton = ({
    dark,
}: {
    dark?: boolean
}) => {
    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
            }) => {
                // Return null if the wagmi is not mounted yet
                if (!mounted || authenticationStatus === 'loading') {
                    return null;
                }

                const connected =
                    mounted &&
                    account &&
                    chain;

                return (
                    <div style={!mounted ? {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                    } : undefined}>
                        {(() => {
                            if (!connected) {
                                return (
                                    <Button
                                        onClick={openConnectModal}
                                        variant="outline"
                                        className={!dark ?
                                            `font-medium border-neo-green text-neo-green hover:bg-neo-green hover:text-black` :
                                            `font-medium border-t border-black text-black hover:bg-neo-green hover:text-black`
                                        }
                                    >
                                        Connect Wallet
                                    </Button>
                                );
                            }

                            if (chain.unsupported) {
                                return (
                                    <Button
                                        onClick={openChainModal}
                                        variant="destructive"
                                        className="font-medium"
                                    >
                                        Wrong network
                                    </Button>
                                );
                            }

                            return (
                                <div className="flex items-center gap-2">
                                    <Button
                                        onClick={openAccountModal}
                                        variant="outline"
                                        size="sm"
                                        className={!dark ?
                                            `font-medium text-white border-neo-green` :
                                            `font-medium text-black border-t border-black`
                                        }
                                    >
                                        {account.displayName}
                                    </Button>
                                </div>
                            );
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
};