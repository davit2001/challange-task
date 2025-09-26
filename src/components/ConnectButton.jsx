import React from "react";
import { useWeb3 } from "../context/Web3Context";
import { FaWallet } from "react-icons/fa";
import { toast } from "react-toastify";

const ConnectButton = () => {
    const { address, connectWallet, disconnectWallet } = useWeb3();

    const onConnect = async () => {
        try {
            await connectWallet();
        } catch (err) {
            toast.error("Failed to connect wallet");
        }
    };

    const onDisconnect = async () => {
        try {
            disconnectWallet();
        } catch (err) {
            toast.error("Failed to disconnect wallet");
        }
    };

    if (address) {
        return (
            <button onClick={onDisconnect} className="btn">
                Disconnect ({address.slice(0, 6)}…)
            </button>
        );
    }

    return (
        <button onClick={onConnect} className="btn flex items-center justify-center">
            <FaWallet className="mr-2" />
            Connect Wallet
        </button>
    );
};

export default ConnectButton;
