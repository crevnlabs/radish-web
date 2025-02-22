import { ConnectKitButton } from "connectkit";
import { Button } from "@/components/ui/button";
import Image from 'next/image';

export const CustomConnectButton = ({
    dark,
}: {
    dark?: boolean
}) => {
    return (
        <ConnectKitButton.Custom>
            {({
                isConnected, isConnecting, show, hide, address, ensName, chain, truncatedAddress
            }) => {
                const ready = !isConnecting;
                const connected =
                    ready &&
                    address &&
                    chain &&
                    isConnected;

                return (
                    <div
                        {...(!ready && {
                            'aria-hidden': true,
                            'style': {
                                opacity: 0,
                                pointerEvents: 'none',
                                userSelect: 'none',
                            },
                        })}
                    >
                        {(() => {
                            if (!connected) {
                                return (
                                    <Button
                                        onClick={show}
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
                                        onClick={show}
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
                                        onClick={show}
                                        variant="outline"
                                        size="sm"
                                        className={!dark ?
                                            `flex items-center gap-2 text-white` :
                                            `flex items-center gap-2 text-black border-t border-black`
                                        }
                                    >
                                        {chain.name}
                                    </Button>

                                    <Button
                                        onClick={show}
                                        variant="outline"
                                        size="sm"
                                        className={!dark ?
                                            `font-medium text-white border-neo-green` :
                                            `font-medium text-black border-t border-black`
                                        }
                                    >
                                        {ensName || truncatedAddress}
                                    </Button>
                                </div>
                            );
                        })()}
                    </div>
                );
            }}
        </ConnectKitButton.Custom>
    );
};