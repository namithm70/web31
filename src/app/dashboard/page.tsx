'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
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
  Alert,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  AccountBalance,
  SwapHoriz,
  Agriculture,
  CurrencyExchange,
  Notifications,
  Refresh,
  Visibility,
  Star,
  StarBorder,
  MoreVert,
  Add,
  Timeline,
  AttachMoney,
  Speed,
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { ProtocolData, PortfolioAsset, Transaction } from '@/types';
import { WalletConnectionTest } from '@/components/wallet-connection-test';

// Enhanced mock data
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

interface StatCardProps {
  title: string;
  value: number;
  change: number;
  icon: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'info';
}

// Dashboard Components
function StatCard({ title, value, change, icon, color = 'primary' }: StatCardProps) {
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
                <TrendingUp sx={{ color: 'success.main', fontSize: 16 }} />
              ) : (
                <TrendingDown sx={{ color: 'error.main', fontSize: 16 }} />
              )}
              <Typography
                variant="body2"
                color={change >= 0 ? 'success.main' : 'error.main'}
                fontWeight={600}
              >
                {change >= 0 ? '+' : ''}{change.toFixed(2)}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                vs last 24h
              </Typography>
            </Box>
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
              color={totalChangePercent >= 0 ? 'success.main' : 'error.main'}
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
                        color={asset.change24h >= 0 ? 'success.main' : 'error.main'}
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
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Card className="animate-fade-in-up stagger-2">
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" fontWeight={600}>
            Protocol Analytics
          </Typography>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Timeline />}
          >
            View All
          </Button>
        </Box>

        <Tabs
          value={selectedTab}
          onChange={(e, newValue) => setSelectedTab(newValue)}
          sx={{ mb: 3 }}
        >
          <Tab label="Top Protocols" />
          <Tab label="Trending" />
          <Tab label="New Launches" />
        </Tabs>

        <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: 'repeat(2, 1fr)' }} gap={2}>
          {mockProtocols.map((protocol) => (
            <Card
              key={protocol.id}
              variant="outlined"
              sx={{
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              <CardContent sx={{ p: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Box flex={1}>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Typography variant="h6" fontWeight={600}>
                        {protocol.name}
                      </Typography>
                      <Chip
                        label={protocol.category}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                      <Chip
                        label={protocol.risk}
                        size="small"
                        color={protocol.risk === 'low' ? 'success' : 'warning'}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      TVL: ${(protocol.tvl / 1000000).toFixed(0)}M
                    </Typography>
                    <Box display="flex" gap={2}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          APY
                        </Typography>
                        <Typography variant="body1" fontWeight={600} color="success.main">
                          {protocol.apy.toFixed(1)}%
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          24h Change
                        </Typography>
                        <Typography
                          variant="body1"
                          fontWeight={600}
                          color={protocol.tvlChange24h >= 0 ? 'success.main' : 'error.main'}
                        >
                          {protocol.tvlChange24h >= 0 ? '+' : ''}{protocol.tvlChange24h.toFixed(1)}%
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <IconButton size="small">
                    <MoreVert />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
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
          <Typography variant="h5" fontWeight={600}>
            Recent Transactions
          </Typography>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Timeline />}
          >
            View All
          </Button>
        </Box>

        <List>
          {mockTransactions.map((tx) => (
            <ListItem key={tx.id} sx={{ px: 0 }}>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: tx.type === 'swap' ? 'primary.main' : 
                           tx.type === 'stake' ? 'success.main' : 'warning.main',
                  }}
                >
                  {tx.type === 'swap' ? <SwapHoriz /> :
                   tx.type === 'stake' ? <Agriculture /> : <AccountBalance />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body1" fontWeight={600}>
                      {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)} {tx.from} → {tx.to}
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      ${tx.value.toLocaleString()}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" color="text.secondary">
                      {tx.amount} {tx.from}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Chip
                        label={tx.status}
                        size="small"
                        color={tx.status === 'completed' ? 'success' : 'warning'}
                        variant="outlined"
                      />
                      <Typography variant="body2" color="text.secondary">
                        {tx.timestamp.toLocaleTimeString()}
                      </Typography>
                    </Box>
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

function QuickActions() {
  return (
    <Card className="animate-fade-in-up stagger-4">
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight={600} mb={3}>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<SwapHoriz />}
              sx={{ py: 2, flexDirection: 'column', gap: 1 }}
            >
              <Typography variant="body2" fontWeight={600}>
                Swap Tokens
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={6} md={3}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<AccountBalance />}
              sx={{ py: 2, flexDirection: 'column', gap: 1 }}
            >
              <Typography variant="body2" fontWeight={600}>
                Lend/Borrow
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={6} md={3}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<Agriculture />}
              sx={{ py: 2, flexDirection: 'column', gap: 1 }}
            >
              <Typography variant="body2" fontWeight={600}>
                Farm Yield
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={6} md={3}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<CurrencyExchange />}
              sx={{ py: 2, flexDirection: 'column', gap: 1 }}
            >
              <Typography variant="body2" fontWeight={600}>
                Stablecoins
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

function MarketInsights() {
  return (
    <Card className="animate-fade-in-up stagger-5">
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" fontWeight={600}>
            Market Insights
          </Typography>
          <FormControlLabel
            control={<Switch size="small" />}
            label="Auto-refresh"
          />
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box textAlign="center" p={2}>
              <Typography variant="h4" fontWeight={700} color="primary.main" mb={1}>
                $2.1T
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total DeFi TVL
              </Typography>
              <Box display="flex" alignItems="center" justifyContent="center" gap={1} mt={1}>
                <TrendingUp sx={{ color: 'success.main', fontSize: 16 }} />
                <Typography variant="body2" color="success.main" fontWeight={600}>
                  +2.3%
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box textAlign="center" p={2}>
              <Typography variant="h4" fontWeight={700} color="success.main" mb={1}>
                $45.2B
              </Typography>
              <Typography variant="body2" color="text.secondary">
                24h Volume
              </Typography>
              <Box display="flex" alignItems="center" justifyContent="center" gap={1} mt={1}>
                <TrendingUp sx={{ color: 'success.main', fontSize: 16 }} />
                <Typography variant="body2" color="success.main" fontWeight={600}>
                  +5.7%
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" fontWeight={600} mb={2}>
          Trending Assets
        </Typography>
        <List>
          {['Ethereum', 'Bitcoin', 'Uniswap', 'Aave'].map((asset) => (
            <ListItem key={asset} sx={{ px: 0 }}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  {asset.charAt(0)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={asset}
                secondary={`$${(Math.random() * 1000 + 100).toFixed(2)}`}
              />
              <Box display="flex" alignItems="center" gap={1}>
                <Typography
                  variant="body2"
                  color={Math.random() > 0.5 ? 'success.main' : 'error.main'}
                  fontWeight={600}
                >
                  {Math.random() > 0.5 ? '+' : ''}{(Math.random() * 10).toFixed(2)}%
                </Typography>
                <IconButton size="small">
                  <StarBorder />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
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

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Portfolio Value"
            value={12500}
            change={2.8}
            icon={<AttachMoney />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="24h P&L"
            value={350}
            change={-1.2}
            icon={<TrendingUp />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="APY Earned"
            value={1250}
            change={5.4}
            icon={<Star />}
            color="info"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Gas Saved"
            value={45}
            change={12.3}
            icon={<Speed />}
            color="secondary"
          />
        </Grid>
      </Grid>

      {/* Main Content Grid */}
      <Box display="grid" gridTemplateColumns={{ xs: '1fr', lg: '2fr 1fr' }} gap={3} mb={3}>
        <PortfolioOverview />
        <MarketInsights />
      </Box>
      <Box display="grid" gridTemplateColumns={{ xs: '1fr', lg: '2fr 1fr' }} gap={3} mb={3}>
        <ProtocolAnalytics />
        <RecentTransactions />
      </Box>
      <Box>
        <QuickActions />
      </Box>
    </Box>
  );
}
