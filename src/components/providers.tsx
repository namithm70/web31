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
          background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
          color: '#000000',
          fontSize: '1.2rem',
          fontWeight: 500,
          fontFamily: 'Inter, sans-serif',
        }}>
          <div 
            className="animate-scale-in"
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0, 0, 0, 0.06)',
              borderRadius: 20,
              padding: '3rem 4rem',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
              textAlign: 'center',
              maxWidth: '400px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Animated background gradient */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.02) 0%, transparent 50%, rgba(0, 0, 0, 0.02) 100%)',
              zIndex: -1,
            }} />
            
            <div 
              className="animate-spin"
              style={{
                width: '48px',
                height: '48px',
                border: '3px solid rgba(0, 0, 0, 0.08)',
                borderTop: '3px solid #000000',
                borderRadius: '50%',
                margin: '0 auto 1.5rem auto',
                position: 'relative',
              }}
            />
            
            <div 
              className="animate-fade-in-up"
              style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                color: '#000000',
                marginBottom: '0.75rem',
                letterSpacing: '-0.02em',
              }}
            >
              DeFi Superapp
            </div>
            
            <div 
              className="animate-fade-in-up stagger-1"
              style={{
                fontSize: '1rem',
                color: '#666666',
                fontWeight: 500,
              }}
            >
              Loading your experience...
            </div>
            
            {/* Subtle dots animation */}
            <div 
              className="animate-pulse"
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '4px',
                marginTop: '1rem',
              }}
            >
              <div style={{
                width: '6px',
                height: '6px',
                background: '#000000',
                borderRadius: '50%',
                animationDelay: '0s',
              }} />
              <div style={{
                width: '6px',
                height: '6px',
                background: '#000000',
                borderRadius: '50%',
                animationDelay: '0.2s',
              }} />
              <div style={{
                width: '6px',
                height: '6px',
                background: '#000000',
                borderRadius: '50%',
                animationDelay: '0.4s',
              }} />
            </div>
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
