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
  LinearProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Tabs,
  Tab,
  Tooltip,
  Alert,
} from '@mui/material';
import {
  Refresh,
  Add,
  Remove,
  Download,
  Share,
  Visibility,
  Expand,
  Compress,
  TrendingUp,
  TrendingDown,
  AccountBalance,
  SwapHoriz,
  Agriculture,
  CurrencyExchange,
  Notifications,
  Star,
  Speed,
  Security,
  Analytics,
  AutoGraph,
  PsychologyAlt,
  Lightbulb,
  Info,
  Settings,
  Timeline,
  AttachMoney,
  Bolt,
  RocketLaunch,
  Diamond,
  EmojiEvents,
  LocalFireDepartment,
  WaterDrop,
  ElectricBolt,
  FilterList,
  Sort,
  ViewList,
  ViewModule,
  PieChart,
  BarChart,
  ShowChart,
  TrendingFlat,
  ExpandMore,
  ContentCopy,
  Upload,
  VisibilityOff,
  AutoAwesome,
  Calculate,
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
import { useQuery } from '@tanstack/react-query';
import { ProtocolData, PortfolioAsset, Transaction } from '@/types';
import { WalletConnectionTest } from '@/components/wallet-connection-test';

// Enhanced mock data with more realistic DeFi metrics
const mockProtocols: ProtocolData[] = [
  {
    id: 'uniswap-v3',
    name: 'Uniswap V3',
    tvl: 2500000000,
    tvlChange24h: 2.5,
    apy: 12.5,
    category: 'dex',
    chains: [1, 137, 42161],
    risk: 'low',
    volume24h: 1500000000,
  },
  {
    id: 'aave-v3',
    name: 'Aave V3',
    tvl: 1800000000,
    tvlChange24h: 1.8,
    apy: 8.2,
    category: 'lending',
    chains: [1, 137, 42161],
    risk: 'medium',
    volume24h: 850000000,
  },
  {
    id: 'compound-v3',
    name: 'Compound V3',
    tvl: 950000000,
    tvlChange24h: 0.5,
    apy: 7.8,
    category: 'lending',
    chains: [1],
    risk: 'low',
    volume24h: 420000000,
  },
  {
    id: 'curve-finance',
    name: 'Curve Finance',
    tvl: 3200000000,
    tvlChange24h: -0.2,
    apy: 15.2,
    category: 'stablecoin',
    chains: [1, 137],
    risk: 'medium',
    volume24h: 2100000000,
  },
];

const mockPortfolioAssets: PortfolioAsset[] = [
  {
    id: '1',
    name: 'Ethereum',
    symbol: 'ETH',
    balance: 2.5,
    value: 4500,
    change24h: 3.2,
    allocation: 35,
    icon: '🔵',
  },
  {
    id: '2',
    name: 'USD Coin',
    symbol: 'USDC',
    balance: 5000,
    value: 5000,
    change24h: 0.1,
    allocation: 25,
    icon: '🔵',
  },
  {
    id: '3',
    name: 'Uniswap',
    symbol: 'UNI',
    balance: 150,
    value: 1200,
    change24h: -1.5,
    allocation: 20,
    icon: '🟣',
  },
  {
    id: '4',
    name: 'Aave',
    symbol: 'AAVE',
    balance: 8,
    value: 800,
    change24h: 2.8,
    allocation: 20,
    icon: '🔵',
  },
];

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'swap',
    from: 'ETH',
    to: 'USDC',
    amount: 0.5,
    value: 900,
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    status: 'completed',
    txHash: '0x1234...5678',
  },
  {
    id: '2',
    type: 'stake',
    from: 'UNI',
    to: 'UNI-V3-LP',
    amount: 50,
    value: 400,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    status: 'completed',
    txHash: '0x8765...4321',
  },
  {
    id: '3',
    type: 'lend',
    from: 'USDC',
    to: 'aUSDC',
    amount: 1000,
    value: 1000,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
    status: 'pending',
    txHash: '0xabcd...efgh',
  },
];

