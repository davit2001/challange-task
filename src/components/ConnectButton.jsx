import React from "react";
import { useWeb3 } from "../context/Web3Context";
import { useWeb3ModalAccount, useWeb3Modal } from "web3modal-web3js/react";
import {FaWallet} from "react-icons/fa";
import {toast} from "react-toastify";

const ConnectButton = () => {
    const { address } = useWeb3();
    const { open, disconnect } = useWeb3Modal();
    const { isConnected } = useWeb3ModalAccount();

    const onConnect = async () => {
        try {
            await open();
        } catch (err) {
            toast.error("Failed to Connect wallet");
        }
    };

    const onDisconnect = async () => {
        try {
            await disconnect();
        } catch (err) {
            toast.error("Failed to disconnect wallet");
        }
    };

    if (isConnected && address) {
        return <button onClick={onDisconnect}>Disconnect ({address.slice(0, 6)}...)</button>;
    }

    return (
        <button onClick={onConnect} className="btn w-full mb-4 flex items-center justify-center">
            <FaWallet className="mr-2" />
            Connect Wallet to Invest
        </button>
    )
};

export default ConnectButton;
