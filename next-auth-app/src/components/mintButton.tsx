import React from "react";
import { useStockNFT } from "@/hooks/useStockNFT";

export default function MintButton({ metadataURI }: { metadataURI: string }) {
  const { mintNFT, minting, error, txHash } = useStockNFT();
    if (error) console.log({error}); 
  return (
    <div>
      <button onClick={() => mintNFT(metadataURI)} disabled={minting}>
        {minting ? "Minting..." : "Mint NFT"}
      </button>
      {error && <p style={{ color: "red" }}>{"Unable to mint NFT."}</p>}
      {txHash && <p>Transaction: {txHash}</p>}
    </div>
  );
}