// New advanced features data
const yieldOptimizationData = {
  currentAPY: 8.5,
  potentialAPY: 12.3,
  recommendations: [
    { action: 'Move USDC to Aave V3', potentialGain: 2.1, risk: 'low' },
    { action: 'Stake ETH in Lido', potentialGain: 1.8, risk: 'low' },
    { action: 'Provide ETH-USDC liquidity', potentialGain: 3.2, risk: 'medium' },
  ],
  gasOptimization: {
    estimatedSavings: 45,
    suggestions: ['Batch transactions', 'Use Layer 2', 'Optimize timing'],
  },
};

const marketInsightsData = {
  trendingTokens: [
    { symbol: 'PEPE', change24h: 15.2, volume: 25000000 },
    { symbol: 'SHIB', change24h: 8.7, volume: 18000000 },
    { symbol: 'DOGE', change24h: -2.1, volume: 12000000 },
  ],
  marketSentiment: 'bullish',
  topGainers: ['PEPE', 'SHIB', 'UNI'],
  topLosers: ['DOGE', 'LINK', 'DOT'],
  upcomingEvents: [
    { event: 'Ethereum Shanghai Update', date: '2024-02-15', impact: 'high' },
    { event: 'Uniswap V4 Launch', date: '2024-03-01', impact: 'medium' },
  ],
};

const riskMetricsData = {
  portfolioRisk: 'low',
  diversificationScore: 85,
  correlationMatrix: [
    { asset1: 'ETH', asset2: 'UNI', correlation: 0.75 },
    { asset1: 'ETH', asset2: 'USDC', correlation: -0.02 },
    { asset1: 'UNI', asset2: 'AAVE', correlation: 0.45 },
  ],
  stressTestResults: {
    scenario1: { name: 'Market Crash (-50%)', impact: -25.3 },
    scenario2: { name: 'DeFi Hack', impact: -15.7 },
    scenario3: { name: 'Regulatory Risk', impact: -8.2 },
  },
};

interface StatCardProps {
  title: string;
  value: number;
  change: number;
  icon: React.ReactNode;
  color?: 'primary' | 'secondary';
  subtitle?: string;
}

