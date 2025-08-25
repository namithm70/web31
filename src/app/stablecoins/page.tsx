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
  LinearProgress,
} from '@mui/material';
import {
  Refresh,
  Settings,
  Warning,
  CheckCircle,
  ShowChart,
  WaterDrop,
  CreditCard,
  Savings,
  Calculate,
  Security,
  PieChart,
  BarChart,
  Timeline as TimelineIcon,
  AttachMoney,
  AccountBalanceWallet,
  SwapHoriz,
  Agriculture,
  CurrencyExchange,
  Verified,
  GppGood,
  GppBad,
} from '@mui/icons-material';
import { WalletConnectionTest } from '@/components/wallet-connection-test';

// Mock stablecoin data
const stablecoins = [
  {
    id: 1,
    symbol: 'USDC',
    name: 'USD Coin',
    price: 1.00,
    change24h: 0.01,
    marketCap: 45000000000,
    volume24h: 8500000000,
    supply: 45000000000,
    apy: 2.1,
    pegStatus: 'stable',
    risk: 'low',
    issuer: 'Circle',
    collateral: 'USD Reserves',
    icon: '🔵',
    yourBalance: 5000,
    yourValue: 5000,
  },
  {
    id: 2,
    symbol: 'USDT',
    name: 'Tether USD',
    price: 0.999,
    change24h: -0.001,
    marketCap: 85000000000,
    volume24h: 12000000000,
    supply: 85000000000,
    apy: 1.8,
    pegStatus: 'stable',
    risk: 'medium',
    issuer: 'Tether',
    collateral: 'Mixed Assets',
    icon: '🔵',
    yourBalance: 0,
    yourValue: 0,
  },
  {
    id: 3,
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    price: 1.001,
    change24h: 0.001,
    marketCap: 8500000000,
    volume24h: 1500000000,
    supply: 8500000000,
    apy: 3.2,
    pegStatus: 'stable',
    risk: 'low',
    issuer: 'MakerDAO',
    collateral: 'Crypto Assets',
    icon: '🔵',
    yourBalance: 2000,
    yourValue: 2002,
  },
  {
    id: 4,
    symbol: 'FRAX',
    name: 'Frax',
    price: 0.998,
    change24h: -0.002,
    marketCap: 3200000000,
    volume24h: 800000000,
    supply: 3200000000,
    apy: 4.5,
    pegStatus: 'stable',
    risk: 'medium',
    issuer: 'Frax Finance',
    collateral: 'Partial Reserve',
    icon: '🟣',
    yourBalance: 0,
    yourValue: 0,
  },
  {
    id: 5,
    symbol: 'BUSD',
    name: 'Binance USD',
    price: 1.00,
    change24h: 0.00,
    marketCap: 20000000000,
    volume24h: 5000000000,
    supply: 20000000000,
    apy: 1.5,
    pegStatus: 'stable',
    risk: 'low',
    issuer: 'Binance',
    collateral: 'USD Reserves',
    icon: '🔵',
    yourBalance: 0,
    yourValue: 0,
  },
];

// Mock yield farming opportunities
const yieldOpportunities = [
  {
    id: 1,
    protocol: 'Aave V3',
    stablecoin: 'USDC',
    apy: 2.1,
    tvl: 8500000000,
    risk: 'low',
    type: 'Lending',
    minDeposit: 100,
    maxDeposit: 1000000,
  },
  {
    id: 2,
    protocol: 'Compound',
    stablecoin: 'USDC',
    apy: 1.8,
    tvl: 3200000000,
    risk: 'low',
    type: 'Lending',
    minDeposit: 50,
    maxDeposit: 500000,
  },
  {
    id: 3,
    protocol: 'Curve Finance',
    stablecoin: 'USDC/USDT/DAI',
    apy: 3.2,
    tvl: 12500000000,
    risk: 'medium',
    type: 'LP Farming',
    minDeposit: 1000,
    maxDeposit: 2000000,
  },
  {
    id: 4,
    protocol: 'Yearn Finance',
    stablecoin: 'USDC',
    apy: 4.8,
    tvl: 850000000,
    risk: 'high',
    type: 'Yield Aggregator',
    minDeposit: 500,
    maxDeposit: 100000,
  },
];

// Mock peg monitoring data
const pegMonitoring = {
  totalMarketCap: 160000000000,
  averageDeviation: 0.001,
  riskScore: 2.5,
  alerts: [
    { id: 1, stablecoin: 'USDT', message: 'Minor deviation detected', severity: 'warning', timestamp: new Date() },
    { id: 2, stablecoin: 'FRAX', message: 'Price below $0.999', severity: 'warning', timestamp: new Date(Date.now() - 1000 * 60 * 30) },
  ],
};

