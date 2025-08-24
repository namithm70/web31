# DeFi Superapp

A secure, composable DeFi superapp built with Next.js, React, TypeScript, and Material UI.

## 🚀 Features

- **DeFi Analytics Dashboard** - Real-time protocol data and market insights
- **Custom DEX Frontend** - Multi-DEX token swapping with route optimization
- **Lending/Borrowing dApp** - Supply and borrow assets with health factor monitoring
- **Yield Farming & Staking** - Stake tokens and earn rewards
- **Stablecoins Hub** - Best yield opportunities for stable assets
- **Portfolio Management** - Track your DeFi positions and performance
- **Multi-Wallet Support** - MetaMask, Coinbase Wallet, WalletConnect, and more
- **Multi-Chain Support** - Ethereum, Polygon, Arbitrum

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Material UI v5** - Component library with Material Design 3
- **Emotion** - CSS-in-JS styling
- **Zustand** - State management
- **TanStack Query** - Data fetching and caching

### Web3
- **wagmi** - React hooks for Ethereum
- **viem** - TypeScript interface for Ethereum
- **RainbowKit** - Wallet connection UI
- **WalletConnect** - Mobile wallet support

### Data Sources
- **The Graph** - Protocol subgraphs
- **DeFiLlama API** - Market data
- **On-chain RPC** - Real-time blockchain data

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd web31
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the project root:
   ```bash
   # WalletConnect Project ID (Optional for mobile wallets)
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id_here

   # RPC Endpoints (Optional - will use defaults)
   NEXT_PUBLIC_RPC_MAINNET=https://eth-mainnet.g.alchemy.com/v2/demo
   NEXT_PUBLIC_RPC_POLYGON=https://polygon-rpc.com
   NEXT_PUBLIC_RPC_ARBITRUM=https://arb1.arbitrum.io/rpc

   # App Configuration
   NEXT_PUBLIC_APP_NAME=DeFi Superapp
   NEXT_PUBLIC_APP_DESCRIPTION=Secure, composable DeFi superapp
   NEXT_PUBLIC_APP_URL=https://your-app-domain.com
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🌐 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect Next.js settings
   - Add environment variables in Vercel dashboard
   - Deploy!

3. **Environment Variables in Vercel**
   - Go to your project settings
   - Add the same variables from `.env.local`
   - Redeploy if needed

### Render

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Deploy Web Service**
   - Click "New Web Service"
   - Connect your GitHub repository
   - Set build command: `npm install && npm run build`
   - Set start command: `npm start`
   - Add environment variables
   - Deploy!

### Netlify

1. **Create Netlify Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub

2. **Deploy Site**
   - Click "New site from Git"
   - Connect your repository
   - Set build command: `npm run build`
   - Set publish directory: `.next`
   - Add environment variables
   - Deploy!

## 🏗️ Architecture

### Current Setup (Frontend Only)
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Browser  │    │   Vercel/Render │    │  Blockchain     │
│                 │    │                 │    │                 │
│  - React App    │◄──►│  - Next.js      │◄──►│  - Ethereum     │
│  - Wallet       │    │  - Static Files │    │  - Polygon      │
│  - Web3         │    │  - CDN          │    │  - Arbitrum     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Future Setup (Full-Stack)
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Browser  │    │   Backend       │    │  External APIs  │
│                 │    │                 │    │                 │
│  - React App    │◄──►│  - API Routes   │◄──►│  - DeFiLlama    │
│  - Wallet       │    │  - Database     │    │  - The Graph    │
│  - Web3         │    │  - Auth         │    │  - RPC Nodes    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔧 Configuration

### Wallet Setup
- **MetaMask**: Install browser extension
- **Coinbase Wallet**: Install browser extension
- **Mobile Wallets**: Get WalletConnect Project ID from [cloud.walletconnect.com](https://cloud.walletconnect.com)

### Network Configuration
The app supports:
- **Ethereum Mainnet** - Primary DeFi protocols
- **Polygon** - Low gas fees
- **Arbitrum** - Fast transactions

## 🚨 Security Features

- **Non-custodial** - You control your private keys
- **EIP-712 signing** - Secure transaction signing
- **Allowance minimization** - Only approve what you need
- **Token allowlists** - Safe token lists
- **Risk disclosures** - Clear warnings

## 🧪 Testing

```bash
# Run tests
npm test

# Run E2E tests
npm run test:e2e

# Run linting
npm run lint
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Analytics dashboard
│   ├── swap/             # DEX frontend
│   ├── lend/             # Lending/borrowing
│   ├── farm/             # Yield farming
│   ├── stablecoins/      # Stablecoins hub
│   ├── portfolio/        # Portfolio management
│   └── settings/         # User settings
├── components/           # Reusable UI components
│   ├── layout/          # Layout components
│   └── ui/              # UI components
├── lib/                 # Utilities and configurations
│   ├── theme.ts         # MUI theme configuration
│   ├── wagmi.ts         # Web3 configuration
│   └── utils.ts         # Helper functions
├── store/               # State management
│   └── index.ts         # Zustand store
└── types/               # TypeScript type definitions
    └── index.ts         # Global types
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This software is for educational and development purposes. Use at your own risk. Always verify transactions and understand the risks involved in DeFi protocols.

## 🆘 Support

- **Documentation**: Check the [WALLET_SETUP.md](WALLET_SETUP.md) for wallet configuration
- **Issues**: Create an issue on GitHub
- **Discussions**: Use GitHub Discussions for questions

---

**Happy DeFi trading! 🚀**
