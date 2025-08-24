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
  Add,
  TrendingUp,
  Info,
  ExpandMore,
} from '@mui/icons-material';
import { useAccount } from 'wagmi';
import { PoolData } from '@/types';

// Mock data
const mockPools: PoolData[] = [
  {
    id: 'uni-eth-usdc',
    protocol: 'Uniswap V3',
    token0: {
      address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' as `0x${string}`,
      symbol: 'WETH',
      name: 'Wrapped Ether',
      decimals: 18,
      price: 3500,
    },
    token1: {
      address: '0xA0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8C8C' as `0x${string}`,
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      price: 1,
    },
    apr: 45.2,
    tvl: 2500000,
    stakingContract: '0x1234567890123456789012345678901234567890' as `0x${string}`,
    rewardTokens: [
      {
        address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984' as `0x${string}`,
        symbol: 'UNI',
        name: 'Uniswap',
        decimals: 18,
        price: 12.5,
      }
    ],
  },
  {
    id: 'curve-3pool',
    protocol: 'Curve Finance',
    token0: {
      address: '0xA0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8C8C' as `0x${string}`,
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      price: 1,
    },
    token1: {
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F' as `0x${string}`,
      symbol: 'DAI',
      name: 'Dai Stablecoin',
      decimals: 18,
      price: 1,
    },
    apr: 12.8,
    tvl: 1800000,
    stakingContract: '0x1234567890123456789012345678901234567890' as `0x${string}`,
    rewardTokens: [
      {
        address: '0xD533a949740bb3306d119CC777fa900bA034cd52' as `0x${string}`,
        symbol: 'CRV',
        name: 'Curve DAO Token',
        decimals: 18,
        price: 0.85,
      }
    ],
  },
  {
    id: 'aave-usdc',
    protocol: 'Aave V3',
    token0: {
      address: '0xA0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8C8C' as `0x${string}`,
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      price: 1,
    },
    token1: {
      address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599' as `0x${string}`,
      symbol: 'WBTC',
      name: 'Wrapped Bitcoin',
      decimals: 8,
      price: 45000,
    },
    apr: 8.5,
    tvl: 950000,
    stakingContract: '0x1234567890123456789012345678901234567890' as `0x${string}`,
    rewardTokens: [
      {
        address: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9' as `0x${string}`,
        symbol: 'AAVE',
        name: 'Aave Token',
        decimals: 18,
        price: 85.5,
      }
    ],
  },
];

function PoolCard({ pool }: { pool: PoolData }) {
  const [stakeAmount] = useState('');
  const [isStaked, setIsStaked] = useState(false);

  const handleStake = () => {
    // TODO: Implement staking logic
    console.log('Staking in pool:', pool.id);
  };

  const handleUnstake = () => {
    // TODO: Implement unstaking logic
    console.log('Unstaking from pool:', pool.id);
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

        <Box display="flex" gap={2} mb={2}>
          <Box flex={1}>
            <Typography variant="body2" color="text.secondary">
              TVL
            </Typography>
            <Typography variant="h6">
              ${(pool.tvl / 1e6).toFixed(1)}M
            </Typography>
          </Box>
          <Box flex={1}>
            <Typography variant="body2" color="text.secondary">
              Your Stake
            </Typography>
            <Typography variant="h6">
              $0.00
            </Typography>
          </Box>
        </Box>

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

        {!isStaked ? (
          <Button
            variant="contained"
            fullWidth
            onClick={() => setIsStaked(true)}
          >
            Stake LP Tokens
          </Button>
        ) : (
          <Box>
            <Box display="flex" gap={1} mb={2}>
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
                onClick={() => setIsStaked(false)}
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
            startIcon={<ExpandMore />}
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
                    <Chip
                      label="Staking"
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
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
        <Box display="flex" gap={2} flexWrap="wrap">
          <Box flex={1}>
            <Typography variant="body2" color="text.secondary">
              Total Staked
            </Typography>
            <Typography variant="h6">
              $0.00
            </Typography>
          </Box>
          <Box flex={1}>
            <Typography variant="body2" color="text.secondary">
              Total Rewards
            </Typography>
            <Typography variant="h6" color="success.main">
              $0.00
            </Typography>
          </Box>
          <Box flex={1}>
            <Typography variant="body2" color="text.secondary">
              Average APR
            </Typography>
            <Typography variant="h6">
              0.0%
            </Typography>
          </Box>
          <Box flex={1}>
            <Typography variant="body2" color="text.secondary">
              Active Pools
            </Typography>
            <Typography variant="h6">
              0
            </Typography>
          </Box>
        </Box>
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

      <Box display="flex" gap={3}>
        {/* Stats */}
        <Box flex={1}>
          <StatsCard />
        </Box>

        {/* Quick Actions */}
        <Box flex={1}>
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
        </Box>

        {/* Pools Overview */}
        <Box flex={2}>
          <Typography variant="h5" gutterBottom>
            Available Pools
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={2}>
            {mockPools.map((pool) => (
              <Box key={pool.id} flex={1} minWidth="300px">
                <PoolCard pool={pool} />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Detailed Table */}
        <Box flex={1}>
          <Typography variant="h5" gutterBottom>
            All Pools
          </Typography>
          <PoolsTable />
        </Box>
      </Box>
    </Box>
  );
}
