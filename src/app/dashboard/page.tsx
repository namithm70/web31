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
  Tooltip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  LinearProgress,
  Alert,
} from '@mui/material';
import {
  Refresh,
  Add as AddIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  Visibility as VisibilityIcon,
  Expand as ExpandIcon,
  Compress as CompressIcon,
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
  Info,
  AttachMoney,
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { useAccount, useBalance } from 'wagmi';
import { ProtocolData, PortfolioAsset } from '@/types';
import { WalletConnectionTest } from '@/components/wallet-connection-test';


// Fetch real protocol data from DeFiLlama
interface LlamaProtocol {
  slug?: string;
  name?: string;
  tvl?: number;
  change_1d?: number;
  category?: string;
  chains?: string[];
}

async function fetchProtocols(): Promise<ProtocolData[]> {
  const res = await fetch('https://api.llama.fi/protocols');
  if (!res.ok) throw new Error('Failed to fetch protocols');
  const data = await res.json();
  return (data as LlamaProtocol[] || []).slice(0, 10).map((p: LlamaProtocol) => ({
    id: String(p.slug || p.name || ''),
    name: p.name || '',
    tvl: Number(p.tvl ?? 0),
    tvlChange24h: Number(p.change_1d ?? 0),
    apy: 0,
    category: String(p.category || ''),
    chains: [],
    risk: 'low',
    volume24h: 0,
  }));
}

// Removed mock portfolio assets / transactions – now rendered from live sources (or empty states)

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

// Removed mock market insights – placeholder empty state
interface MarketInsights {
  trendingTokens: { symbol: string; change24h: number; volume: number }[];
  marketSentiment: string;
  topGainers: string[];
  topLosers: string[];
  upcomingEvents: { event: string; date: string; impact: string }[];
}
const marketInsightsData: MarketInsights | null = null;

// Removed mock risk metrics – placeholder empty state
interface RiskScenario { name: string; impact: number }
interface RiskMetrics {
  portfolioRisk: string;
  diversificationScore: number;
  stressTestResults: Record<string, RiskScenario>;
}
const riskMetricsData: RiskMetrics | null = null;

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
              '& .MuiSvgIcon-root': {
                color: 'white',
              },
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
            {showDetails ? <CompressIcon /> : <ExpandIcon />}
          </IconButton>
        </Box>

        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3} mb={3}>
          <Box textAlign="center" p={2} sx={{ bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }} borderRadius={2}>
            <Typography variant="body2" color="text.secondary">
              Current APY
            </Typography>
            <Typography variant="h5" fontWeight={600} color="text.primary">
              {yieldOptimizationData.currentAPY}%
            </Typography>
          </Box>
          <Box textAlign="center" p={2} sx={{ bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }} borderRadius={2}>
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
              <Box p={2} sx={{ bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }} borderRadius={2}>
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
            {!marketInsightsData ? (
              <Typography variant="body2" color="text.secondary">No trending data.</Typography>
            ) : (
              <Box display="flex" flexDirection="column" gap={2}>
                {marketInsightsData.trendingTokens.map((token: { symbol: string; volume: number; change24h: number }, index: number) => (
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
            )}
          </Box>
        )}

        {selectedTab === 1 && (
          <Box>
            <Typography variant="body2" fontWeight={600} mb={2}>
              Upcoming Events
            </Typography>
            {!marketInsightsData ? (
              <Typography variant="body2" color="text.secondary">No events.</Typography>
            ) : (
              <Box display="flex" flexDirection="column" gap={2}>
                {marketInsightsData.upcomingEvents.map((event: { event: string; date: string; impact: string }, index: number) => (
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
            )}
          </Box>
        )}

        {selectedTab === 2 && (
          <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="body2" fontWeight={600}>
                Market Sentiment
              </Typography>
              {marketInsightsData && (
                <Chip
                  label={marketInsightsData.marketSentiment}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              )}
            </Box>
            {!marketInsightsData ? (
              <Typography variant="body2" color="text.secondary">No sentiment data.</Typography>
            ) : (
              <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
                <Box>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    Top Gainers
                  </Typography>
                  {marketInsightsData.topGainers.map((token: string, index: number) => (
                    <Typography key={index} variant="body2" color="text.primary">
                      {token}
                    </Typography>
                  ))}
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    Top Losers
                  </Typography>
                  {marketInsightsData.topLosers.map((token: string, index: number) => (
                    <Typography key={index} variant="body2" color="text.secondary">
                      {token}
                    </Typography>
                  ))}
                </Box>
              </Box>
            )}
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

        {!riskMetricsData ? (
          <Typography variant="body2" color="text.secondary" mb={2}>No risk data.</Typography>
        ) : (
          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3} mb={3}>
            <Box textAlign="center" p={2} sx={{ bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }} borderRadius={2}>
              <Typography variant="body2" color="text.secondary">
                Portfolio Risk
              </Typography>
              <Typography variant="h5" fontWeight={600} color="text.primary">
                {riskMetricsData.portfolioRisk.toUpperCase()}
              </Typography>
            </Box>
            <Box textAlign="center" p={2} sx={{ bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }} borderRadius={2}>
              <Typography variant="body2" color="text.secondary">
                Diversification
              </Typography>
              <Typography variant="h5" fontWeight={600} color="text.primary">
                {riskMetricsData.diversificationScore}/100
              </Typography>
            </Box>
          </Box>
        )}

        <Typography variant="body2" fontWeight={600} mb={2}>
          Stress Test Scenarios
        </Typography>
        {!riskMetricsData ? (
          <Typography variant="body2" color="text.secondary">No scenarios.</Typography>
        ) : (
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
        )}
      </CardContent>
    </Card>
  );
}

// Enhanced existing components with more features
function PortfolioOverview() {
  const { address, isConnected } = useAccount();
  const { data: nativeBalance } = useBalance({ address, query: { enabled: !!address } });
  const { data: ethPriceData } = useQuery({
    queryKey: ['ethPrice'],
    queryFn: async () => {
      const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
      if (!res.ok) throw new Error('price');
      return res.json();
    },
    staleTime: 60_000,
  });

  const nativeSymbol = nativeBalance?.symbol || 'ETH';
  const nativeFormatted = Number(nativeBalance?.formatted || 0);
  const nativeUsd = (ethPriceData?.ethereum?.usd ?? 0) * nativeFormatted;

  const assets = isConnected && nativeFormatted > 0
    ? [{
        id: 'native',
        name: nativeSymbol === 'ETH' ? 'Ethereum' : nativeSymbol,
        symbol: nativeSymbol,
        balance: nativeFormatted,
        value: nativeUsd,
        change24h: 0,
        allocation: 100,
        icon: '◼️',
      }]
    : [] as PortfolioAsset[];

  const totalValue = assets.reduce((sum, a) => sum + a.value, 0);
  const totalChange = assets.reduce((sum, a) => sum + (a.value * a.change24h / 100), 0);
  const totalChangePercent = totalValue ? (totalChange / totalValue) * 100 : 0;

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
                <DownloadIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Share Portfolio">
              <IconButton size="small">
                <ShareIcon />
              </IconButton>
            </Tooltip>
            <IconButton size="small">
              <VisibilityIcon />
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
              {assets.length}
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
        {assets.length === 0 ? (
          <Typography variant="body2" color="text.secondary">No assets yet.</Typography>
        ) : (
          <List>
            {assets.map((asset) => (
              <ListItem key={asset.id} sx={{ px: 0 }}>
                <ListItemAvatar>
                  <Avatar sx={{ 
                    bgcolor: 'primary.main',
                    '& .MuiSvgIcon-root': {
                      color: 'white',
                    },
                  }}>
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
                    bgcolor: 'divider',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 3,
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
}

function ProtocolAnalytics({ protocols, isLoading }: { protocols: ProtocolData[]; isLoading: boolean }) {
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
          {isLoading && (
            <Typography variant="body2" color="text.secondary">Loading protocols…</Typography>
          )}
          {!isLoading && protocols.length === 0 && (
            <Typography variant="body2" color="text.secondary">No protocol data available.</Typography>
          )}
          {!isLoading && protocols.map((protocol) => (
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
          <Typography variant="body2" color="text.secondary">No transactions yet.</Typography>
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

  const { data: protocols = [], isLoading: protocolsLoading, error: protocolsError } = useQuery({
    queryKey: ['protocols'],
    queryFn: fetchProtocols,
    staleTime: 60_000,
  });

  if (protocolsError) {
    setError('Failed to load dashboard data');
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} sx={{ gap: 2 }}>
        <Box>
          <Typography variant="h3" fontWeight={700} mb={1}>
            Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome back! Here&apos;s your DeFi overview
      </Typography>
        </Box>
        <Box display="flex" gap={{ xs: 1, sm: 2 }} flexWrap="wrap" justifyContent="flex-end" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            startIcon={<Notifications />}
            sx={{ px: { xs: 1.5, sm: 2 }, py: { xs: 0.5, sm: 1 }, borderRadius: 2 }}
          >
            Notifications
          </Button>
          <Button
            variant="contained"
            size="small"
            startIcon={<AddIcon />}
            sx={{ px: { xs: 1.5, sm: 2 }, py: { xs: 0.5, sm: 1 }, borderRadius: 2 }}
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
      <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} gap={{ xs: 1.5, sm: 2, md: 3 }} mb={4}>
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
        <ProtocolAnalytics protocols={protocols} isLoading={protocolsLoading} />
        <RecentTransactions />
      </Box>
      
      <Box display="grid" gridTemplateColumns={{ xs: '1fr', lg: '2fr 1fr' }} gap={3} mb={3}>
        <YieldOptimization />
        <QuickActions />
      </Box>
    </Box>
  );
}
