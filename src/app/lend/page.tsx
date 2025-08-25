'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  IconButton,
  Chip,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Alert,
  Switch,
  FormControlLabel,
  Tabs,
  Tab,
  Paper,
  LinearProgress,
  Badge,
} from '@mui/material';
import {
  AccountBalance,
  TrendingUp,
  TrendingDown,
  Refresh,
  Settings,
  ArrowDownward,
  ArrowUpward,
  Info,
  Warning,
  CheckCircle,
  Timeline,
  ShowChart,
  WaterDrop,
  Speed,
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
} from '@mui/icons-material';
import { WalletConnectionTest } from '@/components/wallet-connection-test';

// Mock lending pools data
const lendingPools = [
  {
    id: 1,
    asset: 'ETH',
    name: 'Ethereum',
    supplyRate: 3.2,
    borrowRate: 4.8,
    totalSupply: 12500000,
    totalBorrow: 8500000,
    utilization: 68,
    collateralFactor: 0.8,
    yourSupply: 2.5,
    yourBorrow: 0,
    price: 3200,
    change24h: 2.5,
    icon: '🔵',
  },
  {
    id: 2,
    asset: 'USDC',
    name: 'USD Coin',
    supplyRate: 2.1,
    borrowRate: 3.5,
    totalSupply: 8500000,
    totalBorrow: 4200000,
    utilization: 49,
    collateralFactor: 0.9,
    yourSupply: 0,
    yourBorrow: 5000,
    price: 1.00,
    change24h: 0.1,
    icon: '🔵',
  },
  {
    id: 3,
    asset: 'AAVE',
    name: 'Aave',
    supplyRate: 4.8,
    borrowRate: 6.2,
    totalSupply: 3200000,
    totalBorrow: 1800000,
    utilization: 56,
    collateralFactor: 0.7,
    yourSupply: 0,
    yourBorrow: 0,
    price: 95.20,
    change24h: 3.8,
    icon: '🔵',
  },
  {
    id: 4,
    asset: 'UNI',
    name: 'Uniswap',
    supplyRate: 3.9,
    borrowRate: 5.1,
    totalSupply: 2100000,
    totalBorrow: 950000,
    utilization: 45,
    collateralFactor: 0.75,
    yourSupply: 0,
    yourBorrow: 0,
    price: 8.50,
    change24h: -1.2,
    icon: '🟣',
  },
];

// Mock borrowing history
const borrowingHistory = [
  { id: 1, asset: 'USDC', action: 'borrow', amount: 5000, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), status: 'completed' },
  { id: 2, asset: 'ETH', action: 'supply', amount: 2.5, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), status: 'completed' },
  { id: 3, asset: 'USDC', action: 'repay', amount: 1000, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72), status: 'completed' },
];

// Mock portfolio data
const portfolioData = {
  totalSupplied: 8000,
  totalBorrowed: 5000,
  netAPY: 2.8,
  healthFactor: 1.85,
  availableToBorrow: 3200,
  totalCollateral: 12500,
};

