'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  IconButton,
  Avatar,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  Slider,
} from '@mui/material';
import {
  Refresh,
  Add,
  Remove,
  Info,
  AutoAwesome,
  FilterList,
  Sort,
  CompressOutlined,
  ExpandOutlined,
  Analytics,
  Download,
  Notifications,
  AutoGraph,
} from '@mui/icons-material';

// Removed mock data – will wire to real sources (DeFiLlama/subgraphs)
const farmingPools: Pool[] = [
  {
    id: '1',
    name: 'ETH-USDC LP',
    tokens: ['ETH', 'USDC'],
    tvl: 2500000,
    apr: 45.2,
    rewards: ['UNI', 'ETH'],
    chain: 'Ethereum',
    impermanentLoss: 2.1,
    autoCompound: true,
    volume24h: 1250000,
    fees24h: 8500,
    userStaked: 5000,
    userRewards: 125,
    boost: 1.5,
  },
  {
    id: '2',
    name: 'WBTC-ETH LP',
    tokens: ['WBTC', 'ETH'],
    tvl: 1800000,
    apr: 38.7,
    rewards: ['WBTC', 'ETH'],
    chain: 'Ethereum',
    impermanentLoss: 1.8,
    autoCompound: false,
    volume24h: 980000,
    fees24h: 6200,
    userStaked: 3200,
    userRewards: 89,
    boost: 1.2,
  },
  {
    id: '3',
    name: 'USDC-DAI LP',
    tokens: ['USDC', 'DAI'],
    tvl: 3200000,
    apr: 12.3,
    rewards: ['USDC', 'DAI'],
    chain: 'Ethereum',
    impermanentLoss: 0.1,
    autoCompound: true,
    volume24h: 2100000,
    fees24h: 15000,
    userStaked: 8000,
    userRewards: 45,
    boost: 1.0,
  },
];

const yieldOptimizationData: null | {
  currentAPY: number;
  potentialAPY: number;
  recommendations: { action: string; potentialGain: number; risk: string }[];
  impermanentLossProtection?: { enabled: boolean; coverage: number; cost: number };
} = null;

const farmingAnalytics: null | {
  totalStaked: number;
  totalEarned: number;
  averageAPY: number;
  projectedEarnings: number;
  impermanentLoss: number;
  gasSpent: number;
} = null;

const autoCompoundSettings: null | {
  enabled: boolean;
  frequency: 'hourly' | 'daily' | 'weekly';
  threshold: number;
  maxGasPrice: number;
  gasOptimization: boolean;
} = null;

const stakingHistory: { id: string; action: 'stake'|'harvest'|'unstake'; pool: string; amount: number; timestamp: Date; txHash: string; gasUsed: number }[] = [];



interface Pool {
  id: string;
  name: string;
  tokens: string[];
  tvl: number;
  apr: number;
  rewards: string[];
  chain: string;
  impermanentLoss: number;
  autoCompound: boolean;
  volume24h: number;
  fees24h: number;
  userStaked: number;
  userRewards: number;
  boost: number;
}

