'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Switch,
  FormControlLabel,
  Paper,
  LinearProgress,
} from '@mui/material';
import {
  AccountBalance,
  TrendingUp,
  Refresh,
  Settings,
  ArrowDownward,
  ArrowUpward,
  Warning,
  CheckCircle,
  Timeline,
  ShowChart,
  WaterDrop,
  Lock,
  LockOpen,
  Star,
  LocalFireDepartment,
  EmojiEvents,
  MonetizationOn,
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
} from '@mui/icons-material';
import { WalletConnectionTest } from '@/components/wallet-connection-test';

// Mock portfolio data
const portfolioAssets = [
  {
    id: 1,
    symbol: 'ETH',
    name: 'Ethereum',
    balance: 2.5,
    value: 8000,
    change24h: 2.5,
    change7d: 8.2,
    allocation: 32,
    icon: '🔵',
    price: 3200,
    apy: 3.2,
  },
  {
    id: 2,
    symbol: 'USDC',
    name: 'USD Coin',
    balance: 5000,
    value: 5000,
    change24h: 0.1,
    change7d: 0.3,
    allocation: 20,
    icon: '🔵',
    price: 1.00,
    apy: 2.1,
  },
  {
    id: 3,
    symbol: 'AAVE',
    name: 'Aave',
    balance: 25,
    value: 2380,
    change24h: 3.8,
    change7d: 12.5,
    allocation: 9.5,
    icon: '🔵',
    price: 95.20,
    apy: 4.8,
  },
  {
    id: 4,
    symbol: 'UNI',
    name: 'Uniswap',
    balance: 200,
    value: 1700,
    change24h: -1.2,
    change7d: -3.8,
    allocation: 6.8,
    icon: '🟣',
    price: 8.50,
    apy: 3.9,
  },
  {
    id: 5,
    symbol: 'LINK',
    name: 'Chainlink',
    balance: 100,
    value: 1575,
    change24h: 1.9,
    change7d: 5.2,
    allocation: 6.3,
    icon: '🔵',
    price: 15.75,
    apy: 2.8,
  },
];

// Mock DeFi positions
const defiPositions = [
  {
    id: 1,
    protocol: 'Uniswap V3',
    type: 'LP Position',
    assets: ['ETH', 'USDC'],
    value: 3200,
    apy: 12.5,
    change24h: 1.2,
    status: 'active',
  },
  {
    id: 2,
    protocol: 'Aave V3',
    type: 'Lending',
    assets: ['ETH'],
    value: 2400,
    apy: 3.2,
    change24h: 0.8,
    status: 'active',
  },
  {
    id: 3,
    protocol: 'Compound',
    type: 'Borrowing',
    assets: ['USDC'],
    value: -1500,
    apy: -4.8,
    change24h: -0.2,
    status: 'active',
  },
];

// Mock transaction history
const transactionHistory = [
  { id: 1, type: 'swap', from: 'ETH', to: 'USDC', amount: 0.5, value: 1600, timestamp: new Date(Date.now() - 1000 * 60 * 30), status: 'completed' },
  { id: 2, type: 'stake', protocol: 'Uniswap', amount: 0.3, value: 960, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), status: 'completed' },
  { id: 3, type: 'lend', protocol: 'Aave', amount: 0.8, value: 2560, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), status: 'completed' },
  { id: 4, type: 'borrow', protocol: 'Compound', amount: 1500, value: 1500, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), status: 'completed' },
];

// Mock performance data
const performanceData = {
  totalValue: 25055,
  change24h: 2.8,
  change7d: 8.5,
  change30d: 15.2,
  totalGain: 3255,
  totalGainPercentage: 14.9,
  netAPY: 4.2,
};

