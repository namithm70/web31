'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
  Slider,
  Alert,
  Badge,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  InputLabel,
  Select,
  LinearProgress,
  Grid,
  Paper,
} from '@mui/material';
import {
  Agriculture,
  TrendingUp,
  TrendingDown,
  Settings,
  History,
  Notifications,
  Star,
  StarBorder,
  Refresh,
  Info,
  Warning,
  CheckCircle,
  Speed,
  AutoGraph,
  Analytics,
  ShowChart,
  Timeline,
  Bolt,
  LocalFireDepartment,
  WaterDrop,
  ElectricBolt,
  Compress,
  Expand,
  FilterList,
  Sort,
  ViewList,
  ViewModule,
  PieChart,
  BarChart,
  AttachMoney,
  AccountBalanceWallet,
  CurrencyExchange,
  Security,
  Psychology,
  Lightbulb,
  Diamond,
  EmojiEvents,
  RocketLaunch,
  TrendingFlat,
  ExpandMore,
  Add,
  Remove,
  ContentCopy,
  Share,
  Download,
  Upload,
  Visibility,
  VisibilityOff,
  AutoAwesome,
  PsychologyAlt,
  Calculate,
  TimelineIcon,
  TrendingUpOutlined,
  TrendingDownOutlined,
  SpeedOutlined,
  SecurityOutlined,
  AnalyticsOutlined,
  AutoGraphOutlined,
  ShowChartOutlined,
  TimelineOutlined,
  BoltOutlined,
  LocalFireDepartmentOutlined,
  WaterDropOutlined,
  ElectricBoltOutlined,
  CompressOutlined,
  ExpandOutlined,
  FilterListOutlined,
  SortOutlined,
  ViewListOutlined,
  ViewModuleOutlined,
  PieChartOutlined,
  BarChartOutlined,
  AttachMoneyOutlined,
  AccountBalanceWalletOutlined,
  CurrencyExchangeOutlined,
  SecurityOutlined as SecurityOutlinedIcon,
  PsychologyOutlined,
  LightbulbOutlined,
  DiamondOutlined,
  EmojiEventsOutlined,
  RocketLaunchOutlined,
  TrendingFlatOutlined,
  ExpandMoreOutlined,
  AddOutlined,
  RemoveOutlined,
  ContentCopyOutlined,
  ShareOutlined,
  DownloadOutlined,
  UploadOutlined,
  VisibilityOutlined,
  VisibilityOffOutlined,
  AutoAwesomeOutlined,
  PsychologyAltOutlined,
  CalculateOutlined,
  TimelineIconOutlined,
} from '@mui/icons-material';
import { WalletConnectionTest } from '@/components/wallet-connection-test';

// Enhanced mock data with advanced farming features
const farmingPools = [
  {
    id: 'uni-eth-usdc',
    name: 'UNI-ETH-USDC',
    tokens: ['UNI', 'ETH', 'USDC'],
    tvl: 25000000,
    apy: 45.2,
    apr: 38.5,
    risk: 'medium',
    rewards: ['UNI', 'ETH'],
    chain: 'Ethereum',
    impermanentLoss: 2.1,
    autoCompound: true,
    lockPeriod: 0,
    volume24h: 8500000,
    fees24h: 12500,
    userStaked: 5000,
    userRewards: 125.5,
    multiplier: 2.5,
    boost: 'active',
  },
  {
    id: 'aave-usdc-dai',
    name: 'AAVE-USDC-DAI',
    tokens: ['AAVE', 'USDC', 'DAI'],
    tvl: 18000000,
    apy: 32.8,
    apr: 28.4,
    risk: 'low',
    rewards: ['AAVE', 'USDC'],
    chain: 'Ethereum',
    impermanentLoss: 0.8,
    autoCompound: false,
    lockPeriod: 7,
    volume24h: 5200000,
    fees24h: 8900,
    userStaked: 0,
    userRewards: 0,
    multiplier: 1.0,
    boost: 'inactive',
  },
  {
    id: 'curve-3pool',
    name: 'Curve 3Pool',
    tokens: ['USDC', 'USDT', 'DAI'],
    tvl: 45000000,
    apy: 18.5,
    apr: 16.9,
    risk: 'low',
    rewards: ['CRV', '3CRV'],
    chain: 'Ethereum',
    impermanentLoss: 0.1,
    autoCompound: true,
    lockPeriod: 0,
    volume24h: 12500000,
    fees24h: 18500,
    userStaked: 15000,
    userRewards: 45.2,
    multiplier: 1.5,
    boost: 'active',
  },
];

