'use client';

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  IconButton,
  Avatar,
  Divider,
  Alert,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
} from '@mui/material';
import {
  AccountBalance,
  TrendingUp,
  TrendingDown,
  ArrowDownward,
  ArrowUpward,
  Info,
  Warning,
  CheckCircle,
  Timeline,
  Speed,
  Lock,
  LockOpen,
  Star,
  LocalFireDepartment,
  EmojiEvents,
  MonetizationOn,
  Calculate,
  Security,
  BarChart,
  AttachMoney,
  Refresh,
  Settings,
  History,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { WalletConnectionTest } from '@/components/wallet-connection-test';

// Mock data
const portfolioAssets = [
  { symbol: 'ETH', name: 'Ethereum', amount: 5.2, value: 15600, change24h: 2.5, change7d: 8.2, change30d: -3.1, allocation: 45 },
  { symbol: 'USDC', name: 'USD Coin', amount: 15000, value: 15000, change24h: 0.0, change7d: 0.0, change30d: 0.0, allocation: 25 },
  { symbol: 'UNI', name: 'Uniswap', amount: 500, value: 6000, change24h: -1.2, change7d: 5.8, change30d: 12.4, allocation: 15 },
  { symbol: 'AAVE', name: 'Aave', amount: 50, value: 4750, change24h: 3.8, change7d: -2.1, change30d: 8.7, allocation: 10 },
  { symbol: 'WBTC', name: 'Wrapped Bitcoin', amount: 0.1, value: 4500, change24h: 1.8, change7d: 6.5, change30d: -1.2, allocation: 5 },
];

const defiPositions = [
  { type: 'LP', protocol: 'Uniswap', pair: 'ETH-USDC', value: 8500, apy: 12.5, change24h: 0.8 },
  { type: 'Lending', protocol: 'Aave', asset: 'USDC', value: 5000, apy: 4.2, change24h: 0.2 },
  { type: 'Farming', protocol: 'Compound', pair: 'ETH-DAI', value: 3200, apy: 18.7, change24h: 1.5 },
  { type: 'Staking', protocol: 'Lido', asset: 'ETH', value: 2800, apy: 5.2, change24h: 0.3 },
];

const transactionHistory = [
  { id: 1, type: 'swap', from: 'ETH', to: 'USDC', amount: 2.5, value: 7500, timestamp: '2024-01-15T10:30:00Z', status: 'completed' },
  { id: 2, type: 'stake', asset: 'ETH', amount: 1.0, value: 3000, timestamp: '2024-01-15T09:15:00Z', status: 'completed' },
  { id: 3, type: 'farm', protocol: 'Uniswap', amount: 1000, value: 1000, timestamp: '2024-01-15T08:45:00Z', status: 'pending' },
  { id: 4, type: 'lend', asset: 'USDC', amount: 5000, value: 5000, timestamp: '2024-01-15T08:00:00Z', status: 'completed' },
];

const performanceData = {
  totalValue: 45850,
  totalGain: 5850,
  gainPercentage: 14.6,
  change24h: 1250,
  change7d: 3200,
  change30d: 1850,
};

function PortfolioOverview() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={3}>
          Portfolio Overview
        </Typography>

        <Box display="flex" flexDirection="column" gap={3}>
          <Box p={2} bgcolor="success.light" borderRadius={2}>
            <Typography variant="body2" color="text.secondary">
              Total Portfolio Value
            </Typography>
            <Typography variant="h4" fontWeight={700} color="success.main">
              ${performanceData.totalValue.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="success.main" fontWeight={600}>
              +${performanceData.totalGain.toLocaleString()} (+{performanceData.gainPercentage}%)
            </Typography>
          </Box>

          <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gap={2}>
            <Box textAlign="center" p={2} bgcolor="info.light" borderRadius={2}>
              <Typography variant="body2" color="text.secondary">
                24h Change
              </Typography>
              <Typography variant="h6" fontWeight={600} color="info.main">
                +${performanceData.change24h.toLocaleString()}
              </Typography>
            </Box>
            <Box textAlign="center" p={2} bgcolor="warning.light" borderRadius={2}>
              <Typography variant="body2" color="text.secondary">
                7d Change
              </Typography>
              <Typography variant="h6" fontWeight={600} color="warning.main">
                +${performanceData.change7d.toLocaleString()}
              </Typography>
            </Box>
            <Box textAlign="center" p={2} bgcolor="error.light" borderRadius={2}>
              <Typography variant="body2" color="text.secondary">
                30d Change
              </Typography>
              <Typography variant="h6" fontWeight={600} color="error.main">
                +${performanceData.change30d.toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

function AssetAllocation() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={3}>
          Asset Allocation
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          {portfolioAssets.map((asset) => (
            <Box key={asset.symbol} p={2} border="1px solid" borderColor="divider" borderRadius={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {asset.symbol.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="body1" fontWeight={600}>
                      {asset.name} ({asset.symbol})
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {asset.amount} {asset.symbol}
                    </Typography>
                  </Box>
                </Box>
                <Box textAlign="right">
                  <Typography variant="body1" fontWeight={600}>
                    ${asset.value.toLocaleString()}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color={asset.change24h >= 0 ? 'success.main' : 'error.main'}
                  >
                    {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  Allocation: {asset.allocation}%
                </Typography>
                <Box width="60%" bgcolor="grey.200" borderRadius={1} height={8}>
                  <Box 
                    width={`${asset.allocation}%`} 
                    bgcolor="primary.main" 
                    height="100%" 
                    borderRadius={1}
                  />
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

function DeFiPositions() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={3}>
          DeFi Positions
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          {defiPositions.map((position, index) => (
            <Box key={index} p={2} border="1px solid" borderColor="divider" borderRadius={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Box>
                  <Typography variant="body1" fontWeight={600}>
                    {position.type} - {position.protocol}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {position.pair || position.asset}
                  </Typography>
                </Box>
                <Chip label={position.type} size="small" color="primary" />
              </Box>
              
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Value
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    ${position.value.toLocaleString()}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    APY
                  </Typography>
                  <Typography variant="body1" fontWeight={600} color="success.main">
                    {position.apy}%
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    24h Change
                  </Typography>
                  <Typography 
                    variant="body1" 
                    fontWeight={600}
                    color={position.change24h >= 0 ? 'success.main' : 'error.main'}
                  >
                    {position.change24h >= 0 ? '+' : ''}{position.change24h}%
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

function TransactionHistory() {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'swap': return 'primary';
      case 'stake': return 'success';
      case 'farm': return 'warning';
      case 'lend': return 'info';
      default: return 'default';
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={3}>
          Recent Transactions
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          {transactionHistory.map((tx) => (
            <Box key={tx.id} p={2} border="1px solid" borderColor="divider" borderRadius={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="body1" fontWeight={600}>
                  {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                  {tx.from && tx.to && ` ${tx.from} → ${tx.to}`}
                  {tx.asset && ` ${tx.asset}`}
                  {tx.protocol && ` (${tx.protocol})`}
                </Typography>
                <Chip
                  label={tx.type}
                  color={getTypeColor(tx.type) as any}
                  size="small"
                />
              </Box>
              
              <Typography variant="body2" color="text.secondary">
                Amount: {tx.amount} {tx.from || tx.asset} (${tx.value.toLocaleString()})
              </Typography>
              
              <Typography variant="caption" color="text.secondary">
                {new Date(tx.timestamp).toLocaleString()}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

function PerformanceChart() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={3}>
          Performance Chart
        </Typography>

        <Box height={200} display="flex" alignItems="center" justifyContent="center" bgcolor="grey.50" borderRadius={2}>
          <Box textAlign="center">
            <BarChart sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
            <Typography variant="body2" color="text.secondary">
              Performance chart will be displayed here
            </Typography>
          </Box>
        </Box>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography variant="body2" color="text.secondary">
            Total Return: +{performanceData.gainPercentage}%
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Best Asset: UNI (+12.4%)
          </Typography>
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
            Track your DeFi investments and performance
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

      <Box display="grid" gridTemplateColumns={{ xs: '1fr', lg: '1fr 1fr' }} gap={4}>
        {/* Left Column */}
        <Box>
          <PortfolioOverview />
          
          <Box mt={3}>
            <AssetAllocation />
          </Box>
        </Box>

        {/* Right Column */}
        <Box>
          <DeFiPositions />
          
          <Box mt={3}>
            <PerformanceChart />
          </Box>
          
          <Box mt={3}>
            <TransactionHistory />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
