'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  TextField,
  Chip,
  LinearProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Agriculture,
  TrendingUp,
  Lock,
  Info,
  Add,
  Remove,
} from '@mui/icons-material';
import { useAccount } from 'wagmi';
import { PoolData, TokenData } from '@/types';

// Mock pool data
const mockPools: PoolData[] = [
  {
    id: 'uni-eth-usdc',
    protocol: 'Uniswap V3',
    token0: {
      address: '0xB0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8C8C' as any,
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: 18,
      price: 3200.00,
    },
    token1: {
      address: '0xA0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8C' as any,
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      price: 1.00,
    },
    apr: 18.5,
    tvl: 45000000,
    stakingContract: '0xD0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8C8C' as any,
    rewardTokens: [
      {
        address: '0xE0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8C8C' as any,
        symbol: 'UNI',
        name: 'Uniswap',
        decimals: 18,
        price: 8.50,
      },
    ],
  },
  {
    id: 'sushi-eth-usdt',
    protocol: 'SushiSwap',
    token0: {
      address: '0xB0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8C8C' as any,
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: 18,
      price: 3200.00,
    },
    token1: {
      address: '0xC0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8C8C' as any,
      symbol: 'USDT',
      name: 'Tether USD',
      decimals: 6,
      price: 1.00,
    },
    apr: 15.2,
    tvl: 28000000,
    stakingContract: '0xF0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8C8C' as any,
    rewardTokens: [
      {
        address: '0xF1b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8C8C' as any,
        symbol: 'SUSHI',
        name: 'SushiToken',
        decimals: 18,
        price: 1.20,
      },
    ],
  },
  {
    id: 'curve-3pool',
    protocol: 'Curve',
    token0: {
      address: '0xA0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8C' as any,
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      price: 1.00,
    },
    token1: {
      address: '0xC0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8C8C' as any,
      symbol: 'USDT',
      name: 'Tether USD',
      decimals: 6,
      price: 1.00,
    },
    apr: 8.7,
    tvl: 120000000,
    stakingContract: '0xF2b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8C8C' as any,
    rewardTokens: [
      {
        address: '0xF3b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8C8C' as any,
        symbol: 'CRV',
        name: 'Curve DAO Token',
        decimals: 18,
        price: 0.65,
      },
    ],
  },
];

function PoolCard({ pool }: { pool: PoolData }) {
  const [showStake, setShowStake] = useState(false);
  const [stakeAmount, setStakeAmount] = useState('');

  const handleStake = () => {
    // TODO: Implement staking logic
    console.log('Staking:', stakeAmount, 'LP tokens');
  };

  const handleUnstake = () => {
    // TODO: Implement unstaking logic
    console.log('Unstaking LP tokens');
  };

  const handleClaim = () => {
    // TODO: Implement claim logic
    console.log('Claiming rewards');
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box>
            <Typography variant="h6">
              {pool.token0.symbol}/{pool.token1.symbol}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {pool.protocol}
            </Typography>
          </Box>
          <Chip 
            label={`${pool.apr.toFixed(1)}% APR`} 
            color="success" 
            variant="outlined"
          />
        </Box>

        <Grid container spacing={2} mb={2}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              TVL
            </Typography>
            <Typography variant="h6">
              ${(pool.tvl / 1e6).toFixed(1)}M
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Your Stake
            </Typography>
            <Typography variant="h6">
              $0.00
            </Typography>
          </Grid>
        </Grid>

        {pool.rewardTokens && (
          <Box mb={2}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Rewards
            </Typography>
            <Box display="flex" gap={1}>
              {pool.rewardTokens.map((token) => (
                <Chip
                  key={token.address}
                  label={token.symbol}
                  size="small"
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        )}

        {!showStake ? (
          <Button
            variant="contained"
            fullWidth
            onClick={() => setShowStake(true)}
          >
            Stake LP Tokens
          </Button>
        ) : (
          <Box>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="0.0"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <Button size="small">
                    Max
                  </Button>
                ),
              }}
            />
            <Box display="flex" gap={1}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleStake}
                disabled={!stakeAmount}
              >
                Stake
              </Button>
              <Button
                variant="outlined"
                onClick={() => setShowStake(false)}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        )}

        {/* Action buttons for staked positions */}
        <Box display="flex" gap={1} mt={2}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Remove />}
            onClick={handleUnstake}
          >
            Unstake
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<TrendingUp />}
            onClick={handleClaim}
          >
            Claim
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

function PoolsTable() {
  return (
    <TableContainer component={Paper} sx={{ backgroundColor: 'background.paper' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Pool</TableCell>
            <TableCell align="right">Protocol</TableCell>
            <TableCell align="right">APR</TableCell>
            <TableCell align="right">TVL</TableCell>
            <TableCell align="right">Your Stake</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockPools.map((pool) => (
            <TableRow key={pool.id}>
              <TableCell>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="body1">
                    {pool.token0.symbol}/{pool.token1.symbol}
                  </Typography>
                  {pool.stakingContract && (
                    <Tooltip title="Staking available">
                      <Lock fontSize="small" color="primary" />
                    </Tooltip>
                  )}
                </Box>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body1">{pool.protocol}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body1" color="success.main">
                  {pool.apr.toFixed(1)}%
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body1">
                  ${(pool.tvl / 1e6).toFixed(1)}M
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body1">
                  $0.00
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Box display="flex" gap={1}>
                  <Button size="small" variant="outlined">
                    Stake
                  </Button>
                  <Button size="small" variant="outlined">
                    View
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function StatsCard() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Your Farming Stats
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Total Staked
            </Typography>
            <Typography variant="h6">
              $0.00
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Total Rewards
            </Typography>
            <Typography variant="h6" color="success.main">
              $0.00
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Average APR
            </Typography>
            <Typography variant="h6">
              0.0%
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Active Pools
            </Typography>
            <Typography variant="h6">
              0
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default function FarmPage() {
  const { address } = useAccount();

  if (!address) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Yield Farming & Staking
        </Typography>
        <Alert severity="info">
          Please connect your wallet to access farming pools
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Yield Farming & Staking
      </Typography>

      <Grid container spacing={3}>
        {/* Stats */}
        <Grid item xs={12} md={4}>
          <StatsCard />
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box display="flex" gap={2} flexWrap="wrap">
                <Button variant="contained" startIcon={<Add />}>
                  Add Liquidity
                </Button>
                <Button variant="outlined" startIcon={<TrendingUp />}>
                  Claim All Rewards
                </Button>
                <Button variant="outlined" startIcon={<Info />}>
                  View Analytics
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Pools Overview */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Available Pools
          </Typography>
          <Grid container spacing={2}>
            {mockPools.map((pool) => (
              <Grid item xs={12} sm={6} md={4} key={pool.id}>
                <PoolCard pool={pool} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Detailed Table */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            All Pools
          </Typography>
          <PoolsTable />
        </Grid>
      </Grid>
    </Box>
  );
}