function LendingPoolCard({ pool, onSupply, onBorrow, onRepay, onWithdraw }: any) {
  const [showDetails, setShowDetails] = useState(false);
  const [action, setAction] = useState<'supply' | 'borrow' | 'repay' | 'withdraw'>('supply');
  const [amount, setAmount] = useState('');

  const getUtilizationColor = (utilization: number) => {
    if (utilization < 50) return 'success';
    if (utilization < 80) return 'warning';
    return 'error';
  };

  return (
    <Card className="animate-fade-in-up" sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Typography variant="h6" fontWeight={600}>
                {pool.name} ({pool.asset})
              </Typography>
              <Chip
                label={`${pool.utilization}%`}
                size="small"
                color={getUtilizationColor(pool.utilization)}
                sx={{ fontSize: '0.7rem' }}
              />
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="body2" color="text.secondary">
                Price: ${pool.price.toLocaleString()}
              </Typography>
              <Typography 
                variant="body2" 
                color={pool.change24h >= 0 ? 'success.main' : 'error.main'}
              >
                {pool.change24h >= 0 ? '+' : ''}{pool.change24h}%
              </Typography>
            </Box>
          </Box>
          <Box textAlign="right">
            <Typography variant="h5" fontWeight={700} color="success.main">
              {pool.supplyRate}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Supply APY
            </Typography>
          </Box>
        </Box>

        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} mb={2}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Supply Rate
            </Typography>
            <Typography variant="body1" fontWeight={600} color="success.main">
              {pool.supplyRate}%
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Borrow Rate
            </Typography>
            <Typography variant="body1" fontWeight={600} color="error.main">
              {pool.borrowRate}%
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Your Supply
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              {pool.yourSupply} {pool.asset}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Your Borrow
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              {pool.yourBorrow} {pool.asset}
            </Typography>
          </Box>
        </Box>

        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              setAction('supply');
              setShowDetails(!showDetails);
            }}
            fullWidth
            color="success"
          >
            Supply
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              setAction('borrow');
              setShowDetails(!showDetails);
            }}
            fullWidth
            color="warning"
          >
            Borrow
          </Button>
          {pool.yourSupply > 0 && (
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setAction('withdraw');
                setShowDetails(!showDetails);
              }}
              fullWidth
            >
              Withdraw
            </Button>
          )}
          {pool.yourBorrow > 0 && (
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setAction('repay');
                setShowDetails(!showDetails);
              }}
              fullWidth
              color="error"
            >
              Repay
            </Button>
          )}
        </Box>

        {showDetails && (
          <Box mt={2} p={2} bgcolor="grey.50" borderRadius={2}>
            <Typography variant="body2" fontWeight={600} mb={2}>
              {action.charAt(0).toUpperCase() + action.slice(1)} {pool.asset}
            </Typography>
            <Box display="flex" gap={1} mb={2}>
              <TextField
                size="small"
                placeholder="0.0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
              />
              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  if (action === 'supply') onSupply(pool.id, amount);
                  if (action === 'borrow') onBorrow(pool.id, amount);
                  if (action === 'repay') onRepay(pool.id, amount);
                  if (action === 'withdraw') onWithdraw(pool.id, amount);
                }}
                disabled={!amount}
                color={action === 'supply' ? 'success' : action === 'borrow' ? 'warning' : 'error'}
              >
                {action.charAt(0).toUpperCase() + action.slice(1)}
              </Button>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary">
                {action === 'supply' ? 'Supply APY' : action === 'borrow' ? 'Borrow APY' : 'Current Balance'}
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {action === 'supply' ? `${pool.supplyRate}%` : 
                 action === 'borrow' ? `${pool.borrowRate}%` : 
                 action === 'withdraw' ? `${pool.yourSupply} ${pool.asset}` :
                 `${pool.yourBorrow} ${pool.asset}`}
              </Typography>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