function PortfolioOverview() {
  return (
    <Card className="animate-fade-in-up">
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={3}>
          Portfolio Overview
        </Typography>
        
        <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={3} mb={3}>
          <Box textAlign="center" p={2} bgcolor="primary.light" borderRadius={2}>
            <AccountBalanceWallet sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography variant="h4" fontWeight={700} color="primary.main">
              ${performanceData.totalValue.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Portfolio Value
            </Typography>
          </Box>
          
          <Box textAlign="center" p={2} bgcolor="success.light" borderRadius={2}>
            <TrendingUp sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
            <Typography variant="h4" fontWeight={700} color="success.main">
              +${performanceData.totalGain.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Gain ({performanceData.totalGainPercentage}%)
            </Typography>
          </Box>
        </Box>

        <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gap={2} mb={3}>
          <Box p={2} bgcolor="info.light" borderRadius={2}>
            <Typography variant="h6" fontWeight={700} color="info.main">
              +{performanceData.change24h}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              24h Change
            </Typography>
          </Box>
          <Box p={2} bgcolor="warning.light" borderRadius={2}>
            <Typography variant="h6" fontWeight={700} color="warning.main">
              +{performanceData.change7d}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              7d Change
            </Typography>
          </Box>
          <Box p={2} bgcolor="success.light" borderRadius={2}>
            <Typography variant="h6" fontWeight={700} color="success.main">
              {performanceData.netAPY}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Net APY
            </Typography>
          </Box>
        </Box>

        <Box p={2} bgcolor="grey.50" borderRadius={2}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="body2" color="text.secondary">
              30d Performance
            </Typography>
            <Typography variant="body2" fontWeight={600} color="success.main">
              +{performanceData.change30d}%
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={Math.min(performanceData.change30d * 10, 100)} 
            color="success"
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

function AssetAllocation() {
  return (
    <Card className="animate-fade-in-up stagger-1">
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight={600}>
            Asset Allocation
          </Typography>
          <Button variant="outlined" size="small" startIcon={<PieChart />}>
            View Chart
          </Button>
        </Box>
        
        <List>
          {portfolioAssets.map((asset) => (
            <ListItem key={asset.id} sx={{ px: 0, py: 1 }}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  {asset.icon}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body1" fontWeight={600}>
                      {asset.name} ({asset.symbol})
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      ${asset.value.toLocaleString()}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {asset.balance} {asset.symbol} • {asset.allocation}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ${asset.price} per {asset.symbol}
                      </Typography>
                    </Box>
                    <Box textAlign="right">
                      <Typography 
                        variant="body2" 
                        color={asset.change24h >= 0 ? 'success.main' : 'error.main'}
                        fontWeight={600}
                      >
                        {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {asset.apy}% APY
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

function DeFiPositions() {
  return (
    <Card className="animate-fade-in-up stagger-2">
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={3}>
          DeFi Positions
        </Typography>
        
        <List>
          {defiPositions.map((position) => (
            <ListItem key={position.id} sx={{ px: 0, py: 1 }}>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: position.type === 'LP Position' ? 'success.main' : 
                             position.type === 'Lending' ? 'info.main' : 'warning.main',
                  }}
                >
                  {position.type === 'LP Position' ? <WaterDrop /> : 
                   position.type === 'Lending' ? <Savings /> : <CreditCard />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body1" fontWeight={600}>
                      {position.protocol} - {position.type}
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      ${Math.abs(position.value).toLocaleString()}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {position.assets.join(' / ')}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {position.apy}% APY
                      </Typography>
                    </Box>
                    <Box textAlign="right">
                      <Typography 
                        variant="body2" 
                        color={position.change24h >= 0 ? 'success.main' : 'error.main'}
                        fontWeight={600}
                      >
                        {position.change24h >= 0 ? '+' : ''}{position.change24h}%
                      </Typography>
                      <Chip
                        label={position.status}
                        size="small"
                        color="success"
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

function TransactionHistory() {
  return (
    <Card className="animate-fade-in-up stagger-3">
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={3}>
          Recent Transactions
        </Typography>
        <List>
          {transactionHistory.map((tx) => (
            <ListItem key={tx.id} sx={{ px: 0, py: 1 }}>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: tx.type === 'swap' ? 'primary.main' : 
                             tx.type === 'stake' ? 'success.main' : 
                             tx.type === 'lend' ? 'info.main' : 'warning.main',
                  }}
                >
                  {tx.type === 'swap' ? <SwapHoriz /> : 
                   tx.type === 'stake' ? <Agriculture /> : 
                   tx.type === 'lend' ? <Savings /> : <CreditCard />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body1" fontWeight={600}>
                      {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                      {tx.from && tx.to && ` ${tx.from} → ${tx.to}`}
                      {tx.protocol && ` on ${tx.protocol}`}
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      ${tx.value.toLocaleString()}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" color="text.secondary">
                      {tx.amount} {tx.from || tx.protocol}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {tx.timestamp.toLocaleTimeString()}
                    </Typography>
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

function PerformanceChart() {
  return (
    <Card className="animate-fade-in-up">
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight={600}>
            Performance Chart
          </Typography>
          <Box display="flex" gap={1}>
            <Button size="small" variant="outlined">1D</Button>
            <Button size="small" variant="contained">7D</Button>
            <Button size="small" variant="outlined">1M</Button>
            <Button size="small" variant="outlined">1Y</Button>
          </Box>
        </Box>
        <Box
          sx={{
            height: 300,
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(102, 126, 234, 0.2)',
          }}
        >
          <Box textAlign="center">
            <ShowChart sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" mb={1}>
              Portfolio Performance
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Interactive charts coming soon
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function PortfolioPage() {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h3" fontWeight={700} mb={1}>
            Portfolio
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track your assets, DeFi positions, and performance
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

      <Box display="grid" gridTemplateColumns={{ xs: '1fr', lg: '1fr 1fr' }} gap={4}>
        {/* Left Column */}
        <Box>
          <PortfolioOverview />
          
          <Box mt={3}>
            <AssetAllocation />
          </Box>

          <Box mt={3}>
            <DeFiPositions />
          </Box>
        </Box>

        {/* Right Column */}
        <Box>
          <PerformanceChart />
          
          <Box mt={3}>
            <TransactionHistory />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
