const fs = require("fs");
const path = require("path");

// Adjust these paths if needed
const abiSource = path.join(__dirname, "../deployments/abi.json");
const addressSource = path.join(__dirname, "../deployments/address.json");

const frontendDir = path.join(__dirname, "../../next-auth-app/src/lib/contract");

// Ensure the frontend destination exists
fs.mkdirSync(frontendDir, { recursive: true });

// Copy ABI
fs.copyFileSync(abiSource, path.join(frontendDir, "abi.json"));

// Copy address
fs.copyFileSync(addressSource, path.join(frontendDir, "address.json"));

console.log("✅ ABI and address copied to frontend");
