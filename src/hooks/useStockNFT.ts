import { useEffect, useState, useCallback } from "react";
import { BrowserProvider, Contract } from "ethers";
import { stockNFT } from "@/lib/contract/stockNFT";

export function useStockNFT() {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<unknown>(null);
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
      const tx = await contract.mintNFT(metadataURI);
      setTxHash(tx.hash);
      await tx.wait();
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
