
// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require("fs");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require("path");

async function main() {
  const artifactsDir = path.resolve(__dirname, "../artifacts/contracts");
  const contractName = "StockNFT.sol/StockNFT";
  const abiPath = path.join(artifactsDir, contractName + ".json");

  const abiJson = JSON.parse(fs.readFileSync(abiPath, "utf8"));
  const abi = abiJson.abi;

  const addressPath = path.resolve(__dirname, "../deployments/local-address.json");
  const addressJson = JSON.parse(fs.readFileSync(addressPath, "utf8"));

  const output = {
    abi,
    address: addressJson.StockNFT,
  };

  const outputDir = path.resolve(__dirname, "../../src/lib/contract");
  fs.mkdirSync(outputDir, { recursive: true });

  fs.writeFileSync(path.join(outputDir, "stockNFT.ts"), `export const stockNFT = ${JSON.stringify(output, null, 2)};`);
  console.log("✅ ABI and address exported to src/lib/contract/stockNFT.ts");
}

main().catch((err) => {
  console.error("❌ Failed to export ABI/address:", err);
  process.exit(1);
});
