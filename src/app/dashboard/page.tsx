'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Skeleton,
  Alert,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { ProtocolData, MarketRate } from '@/types';
import { WalletConnectionTest } from '@/components/wallet-connection-test';

// Mock data
const mockProtocols: ProtocolData[] = [
  {
    id: 'uniswap-v3',
    name: 'Uniswap V3',
    tvl: 2500000000,
    tvlChange24h: 2.5,
    apy: 12.5,
    category: 'dex',
    chains: [1, 137, 42161],
  },
  {
    id: 'aave-v3',
    name: 'Aave V3',
    tvl: 1800000000,
    tvlChange24h: 1.8,
    apy: 8.2,
    category: 'lending',
    chains: [1, 137, 42161],
  },
  {
    id: 'compound-v3',
    name: 'Compound V3',
    tvl: 950000000,
    tvlChange24h: 0.5,
    apy: 7.8,
    category: 'lending',
    chains: [1],
  },
  {
    id: 'curve-finance',
    name: 'Curve Finance',
    tvl: 3200000000,
    tvlChange24h: -0.2,
    apy: 15.2,
    category: 'stablecoin',
    chains: [1, 137],
  },
];

const mockMarketRates: MarketRate[] = [
  {
    asset: '0xA0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8C8C' as `0x${string}`,
    supplyAPY: 4.2,
    borrowAPR: 6.8,
    utilization: 75.5,
  },
  {
    asset: '0xB0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8C8C' as `0x${string}`,
    supplyAPY: 3.8,
    borrowAPR: 5.9,
    utilization: 68.2,
  },
];

function ProtocolCard({ protocol }: { protocol: ProtocolData }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {protocol.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {protocol.category}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="body2" color="text.secondary">
            TVL
          </Typography>
          <Typography variant="body1">
            ${(protocol.tvl / 1000000).toFixed(0)}M
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="body2" color="text.secondary">
            24h Change
          </Typography>
          <Typography variant="body1" color={protocol.tvlChange24h >= 0 ? 'success.main' : 'error.main'}>
            {protocol.tvlChange24h >= 0 ? '+' : ''}{protocol.tvlChange24h.toFixed(1)}%
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="text.secondary">
            APY
          </Typography>
          <Typography variant="body1" color="success.main">
            {protocol.apy.toFixed(1)}%
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

function MarketRatesCard() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Market Rates
        </Typography>
        {mockMarketRates.map((rate, index) => (
          <Box key={index} mb={2}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Supply APY
              </Typography>
              <Typography variant="body1" color="success.main">
                {rate.supplyAPY.toFixed(1)}%
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Borrow APR
              </Typography>
              <Typography variant="body1" color="error.main">
                {rate.borrowAPR.toFixed(1)}%
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Utilization
              </Typography>
              <Typography variant="body1">
                {rate.utilization.toFixed(1)}%
              </Typography>
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const [error, setError] = useState<string | null>(null);

  const { data: protocols, isLoading: protocolsLoading, error: protocolsError } = useQuery({
    queryKey: ['protocols'],
    queryFn: async (): Promise<ProtocolData[]> => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockProtocols;
    },
  });

  if (protocolsError) {
    setError('Failed to load dashboard data');
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        DeFi Analytics Dashboard
      </Typography>

      <WalletConnectionTest />

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
        {protocolsLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <Card key={index}>
              <CardContent>
                <Skeleton variant="text" width="60%" height={32} />
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" width="70%" />
              </CardContent>
            </Card>
          ))
        ) : (
          protocols?.map((protocol) => (
            <ProtocolCard key={protocol.name} protocol={protocol} />
          ))
        )}
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' }, gap: 3 }}>
        {/* ratesLoading state was removed, so this block will always render MarketRatesCard */}
        <MarketRatesCard />
      </Box>
    </Box>
  );
}
