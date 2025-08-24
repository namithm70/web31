'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress,
} from '@mui/material';
import { Grid } from '@mui/material';
import {
  CurrencyExchange,
  TrendingUp,
  Warning,
  CheckCircle,
  ExpandMore,
  SwapHoriz,
  Security,
  Info,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { TokenData } from '@/types';

// Mock stablecoin data
const stablecoins: (TokenData & {
  yield: number;
  risk: 'low' | 'medium' | 'high';
  issuer: string;
  collateralization: string;
  depegRisk: number;
  blacklistRisk: boolean;
})[] = [
  {
    address: '0xA0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8C' as any,
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    price: 1.00,
    yield: 4.2,
    risk: 'low',
    issuer: 'Circle',
    collateralization: 'Fiat-backed',
    depegRisk: 0.1,
    blacklistRisk: true,
  },
  {
    address: '0xC0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8C8C' as any,
    symbol: 'USDT',
    name: 'Tether USD',
    decimals: 6,
    price: 1.00,
    yield: 3.8,
    risk: 'medium',
    issuer: 'Tether',
    collateralization: 'Mixed assets',
    depegRisk: 0.3,
    blacklistRisk: true,
  },
  {
    address: '0xD0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8C8C' as any,
    symbol: 'DAI',
    name: 'Dai',
    decimals: 18,
    price: 1.00,
    yield: 3.5,
    risk: 'low',
    issuer: 'MakerDAO',
    collateralization: 'Crypto-backed',
    depegRisk: 0.2,
    blacklistRisk: false,
  },
  {
    address: '0xE0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8C8C' as any,
    symbol: 'FRAX',
    name: 'Frax',
    decimals: 18,
    price: 1.00,
    yield: 5.1,
    risk: 'medium',
    issuer: 'Frax Finance',
    collateralization: 'Hybrid',
    depegRisk: 0.4,
    blacklistRisk: false,
  },
];

function StablecoinCard({ stablecoin }: { stablecoin: typeof stablecoins[0] }) {
  const router = useRouter();
  
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      default: return 'default';
    }
  };

  const handleSwap = () => {
    router.push(`/swap?from=ETH&to=${stablecoin.symbol}`);
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
            color={getRiskColor(stablecoin.risk) as any}
            size="small"
          />
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="body2" color="text.secondary">
            Best Yield
          </Typography>
          <Typography variant="h6" color="success.main">
            {stablecoin.yield.toFixed(1)}%
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="body2" color="text.secondary">
            Depeg Risk
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <LinearProgress
              variant="determinate"
              value={stablecoin.depegRisk * 100}
              color={stablecoin.depegRisk > 0.3 ? 'error' : 'success'}
              sx={{ width: 60, height: 6 }}
            />
            <Typography variant="body2">
              {(stablecoin.depegRisk * 100).toFixed(1)}%
            </Typography>
          </Box>
        </Box>

        <Box mb={2}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Issuer: {stablecoin.issuer}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Model: {stablecoin.collateralization}
          </Typography>
        </Box>

        {stablecoin.blacklistRisk && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            Centralized issuer - blacklisting possible
          </Alert>
        )}

        <Button
          variant="contained"
          fullWidth
          startIcon={<SwapHoriz />}
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
          {stablecoins.map((stablecoin) => (
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
                  {stablecoin.yield.toFixed(1)}%
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
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle1">Collateralization Models</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box component="ul" sx={{ pl: 2 }}>
              <Typography component="li" variant="body2" mb={1}>
                <strong>Fiat-backed:</strong> Backed by traditional bank deposits and government securities
              </Typography>
              <Typography component="li" variant="body2" mb={1}>
                <strong>Crypto-backed:</strong> Overcollateralized by other cryptocurrencies
              </Typography>
              <Typography component="li" variant="body2" mb={1}>
                <strong>Hybrid:</strong> Combination of fiat and crypto collateral
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle1">Depeg Risks</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" mb={2}>
              Stablecoins can lose their peg to the US dollar due to:
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
              <Typography component="li" variant="body2">
                Insufficient collateral backing
              </Typography>
              <Typography component="li" variant="body2">
                Regulatory actions against issuers
              </Typography>
              <Typography component="li" variant="body2">
                Market panic and liquidity crises
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle1">Centralization Risks</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" mb={2}>
              Centralized stablecoins carry additional risks:
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
              <Typography component="li" variant="body2">
                Issuer can freeze or blacklist addresses
              </Typography>
              <Typography component="li" variant="body2">
                Regulatory compliance requirements
              </Typography>
              <Typography component="li" variant="body2">
                Single point of failure in operations
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
}

function BestYieldCard() {
  const bestYield = stablecoins.reduce((max, coin) => 
    coin.yield > max.yield ? coin : max
  );

  return (
    <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <CardContent>
        <Typography variant="h6" color="white" gutterBottom>
          Best Available Yield
        </Typography>
        <Typography variant="h3" color="white" gutterBottom>
          {bestYield.yield.toFixed(1)}%
        </Typography>
        <Typography variant="body1" color="white" mb={2}>
          {bestYield.symbol} on {bestYield.issuer}
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

      <Grid container spacing={3}>
        {/* Best Yield Card */}
        <Grid item xs={12} md={4}>
          <BestYieldCard />
        </Grid>

        {/* Quick Stats */}
        <Grid xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Market Overview
              </Typography>
              <Grid container spacing={2}>
                <Grid xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Total Market Cap
                  </Typography>
                  <Typography variant="h6">
                    $150.2B
                  </Typography>
                </Grid>
                <Grid xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Average Yield
                  </Typography>
                  <Typography variant="h6" color="success.main">
                    4.2%
                  </Typography>
                </Grid>
                <Grid xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    24h Volume
                  </Typography>
                  <Typography variant="h6">
                    $45.8B
                  </Typography>
                </Grid>
                <Grid xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Active Protocols
                  </Typography>
                  <Typography variant="h6">
                    12
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Stablecoin Cards */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Available Stablecoins
          </Typography>
          <Grid container spacing={2}>
            {stablecoins.map((stablecoin) => (
              <Grid item xs={12} sm={6} md={3} key={stablecoin.symbol}>
                <StablecoinCard stablecoin={stablecoin} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Yield Comparison */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Yield Comparison
          </Typography>
          <YieldComparisonTable />
        </Grid>

        {/* Risk Notes */}
        <Grid item xs={12}>
          <RiskNotes />
        </Grid>
      </Grid>
    </Box>
  );
}