function PortfolioOverview() {
  return (
    <Card className="animate-fade-in-up">
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={3}>
          Portfolio Overview
        </Typography>
        
        <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={3} mb={3}>
          <Box textAlign="center" p={2} bgcolor="success.light" borderRadius={2}>
            <Savings sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
            <Typography variant="h4" fontWeight={700} color="success.main">
              ${portfolioData.totalSupplied.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Supplied
            </Typography>
          </Box>
          
          <Box textAlign="center" p={2} bgcolor="warning.light" borderRadius={2}>
            <CreditCard sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
            <Typography variant="h4" fontWeight={700} color="warning.main">
              ${portfolioData.totalBorrowed.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Borrowed
            </Typography>
          </Box>
        </Box>

        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} mb={3}>
          <Box p={2} bgcolor="info.light" borderRadius={2}>
            <Typography variant="h6" fontWeight={700} color="info.main">
              {portfolioData.netAPY}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Net APY
            </Typography>
          </Box>
          <Box p={2} bgcolor="success.light" borderRadius={2}>
            <Typography variant="h6" fontWeight={700} color="success.main">
              {portfolioData.healthFactor}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Health Factor
            </Typography>
          </Box>
        </Box>

        <Box p={2} bgcolor="grey.50" borderRadius={2} mb={3}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="body2" color="text.secondary">
              Available to Borrow
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              ${portfolioData.availableToBorrow.toLocaleString()}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="text.secondary">
              Total Collateral
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              ${portfolioData.totalCollateral.toLocaleString()}
            </Typography>
          </Box>
        </Box>

        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="body2">
            <strong>Health Factor:</strong> Keep your health factor above 1.0 to avoid liquidation.
          </Typography>
        </Alert>
      </CardContent>
    </Card>
  );
}

function BorrowingHistory() {
  return (
    <Card className="animate-fade-in-up stagger-1">
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={3}>
          Transaction History
        </Typography>
        <List>
          {borrowingHistory.map((item) => (
            <ListItem key={item.id} sx={{ px: 0, py: 1 }}>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: item.action === 'supply' ? 'success.main' : 
                             item.action === 'borrow' ? 'warning.main' : 'info.main',
                  }}
                >
                  {item.action === 'supply' ? <Savings /> : 
                   item.action === 'borrow' ? <CreditCard /> : <Calculate />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body1" fontWeight={600}>
                      {item.action.charAt(0).toUpperCase() + item.action.slice(1)} {item.asset}
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {item.amount} {item.asset}
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

function InterestRateChart() {
  return (
    <Card className="animate-fade-in-up stagger-2">
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Interest Rate Analytics
        </Typography>
        <Box
          sx={{
            height: 200,
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(102, 126, 234, 0.2)',
          }}
        >
          <Box textAlign="center">
            <ShowChart sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Interest Rate Charts Coming Soon
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function LendPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [filterAsset, setFilterAsset] = useState('all');

  const handleSupply = (poolId: number, amount: string) => {
    console.log('Supplying', amount, 'to pool', poolId);
  };

  const handleBorrow = (poolId: number, amount: string) => {
    console.log('Borrowing', amount, 'from pool', poolId);
  };

  const handleRepay = (poolId: number, amount: string) => {
    console.log('Repaying', amount, 'to pool', poolId);
  };

  const handleWithdraw = (poolId: number, amount: string) => {
    console.log('Withdrawing', amount, 'from pool', poolId);
  };

  const filteredPools = lendingPools.filter(pool => 
    filterAsset === 'all' || pool.asset === filterAsset
  );

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h3" fontWeight={700} mb={1}>
            Lend & Borrow
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Supply assets to earn interest or borrow against your collateral
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
                  Lending Pools
                </Typography>
                <Box display="flex" gap={1}>
                  <Button
                    size="small"
                    variant={filterAsset === 'all' ? 'contained' : 'outlined'}
                    onClick={() => setFilterAsset('all')}
                  >
                    All Assets
                  </Button>
                  <Button
                    size="small"
                    variant={filterAsset === 'ETH' ? 'contained' : 'outlined'}
                    onClick={() => setFilterAsset('ETH')}
                  >
                    ETH
                  </Button>
                  <Button
                    size="small"
                    variant={filterAsset === 'USDC' ? 'contained' : 'outlined'}
                    onClick={() => setFilterAsset('USDC')}
                  >
                    USDC
                  </Button>
                  <Button
                    size="small"
                    variant={filterAsset === 'AAVE' ? 'contained' : 'outlined'}
                    onClick={() => setFilterAsset('AAVE')}
                  >
                    AAVE
                  </Button>
                </Box>
              </Box>
              
              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  <strong>Tip:</strong> Monitor your health factor and maintain sufficient collateral 
                  to avoid liquidation. Higher utilization rates may lead to higher interest rates.
                </Typography>
              </Alert>
            </CardContent>
          </Card>

          {/* Lending Pools */}
          {filteredPools.map((pool) => (
            <LendingPoolCard
              key={pool.id}
              pool={pool}
              onSupply={handleSupply}
              onBorrow={handleBorrow}
              onRepay={handleRepay}
              onWithdraw={handleWithdraw}
            />
          ))}
        </Box>

        {/* Sidebar */}
        <Box>
          <PortfolioOverview />
          
          <Box mt={3}>
            <BorrowingHistory />
          </Box>

          <Box mt={3}>
            <InterestRateChart />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
