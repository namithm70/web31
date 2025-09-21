'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline } from '@mui/material';
import { useState, useEffect, useMemo, ReactNode } from 'react';
import { WagmiProvider } from 'wagmi';
import { config } from '@/lib/wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@/contexts/ThemeContext';

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  const queryClient = useMemo(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        retry: 2,
        refetchOnWindowFocus: false,
      },
    },
  }), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const appShell = (
    <ThemeProvider>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider refetchOnWindowFocus={false} refetchWhenOffline={false} refetchInterval={0}>
        <WagmiProvider config={config}>
          {mounted ? (
            <RainbowKitProvider>{appShell}</RainbowKitProvider>
          ) : (
            appShell
          )}
        </WagmiProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
