import React from "react";
import { useWeb3 } from "../context/Web3Context";
import { useWeb3ModalAccount, useWeb3Modal, useDisconnect } from "web3modal-web3js/react";
import {FaWallet} from "react-icons/fa";
import {toast} from "react-toastify";

const ConnectButton = () => {
    const { address } = useWeb3();
    const { open } = useWeb3Modal();
    const { isConnected } = useWeb3ModalAccount();
    const { disconnect } = useDisconnect();

    const onConnect = async () => {
        try {
            await open();
        } catch (err) {
            toast.error("Failed to Connect wallet");
        }
    };

    const onDisconnect = async () => {
        try {
            console.log('onDisconnect')
            await disconnect();
        } catch (err) {
            toast.error("Failed to disconnect wallet");
        }
    };

    if (isConnected && address) {
        return <button onClick={onDisconnect}>Disconnect ({address.slice(0, 6)}...)</button>;
    }

    return (
        <button onClick={onConnect} className="btn flex items-center justify-center">
            <FaWallet className="mr-2" />
            Connect Wallet
        </button>
    )
};

export default ConnectButton;
