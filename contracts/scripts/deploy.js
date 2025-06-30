/* eslint-env node */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require("fs");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const hre = require("hardhat");

async function main() {
  // const [deployer] = await hre.ethers.getSigners();
  const StockNFT = await hre.ethers.getContractFactory("StockNFT");
  const stockNFT = await StockNFT.deploy();

  await stockNFT.waitForDeployment();

  const address = await stockNFT.getAddress();
  console.log("✅ StockNFT deployed to:", address);

  // Save address for frontend
  const deploymentsPath = path.resolve(__dirname, "../deployments");
  fs.mkdirSync(deploymentsPath, { recursive: true });
  fs.writeFileSync(
    path.join(deploymentsPath, "local-address.json"),
    JSON.stringify({ StockNFT: address }, null, 2)
  );
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exit(1);
});
