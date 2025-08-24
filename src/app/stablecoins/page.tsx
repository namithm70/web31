'use client';

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';
import {
  AccountBalance,
} from '@mui/icons-material';
import { TokenData } from '@/types';

// Mock stablecoin data
const mockStablecoins: (TokenData & {
  marketCap: number;
  volume24h: number;
  apy: number;
  risk: 'low' | 'medium' | 'high';
  backing: string;
})[] = [
  {
    address: '0xA0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8C8C' as `0x${string}`,
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    price: 1.00,
    marketCap: 25000000000,
    volume24h: 5000000000,
    apy: 4.2,
    risk: 'low',
    backing: 'Cash & Cash Equivalents',
  },
  {
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F' as `0x${string}`,
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    decimals: 18,
    price: 1.00,
    marketCap: 5000000000,
    volume24h: 800000000,
    apy: 3.8,
    risk: 'medium',
    backing: 'Collateralized Debt',
  },
  {
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7' as `0x${string}`,
    symbol: 'USDT',
    name: 'Tether USD',
    decimals: 6,
    price: 1.00,
    marketCap: 85000000000,
    volume24h: 12000000000,
    apy: 2.1,
    risk: 'medium',
    backing: 'Commercial Paper',
  },
  {
    address: '0x853d955aCEf822Db058eb8505911ED77F175b99e' as `0x${string}`,
    symbol: 'FRAX',
    name: 'Frax',
    decimals: 18,
    price: 1.00,
    marketCap: 2000000000,
    volume24h: 300000000,
    apy: 5.5,
    risk: 'medium',
    backing: 'Algorithmic + Collateral',
  },
];

function StablecoinCard({ stablecoin }: { stablecoin: typeof mockStablecoins[0] }) {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      default: return 'default';
    }
  };

  const handleSwap = () => {
    // This function is not fully implemented in the new mock data,
    // so it will just show an alert.
    alert(`Swap functionality not fully implemented for ${stablecoin.symbol}`);
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box>
            <Typography variant="h6">{stablecoin.symbol}</Typography>
            <Typography variant="body2" color="text.secondary">
              {stablecoin.name}
            </Typography>
          </Box>
          <Chip 
            label={stablecoin.risk.toUpperCase()} 
            color={getRiskColor(stablecoin.risk) as 'success' | 'warning' | 'error' | 'default'}
            size="small"
          />
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="body2" color="text.secondary">
            Best Yield
          </Typography>
          <Typography variant="h6" color="success.main">
            {stablecoin.apy.toFixed(1)}%
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="body2" color="text.secondary">
            Depeg Risk
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            {/* Depeg risk is not directly available in the new mock data,
                so this will be a placeholder or removed if not needed.
                For now, it's removed as per the new mock data. */}
            <Typography variant="body2">N/A</Typography>
          </Box>
        </Box>

        <Box mb={2}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Issuer: {stablecoin.backing}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Model: {stablecoin.backing}
          </Typography>
        </Box>

        {/* Blacklist risk is not directly available in the new mock data,
            so this will be a placeholder or removed if not needed.
            For now, it's removed as per the new mock data. */}

        <Button
          variant="contained"
          fullWidth
          startIcon={<AccountBalance />}
          onClick={handleSwap}
        >
          Swap to {stablecoin.symbol}
        </Button>
      </CardContent>
    </Card>
  );
}

function YieldComparisonTable() {
  return (
    <TableContainer component={Paper} sx={{ backgroundColor: 'background.paper' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Stablecoin</TableCell>
            <TableCell align="right">Aave APY</TableCell>
            <TableCell align="right">Compound APY</TableCell>
            <TableCell align="right">Curve APY</TableCell>
            <TableCell align="right">Best Yield</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockStablecoins.map((stablecoin) => (
            <TableRow key={stablecoin.symbol}>
              <TableCell>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="body1">{stablecoin.symbol}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stablecoin.name}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body1" color="success.main">
                  4.2%
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body1" color="success.main">
                  3.8%
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body1" color="success.main">
                  5.1%
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body1" color="success.main" fontWeight="bold">
                  {stablecoin.apy.toFixed(1)}%
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Button size="small" variant="outlined">
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function RiskNotes() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Risk Notes & Disclaimers
        </Typography>
        
        {/* Collateralization Models is not directly available in the new mock data,
            so this will be a placeholder or removed if not needed.
            For now, it's removed as per the new mock data. */}

        {/* Depeg Risks is not directly available in the new mock data,
            so this will be a placeholder or removed if not needed.
            For now, it's removed as per the new mock data. */}

        {/* Centralization Risks is not directly available in the new mock data,
            so this will be a placeholder or removed if not needed.
            For now, it's removed as per the new mock data. */}
      </CardContent>
    </Card>
  );
}

function BestYieldCard() {
  const bestYield = mockStablecoins.reduce((max, coin) => 
    coin.apy > max.apy ? coin : max
  );

  return (
    <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <CardContent>
        <Typography variant="h6" color="white" gutterBottom>
          Best Available Yield
        </Typography>
        <Typography variant="h3" color="white" gutterBottom>
          {bestYield.apy.toFixed(1)}%
        </Typography>
        <Typography variant="body1" color="white" mb={2}>
          {bestYield.symbol} on {bestYield.backing}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ backgroundColor: 'white', color: 'primary.main' }}
        >
          Get Started
        </Button>
      </CardContent>
    </Card>
  );
}

export default function StablecoinsPage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Stablecoins Hub
      </Typography>

      {/* Best Yield Card */}
      <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 2, mb: 3 }}>
        <BestYieldCard />
      </Box>

      {/* Quick Stats */}
      <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 2, mb: 3 }}>
        <Card sx={{ flex: 1, minWidth: 200 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Market Overview
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={2}>
              <Box flex={1} minWidth="120px">
                <Typography variant="body2" color="text.secondary">
                  Total Market Cap
                </Typography>
                <Typography variant="h6">
                  $150.2B
                </Typography>
              </Box>
              <Box flex={1} minWidth="120px">
                <Typography variant="body2" color="text.secondary">
                  Average Yield
                </Typography>
                <Typography variant="h6" color="success.main">
                  4.2%
                </Typography>
              </Box>
              <Box flex={1} minWidth="120px">
                <Typography variant="body2" color="text.secondary">
                  24h Volume
                </Typography>
                <Typography variant="h6">
                  $45.8B
                </Typography>
              </Box>
              <Box flex={1} minWidth="120px">
                <Typography variant="body2" color="text.secondary">
                  Active Protocols
                </Typography>
                <Typography variant="h6">
                  12
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Stablecoin Cards */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ width: '100%' }}>
          Available Stablecoins
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={2}>
          {mockStablecoins.map((stablecoin) => (
            <Box key={stablecoin.symbol} sx={{ flex: '1 1 300px', minWidth: '300px' }}>
              <StablecoinCard stablecoin={stablecoin} />
            </Box>
          ))}
        </Box>
      </Box>

      {/* Yield Comparison */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ width: '100%' }}>
          Yield Comparison
        </Typography>
        <YieldComparisonTable />
      </Box>

      {/* Risk Notes */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
        <RiskNotes />
      </Box>
    </Box>
  );
}
