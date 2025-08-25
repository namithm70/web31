'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Settings,
  History,
} from '@mui/icons-material';
import { WalletConnectionTest } from '@/components/wallet-connection-test';

// Mock data
const farmingPools = [
  {
    id: 1,
    name: 'ETH-USDC LP',
    token1: 'ETH',
    token2: 'USDC',
    apy: 45.2,
    tvl: 2500000,
    multiplier: 2.5,
    risk: 'medium' as const,
    lockPeriod: 30,
    rewards: { token: 'FARM', amount: 1250 },
  },
  {
    id: 2,
    name: 'WBTC-ETH LP',
    token1: 'WBTC',
    token2: 'ETH',
    apy: 38.7,
    tvl: 1800000,
    multiplier: 2.0,
    risk: 'low' as const,
    lockPeriod: 7,
    rewards: { token: 'FARM', amount: 850 },
  },
  {
    id: 3,
    name: 'UNI-ETH LP',
    token1: 'UNI',
    token2: 'ETH',
    apy: 52.1,
    tvl: 950000,
    multiplier: 3.0,
    risk: 'high' as const,
    lockPeriod: 90,
    rewards: { token: 'FARM', amount: 2100 },
  },
  {
    id: 4,
    name: 'AAVE-USDC LP',
    token1: 'AAVE',
    token2: 'USDC',
    apy: 41.8,
    tvl: 1200000,
    multiplier: 2.2,
    risk: 'medium' as const,
    lockPeriod: 14,
    rewards: { token: 'FARM', amount: 1100 },
  },
];

const stakingHistory = [
  { id: 1, pool: 'ETH-USDC LP', amount: 1000, timestamp: '2024-01-15T10:30:00Z', action: 'stake' },
  { id: 2, pool: 'WBTC-ETH LP', amount: 500, timestamp: '2024-01-15T09:15:00Z', action: 'unstake' },
  { id: 3, pool: 'UNI-ETH LP', amount: 750, timestamp: '2024-01-15T08:45:00Z', action: 'claim' },
];

const rewardsData = {
  totalEarned: 3250,
  pendingRewards: 450,
  claimableTokens: ['FARM', 'UNI', 'AAVE'],
  nextReward: 125,
};

interface Pool {
  id: number;
  name: string;
  token1: string;
  token2: string;
  apy: number;
  tvl: number;
  multiplier: number;
  risk: 'low' | 'medium' | 'high';
  lockPeriod: number;
  rewards: { token: string; amount: number };
}

function FarmingPoolCard({ pool }: { pool: Pool }) {
  const [stakedAmount, setStakedAmount] = useState('');
  const [showActions, setShowActions] = useState(false);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'primary';
      case 'medium': return 'primary';
      case 'high': return 'primary';
      default: return 'default';
    }
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              {pool.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {pool.token1}/{pool.token2} Liquidity Pool
            </Typography>
          </Box>
          <Chip
            label={pool.risk.toUpperCase()}
            color={getRiskColor(pool.risk) as 'primary' | 'default'}
            size="small"
            variant="outlined"
          />
        </Box>

        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} mb={3}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              APY
            </Typography>
            <Typography variant="h6" fontWeight={600} color="text.primary">
              {pool.apy}%
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              TVL
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              ${(pool.tvl / 1000000).toFixed(1)}M
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Multiplier
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              {pool.multiplier}x
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Lock Period
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              {pool.lockPeriod} days
            </Typography>
          </Box>
        </Box>

        <Box display="flex" gap={1} mb={2}>
          <Button
            variant="contained"
            size="small"
            onClick={() => setShowActions(!showActions)}
            fullWidth
          >
            {showActions ? 'Hide Actions' : 'Show Actions'}
          </Button>
        </Box>

        {showActions && (
          <Box>
            <TextField
              label="Amount to Stake"
              type="number"
              value={stakedAmount}
              onChange={(e) => setStakedAmount(e.target.value)}
              fullWidth
              size="small"
              sx={{ mb: 2 }}
            />
            <Box display="flex" gap={1}>
              <Button variant="outlined" size="small" fullWidth>
                Stake
              </Button>
              <Button variant="outlined" size="small" fullWidth>
                Unstake
              </Button>
              <Button variant="outlined" size="small" fullWidth>
                Claim
              </Button>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

function RewardsOverview() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={3}>
          Rewards Overview
        </Typography>

        <Box display="flex" flexDirection="column" gap={3}>
          <Box p={2} bgcolor="grey.50" borderRadius={2}>
            <Typography variant="body2" color="text.secondary">
              Total Earned
            </Typography>
            <Typography variant="h5" fontWeight={600} color="text.primary">
              {rewardsData.totalEarned} FARM
            </Typography>
          </Box>

          <Box p={2} bgcolor="grey.100" borderRadius={2}>
            <Typography variant="body2" color="text.secondary">
              Pending Rewards
            </Typography>
            <Typography variant="h5" fontWeight={600} color="text.primary">
              {rewardsData.pendingRewards} FARM
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2" fontWeight={600} mb={1}>
              Claimable Tokens
            </Typography>
            <Box display="flex" gap={1} flexWrap="wrap">
              {rewardsData.claimableTokens.map((token) => (
                <Chip key={token} label={token} size="small" variant="outlined" />
              ))}
            </Box>
          </Box>

          <Button variant="contained" fullWidth>
            Claim All Rewards
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

function StakingHistory() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={3}>
          Staking History
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          {stakingHistory.map((item) => (
            <Box key={item.id} p={2} border="1px solid" borderColor="divider" borderRadius={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="body1" fontWeight={600}>
                  {item.pool}
                </Typography>
                <Chip
                  label={item.action}
                  color="primary"
                  size="small"
                  variant="outlined"
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Amount: ${item.amount.toLocaleString()}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(item.timestamp).toLocaleString()}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

export default function FarmPage() {
  const [selectedRisk, setSelectedRisk] = useState<string>('all');

  const filteredPools = selectedRisk === 'all' 
    ? farmingPools 
    : farmingPools.filter(pool => pool.risk === selectedRisk);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h3" fontWeight={700} mb={1}>
            Farm
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Earn rewards by providing liquidity to DeFi protocols
          </Typography>
        </Box>
        <Box display="flex" gap={2}>
          <Button variant="outlined" startIcon={<History />}>
            History
          </Button>
          <Button variant="outlined" startIcon={<Settings />}>
            Settings
          </Button>
        </Box>
      </Box>

      <WalletConnectionTest />

      <Box display="grid" gridTemplateColumns={{ xs: '1fr', lg: '2fr 1fr' }} gap={4}>
        {/* Main Content */}
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5" fontWeight={600}>
              Farming Pools
            </Typography>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Risk Level</InputLabel>
              <Select
                value={selectedRisk}
                onChange={(e) => setSelectedRisk(e.target.value)}
                label="Risk Level"
              >
                <MenuItem value="all">All Risks</MenuItem>
                <MenuItem value="low">Low Risk</MenuItem>
                <MenuItem value="medium">Medium Risk</MenuItem>
                <MenuItem value="high">High Risk</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={3}>
            {filteredPools.map((pool) => (
              <FarmingPoolCard key={pool.id} pool={pool} />
            ))}
          </Box>
        </Box>

        {/* Sidebar */}
        <Box>
          <RewardsOverview />
          
          <Box mt={3}>
            <StakingHistory />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
