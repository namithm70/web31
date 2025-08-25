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
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Alert,
} from '@mui/material';
import {
  Agriculture,
  Refresh,
  Settings,
  ArrowDownward,
  Warning,
  CheckCircle,
  ShowChart,
  WaterDrop,
  Lock,
  LockOpen,
  Star,
  LocalFireDepartment,
  EmojiEvents,
  MonetizationOn,
} from '@mui/icons-material';
import { WalletConnectionTest } from '@/components/wallet-connection-test';

// Mock farming pools data
const farmingPools = [
  {
    id: 1,
    name: 'ETH-USDC LP',
    tokens: ['ETH', 'USDC'],
    apy: 45.2,
    tvl: 12500000,
    staked: 0.5,
    rewards: ['UNI', 'ETH'],
    multiplier: 2.5,
    lockPeriod: 0,
    risk: 'low',
    status: 'active',
  },
  {
    id: 2,
    name: 'UNI-ETH LP',
    tokens: ['UNI', 'ETH'],
    apy: 38.7,
    tvl: 8500000,
    staked: 0,
    rewards: ['UNI', 'ETH'],
    multiplier: 2.0,
    lockPeriod: 30,
    risk: 'medium',
    status: 'active',
  },
  {
    id: 3,
    name: 'AAVE-USDC LP',
    tokens: ['AAVE', 'USDC'],
    apy: 52.1,
    tvl: 3200000,
    staked: 0,
    rewards: ['AAVE', 'ETH'],
    multiplier: 3.0,
    lockPeriod: 90,
    risk: 'high',
    status: 'active',
  },
  {
    id: 4,
    name: 'LINK-ETH LP',
    tokens: ['LINK', 'ETH'],
    apy: 28.9,
    tvl: 2100000,
    staked: 0,
    rewards: ['LINK', 'ETH'],
    multiplier: 1.5,
    lockPeriod: 0,
    risk: 'low',
    status: 'inactive',
  },
];

// Mock staking history
const stakingHistory = [
  { id: 1, pool: 'ETH-USDC LP', action: 'stake', amount: 0.5, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), status: 'completed' },
  { id: 2, pool: 'UNI-ETH LP', action: 'unstake', amount: 0.3, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), status: 'completed' },
  { id: 3, pool: 'ETH-USDC LP', action: 'claim', amount: 0.025, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72), status: 'completed' },
];

// Mock rewards data
const rewardsData = {
  totalEarned: 1250.50,
  pendingRewards: 45.20,
  nextReward: 12.80,
  lastClaim: new Date(Date.now() - 1000 * 60 * 60 * 24),
};

interface Pool {
  id: number;
  name: string;
  tokens: string[];
  apy: number;
  tvl: number;
  staked: number;
  rewards: string[];
  multiplier: number;
  lockPeriod: number;
  risk: string;
  status: string;
}

