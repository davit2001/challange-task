import React, {
    createContext,
    useContext,
    useState,
    useCallback,
} from "react";
import { toast } from "react-toastify";

const projectId = process.env.REACT_APP_PROJECT_ID;

const metadata = {
    name: "My Task Challenge",
    description: "Task Challenge App",
    url: "https://taskchallenge.com",
    icons: ["https://taskchallenge.com/icon.png"],
};

const mainnet = {
    chainId: 1,
    name: "Ethereum",
    currency: "ETH",
    rpcUrl: "https://cloudflare-eth.com",
    explorerUrl: "https://etherscan.io",
};

const Web3Context = createContext({
    web3: null,
    address: null,
    connectWallet: async () => {},
    disconnectWallet: () => {},
});

export const useWeb3 = () => useContext(Web3Context);

export const Web3ModalProvider = ({ children }) => {
    const [web3Instance, setWeb3Instance] = useState(null);
    const [address, setAddress] = useState(null);
    const [modal, setModal] = useState(null);

    const initWeb3Modal = useCallback(async () => {
        if (modal) return modal;

        const { createWeb3Modal, defaultConfig } = await import("web3modal-web3js/react");

        const web3Config = defaultConfig({
            metadata,
            enableEIP6963: true,
            enableInjected: true,
            enableCoinbase: true,
            rpcUrl: mainnet.rpcUrl,
            defaultChainId: 1,
        });

        const newModal = createWeb3Modal({
            web3Config,
            chains: [mainnet],
            projectId,
            enableAnalytics: false,
        });

        setModal(newModal);
        return newModal;
    }, [modal]);

    const connectWallet = useCallback(async () => {
        try {
            const modalInstance = await initWeb3Modal();
            const { walletProvider, address } = await modalInstance.open();

            if (walletProvider) {
                const { default: Web3 } = await import("web3");
                const web3 = new Web3(walletProvider);
                setWeb3Instance(web3);
                setAddress(address || null);
            }
        } catch (err) {
            toast.error("Wallet connection failed:");
        }
    }, [initWeb3Modal]);

    const disconnectWallet = useCallback(() => {
        setWeb3Instance(null);
        setAddress(null);
    }, []);

    return (
        <Web3Context.Provider
            value={{
                web3: web3Instance,
                address,
                connectWallet,
                disconnectWallet,
            }}
        >
            {children}
        </Web3Context.Provider>
    );
};