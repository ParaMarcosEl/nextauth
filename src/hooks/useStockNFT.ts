import { useEffect, useState, useCallback } from "react";
import { BrowserProvider, Contract, Signer } from "ethers";
import { stockNFT } from "@/lib/contract/stockNFT";

export function useStockNFT() {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<Signer | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);
  const [minting, setMinting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      if (!window.ethereum) {
        setError("No Ethereum wallet found");
        return;
      }

      const browserProvider = new BrowserProvider(window.ethereum);
      setProvider(browserProvider);

      try {
        const signer = await browserProvider.getSigner();
        setSigner(signer);

        const contract = new Contract(stockNFT.address, stockNFT.abi, signer);
        setContract(contract);
      } catch {
        setError("Failed to connect to wallet");
      }
    }

    init();
  }, []);

  const mintNFT = useCallback(async (metadataURI: string) => {
    if (!contract) {
      setError("Contract not initialized");
      return;
    }

    setError(null);
    setMinting(true);

    try {
        const nextId = await contract.nextTokenId(); // returns e.g. 2
        const tokenId = nextId - 1; // previous one is likely yours

        const address = await signer?.getAddress();
        const tx = await contract.mint(address, metadataURI);
        setTxHash(tx.hash);
        const val = await tx.wait();
        console.log({ val, tokenId });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Minting failed");
    } finally {
      setMinting(false);
    }
  }, [contract]);

  return {
    mintNFT,
    minting,
    error,
    txHash,
    provider,
    signer,
    contract,
  };
}
