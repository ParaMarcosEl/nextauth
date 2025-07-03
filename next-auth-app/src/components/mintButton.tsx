import React from "react";
import { useStockNFT } from "@/hooks/useStockNFT";

export default function MintButton({ metadataURI }: { metadataURI: string }) {
  const { mintNFT, minting, error, txHash } = useStockNFT();

  return (
    <div className="mt-4 space-y-2">
      <button
        onClick={() => mintNFT(metadataURI)}
        disabled={minting}
        className={`px-5 py-2 rounded-md font-medium transition duration-200 ${
          minting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700 text-white"
        }`}
      >
        {minting ? "Minting..." : "Mint NFT"}
      </button>

      {error && (
        <p className="text-sm text-red-500">Unable to mint NFT.</p>
      )}

      {txHash && (
        <p className="text-sm text-gray-700">
          Transaction:{" "}
          <a
            href={`https://etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {txHash.slice(0, 10)}...
          </a>
        </p>
      )}
    </div>
  );
}
