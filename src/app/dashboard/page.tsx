'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Skeleton,
  Alert,
  Button,
} from '@mui/material';
import { Grid } from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  AccountBalance,
  ShowChart,
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { ProtocolData, MarketRate } from '@/types';
import { WalletConnectionTest } from '@/components/wallet-connection-test';

// Mock data for development
const mockProtocols: ProtocolData[] = [
  {
    id: 'aave-v3',
    name: 'Aave V3',
    tvl: 12500000000,
    tvlChange24h: 2.5,
    apy: 4.2,
    chains: [1, 137, 42161],
    category: 'lending',
  },
  {
    id: 'uniswap-v3',
    name: 'Uniswap V3',
    tvl: 8900000000,
    tvlChange24h: -1.2,
    apy: 12.8,
    chains: [1, 137, 42161],
    category: 'dex',
  },
  {
    id: 'compound-v3',
    name: 'Compound V3',
    tvl: 3200000000,
    tvlChange24h: 0.8,
    apy: 3.8,
    chains: [1, 137],
    category: 'lending',
  },
];

const mockMarketRates: MarketRate[] = [
  {
    asset: '0xA0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8C' as any,
    supplyAPY: 4.2,
    borrowAPR: 6.8,
    utilization: 78.5,
  },
  {
    asset: '0xB0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8C' as any,
    supplyAPY: 3.8,
    borrowAPR: 5.9,
    utilization: 65.2,
  },
];

function ProtocolCard({ protocol }: { protocol: ProtocolData }) {
  const isPositive = protocol.tvlChange24h >= 0;
  
  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">{protocol.name}</Typography>
          <Chip 
            label={protocol.category} 
            size="small" 
            color="primary" 
            variant="outlined"
          />
        </Box>
        
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="body2" color="text.secondary">
            TVL
          </Typography>
          <Typography variant="h6">
            ${(protocol.tvl / 1e9).toFixed(1)}B
          </Typography>
        </Box>
        
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="body2" color="text.secondary">
            24h Change
          </Typography>
          <Box display="flex" alignItems="center">
            {isPositive ? (
              <TrendingUp color="success" fontSize="small" />
            ) : (
              <TrendingDown color="error" fontSize="small" />
            )}
            <Typography 
              variant="body2" 
              color={isPositive ? 'success.main' : 'error.main'}
            >
              {isPositive ? '+' : ''}{protocol.tvlChange24h.toFixed(1)}%
            </Typography>
          </Box>
        </Box>
        
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="text.secondary">
            Best APY
          </Typography>
          <Typography variant="h6" color="success.main">
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

  const { data: protocols, isLoading: protocolsLoading } = useQuery({
    queryKey: ['protocols'],
    queryFn: async () => {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockProtocols;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (error) {
    return (
      <Alert severity="error" action={
        <Button color="inherit" size="small" onClick={() => setError(null)}>
          Retry
        </Button>
      }>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        DeFi Analytics Dashboard
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Protocol Overview */}
        <Box>
          <Typography variant="h5" gutterBottom>
            Protocol Overview
          </Typography>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 2 
          }}>
            {protocolsLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <Box key={index}>
                  <Skeleton variant="rectangular" height={200} />
                </Box>
              ))
            ) : (
              protocols?.map((protocol) => (
                <Box key={protocol.id}>
                  <ProtocolCard protocol={protocol} />
                </Box>
              ))
            )}
          </Box>
        </Box>

        {/* Market Rates and Quick Actions */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: 3 
        }}>
          {/* Market Rates */}
          <Box>
            <MarketRatesCard />
          </Box>

          {/* Quick Actions */}
          <Box>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Button 
                    variant="contained" 
                    startIcon={<ShowChart />}
                    fullWidth
                  >
                    View Best Yields
                  </Button>
                  <Button 
                    variant="outlined" 
                    startIcon={<AccountBalance />}
                    fullWidth
                  >
                    Check Portfolio
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Wallet Connection Test */}
        <Box>
          <WalletConnectionTest />
        </Box>
      </Box>
    </Box>
  );
}
