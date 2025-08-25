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
  Download,
  Notifications,
  Star,
  StarBorder,
  Info,
  Warning,
  CheckCircle,
  Speed,
  AutoAwesome,
  ShowChart,
  Timeline,
  Bolt,
  LocalFireDepartment,
  WaterDrop,
  ElectricBolt,
  FilterList,
  Sort,
  ViewList,
  ViewModule,
  PieChart,
  BarChart,
  AttachMoney,
  AccountBalanceWallet,
  Security,
  Analytics,
  AutoGraph,
  Psychology,
  Lightbulb,
  Diamond,
  EmojiEvents,
  RocketLaunch,
  TrendingFlat,
  ExpandMore,
  ContentCopy,
  Share as ShareIcon,
  Download as DownloadIcon,
  Upload,
  Visibility as VisibilityIcon,
  VisibilityOff,
  AutoAwesome as AutoAwesomeIcon,
  PsychologyAlt,
  Calculate,
  Timeline as TimelineIcon,
  CompressOutlined,
  ExpandOutlined,
} from '@mui/icons-material';

// Enhanced mock data for advanced farming features
const farmingPools = [
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

const yieldOptimizationData = {
  currentAPY: 28.5,
  potentialAPY: 42.3,
  recommendations: [
    { action: 'Move to ETH-USDC LP', potentialGain: 8.2, risk: 'medium' },
    { action: 'Enable auto-compound', potentialGain: 3.1, risk: 'low' },
    { action: 'Use boost multiplier', potentialGain: 5.7, risk: 'low' },
  ],
  impermanentLossProtection: {
    enabled: true,
    coverage: 85,
    cost: 0.5,
  },
};

const farmingAnalytics = {
  totalStaked: 16200,
  totalEarned: 259,
  averageAPY: 32.1,
  projectedEarnings: 420,
  impermanentLoss: 4.0,
  gasSpent: 125,
};

const autoCompoundSettings = {
  enabled: true,
  frequency: 'daily',
  threshold: 50,
  gasOptimization: true,
  maxGasPrice: 25,
};

const stakingHistory = [
  {
    id: '1',
    action: 'stake',
    pool: 'ETH-USDC LP',
    amount: 2000,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    txHash: '0x1234...5678',
    gasUsed: 0.002,
  },
  {
    id: '2',
    action: 'harvest',
    pool: 'WBTC-ETH LP',
    amount: 45,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
    txHash: '0x8765...4321',
    gasUsed: 0.001,
  },
  {
    id: '3',
    action: 'unstake',
    pool: 'USDC-DAI LP',
    amount: 1500,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
    txHash: '0xabcd...efgh',
    gasUsed: 0.003,
  },
];



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
              {yieldOptimizationData.currentAPY}%
            </Typography>
          </Box>
          <Box textAlign="center" p={2} bgcolor="grey.100" borderRadius={2}>
            <Typography variant="body2" color="text.secondary">
              Potential APY
            </Typography>
            <Typography variant="h5" fontWeight={600} color="text.primary">
              {yieldOptimizationData.potentialAPY}%
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" fontWeight={600} mb={2}>
          Optimization Recommendations
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          {yieldOptimizationData.recommendations.map((rec, index) => (
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
                {yieldOptimizationData.impermanentLossProtection.coverage}%
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Cost
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {yieldOptimizationData.impermanentLossProtection.cost}% of rewards
              </Typography>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={yieldOptimizationData.impermanentLossProtection.enabled}
                  size="small"
                />
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

        <FormControlLabel
          control={
            <Switch
              checked={autoCompoundSettings.enabled}
              size="small"
            />
          }
          label="Enable Auto-Compound"
          sx={{ mb: 2 }}
        />

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
                  color={autoCompoundSettings.frequency === freq ? 'primary' : 'default'}
                  variant={autoCompoundSettings.frequency === freq ? 'filled' : 'outlined'}
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
              value={autoCompoundSettings.threshold}
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
              value={autoCompoundSettings.maxGasPrice}
              min={10}
              max={100}
              step={5}
              marks
              valueLabelDisplay="auto"
            />
          </Box>

          <FormControlLabel
            control={
              <Switch
                checked={autoCompoundSettings.gasOptimization}
                size="small"
              />
            }
            label="Gas Optimization"
          />
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
              ${farmingAnalytics.totalStaked.toLocaleString()}
            </Typography>
          </Box>
          <Box textAlign="center" p={2} bgcolor="grey.100" borderRadius={2}>
            <Typography variant="body2" color="text.secondary">
              Total Earned
            </Typography>
            <Typography variant="h5" fontWeight={600} color="text.primary">
              ${farmingAnalytics.totalEarned}
            </Typography>
          </Box>
          <Box textAlign="center" p={2} bgcolor="grey.50" borderRadius={2}>
            <Typography variant="body2" color="text.secondary">
              Average APY
            </Typography>
            <Typography variant="h5" fontWeight={600} color="text.primary">
              {farmingAnalytics.averageAPY}%
            </Typography>
          </Box>
          <Box textAlign="center" p={2} bgcolor="grey.100" borderRadius={2}>
            <Typography variant="body2" color="text.secondary">
              Projected Earnings
            </Typography>
            <Typography variant="h5" fontWeight={600} color="text.primary">
              ${farmingAnalytics.projectedEarnings}
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
              {farmingAnalytics.impermanentLoss}%
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="text.secondary">
              Gas Spent (30d)
            </Typography>
            <Typography variant="body2" fontWeight={600} color="text.secondary">
              ${farmingAnalytics.gasSpent}
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
            {farmingPools.map((pool) => (
              <AdvancedPoolCard key={pool.id} pool={pool} />
            ))}
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

          {selectedTab === 0 && <YieldOptimization />}
          {selectedTab === 1 && <AutoCompoundSettings />}
          {selectedTab === 2 && <FarmingAnalytics />}
          {selectedTab === 3 && <StakingHistory />}
        </Box>
      </Box>
    </Box>
  );
}
