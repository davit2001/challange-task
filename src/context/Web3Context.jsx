import React, { createContext, useContext, useEffect, useState } from "react";
import { createWeb3Modal, defaultConfig, useWeb3ModalAccount, useWeb3ModalProvider } from "web3modal-web3js/react";
import Web3 from "web3";

const projectId = process.env.REACT_APP_PROJECT_ID;
const mainnet = {
    chainId: 1,
    name: "Ethereum",
    currency: "ETH",
    rpcUrl: "https://cloudflare-eth.com",
    explorerUrl: "https://etherscan.io"
};
const metadata = {
    name: "My Task Challenge",
    description: "Task Challenge App",
    url: "https://taskchallenge.com",
    icons: ["https://taskchallenge.com/icon.png"],
};

const web3Config = defaultConfig({
    metadata,
    enableEIP6963: true,
    enableInjected: true,
    enableCoinbase: true,
    rpcUrl: "https://cloudflare-eth.com",
    defaultChainId: 1,
});

createWeb3Modal({
    web3Config,
    chains: [mainnet],
    projectId,
    enableAnalytics: true,
});

const Web3Context = createContext({ web3: null, address: null });

export const useWeb3 = () => useContext(Web3Context);

export const Web3ModalProvider = ({ children }) => {
    const { isConnected, address } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();
    const [web3Instance, setWeb3Instance] = useState(null);

    useEffect(() => {
        if (isConnected && walletProvider) {
            const w3 = new Web3({ provider: walletProvider });
            setWeb3Instance(w3);
        } else {
            setWeb3Instance(null);
        }
    }, [isConnected, walletProvider]);

    return (
        <Web3Context.Provider value={{ web3: web3Instance, address: address || null }}>
            {children}
        </Web3Context.Provider>
    );
};
