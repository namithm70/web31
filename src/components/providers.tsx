'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline } from '@mui/material';
import { useState, useEffect } from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@/contexts/ThemeContext';

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  
  // Create a stable QueryClient instance
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 3,
        refetchOnWindowFocus: false,
      },
    },
  }));
  

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
        }}
      >
        <div
          className="animate-scale-in"
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '40px',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
              zIndex: -1,
            }}
          />
          <div
            className="animate-spin"
            style={{
              width: '60px',
              height: '60px',
              border: '4px solid rgba(102, 126, 234, 0.2)',
              borderTop: '4px solid #667eea',
              borderRadius: '50%',
              margin: '0 auto 20px',
              animation: 'spin 1s linear infinite',
            }}
          />
          <div className="animate-fade-in-up">
            <h2 style={{ margin: '0 0 10px', fontSize: '24px', fontWeight: 700, color: '#1a202c' }}>
              DeFi Superapp
            </h2>
          </div>
          <div className="animate-fade-in-up stagger-1">
            <p style={{ margin: 0, color: '#666666', fontSize: '16px', fontWeight: 500 }}>
              Loading your experience...
            </p>
          </div>
          <div
            className="animate-pulse"
            style={{
              marginTop: '20px',
              fontSize: '24px',
              color: '#667eea',
            }}
          >
            • • •
          </div>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider refetchOnWindowFocus={true} refetchWhenOffline={false} refetchInterval={0}>
        <WagmiProvider config={config}>
          <RainbowKitProvider>
            <ThemeProvider>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </RainbowKitProvider>
        </WagmiProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