function AdvancedPoolCard({ pool }: { pool: Pool }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card className="animate-fade-in-up hover-lift">
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box>
            <Typography variant="h6" fontWeight={600} mb={1}>
              {pool.name}
            </Typography>
            <Box display="flex" gap={1} mb={1}>
              {pool.tokens.map((token: string) => (
                <Chip key={token} label={token} size="small" variant="outlined" />
              ))}
            </Box>
            <Typography variant="body2" color="text.secondary">
              TVL: ${(pool.tvl / 1000000).toFixed(1)}M
            </Typography>
          </Box>
          <Box textAlign="right">
            <Typography variant="h5" fontWeight={700} color="text.primary">
              {pool.apr}% APY
            </Typography>
            <Chip
              label={pool.chain}
              size="small"
              color="primary"
              variant="outlined"
            />
          </Box>
        </Box>

        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} mb={2}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Your Stake
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              ${pool.userStaked.toLocaleString()}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Rewards Earned
            </Typography>
            <Typography variant="body1" fontWeight={600} color="text.primary">
              ${pool.userRewards}
            </Typography>
          </Box>
        </Box>

        <Box display="flex" gap={1} mb={2}>
          <Chip
            label={`IL: ${pool.impermanentLoss}%`}
            size="small"
            color="primary"
            variant="outlined"
          />
          {pool.autoCompound && (
            <Chip
              label="Auto-Compound"
              size="small"
              color="primary"
              variant="outlined"
            />
          )}
          <Chip 
            label={`${pool.boost}x Boost`}
            size="small"
            color="primary"
            variant="outlined"
          />
        </Box>

        <Box display="flex" gap={1}>
          <Button variant="contained" size="small" fullWidth>
            Stake
          </Button>
          <Button variant="outlined" size="small" fullWidth>
            Harvest
          </Button>
          <IconButton size="small" onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? <CompressOutlined /> : <ExpandOutlined />}
          </IconButton>
        </Box>

        {showDetails && (
          <Box mt={2} pt={2} borderTop="1px solid" borderColor="divider">
            <Typography variant="body2" fontWeight={600} mb={1}>
              Pool Details
            </Typography>
            <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  24h Volume
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  ${(pool.volume24h / 1000000).toFixed(1)}M
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  24h Fees
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  ${pool.fees24h}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

function YieldOptimization() {
  return (
    <Card className="animate-fade-in-up stagger-1">
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box display="flex" alignItems="center" gap={1}>
            <AutoGraph sx={{ color: 'primary.main' }} />
            <Typography variant="h6" fontWeight={600}>
              Yield Optimization
            </Typography>
          </Box>
          <IconButton size="small">
            <Refresh />
          </IconButton>
        </Box>

        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3} mb={3}>
          <Box textAlign="center" p={2} bgcolor="grey.50" borderRadius={2}>
            <Typography variant="body2" color="text.secondary">
              Current APY
            </Typography>
            <Typography variant="h5" fontWeight={600} color="text.primary">
              {yieldOptimizationData?.currentAPY ?? 0}%
            </Typography>
          </Box>
          <Box textAlign="center" p={2} bgcolor="grey.100" borderRadius={2}>
            <Typography variant="body2" color="text.secondary">
              Potential APY
            </Typography>
            <Typography variant="h5" fontWeight={600} color="text.primary">
              {yieldOptimizationData?.potentialAPY ?? 0}%
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" fontWeight={600} mb={2}>
          Optimization Recommendations
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          {(yieldOptimizationData?.recommendations ?? []).map((rec: { action: string; potentialGain: number; risk: string }, index: number) => (
            <Box key={index} p={2} border="1px solid" borderColor="divider" borderRadius={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    {rec.action}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Risk: {rec.risk}
                  </Typography>
                </Box>
                <Box textAlign="right">
                  <Typography variant="body2" fontWeight={600} color="text.primary">
                    +{rec.potentialGain}% APY
                  </Typography>
                  <Button variant="outlined" size="small">
                    Optimize
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        <Box mt={3}>
          <Typography variant="body2" fontWeight={600} mb={2}>
            Impermanent Loss Protection
          </Typography>
          <Box p={2} bgcolor="grey.50" borderRadius={2}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="body2" color="text.secondary">
                Coverage
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {(yieldOptimizationData?.impermanentLossProtection?.coverage ?? 0)}%
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Cost
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {(yieldOptimizationData?.impermanentLossProtection?.cost ?? 0)}% of rewards
              </Typography>
            </Box>
            <FormControlLabel
              control={
                <Switch checked={!!yieldOptimizationData?.impermanentLossProtection?.enabled} size="small" />
              }
              label="Enable Protection"
              sx={{ mt: 1 }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

function AutoCompoundSettings() {
  return (
    <Card className="animate-fade-in-up stagger-2">
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box display="flex" alignItems="center" gap={1}>
            <AutoAwesome sx={{ color: 'primary.main' }} />
            <Typography variant="h6" fontWeight={600}>
              Auto-Compound Settings
            </Typography>
          </Box>
          <IconButton size="small">
            <Info />
          </IconButton>
        </Box>

        {autoCompoundSettings && (
        <FormControlLabel
          control={
            <Switch
              checked={autoCompoundSettings.enabled}
              size="small"
            />
          }
          label="Enable Auto-Compound"
          sx={{ mb: 2 }}
        />)}

        <Box display="flex" flexDirection="column" gap={2}>
          <Box>
            <Typography variant="body2" fontWeight={600} mb={1}>
              Compound Frequency
            </Typography>
            <Box display="flex" gap={1}>
              {['hourly', 'daily', 'weekly'].map((freq) => (
                <Chip
                  key={freq}
                  label={freq}
                  size="small"
                  color={autoCompoundSettings?.frequency === freq ? 'primary' : 'default'}
                  variant={autoCompoundSettings?.frequency === freq ? 'filled' : 'outlined'}
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Box>
          </Box>

          <Box>
            <Typography variant="body2" fontWeight={600} mb={1}>
              Minimum Threshold (USD)
            </Typography>
            <Slider
              value={autoCompoundSettings?.threshold ?? 0}
              min={10}
              max={200}
              step={10}
              marks
              valueLabelDisplay="auto"
            />
            </Box>

          <Box>
            <Typography variant="body2" fontWeight={600} mb={1}>
              Max Gas Price (Gwei)
            </Typography>
            <Slider
              value={autoCompoundSettings?.maxGasPrice ?? 0}
              min={10}
              max={100}
              step={5}
              marks
              valueLabelDisplay="auto"
            />
          </Box>

          {autoCompoundSettings && (
          <FormControlLabel
            control={
              <Switch
                checked={!!autoCompoundSettings.gasOptimization}
                size="small"
              />
            }
            label="Gas Optimization"
          />)}
        </Box>
      </CardContent>
    </Card>
  );
}

function FarmingAnalytics() {
  return (
    <Card className="animate-fade-in-up stagger-3">
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Box display="flex" alignItems="center" gap={1}>
            <Analytics sx={{ color: 'primary.main' }} />
            <Typography variant="h6" fontWeight={600}>
              Farming Analytics
                  </Typography>
                </Box>
          <IconButton size="small">
            <Download />
          </IconButton>
                </Box>

        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3} mb={3}>
          <Box textAlign="center" p={2} bgcolor="grey.50" borderRadius={2}>
            <Typography variant="body2" color="text.secondary">
              Total Staked
            </Typography>
            <Typography variant="h5" fontWeight={600} color="text.primary">
              ${farmingAnalytics?.totalStaked?.toLocaleString?.() ?? 0}
            </Typography>
          </Box>
          <Box textAlign="center" p={2} bgcolor="grey.100" borderRadius={2}>
            <Typography variant="body2" color="text.secondary">
              Total Earned
            </Typography>
            <Typography variant="h5" fontWeight={600} color="text.primary">
              ${farmingAnalytics?.totalEarned ?? 0}
            </Typography>
          </Box>
          <Box textAlign="center" p={2} bgcolor="grey.50" borderRadius={2}>
            <Typography variant="body2" color="text.secondary">
              Average APY
            </Typography>
            <Typography variant="h5" fontWeight={600} color="text.primary">
              {farmingAnalytics?.averageAPY ?? 0}%
            </Typography>
          </Box>
          <Box textAlign="center" p={2} bgcolor="grey.100" borderRadius={2}>
            <Typography variant="body2" color="text.secondary">
              Projected Earnings
            </Typography>
            <Typography variant="h5" fontWeight={600} color="text.primary">
              ${farmingAnalytics?.projectedEarnings ?? 0}
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" fontWeight={600} mb={2}>
          Performance Metrics
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="text.secondary">
              Impermanent Loss
            </Typography>
            <Typography variant="body2" fontWeight={600} color="text.secondary">
              {farmingAnalytics?.impermanentLoss ?? 0}%
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="text.secondary">
              Gas Spent (30d)
            </Typography>
            <Typography variant="body2" fontWeight={600} color="text.secondary">
              ${farmingAnalytics?.gasSpent ?? 0}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

function StakingHistory() {
  return (
    <Card className="animate-fade-in-up stagger-4">
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight={600}>
            Staking History
          </Typography>
          <Button variant="outlined" size="small">
            View All
          </Button>
        </Box>

        <Box display="flex" flexDirection="column" gap={2}>
          {stakingHistory.map((item) => (
            <Box key={item.id} p={2} border="1px solid" borderColor="divider" borderRadius={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    {item.action === 'stake' ? <Add /> : item.action === 'harvest' ? <AutoAwesome /> : <Remove />}
                  </Avatar>
                  <Typography variant="body2" fontWeight={600}>
                    {item.action.charAt(0).toUpperCase() + item.action.slice(1)} {item.pool}
                  </Typography>
                </Box>
                <Chip
                  label={item.action}
                  color="primary"
                  size="small"
                  variant="outlined"
                />
              </Box>
              
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  ${item.amount.toLocaleString()}
                </Typography>
                <Box textAlign="right">
                  <Typography variant="caption" color="text.secondary">
                    {item.timestamp.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Gas: {item.gasUsed} ETH
        </Typography>
                </Box>
              </Box>
            </Box>
          ))}
      </Box>
      </CardContent>
    </Card>
    );
  }

export default function FarmPage() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h3" fontWeight={700} mb={1}>
            Yield Farming
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Maximize your yields with advanced farming strategies
      </Typography>
        </Box>
        <Box display="flex" gap={2}>
          <Button
            variant="outlined"
            startIcon={<Notifications />}
          >
            Alerts
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
          >
                  Add Liquidity
                </Button>
        </Box>
        </Box>

      <Box display="grid" gridTemplateColumns={{ xs: '1fr', lg: '2fr 1fr' }} gap={3}>
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5" fontWeight={600}>
            Available Pools
          </Typography>
            <Box display="flex" gap={1}>
              <Button variant="outlined" size="small" startIcon={<FilterList />}>
                Filter
              </Button>
              <Button variant="outlined" size="small" startIcon={<Sort />}>
                Sort
              </Button>
            </Box>
              </Box>

          <Box display="flex" flexDirection="column" gap={3}>
            {farmingPools.length === 0 ? (
              <Typography variant="body2" color="text.secondary">No pools available yet.</Typography>
            ) : (
              farmingPools.map((pool) => (
                <AdvancedPoolCard key={pool.id} pool={pool} />
              ))
            )}
          </Box>
        </Box>

        <Box>
          <Tabs
            value={selectedTab}
            onChange={(e, newValue) => setSelectedTab(newValue)}
            sx={{ mb: 3 }}
          >
            <Tab label="Optimize" />
            <Tab label="Auto" />
            <Tab label="Analytics" />
            <Tab label="History" />
          </Tabs>

          {selectedTab === 0 && (yieldOptimizationData ? <YieldOptimization /> : <Typography variant="body2" color="text.secondary">No optimization data.</Typography>)}
          {selectedTab === 1 && (autoCompoundSettings ? <AutoCompoundSettings /> : <Typography variant="body2" color="text.secondary">No auto-compound settings.</Typography>)}
          {selectedTab === 2 && (farmingAnalytics ? <FarmingAnalytics /> : <Typography variant="body2" color="text.secondary">No analytics available.</Typography>)}
          {selectedTab === 3 && (stakingHistory.length ? <StakingHistory /> : <Typography variant="body2" color="text.secondary">No history yet.</Typography>)}
        </Box>
      </Box>
    </Box>
  );
}
