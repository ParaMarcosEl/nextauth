/* eslint-env node */

import fs from "fs";
import path from "path";
import { ethers } from "hardhat"; // ✅ Correct import

async function main() {
//   const [deployer] = await ethers.getSigners();
  const StockNFT = await ethers.getContractFactory("StockNFT");
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
