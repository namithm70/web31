'use client';

import { useState } from 'react';
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
  Alert,
} from '@mui/material';
import {
  AccountBalance,
  TrendingDown,
  Lock,
  LockOpen,
} from '@mui/icons-material';
import { useAccount } from 'wagmi';
import { TokenData } from '@/types';

// Mock portfolio data
const mockPortfolio: {
  totalValue: number;
  totalPnl: number;
  healthFactor: number;
  positions: Array<{
    token: TokenData;
    balance: string;
    value: number;
    pnl: number;
    isLocked: boolean;
  }>;
} = {
  totalValue: 15420.50,
  totalPnl: 1250.75,
  healthFactor: 1.85,
  positions: [
    {
      token: {
        address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' as `0x${string}`,
        symbol: 'WETH',
        name: 'Wrapped Ether',
        decimals: 18,
        price: 3500,
      },
      balance: '2.5',
      value: 8750.00,
      pnl: 850.25,
      isLocked: false,
    },
    {
      token: {
        address: '0xA0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8C8C' as `0x${string}`,
        symbol: 'USDC',
        name: 'USD Coin',
        decimals: 6,
        price: 1,
      },
      balance: '5000.00',
      value: 5000.00,
      pnl: 0,
      isLocked: true,
    },
    {
      token: {
        address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599' as `0x${string}`,
        symbol: 'WBTC',
        name: 'Wrapped Bitcoin',
        decimals: 8,
        price: 45000,
      },
      balance: '0.037',
      value: 1670.50,
      pnl: 400.50,
      isLocked: false,
    },
  ],
};

function PortfolioOverview() {
  const isHealthy = mockPortfolio.healthFactor > 1.5;
  const isWarning = mockPortfolio.healthFactor <= 1.5 && mockPortfolio.healthFactor > 1.1;

  return (
    <Box display="flex" gap={3} mb={4}>
      {/* Total Value */}
      <Card sx={{ flex: 1 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Total Portfolio Value
          </Typography>
          <Typography variant="h4" fontWeight={700}>
            ${mockPortfolio.totalValue.toLocaleString()}
          </Typography>
          <Box display="flex" alignItems="center" gap={1} mt={1}>
            <TrendingDown color="success" fontSize="small" />
            <Typography variant="body2" color="success.main">
              +${mockPortfolio.totalPnl.toFixed(2)} (24h)
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Health Factor */}
      <Card sx={{ flex: 1 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Health Factor
          </Typography>
          <Typography variant="h4" color={isHealthy ? 'success.main' : isWarning ? 'warning.main' : 'error.main'}>
            {mockPortfolio.healthFactor.toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {isHealthy 
              ? 'Your position is healthy' 
              : isWarning 
              ? 'Consider adding collateral or repaying debt'
              : 'Risk of liquidation - take action immediately'
            }
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

function PositionsTable() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Your Positions
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Asset</TableCell>
                <TableCell align="right">Balance</TableCell>
                <TableCell align="right">Value</TableCell>
                <TableCell align="right">P&L</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockPortfolio.positions.map((position) => (
                <TableRow key={position.token.address}>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="body1">{position.token.symbol}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {position.token.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body1">
                      {position.balance}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body1">
                      ${position.value.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body1" color={position.pnl >= 0 ? 'success.main' : 'error.main'}>
                      {position.pnl >= 0 ? '+' : ''}${position.pnl.toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      icon={position.isLocked ? <Lock /> : <LockOpen />}
                      label={position.isLocked ? 'Locked' : 'Available'}
                      color={position.isLocked ? 'warning' : 'success'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Box display="flex" gap={1}>
                      <Button size="small" variant="outlined">
                        Send
                      </Button>
                      <Button size="small" variant="outlined">
                        Swap
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}

export default function PortfolioPage() {
  const { address } = useAccount();

  if (!address) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Portfolio
        </Typography>
        <Alert severity="info">
          Please connect your wallet to view your portfolio
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Portfolio
      </Typography>

      <PortfolioOverview />
      <PositionsTable />
    </Box>
  );
}