const yieldOptimizationData = {
  currentAPY: 28.5,
  potentialAPY: 42.3,
  recommendations: [
    {
      action: 'Move to UNI-ETH-USDC pool',
      potentialGain: 13.8,
      risk: 'medium',
      reason: 'Higher APY with good liquidity',
    },
    {
      action: 'Enable auto-compounding',
      potentialGain: 2.1,
      risk: 'low',
      reason: 'Compound rewards automatically',
    },
    {
      action: 'Stake CRV for boost',
      potentialGain: 5.2,
      risk: 'low',
      reason: 'Increase rewards multiplier',
    },
  ],
  impermanentLossProtection: {
    enabled: true,
    coverage: 80,
    cost: 0.5,
  },
};

const farmingAnalytics = {
  totalStaked: 45000,
  totalEarned: 1250.5,
  averageAPY: 32.1,
  bestPerformingPool: 'UNI-ETH-USDC',
  worstPerformingPool: 'AAVE-USDC-DAI',
  impermanentLoss: -125.3,
  gasSpent: 45.2,
  efficiency: 85.7,
  diversification: 3,
  riskScore: 'medium',
  projectedEarnings: {
    daily: 12.5,
    weekly: 87.5,
    monthly: 375.0,
    yearly: 4500.0,
  },
};

const stakingHistory = [
  {
    id: 1,
    pool: 'UNI-ETH-USDC',
    action: 'stake',
    amount: 5000,
    timestamp: '2024-01-15T10:30:00Z',
    txHash: '0x1234...5678',
    status: 'completed',
    gasUsed: 45,
  },
  {
    id: 2,
    pool: 'Curve 3Pool',
    action: 'unstake',
    amount: 2500,
    timestamp: '2024-01-14T15:20:00Z',
    txHash: '0x8765...4321',
    status: 'completed',
    gasUsed: 52,
  },
  {
    id: 3,
    pool: 'UNI-ETH-USDC',
    action: 'claim',
    amount: 125.5,
    timestamp: '2024-01-13T09:45:00Z',
    txHash: '0xabcd...efgh',
    status: 'completed',
    gasUsed: 38,
  },
];

const autoCompoundSettings = {
  enabled: true,
  frequency: 'daily',
  threshold: 50,
  gasOptimization: true,
  maxGasPrice: 45,
  pools: ['uni-eth-usdc', 'curve-3pool'],
};

