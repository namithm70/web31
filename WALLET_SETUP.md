# Wallet Connection Setup Guide

## 🚀 Quick Start

Your DeFi Superapp is already configured with multiple wallet options! Here's how to get started:

### 1. **Environment Variables Setup**

Create a `.env.local` file in your project root with the following variables:

```bash
# WalletConnect Project ID (Required for mobile wallets)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id_here

# RPC Endpoints (Optional - will use defaults if not set)
NEXT_PUBLIC_RPC_MAINNET=https://eth-mainnet.g.alchemy.com/v2/demo
NEXT_PUBLIC_RPC_POLYGON=https://polygon-rpc.com
NEXT_PUBLIC_RPC_ARBITRUM=https://arb1.arbitrum.io/rpc

# App Configuration
NEXT_PUBLIC_APP_NAME=DeFi Superapp
NEXT_PUBLIC_APP_DESCRIPTION=Secure, composable DeFi superapp
NEXT_PUBLIC_APP_URL=https://your-app-domain.com
```

### 2. **Get WalletConnect Project ID**

1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Sign up/Login
3. Create a new project
4. Copy the Project ID
5. Paste it in your `.env.local` file

## 💳 Supported Wallets

### **Desktop Wallets**
- **MetaMask** (Most Popular) - Browser extension
- **Coinbase Wallet** - Browser extension
- **Safe Wallet** (formerly Gnosis Safe) - Multi-sig wallet

### **Mobile Wallets** (via WalletConnect)
- **Rainbow** - iOS/Android
- **Trust Wallet** - iOS/Android
- **MetaMask Mobile** - iOS/Android
- **Coinbase Wallet** - iOS/Android
- **Argent** - iOS/Android
- **Pillar** - iOS/Android
- **And 100+ more...**

## 🔧 How to Connect

### **Desktop Users:**
1. Install MetaMask or Coinbase Wallet browser extension
2. Click "Connect Wallet" in the app
3. Choose your preferred wallet
4. Approve the connection

### **Mobile Users:**
1. Install any WalletConnect-compatible wallet (Rainbow, Trust Wallet, etc.)
2. Click "Connect Wallet" in the app
3. Choose "WalletConnect"
4. Scan the QR code with your mobile wallet
5. Approve the connection

## 🎯 Recommended Wallet Choices

### **For Beginners:**
- **MetaMask** - Most popular, great for learning
- **Coinbase Wallet** - User-friendly, good for beginners

### **For Advanced Users:**
- **Safe Wallet** - Multi-signature security
- **Rainbow** - Beautiful mobile experience

### **For Mobile Users:**
- **Rainbow** - Best mobile DeFi experience
- **Trust Wallet** - Widely supported

## 🔒 Security Features

- **Non-custodial** - You control your private keys
- **EIP-712 signing** - Secure transaction signing
- **Allowance minimization** - Only approve what you need
- **Token allowlists** - Safe token lists
- **Risk disclosures** - Clear warnings

## 🛠️ Troubleshooting

### **Wallet Not Connecting:**
1. Make sure your wallet extension is installed
2. Check if you're on the correct network (Ethereum, Polygon, Arbitrum)
3. Try refreshing the page
4. Clear browser cache and try again

### **Mobile Wallet Issues:**
1. Ensure WalletConnect Project ID is set in `.env.local`
2. Make sure your mobile wallet supports WalletConnect
3. Try a different mobile wallet

### **Network Issues:**
1. Check your RPC endpoint configuration
2. Try switching networks in your wallet
3. Ensure you have enough native tokens for gas fees

## 📱 Mobile-Specific Setup

### **For iOS Users:**
- Install Rainbow, Trust Wallet, or MetaMask Mobile
- Use WalletConnect to connect

### **For Android Users:**
- Install Trust Wallet, MetaMask Mobile, or Rainbow
- Use WalletConnect to connect

## 🔄 Switching Networks

The app supports:
- **Ethereum Mainnet** - For main DeFi protocols
- **Polygon** - For lower gas fees
- **Arbitrum** - For fast, cheap transactions

To switch networks:
1. Use your wallet's network switcher
2. Or use the network selector in the app (if available)

## 🎨 Customization

You can customize the wallet connection experience by modifying:
- `src/lib/wagmi.ts` - Wallet configuration
- `src/components/layout/app-layout.tsx` - Connection UI
- `src/components/providers.tsx` - Provider setup

## 🚨 Important Notes

1. **Never share your private keys or seed phrase**
2. **Always verify transaction details before signing**
3. **Start with small amounts when testing**
4. **Keep your wallet software updated**
5. **Use hardware wallets for large amounts**

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify your environment variables
3. Check the browser console for errors
4. Try a different wallet

---

**Happy DeFi trading! 🚀**
