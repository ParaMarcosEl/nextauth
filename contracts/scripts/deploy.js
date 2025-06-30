/* eslint-env node */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require("fs");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const StockNFT = await hre.ethers.getContractFactory("StockNFT");
  const stockNFT = await StockNFT.deploy();

  await stockNFT.waitForDeployment();
  const address = await stockNFT.getAddress();

  console.log("✅ StockNFT deployed to:", address);

  // Save address and ABI
  const deploymentsDir = path.resolve(__dirname, "../deployments");
  fs.mkdirSync(deploymentsDir, { recursive: true });

  // 1. Save address.json
  fs.writeFileSync(
    path.join(deploymentsDir, "address.json"),
    JSON.stringify({ StockNFT: address }, null, 2)
  );

  // 2. Save abi.json
  const artifact = await hre.artifacts.readArtifact("StockNFT");
  fs.writeFileSync(
    path.join(deploymentsDir, "abi.json"),
    JSON.stringify(artifact.abi, null, 2)
  );

  console.log("📁 ABI and address written to /deployments");
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exit(1);
});