function FarmingPoolCard({ pool, onStake, onUnstake, onClaim }: {
  pool: Pool;
  onStake: (poolId: number, amount: string) => void;
  onUnstake: (poolId: number, amount?: string) => void;
  onClaim: (poolId: number) => void;
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      default: return 'default';
    }
  };

  return (
    <Card className="animate-fade-in-up" sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Typography variant="h6" fontWeight={600}>
                {pool.name}
              </Typography>
              {pool.multiplier > 2 && (
                <Chip
                  icon={<Star />}
                  label={`${pool.multiplier}x`}
                  size="small"
                  color="warning"
                  sx={{ fontSize: '0.7rem' }}
                />
              )}
              <Chip
                label={pool.risk}
                size="small"
                color={getRiskColor(pool.risk)}
                sx={{ fontSize: '0.7rem' }}
              />
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="body2" color="text.secondary">
                TVL: ${(pool.tvl / 1000000).toFixed(1)}M
              </Typography>
              {pool.lockPeriod > 0 && (
                <Box display="flex" alignItems="center" gap={0.5}>
                  <Lock sx={{ fontSize: 14 }} />
                  <Typography variant="body2" color="text.secondary">
                    {pool.lockPeriod}d lock
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
          <Box textAlign="right">
            <Typography variant="h5" fontWeight={700} color="success.main">
              {pool.apy}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              APY
            </Typography>
          </Box>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Your Stake
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              {pool.staked} LP
            </Typography>
          </Box>
          <Box textAlign="right">
            <Typography variant="body2" color="text.secondary">
              Rewards
            </Typography>
            <Box display="flex" gap={0.5}>
              {pool.rewards.map((reward: string, index: number) => (
                <Chip key={index} label={reward} size="small" variant="outlined" />
              ))}
            </Box>
          </Box>
        </Box>

        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            size="small"
            onClick={() => setShowDetails(!showDetails)}
            fullWidth
          >
            {showDetails ? 'Hide Details' : 'Stake'}
          </Button>
          {pool.staked > 0 && (
            <>
              <Button
                variant="outlined"
                size="small"
                onClick={() => onUnstake(pool.id)}
                fullWidth
              >
                Unstake
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => onClaim(pool.id)}
                fullWidth
                color="success"
              >
                Claim
              </Button>
            </>
          )}
        </Box>

        {showDetails && (
          <Box mt={2} p={2} bgcolor="grey.50" borderRadius={2}>
            <Typography variant="body2" fontWeight={600} mb={2}>
              Stake Amount
            </Typography>
            <Box display="flex" gap={1} mb={2}>
              <TextField
                size="small"
                placeholder="0.0"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                fullWidth
              />
              <Button
                variant="contained"
                size="small"
                onClick={() => onStake(pool.id, stakeAmount)}
                disabled={!stakeAmount}
              >
                Stake
              </Button>
            </Box>
            {pool.staked > 0 && (
              <>
                <Typography variant="body2" fontWeight={600} mb={2}>
                  Unstake Amount
                </Typography>
                <Box display="flex" gap={1}>
                  <TextField
                    size="small"
                    placeholder="0.0"
                    value={unstakeAmount}
                    onChange={(e) => setUnstakeAmount(e.target.value)}
                    fullWidth
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => onUnstake(pool.id, unstakeAmount)}
                    disabled={!unstakeAmount}
                  >
                    Unstake
                  </Button>
                </Box>
              </>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

function RewardsOverview() {
  return (
    <Card className="animate-fade-in-up">
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={3}>
          Rewards Overview
        </Typography>
        
        <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={3}>
          <Box textAlign="center" p={2} bgcolor="success.light" borderRadius={2}>
            <MonetizationOn sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
            <Typography variant="h4" fontWeight={700} color="success.main">
              ${rewardsData.totalEarned.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Earned
            </Typography>
          </Box>
          
          <Box textAlign="center" p={2} bgcolor="warning.light" borderRadius={2}>
            <LocalFireDepartment sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
            <Typography variant="h4" fontWeight={700} color="warning.main">
              ${rewardsData.pendingRewards.toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Pending Rewards
            </Typography>
          </Box>
        </Box>

        <Box mt={3} p={2} bgcolor="grey.50" borderRadius={2}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="body2" color="text.secondary">
              Next Reward
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              ${rewardsData.nextReward}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="text.secondary">
              Last Claim
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {rewardsData.lastClaim.toLocaleDateString()}
            </Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          fullWidth
          size="large"
          startIcon={<EmojiEvents />}
          sx={{ mt: 2 }}
        >
          Claim All Rewards
        </Button>
      </CardContent>
    </Card>
  );
}

function StakingHistory() {
  return (
    <Card className="animate-fade-in-up stagger-1">
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={3}>
          Staking History
        </Typography>
        <List>
          {stakingHistory.map((item) => (
            <ListItem key={item.id} sx={{ px: 0, py: 1 }}>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: item.action === 'stake' ? 'success.main' : 
                             item.action === 'unstake' ? 'warning.main' : 'info.main',
                  }}
                >
                  {item.action === 'stake' ? <Lock /> : 
                   item.action === 'unstake' ? <LockOpen /> : <MonetizationOn />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body1" fontWeight={600}>
                      {item.action.charAt(0).toUpperCase() + item.action.slice(1)} {item.pool}
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {item.amount} LP
                    </Typography>
                  </Box>
                }
                secondary={
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" color="text.secondary">
                      {item.timestamp.toLocaleDateString()}
                    </Typography>
                    <Chip
                      label={item.status}
                      size="small"
                      color={item.status === 'completed' ? 'success' : 'warning'}
                    />
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default function FarmPage() {
  const [filterRisk, setFilterRisk] = useState('all');

  const handleStake = (poolId: number, amount: string) => {
    console.log('Staking', amount, 'in pool', poolId);
  };

  const handleUnstake = (poolId: number, amount?: string) => {
    console.log('Unstaking', amount || 'all', 'from pool', poolId);
  };

  const handleClaim = (poolId: number) => {
    console.log('Claiming rewards from pool', poolId);
  };

  const filteredPools = farmingPools.filter(pool => 
    filterRisk === 'all' || pool.risk === filterRisk
  );

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h3" fontWeight={700} mb={1}>
            Yield Farming
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Earn rewards by providing liquidity to DeFi protocols
          </Typography>
        </Box>
        <Box display="flex" gap={2}>
          <Button variant="outlined" startIcon={<Refresh />}>
            Refresh
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
          {/* Filters */}
          <Card className="animate-fade-in-up" sx={{ mb: 3 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight={600}>
                  Farming Pools
                </Typography>
                <Box display="flex" gap={1}>
                  <Button
                    size="small"
                    variant={filterRisk === 'all' ? 'contained' : 'outlined'}
                    onClick={() => setFilterRisk('all')}
                  >
                    All
                  </Button>
                  <Button
                    size="small"
                    variant={filterRisk === 'low' ? 'contained' : 'outlined'}
                    onClick={() => setFilterRisk('low')}
                    color="success"
                  >
                    Low Risk
                  </Button>
                  <Button
                    size="small"
                    variant={filterRisk === 'medium' ? 'contained' : 'outlined'}
                    onClick={() => setFilterRisk('medium')}
                    color="warning"
                  >
                    Medium Risk
                  </Button>
                  <Button
                    size="small"
                    variant={filterRisk === 'high' ? 'contained' : 'outlined'}
                    onClick={() => setFilterRisk('high')}
                    color="error"
                  >
                    High Risk
                  </Button>
                </Box>
              </Box>
              
              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  <strong>Tip:</strong> Higher APY pools often come with higher risks. 
                  Consider diversifying across multiple pools to manage risk.
                </Typography>
              </Alert>
            </CardContent>
          </Card>

          {/* Farming Pools */}
          {filteredPools.map((pool) => (
            <FarmingPoolCard
              key={pool.id}
              pool={pool}
              onStake={handleStake}
              onUnstake={handleUnstake}
              onClaim={handleClaim}
            />
          ))}
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