// Enhanced Dashboard Components
function StatCard({ title, value, change, icon, color = 'primary', subtitle }: StatCardProps) {
  return (
    <Card className="animate-fade-in-up hover-lift">
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
              ${value.toLocaleString()}
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              {change >= 0 ? (
                <TrendingUp sx={{ color: 'text.primary', fontSize: 16 }} />
              ) : (
                <TrendingDown sx={{ color: 'text.secondary', fontSize: 16 }} />
              )}
              <Typography
                variant="body2"
                color={change >= 0 ? 'text.primary' : 'text.secondary'}
                fontWeight={600}
              >
                {change >= 0 ? '+' : ''}{change.toFixed(2)}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                vs last 24h
              </Typography>
            </Box>
            {subtitle && (
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          <Avatar
            sx={{
              bgcolor: `${color}.main`,
              width: 48,
              height: 48,
            }}
          >
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );
}

function YieldOptimization() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card className="animate-fade-in-up stagger-6">
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
                Gas Optimization
              </Typography>
              <Box p={2} bgcolor="grey.50" borderRadius={2}>
                <Typography variant="body2" color="text.secondary">
                  Estimated Monthly Savings
                </Typography>
                <Typography variant="h6" fontWeight={600} color="text.primary">
                  ${yieldOptimizationData.gasOptimization.estimatedSavings}
                </Typography>
                <Box mt={1}>
                  {yieldOptimizationData.gasOptimization.suggestions.map((suggestion, index) => (
                    <Chip key={index} label={suggestion} size="small" variant="outlined" sx={{ mr: 1, mb: 1 }} />
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

function AdvancedMarketInsights() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Card className="animate-fade-in-up stagger-7">
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box display="flex" alignItems="center" gap={1}>
            <Analytics sx={{ color: 'primary.main' }} />
            <Typography variant="h6" fontWeight={600}>
              Market Intelligence
            </Typography>
          </Box>
          <IconButton size="small">
            <Refresh />
          </IconButton>
        </Box>

        <Tabs
          value={selectedTab}
          onChange={(e, newValue) => setSelectedTab(newValue)}
          sx={{ mb: 3 }}
        >
          <Tab label="Trending" />
          <Tab label="Events" />
          <Tab label="Sentiment" />
        </Tabs>

        {selectedTab === 0 && (
          <Box>
            <Typography variant="body2" fontWeight={600} mb={2}>
              Trending Tokens (24h)
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              {marketInsightsData.trendingTokens.map((token, index) => (
                <Box key={index} display="flex" justifyContent="space-between" alignItems="center" p={2} border="1px solid" borderColor="divider" borderRadius={2}>
                  <Box>
                    <Typography variant="body1" fontWeight={600}>
                      {token.symbol}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Vol: ${(token.volume / 1000000).toFixed(1)}M
                    </Typography>
                  </Box>
                  <Box textAlign="right">
                    <Typography
                      variant="body1"
                      fontWeight={600}
                      color={token.change24h >= 0 ? 'text.primary' : 'text.secondary'}
                    >
                      {token.change24h >= 0 ? '+' : ''}{token.change24h}%
                    </Typography>
                    <IconButton size="small">
                      <Star />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {selectedTab === 1 && (
          <Box>
            <Typography variant="body2" fontWeight={600} mb={2}>
              Upcoming Events
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              {marketInsightsData.upcomingEvents.map((event, index) => (
                <Box key={index} p={2} border="1px solid" borderColor="divider" borderRadius={2}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {event.event}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {event.date}
                      </Typography>
                    </Box>
                    <Chip
                      label={event.impact}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {selectedTab === 2 && (
          <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="body2" fontWeight={600}>
                Market Sentiment
              </Typography>
              <Chip
                label={marketInsightsData.marketSentiment}
                size="small"
                color="primary"
                variant="outlined"
              />
            </Box>
            <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
              <Box>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Top Gainers
                </Typography>
                {marketInsightsData.topGainers.map((token, index) => (
                  <Typography key={index} variant="body2" color="text.primary">
                    {token}
                  </Typography>
                ))}
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Top Losers
                </Typography>
                {marketInsightsData.topLosers.map((token, index) => (
                  <Typography key={index} variant="body2" color="text.secondary">
                    {token}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

function RiskAnalytics() {
  return (
    <Card className="animate-fade-in-up stagger-8">
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box display="flex" alignItems="center" gap={1}>
            <Security sx={{ color: 'primary.main' }} />
            <Typography variant="h6" fontWeight={600}>
              Risk Analytics
            </Typography>
          </Box>
          <IconButton size="small">
            <Info />
          </IconButton>
        </Box>

        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3} mb={3}>
          <Box textAlign="center" p={2} bgcolor="grey.50" borderRadius={2}>
            <Typography variant="body2" color="text.secondary">
              Portfolio Risk
            </Typography>
            <Typography variant="h5" fontWeight={600} color="text.primary">
              {riskMetricsData.portfolioRisk.toUpperCase()}
            </Typography>
          </Box>
          <Box textAlign="center" p={2} bgcolor="grey.100" borderRadius={2}>
            <Typography variant="body2" color="text.secondary">
              Diversification
            </Typography>
            <Typography variant="h5" fontWeight={600} color="text.primary">
              {riskMetricsData.diversificationScore}/100
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" fontWeight={600} mb={2}>
          Stress Test Scenarios
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          {Object.entries(riskMetricsData.stressTestResults).map(([key, scenario]) => (
            <Box key={key} p={2} border="1px solid" borderColor="divider" borderRadius={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" fontWeight={600}>
                  {scenario.name}
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color={scenario.impact > -10 ? 'text.primary' : 'text.secondary'}
                >
                  {scenario.impact}%
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

// Enhanced existing components with more features
function PortfolioOverview() {
  const totalValue = mockPortfolioAssets.reduce((sum, asset) => sum + asset.value, 0);
  const totalChange = mockPortfolioAssets.reduce((sum, asset) => sum + (asset.value * asset.change24h / 100), 0);
  const totalChangePercent = (totalChange / totalValue) * 100;

  return (
    <Card className="animate-fade-in-up stagger-1">
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" fontWeight={600}>
            Portfolio Overview
          </Typography>
          <Box display="flex" gap={1}>
            <Tooltip title="Export Portfolio">
              <IconButton size="small">
                <Download />
              </IconButton>
            </Tooltip>
            <Tooltip title="Share Portfolio">
              <IconButton size="small">
                <Share />
              </IconButton>
            </Tooltip>
            <IconButton size="small">
              <Visibility />
            </IconButton>
            <IconButton size="small">
              <Refresh />
            </IconButton>
          </Box>
        </Box>

        <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: 'repeat(3, 1fr)' }} gap={3} mb={3}>
          <Box textAlign="center">
            <Typography variant="h3" fontWeight={700} color="primary.main">
              ${totalValue.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Value
            </Typography>
          </Box>
          <Box textAlign="center">
            <Typography
              variant="h4"
              fontWeight={600}
              color={totalChangePercent >= 0 ? 'text.primary' : 'text.secondary'}
            >
              {totalChangePercent >= 0 ? '+' : ''}{totalChangePercent.toFixed(2)}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              24h Change
            </Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="h4" fontWeight={600}>
              {mockPortfolioAssets.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Assets
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" fontWeight={600} mb={2}>
          Asset Allocation
        </Typography>
        <List>
          {mockPortfolioAssets.map((asset) => (
            <ListItem key={asset.id} sx={{ px: 0 }}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  {asset.icon}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body1" fontWeight={600}>
                      {asset.name}
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      ${asset.value.toLocaleString()}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" color="text.secondary">
                      {asset.balance} {asset.symbol}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography
                        variant="body2"
                        color={asset.change24h >= 0 ? 'text.primary' : 'text.secondary'}
                      >
                        {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {asset.allocation}%
                      </Typography>
                    </Box>
                  </Box>
                }
              />
              <LinearProgress
                variant="determinate"
                value={asset.allocation}
                sx={{
                  width: 60,
                  height: 6,
                  borderRadius: 3,
                  bgcolor: 'grey.200',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 3,
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

function ProtocolAnalytics() {
  return (
    <Card className="animate-fade-in-up stagger-2">
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight={600}>
            Protocol Analytics
          </Typography>
          <IconButton size="small">
            <Refresh />
          </IconButton>
        </Box>

        <Box display="flex" flexDirection="column" gap={2}>
          {mockProtocols.map((protocol) => (
            <Box key={protocol.id} p={2} border="1px solid" borderColor="divider" borderRadius={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="body1" fontWeight={600}>
                  {protocol.name}
                </Typography>
                <Chip
                  label={protocol.risk}
                  color="primary"
                  size="small"
                  variant="outlined"
                />
              </Box>
              
              <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    TVL
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    ${(protocol.tvl / 1000000000).toFixed(1)}B
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    APY
                  </Typography>
                  <Typography variant="body2" fontWeight={600} color="text.primary">
                    {protocol.apy}%
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    24h Change
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    color={protocol.tvlChange24h >= 0 ? 'text.primary' : 'text.secondary'}
                  >
                    {protocol.tvlChange24h >= 0 ? '+' : ''}{protocol.tvlChange24h}%
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Volume (24h)
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    ${(protocol.volume24h / 1000000).toFixed(1)}M
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

function RecentTransactions() {
  return (
    <Card className="animate-fade-in-up stagger-3">
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight={600}>
            Recent Transactions
          </Typography>
          <Button variant="outlined" size="small">
            View All
          </Button>
        </Box>

        <Box display="flex" flexDirection="column" gap={2}>
          {mockTransactions.map((tx) => (
            <Box key={tx.id} p={2} border="1px solid" borderColor="divider" borderRadius={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    {tx.type === 'swap' ? <SwapHoriz /> : tx.type === 'stake' ? <Agriculture /> : <CurrencyExchange />}
                  </Avatar>
                  <Typography variant="body2" fontWeight={600}>
                    {tx.from} → {tx.to}
                  </Typography>
                </Box>
                <Chip
                  label={tx.status}
                  color="primary"
                  size="small"
                  variant="outlined"
                />
              </Box>
              
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  {tx.amount} {tx.from} (${tx.value})
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {tx.timestamp.toLocaleString()}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

function QuickActions() {
  return (
    <Card className="animate-fade-in-up stagger-4">
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} mb={3}>
          Quick Actions
        </Typography>

        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
          <Button
            variant="outlined"
            startIcon={<SwapHoriz />}
            fullWidth
            sx={{ py: 2 }}
          >
            Swap Tokens
          </Button>
          <Button
            variant="outlined"
            startIcon={<Agriculture />}
            fullWidth
            sx={{ py: 2 }}
          >
            Farm Yield
          </Button>
          <Button
            variant="outlined"
            startIcon={<CurrencyExchange />}
            fullWidth
            sx={{ py: 2 }}
          >
            Lend Assets
          </Button>
          <Button
            variant="outlined"
            startIcon={<AccountBalance />}
            fullWidth
            sx={{ py: 2 }}
          >
            View Portfolio
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const [error, setError] = useState<string | null>(null);

  const { error: protocolsError } = useQuery({
    queryKey: ['protocols'],
    queryFn: async (): Promise<ProtocolData[]> => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockProtocols;
    },
  });

  if (protocolsError) {
    setError('Failed to load dashboard data');
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h3" fontWeight={700} mb={1}>
            Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome back! Here&apos;s your DeFi overview
          </Typography>
        </Box>
        <Box display="flex" gap={2}>
          <Button
            variant="outlined"
            startIcon={<Notifications />}
          >
            Notifications
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
          >
            Add Asset
          </Button>
        </Box>
      </Box>

      <WalletConnectionTest />

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Enhanced Stats Cards */}
      <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} gap={3} mb={4}>
        <StatCard
          title="Portfolio Value"
          value={12500}
          change={2.8}
          icon={<AttachMoney />}
          color="primary"
          subtitle="All assets combined"
        />
        <StatCard
          title="24h P&L"
          value={350}
          change={-1.2}
          icon={<TrendingUp />}
          color="primary"
          subtitle="Realized + Unrealized"
        />
        <StatCard
          title="APY Earned"
          value={1250}
          change={5.4}
          icon={<Star />}
          color="primary"
          subtitle="From all protocols"
        />
        <StatCard
          title="Gas Saved"
          value={45}
          change={12.3}
          icon={<Speed />}
          color="primary"
          subtitle="This month"
        />
      </Box>

      {/* Main Content Grid with Advanced Features */}
      <Box display="grid" gridTemplateColumns={{ xs: '1fr', lg: '2fr 1fr' }} gap={3} mb={3}>
        <PortfolioOverview />
        <Box display="flex" flexDirection="column" gap={3}>
          <AdvancedMarketInsights />
          <RiskAnalytics />
        </Box>
      </Box>
      
      <Box display="grid" gridTemplateColumns={{ xs: '1fr', lg: '2fr 1fr' }} gap={3} mb={3}>
        <ProtocolAnalytics />
        <RecentTransactions />
      </Box>
      
      <Box display="grid" gridTemplateColumns={{ xs: '1fr', lg: '2fr 1fr' }} gap={3} mb={3}>
        <YieldOptimization />
        <QuickActions />
      </Box>
    </Box>
  );
}
