import { http, createConfig } from 'wagmi';
import { mainnet, polygon, arbitrum } from 'wagmi/chains';
import { injected, walletConnect, coinbaseWallet, safe } from 'wagmi/connectors';

// Check if WalletConnect project ID is available
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

export const config = createConfig({
  chains: [mainnet, polygon, arbitrum],
  connectors: [
    // MetaMask and other injected wallets (this will work without any setup)
    injected({
      target: 'metaMask',
    }),
    // Coinbase Wallet (this will work without any setup)
    coinbaseWallet({ 
      appName: 'DeFi Superapp',
      appLogoUrl: 'https://your-app-domain.com/logo.png',
    }),
    // Safe Wallet (formerly Gnosis Safe)
    safe(),
    // WalletConnect for mobile wallets (only if project ID is set)
    ...(walletConnectProjectId ? [
      walletConnect({ 
        projectId: walletConnectProjectId,
        showQrModal: true,
        metadata: {
          name: 'DeFi Superapp',
          description: 'Secure, composable DeFi superapp',
          url: process.env.NEXT_PUBLIC_APP_URL || 'https://your-app-domain.com',
          icons: ['https://your-app-domain.com/logo.png'],
        },
      })
    ] : []),
  ],
  transports: {
    [mainnet.id]: http(process.env.NEXT_PUBLIC_RPC_MAINNET || 'https://eth-mainnet.g.alchemy.com/v2/demo'),
    [polygon.id]: http(process.env.NEXT_PUBLIC_RPC_POLYGON || 'https://polygon-rpc.com'),
    [arbitrum.id]: http(process.env.NEXT_PUBLIC_RPC_ARBITRUM || 'https://arb1.arbitrum.io/rpc')
  },
  ssr: true,
  batch: {
    multicall: true,
  },
});
