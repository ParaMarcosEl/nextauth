# 📊 Financial Dashboard App

A modern stock tracking dashboard built with **Next.js**, **Prisma**, and **Recharts** — now upgraded with **NFT minting**, **MetaMask integration**, and **smart contract deployment** via **Ethers.js** and **Hardhat**.

---

## 🚀 Features

### ✅ Authentication
- Sign up with email and password
- Sign in with credentials or **GitHub OAuth**
- User session handled via **NextAuth**
- User data persisted with **PostgreSQL + Prisma**

### 📈 Stock Dashboard
- Search for any stock symbol (e.g., `AAPL`)
- View daily historical stock chart via **Polygon.io**
- Save favorite symbols to your personal dashboard
- Real-time stock charts rendered with **Recharts**

### 🧠 State Management
- **Redux Toolkit** for global state:
  - User session
  - Saved symbols
  - Alerts

### 🔔 Alert System
- Global alerts for user actions (e.g., login, logout, fetch errors)
- Alerts auto-dismiss after a few seconds or can be closed manually

### 🛡️ Route Protection
- Auth-required pages are protected via a **Redirector** component
- Unauthorized users are redirected and shown alert messages

---

## 🌐 Web3 & NFT Integration

### 🪙 Mint Stock-Based NFTs
- Mint an NFT based on saved stock data
- Generate metadata dynamically
- Uses deployed smart contract with `mint()` function

### 🦊 Wallet Integration
- Connect MetaMask or WalletConnect to interact with the blockchain
- Network detection and transaction feedback
- Seamless contract interaction via Ethers.js

### ⚙️ Smart Contract
- Custom ERC-721 `StockNFT` contract
- Deployed locally via Hardhat (and extensible to testnets)
- ABI and contract address exported to frontend

---

## 🛠️ Tech Stack

### Frontend
- [Next.js 14 (App Router)](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/) for charting
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [RainbowKit](https://www.rainbowkit.com/) + [Wagmi](https://wagmi.sh/) + [Ethers.js](https://docs.ethers.org/)

### Backend
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/router-handlers)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Polygon.io API](https://polygon.io/) for stock data
- [Hardhat](https://hardhat.org/) for Ethereum development
- [Solidity](https://soliditylang.org/) + [OpenZeppelin](https://docs.openzeppelin.com/)

---

## 📦 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/paramarcosel/nextauth.git
cd your-repo
```
### 2. Install Dependencies
```bash
npm install
# or
yarn install
```
### 3. Set environment variables
```bash
DATABASE_URL=postgresql://your-user:password@localhost:5432/yourdb
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000

# GitHub OAuth
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

# Polygon.io API
POLYGON_API_KEY=your_polygon_api_key
```
### 4. Set up database
```bash
npx prisma generate
npx prisma migrate dev --name init
```
### 5. Run the app
```bash
npm run dev
# or
yarn dev
```
🧪 Smart Contract Development
Navigate to the /contracts directory:
```bash
cd contracts
npm install
npx hardhat compile
npx hardhat node
```
In a seperate terminal, deploy locally
```bash
npx hardhat run scripts/deploy.ts --network localhost
```
This generates the ABI and contract address for frontend use.

---

✨ Deployment
This app is deployed on [Vercel](https://nextauth-google-lake.vercel.app).

Make sure to set the same environment variables in your Vercel project settings.
