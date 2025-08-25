'use client';

import { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { config } from '@/lib/wagmi';
import { theme } from '@/lib/theme';
import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 3,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <ThemeProvider theme={theme}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          background: '#FFFFFF',
          color: '#000000',
          fontSize: '1.2rem',
          fontWeight: 500,
          fontFamily: 'Inter, sans-serif',
        }}>
          <div style={{
            background: '#FFFFFF',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            borderRadius: 12,
            padding: '2rem 3rem',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
            textAlign: 'center',
            maxWidth: '400px',
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '2px solid rgba(0, 0, 0, 0.1)',
              borderTop: '2px solid #000000',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1rem auto',
            }}></div>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#000000',
              marginBottom: '0.5rem',
            }}>
              DeFi Superapp
            </div>
            <div style={{
              fontSize: '1rem',
              color: '#666666',
            }}>
              Loading...
            </div>
            <style jsx>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          showRecentTransactions={true}
          coolMode={true}
        >
          <ThemeProvider theme={theme}>
            {children}
          </ThemeProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