interface Stablecoin {
  id: number;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  supply: number;
  apy: number;
  pegStatus: string;
  risk: string;
  issuer: string;
  collateral: string;
  icon: string;
  yourBalance: number;
  yourValue: number;
}

function StablecoinCard({ stablecoin, onDeposit, onWithdraw }: {
  stablecoin: Stablecoin;
  onDeposit: (stablecoinId: number, amount: string) => void;
  onWithdraw: (stablecoinId: number) => void;
}) {
  const [showDetails, setShowDetails] = useState(false);

  const getPegStatusColor = (status: string) => {
    switch (status) {
      case 'stable': return 'success';
      case 'warning': return 'warning';
      case 'danger': return 'error';
      default: return 'default';
    }
  };

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
                {stablecoin.name} ({stablecoin.symbol})
              </Typography>
              <Chip
                label={stablecoin.pegStatus}
                size="small"
                color={getPegStatusColor(stablecoin.pegStatus)}
                sx={{ fontSize: '0.7rem' }}
              />
              <Chip
                label={stablecoin.risk}
                size="small"
                color={getRiskColor(stablecoin.risk)}
                sx={{ fontSize: '0.7rem' }}
              />
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="body2" color="text.secondary">
                ${stablecoin.price}
              </Typography>
              <Typography 
                variant="body2" 
                color={stablecoin.change24h >= 0 ? 'success.main' : 'error.main'}
              >
                {stablecoin.change24h >= 0 ? '+' : ''}{stablecoin.change24h}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ${(stablecoin.marketCap / 1000000000).toFixed(1)}B
              </Typography>
            </Box>
          </Box>
          <Box textAlign="right">
            <Typography variant="h5" fontWeight={700} color="success.main">
              {stablecoin.apy}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Best APY
            </Typography>
          </Box>
        </Box>

        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} mb={2}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Your Balance
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              {stablecoin.yourBalance.toLocaleString()} {stablecoin.symbol}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Your Value
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              ${stablecoin.yourValue.toLocaleString()}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Issuer
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              {stablecoin.issuer}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Collateral
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              {stablecoin.collateral}
            </Typography>
          </Box>
        </Box>

        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            size="small"
            onClick={() => setShowDetails(!showDetails)}
            fullWidth
            color="success"
          >
            {showDetails ? 'Hide Details' : 'Deposit'}
          </Button>
          {stablecoin.yourBalance > 0 && (
            <Button
              variant="outlined"
              size="small"
              onClick={() => onWithdraw(stablecoin.id)}
              fullWidth
              color="warning"
            >
              Withdraw
            </Button>
          )}
        </Box>

        {showDetails && (
          <Box mt={2} p={2} bgcolor="grey.50" borderRadius={2}>
            <Typography variant="body2" fontWeight={600} mb={2}>
              Deposit {stablecoin.symbol}
            </Typography>
            <Box display="flex" gap={1}>
              <Button
                variant="contained"
                size="small"
                onClick={() => onDeposit(stablecoin.id, '100')}
                fullWidth
              >
                $100
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={() => onDeposit(stablecoin.id, '1000')}
                fullWidth
              >
                $1,000
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={() => onDeposit(stablecoin.id, '10000')}
                fullWidth
              >
                $10,000
              </Button>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

function YieldOpportunities() {
  return (
    <Card className="animate-fade-in-up stagger-1">
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={3}>
          Yield Opportunities
        </Typography>
        
        <List>
          {yieldOpportunities.map((opportunity) => (
            <ListItem key={opportunity.id} sx={{ px: 0, py: 1 }}>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: opportunity.risk === 'low' ? 'success.main' : 
                             opportunity.risk === 'medium' ? 'warning.main' : 'error.main',
                  }}
                >
                  {opportunity.type === 'Lending' ? <Savings /> : 
                   opportunity.type === 'LP Farming' ? <WaterDrop /> : <Calculate />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body1" fontWeight={600}>
                      {opportunity.protocol} - {opportunity.stablecoin}
                    </Typography>
                    <Typography variant="body1" fontWeight={600} color="success.main">
                      {opportunity.apy}% APY
                    </Typography>
                  </Box>
                }
                secondary={
                  <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {opportunity.type} • ${(opportunity.tvl / 1000000000).toFixed(1)}B TVL
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Min: ${opportunity.minDeposit.toLocaleString()} • Max: ${opportunity.maxDeposit.toLocaleString()}
                      </Typography>
                    </Box>
                    <Box textAlign="right">
                      <Chip
                        label={opportunity.risk}
                        size="small"
                        color={opportunity.risk === 'low' ? 'success' : opportunity.risk === 'medium' ? 'warning' : 'error'}
                      />
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

function PegMonitoring() {
  return (
    <Card className="animate-fade-in-up stagger-2">
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={3}>
          Peg Monitoring
        </Typography>
        
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3} mb={3}>
          <Box textAlign="center" p={2} bgcolor="info.light" borderRadius={2}>
            <CurrencyExchange sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
            <Typography variant="h4" fontWeight={700} color="info.main">
              ${(pegMonitoring.totalMarketCap / 1000000000).toFixed(0)}B
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Market Cap
            </Typography>
          </Box>
          
          <Box textAlign="center" p={2} bgcolor="success.light" borderRadius={2}>
            <Verified sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
            <Typography variant="h4" fontWeight={700} color="success.main">
              {pegMonitoring.averageDeviation.toFixed(3)}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Avg Deviation
            </Typography>
          </Box>
        </Box>

        <Box p={2} bgcolor="grey.50" borderRadius={2} mb={3}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="body2" color="text.secondary">
              Risk Score
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {pegMonitoring.riskScore}/10
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={pegMonitoring.riskScore * 10} 
            color={pegMonitoring.riskScore < 3 ? 'success' : pegMonitoring.riskScore < 7 ? 'warning' : 'error'}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>

        <Typography variant="body2" fontWeight={600} mb={2}>
          Recent Alerts
        </Typography>
        <List>
          {pegMonitoring.alerts.map((alert) => (
            <ListItem key={alert.id} sx={{ px: 0, py: 1 }}>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: alert.severity === 'warning' ? 'warning.main' : 'error.main',
                  }}
                >
                  {alert.severity === 'warning' ? <Warning /> : <GppBad />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body1" fontWeight={600}>
                    {alert.stablecoin}: {alert.message}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    {alert.timestamp.toLocaleTimeString()}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

function RiskAnalysis() {
  return (
    <Card className="animate-fade-in-up stagger-3">
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={3}>
          Risk Analysis
        </Typography>
        
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} mb={3}>
          <Box p={2} bgcolor="success.light" borderRadius={2}>
            <GppGood sx={{ fontSize: 32, color: 'success.main', mb: 1 }} />
            <Typography variant="h6" fontWeight={700} color="success.main">
              Low Risk
            </Typography>
            <Typography variant="body2" color="text.secondary">
              USDC, DAI, BUSD
            </Typography>
          </Box>
          <Box p={2} bgcolor="warning.light" borderRadius={2}>
            <Warning sx={{ fontSize: 32, color: 'warning.main', mb: 1 }} />
            <Typography variant="h6" fontWeight={700} color="warning.main">
              Medium Risk
            </Typography>
            <Typography variant="body2" color="text.secondary">
              USDT, FRAX
            </Typography>
          </Box>
        </Box>

        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="body2">
            <strong>Risk Factors:</strong> Collateral quality, issuer transparency, 
            regulatory compliance, and market liquidity.
          </Typography>
        </Alert>

        <Box p={2} bgcolor="grey.50" borderRadius={2}>
          <Typography variant="body2" fontWeight={600} mb={1}>
            Diversification Recommendation
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Consider spreading your stablecoin holdings across multiple issuers 
            to reduce concentration risk.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function StablecoinsPage() {
  const [filterRisk, setFilterRisk] = useState('all');

  const handleDeposit = (stablecoinId: number, amount: string) => {
    console.log('Depositing', amount, 'to stablecoin', stablecoinId);
  };

  const handleWithdraw = (stablecoinId: number) => {
    console.log('Withdrawing from stablecoin', stablecoinId);
  };

  const filteredStablecoins = stablecoins.filter(coin => 
    filterRisk === 'all' || coin.risk === filterRisk
  );

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h3" fontWeight={700} mb={1}>
            Stablecoins
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your stablecoin holdings and earn yield safely
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
                  Stablecoins
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
                </Box>
              </Box>
              
              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  <strong>Stablecoins:</strong> Digital assets designed to maintain a stable value 
                  relative to a reference asset, typically the US dollar.
                </Typography>
              </Alert>
            </CardContent>
          </Card>

          {/* Stablecoins */}
          {filteredStablecoins.map((stablecoin) => (
            <StablecoinCard
              key={stablecoin.id}
              stablecoin={stablecoin}
              onDeposit={handleDeposit}
              onWithdraw={handleWithdraw}
            />
          ))}
        </Box>

        {/* Sidebar */}
        <Box>
          <YieldOpportunities />
          
          <Box mt={3}>
            <PegMonitoring />
          </Box>

          <Box mt={3}>
            <RiskAnalysis />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