function AdvancedPoolCard({ pool }: { pool: any }) {
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
              {pool.chain} • TVL: ${(pool.tvl / 1000000).toFixed(1)}M
            </Typography>
          </Box>
          <Box textAlign="right">
            <Typography variant="h5" fontWeight={700} color="text.primary">
              {pool.apy}% APY
            </Typography>
            <Chip
              label={pool.risk}
              color="primary"
              size="small"
              variant="outlined"
            />
            {pool.boost === 'active' && (
              <Chip
                label={`${pool.multiplier}x Boost`}
                size="small"
                color="primary"
                sx={{ ml: 1 }}
              />
            )}
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
              ${pool.userRewards.toFixed(2)}
            </Typography>
          </Box>
        </Box>

        <Box display="flex" gap={1} mb={2}>
          <Button
            variant="contained"
            size="small"
            startIcon={<Add />}
            fullWidth
          >
            Stake
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Remove />}
            fullWidth
          >
            Unstake
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<AttachMoney />}
            fullWidth
          >
            Claim
          </Button>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <IconButton size="small" onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? <Compress /> : <Expand />}
          </IconButton>
          <Box display="flex" gap={1}>
            {pool.autoCompound && (
              <Tooltip title="Auto-compounding enabled">
                <AutoAwesome sx={{ fontSize: 16, color: 'primary.main' }} />
              </Tooltip>
            )}
            <Tooltip title="Impermanent Loss Protection">
              <Security sx={{ fontSize: 16, color: 'primary.main' }} />
            </Tooltip>
          </Box>
        </Box>

        {showDetails && (
          <Box mt={2} pt={2} borderTop="1px solid" borderColor="divider">
            <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} mb={2}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  APR
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {pool.apr}%
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Impermanent Loss
                </Typography>
                <Typography variant="body1" fontWeight={600} color="text.secondary">
                  {pool.impermanentLoss}%
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  24h Volume
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  ${(pool.volume24h / 1000000).toFixed(1)}M
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  24h Fees
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  ${pool.fees24h.toLocaleString()}
                </Typography>
              </Box>
            </Box>
            
            <Typography variant="body2" fontWeight={600} mb={1}>
              Rewards
            </Typography>
            <Box display="flex" gap={1} mb={2}>
              {pool.rewards.map((reward: string) => (
                <Chip key={reward} label={reward} size="small" variant="outlined" />
              ))}
            </Box>

            {pool.lockPeriod > 0 && (
              <Alert severity="info" sx={{ mb: 2 }}>
                Lock period: {pool.lockPeriod} days
              </Alert>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

function YieldOptimization() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card className="animate-fade-in-up stagger-2">
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box display="flex" alignItems="center" gap={1}>
            <AutoGraph sx={{ color: 'primary.main' }} />
            <Typography variant="h6" fontWeight={600}>
              Yield Optimization
            </Typography>
          </Box>
          <IconButton size="small" onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? <Compress /> : <Expand />}
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

        {showDetails && (
          <Box>
            <Typography variant="body2" fontWeight={600} mb={2}>
              Optimization Recommendations
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              {yieldOptimizationData.recommendations.map((rec, index) => (
                <Box key={index} p={2} border="1px solid" borderColor="divider" borderRadius={2}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="body2" fontWeight={600}>
                      {rec.action}
                    </Typography>
                    <Typography variant="body2" fontWeight={600} color="text.primary">
                      +{rec.potentialGain}% APY
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                    {rec.reason}
                  </Typography>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Chip label={`Risk: ${rec.risk}`} size="small" variant="outlined" />
                    <Button variant="outlined" size="small">
                      Optimize
                    </Button>
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
                      color="primary"
                    />
                  }
                  label="Enable Protection"
                  sx={{ mt: 1 }}
                />
              </Box>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

function AutoCompoundSettings() {
  const [settings, setSettings] = useState(autoCompoundSettings);

  return (
    <Card className="animate-fade-in-up stagger-3">
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box display="flex" alignItems="center" gap={1}>
            <AutoAwesome sx={{ color: 'primary.main' }} />
            <Typography variant="h6" fontWeight={600}>
              Auto-Compound Settings
            </Typography>
          </Box>
          <FormControlLabel
            control={
              <Switch
                checked={settings.enabled}
                onChange={(e) => setSettings({ ...settings, enabled: e.target.checked })}
                color="primary"
              />
            }
            label="Enable"
          />
        </Box>

        {settings.enabled && (
          <Box>
            <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3} mb={3}>
              <FormControl fullWidth>
                <InputLabel>Frequency</InputLabel>
                <Select
                  value={settings.frequency}
                  onChange={(e) => setSettings({ ...settings, frequency: e.target.value })}
                  label="Frequency"
                >
                  <MenuItem value="hourly">Hourly</MenuItem>
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                </Select>
              </FormControl>
              
              <TextField
                label="Threshold ($)"
                type="number"
                value={settings.threshold}
                onChange={(e) => setSettings({ ...settings, threshold: parseInt(e.target.value) })}
                fullWidth
              />
            </Box>

            <Typography variant="body2" fontWeight={600} mb={2}>
              Gas Optimization
            </Typography>
            <Box display="flex" flexDirection="column" gap={2} mb={3}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.gasOptimization}
                    onChange={(e) => setSettings({ ...settings, gasOptimization: e.target.checked })}
                    color="primary"
                  />
                }
                label="Optimize gas usage"
              />
              
              <TextField
                label="Max Gas Price (GWEI)"
                type="number"
                value={settings.maxGasPrice}
                onChange={(e) => setSettings({ ...settings, maxGasPrice: parseInt(e.target.value) })}
                fullWidth
              />
            </Box>

            <Typography variant="body2" fontWeight={600} mb={2}>
              Selected Pools
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {settings.pools.map((pool) => (
                <Chip key={pool} label={pool} size="small" variant="outlined" />
              ))}
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

function FarmingAnalytics() {
  return (
    <Card className="animate-fade-in-up stagger-4">
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box display="flex" alignItems="center" gap={1}>
            <Analytics sx={{ color: 'primary.main' }} />
            <Typography variant="h6" fontWeight={600}>
              Farming Analytics
            </Typography>
          </Box>
          <IconButton size="small">
            <Refresh />
          </IconButton>
        </Box>

        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={3} mb={3}>
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
              ${farmingAnalytics.totalEarned.toFixed(2)}
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
              Efficiency
            </Typography>
            <Typography variant="h5" fontWeight={600} color="text.primary">
              {farmingAnalytics.efficiency}%
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" fontWeight={600} mb={2}>
          Projected Earnings
        </Typography>
        <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2} mb={3}>
          {Object.entries(farmingAnalytics.projectedEarnings).map(([period, amount]) => (
            <Box key={period} textAlign="center" p={1} bgcolor="grey.50" borderRadius={1}>
              <Typography variant="caption" color="text.secondary" display="block">
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                ${amount.toFixed(2)}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="body2" color="text.secondary">
              Impermanent Loss
            </Typography>
            <Typography variant="body1" fontWeight={600} color="text.secondary">
              ${farmingAnalytics.impermanentLoss.toFixed(2)}
            </Typography>
          </Box>
          <Box textAlign="right">
            <Typography variant="body2" color="text.secondary">
              Gas Spent
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              ${farmingAnalytics.gasSpent.toFixed(2)}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

function StakingHistory() {
  return (
    <Card className="animate-fade-in-up stagger-5">
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight={600}>
            Staking History
          </Typography>
          <Button variant="outlined" size="small" startIcon={<Download />}>
            Export
          </Button>
        </Box>

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
              
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Amount: ${item.amount.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(item.timestamp).toLocaleString()}
                  </Typography>
                </Box>
                <Box textAlign="right">
                  <Typography variant="body2" color="text.secondary">
                    Gas: {item.gasUsed} GWEI
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.txHash}
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
  const [filter, setFilter] = useState('all');

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h3" fontWeight={700} mb={1}>
            Farm
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Earn yield through liquidity provision and staking
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
        {/* Main Farming Interface */}
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5" fontWeight={600}>
              Available Pools
            </Typography>
            <Box display="flex" gap={1}>
              <FormControl size="small">
                <Select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="all">All Pools</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="high-apy">High APY</MenuItem>
                  <MenuItem value="low-risk">Low Risk</MenuItem>
                </Select>
              </FormControl>
              <IconButton size="small">
                <Refresh />
              </IconButton>
            </Box>
          </Box>

          <Box display="flex" flexDirection="column" gap={3}>
            {farmingPools.map((pool) => (
              <AdvancedPoolCard key={pool.id} pool={pool} />
            ))}
          </Box>
        </Box>

        {/* Advanced Features Sidebar */}
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
