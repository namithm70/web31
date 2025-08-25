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
  AccountBalance,
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
  FlashOn,
  Shield,
} from '@mui/icons-material';
import { WalletConnectionTest } from '@/components/wallet-connection-test';

// Enhanced mock data with advanced lending features
const lendingPools = [
  {
    id: 'aave-usdc',
    name: 'Aave USDC',
    asset: 'USDC',
    supplyRate: 4.25,
    borrowRate: 6.85,
    utilization: 78.5,
    totalSupply: 250000000,
    totalBorrow: 196250000,
    collateralFactor: 85,
    liquidationThreshold: 82.5,
    liquidationPenalty: 5,
    assetPrice: 1.00,
    change24h: 0.0,
    icon: '🔵',
    risk: 'low',
    flashLoanFee: 0.09,
    maxLTV: 85,
    supplyCap: 500000000,
    borrowCap: 400000000,
    userSupply: 50000,
    userBorrow: 0,
    healthFactor: 0,
  },
  {
    id: 'compound-eth',
    name: 'Compound ETH',
    asset: 'ETH',
    supplyRate: 2.15,
    borrowRate: 4.95,
    utilization: 65.2,
    totalSupply: 180000000,
    totalBorrow: 117360000,
    collateralFactor: 82,
    liquidationThreshold: 80,
    liquidationPenalty: 8,
    assetPrice: 3200,
    change24h: 2.5,
    icon: '🔵',
    risk: 'medium',
    flashLoanFee: 0.09,
    maxLTV: 82,
    supplyCap: 300000000,
    borrowCap: 250000000,
    userSupply: 25000,
    userBorrow: 15000,
    healthFactor: 1.85,
  },
  {
    id: 'aave-dai',
    name: 'Aave DAI',
    asset: 'DAI',
    supplyRate: 3.95,
    borrowRate: 6.45,
    utilization: 72.1,
    totalSupply: 120000000,
    totalBorrow: 86520000,
    collateralFactor: 88,
    liquidationThreshold: 85,
    liquidationPenalty: 5,
    assetPrice: 1.00,
    change24h: 0.1,
    icon: '🟡',
    risk: 'low',
    flashLoanFee: 0.09,
    maxLTV: 88,
    supplyCap: 200000000,
    borrowCap: 150000000,
    userSupply: 0,
    userBorrow: 0,
    healthFactor: 0,
  },
];

const flashLoanData = {
  availableAssets: [
    { asset: 'USDC', available: 250000000, fee: 0.09 },
    { asset: 'ETH', available: 180000000, fee: 0.09 },
    { asset: 'DAI', available: 120000000, fee: 0.09 },
  ],
  recentLoans: [
    { asset: 'USDC', amount: 100000, profit: 250, timestamp: '2024-01-15T10:30:00Z' },
    { asset: 'ETH', amount: 50, profit: 125, timestamp: '2024-01-15T09:15:00Z' },
    { asset: 'DAI', amount: 50000, profit: 75, timestamp: '2024-01-15T08:45:00Z' },
  ],
  totalProfit: 450,
  successRate: 94.5,
};

const riskManagementData = {
  portfolioHealth: {
    overall: 1.85,
    status: 'healthy',
    riskLevel: 'low',
    liquidationRisk: 0.02,
  },
  collateralOptimization: {
    currentEfficiency: 78.5,
    potentialEfficiency: 92.3,
    recommendations: [
      { action: 'Move ETH to Aave', improvement: 8.2, risk: 'low' },
      { action: 'Increase USDC supply', improvement: 5.1, risk: 'low' },
      { action: 'Diversify collateral', improvement: 3.7, risk: 'medium' },
    ],
  },
  liquidationProtection: {
    enabled: true,
    threshold: 1.2,
    autoRepay: true,
    notifications: true,
  },
  interestRatePredictions: {
    usdc: { current: 4.25, predicted: 4.85, trend: 'up' },
    eth: { current: 2.15, predicted: 2.45, trend: 'up' },
    dai: { current: 3.95, predicted: 3.65, trend: 'down' },
  },
};

const lendingAnalytics = {
  totalSupplied: 75000,
  totalBorrowed: 15000,
  netAPY: 2.85,
  totalInterestEarned: 1250.5,
  totalInterestPaid: 450.2,
  netProfit: 800.3,
  averageUtilization: 72.6,
  gasSpent: 85.2,
  efficiency: 78.5,
  diversification: 2,
  riskScore: 'low',
  projectedEarnings: {
    daily: 8.5,
    weekly: 59.5,
    monthly: 255.0,
    yearly: 3060.0,
  },
};

const borrowingHistory = [
  {
    id: 1,
    action: 'supply',
    asset: 'USDC',
    amount: 50000,
    rate: 4.25,
    timestamp: '2024-01-15T10:30:00Z',
    txHash: '0x1234...5678',
    status: 'completed',
    gasUsed: 45,
  },
  {
    id: 2,
    action: 'borrow',
    asset: 'ETH',
    amount: 5,
    rate: 4.95,
    timestamp: '2024-01-14T15:20:00Z',
    txHash: '0x8765...4321',
    status: 'completed',
    gasUsed: 52,
  },
  {
    id: 3,
    action: 'repay',
    asset: 'ETH',
    amount: 2,
    rate: 4.95,
    timestamp: '2024-01-13T09:45:00Z',
    txHash: '0xabcd...efgh',
    status: 'completed',
    gasUsed: 38,
  },
];

function AdvancedLendingPoolCard({ pool }: { pool: any }) {
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
              <Chip label={pool.asset} size="small" variant="outlined" />
              <Chip label={`${pool.utilization}% Util`} size="small" variant="outlined" />
            </Box>
            <Typography variant="body2" color="text.secondary">
              Price: ${pool.assetPrice.toLocaleString()} ({pool.change24h >= 0 ? '+' : ''}{pool.change24h}%)
            </Typography>
          </Box>
          <Box textAlign="right">
            <Typography variant="h5" fontWeight={700} color="text.primary">
              {pool.supplyRate}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Supply Rate
            </Typography>
            <Chip
              label={pool.risk}
              color="primary"
              size="small"
              variant="outlined"
            />
          </Box>
        </Box>

        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} mb={2}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Your Supply
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              ${pool.userSupply.toLocaleString()}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Your Borrow
            </Typography>
            <Typography variant="body1" fontWeight={600} color="text.secondary">
              ${pool.userBorrow.toLocaleString()}
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
            Supply
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Remove />}
            fullWidth
          >
            Withdraw
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<AttachMoney />}
            fullWidth
          >
            Borrow
          </Button>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <IconButton size="small" onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? <Compress /> : <Expand />}
          </IconButton>
          <Box display="flex" gap={1}>
            <Tooltip title="Flash Loan Available">
              <FlashOn sx={{ fontSize: 16, color: 'primary.main' }} />
            </Tooltip>
            <Tooltip title="Liquidation Protection">
              <Shield sx={{ fontSize: 16, color: 'primary.main' }} />
            </Tooltip>
          </Box>
        </Box>

        {showDetails && (
          <Box mt={2} pt={2} borderTop="1px solid" borderColor="divider">
            <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} mb={2}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Borrow Rate
                </Typography>
                <Typography variant="body1" fontWeight={600} color="text.secondary">
                  {pool.borrowRate}%
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Max LTV
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {pool.maxLTV}%
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Total Supply
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  ${(pool.totalSupply / 1000000).toFixed(1)}M
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Total Borrow
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  ${(pool.totalBorrow / 1000000).toFixed(1)}M
                </Typography>
              </Box>
            </Box>
            
            <Typography variant="body2" fontWeight={600} mb={1}>
              Liquidation Details
            </Typography>
            <Box display="flex" gap={1} mb={2}>
              <Chip label={`Threshold: ${pool.liquidationThreshold}%`} size="small" variant="outlined" />
              <Chip label={`Penalty: ${pool.liquidationPenalty}%`} size="small" variant="outlined" />
            </Box>

            {pool.healthFactor > 0 && (
              <Alert severity={pool.healthFactor < 1.5 ? 'warning' : 'info'} sx={{ mb: 2 }}>
                Health Factor: {pool.healthFactor.toFixed(2)}
              </Alert>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

function FlashLoanInterface() {
  const [selectedAsset, setSelectedAsset] = useState(flashLoanData.availableAssets[0]);
  const [amount, setAmount] = useState('');

  return (
    <Card className="animate-fade-in-up stagger-2">
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box display="flex" alignItems="center" gap={1}>
            <FlashOn sx={{ color: 'primary.main' }} />
            <Typography variant="h6" fontWeight={600}>
              Flash Loans
            </Typography>
          </Box>
          <Chip label={`${flashLoanData.successRate}% Success`} color="primary" size="small" />
        </Box>

        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3} mb={3}>
          <Box textAlign="center" p={2} bgcolor="grey.50" borderRadius={2}>
            <Typography variant="body2" color="text.secondary">
              Total Profit
            </Typography>
            <Typography variant="h5" fontWeight={600} color="text.primary">
              ${flashLoanData.totalProfit.toFixed(2)}
            </Typography>
          </Box>
          <Box textAlign="center" p={2} bgcolor="grey.100" borderRadius={2}>
            <Typography variant="body2" color="text.secondary">
              Success Rate
            </Typography>
            <Typography variant="h5" fontWeight={600} color="text.primary">
              {flashLoanData.successRate}%
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" fontWeight={600} mb={2}>
          Execute Flash Loan
        </Typography>
        <Box display="flex" flexDirection="column" gap={2} mb={3}>
          <FormControl fullWidth>
            <InputLabel>Asset</InputLabel>
            <Select
              value={selectedAsset.asset}
              onChange={(e) => setSelectedAsset(flashLoanData.availableAssets.find(a => a.asset === e.target.value)!)}
              label="Asset"
            >
              {flashLoanData.availableAssets.map((asset) => (
                <MenuItem key={asset.asset} value={asset.asset}>
                  {asset.asset} (Fee: {asset.fee}%)
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <TextField
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
          />
          
          <Button variant="contained" fullWidth startIcon={<FlashOn />}>
            Execute Flash Loan
          </Button>
        </Box>

        <Typography variant="body2" fontWeight={600} mb={2}>
          Recent Flash Loans
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          {flashLoanData.recentLoans.map((loan, index) => (
            <Box key={index} p={2} border="1px solid" borderColor="divider" borderRadius={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    {loan.asset} Flash Loan
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(loan.timestamp).toLocaleString()}
                  </Typography>
                </Box>
                <Box textAlign="right">
                  <Typography variant="body2" fontWeight={600} color="text.primary">
                    +${loan.profit.toFixed(2)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Amount: ${loan.amount.toLocaleString()}
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

function RiskManagement() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card className="animate-fade-in-up stagger-3">
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box display="flex" alignItems="center" gap={1}>
            <Shield sx={{ color: 'primary.main' }} />
            <Typography variant="h6" fontWeight={600}>
              Risk Management
            </Typography>
          </Box>
          <IconButton size="small" onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? <Compress /> : <Expand />}
          </IconButton>
        </Box>

        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3} mb={3}>
          <Box textAlign="center" p={2} bgcolor="grey.50" borderRadius={2}>
            <Typography variant="body2" color="text.secondary">
              Health Factor
            </Typography>
            <Typography variant="h5" fontWeight={600} color="text.primary">
              {riskManagementData.portfolioHealth.overall.toFixed(2)}
            </Typography>
            <Chip
              label={riskManagementData.portfolioHealth.status}
              size="small"
              color="primary"
              variant="outlined"
            />
          </Box>
          <Box textAlign="center" p={2} bgcolor="grey.100" borderRadius={2}>
            <Typography variant="body2" color="text.secondary">
              Liquidation Risk
            </Typography>
            <Typography variant="h5" fontWeight={600} color="text.primary">
              {(riskManagementData.portfolioHealth.liquidationRisk * 100).toFixed(2)}%
            </Typography>
          </Box>
        </Box>

        {showDetails && (
          <Box>
            <Typography variant="body2" fontWeight={600} mb={2}>
              Collateral Optimization
            </Typography>
            <Box display="flex" flexDirection="column" gap={2} mb={3}>
              {riskManagementData.collateralOptimization.recommendations.map((rec, index) => (
                <Box key={index} p={2} border="1px solid" borderColor="divider" borderRadius={2}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" fontWeight={600}>
                      {rec.action}
                    </Typography>
                    <Typography variant="body2" fontWeight={600} color="text.primary">
                      +{rec.improvement}% efficiency
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Chip label={`Risk: ${rec.risk}`} size="small" variant="outlined" />
                    <Button variant="outlined" size="small">
                      Optimize
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>

            <Typography variant="body2" fontWeight={600} mb={2}>
              Interest Rate Predictions
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              {Object.entries(riskManagementData.interestRatePredictions).map(([asset, data]) => (
                <Box key={asset} p={2} border="1px solid" borderColor="divider" borderRadius={2}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" fontWeight={600}>
                      {asset.toUpperCase()}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="body2" color="text.secondary">
                        {data.current}% →
                      </Typography>
                      <Typography variant="body2" fontWeight={600} color="text.primary">
                        {data.predicted}%
                      </Typography>
                      {data.trend === 'up' ? (
                        <TrendingUp sx={{ fontSize: 16, color: 'text.primary' }} />
                      ) : (
                        <TrendingDown sx={{ fontSize: 16, color: 'text.secondary' }} />
                      )}
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>

            <Box mt={3}>
              <Typography variant="body2" fontWeight={600} mb={2}>
                Liquidation Protection
              </Typography>
              <Box p={2} bgcolor="grey.50" borderRadius={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={riskManagementData.liquidationProtection.enabled}
                      color="primary"
                    />
                  }
                  label="Enable Protection"
                  sx={{ mb: 1 }}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={riskManagementData.liquidationProtection.autoRepay}
                      color="primary"
                    />
                  }
                  label="Auto Repay"
                  sx={{ mb: 1 }}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={riskManagementData.liquidationProtection.notifications}
                      color="primary"
                    />
                  }
                  label="Notifications"
                />
              </Box>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

function LendingAnalytics() {
  return (
    <Card className="animate-fade-in-up stagger-4">
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box display="flex" alignItems="center" gap={1}>
            <Analytics sx={{ color: 'primary.main' }} />
            <Typography variant="h6" fontWeight={600}>
              Lending Analytics
            </Typography>
          </Box>
          <IconButton size="small">
            <Refresh />
          </IconButton>
        </Box>

        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={3} mb={3}>
          <Box textAlign="center" p={2} bgcolor="grey.50" borderRadius={2}>
            <Typography variant="body2" color="text.secondary">
              Total Supplied
            </Typography>
            <Typography variant="h5" fontWeight={600} color="text.primary">
              ${lendingAnalytics.totalSupplied.toLocaleString()}
            </Typography>
          </Box>
          <Box textAlign="center" p={2} bgcolor="grey.100" borderRadius={2}>
            <Typography variant="body2" color="text.secondary">
              Total Borrowed
            </Typography>
            <Typography variant="h5" fontWeight={600} color="text.primary">
              ${lendingAnalytics.totalBorrowed.toLocaleString()}
            </Typography>
          </Box>
          <Box textAlign="center" p={2} bgcolor="grey.50" borderRadius={2}>
            <Typography variant="body2" color="text.secondary">
              Net APY
            </Typography>
            <Typography variant="h5" fontWeight={600} color="text.primary">
              {lendingAnalytics.netAPY}%
            </Typography>
          </Box>
          <Box textAlign="center" p={2} bgcolor="grey.100" borderRadius={2}>
            <Typography variant="body2" color="text.secondary">
              Net Profit
            </Typography>
            <Typography variant="h5" fontWeight={600} color="text.primary">
              ${lendingAnalytics.netProfit.toFixed(2)}
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" fontWeight={600} mb={2}>
          Projected Earnings
        </Typography>
        <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2} mb={3}>
          {Object.entries(lendingAnalytics.projectedEarnings).map(([period, amount]) => (
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
              Interest Earned
            </Typography>
            <Typography variant="body1" fontWeight={600} color="text.primary">
              ${lendingAnalytics.totalInterestEarned.toFixed(2)}
            </Typography>
          </Box>
          <Box textAlign="right">
            <Typography variant="body2" color="text.secondary">
              Interest Paid
            </Typography>
            <Typography variant="body1" fontWeight={600} color="text.secondary">
              ${lendingAnalytics.totalInterestPaid.toFixed(2)}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

function BorrowingHistory() {
  return (
    <Card className="animate-fade-in-up stagger-5">
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight={600}>
            Borrowing History
          </Typography>
          <Button variant="outlined" size="small" startIcon={<Download />}>
            Export
          </Button>
        </Box>

        <Box display="flex" flexDirection="column" gap={2}>
          {borrowingHistory.map((item) => (
            <Box key={item.id} p={2} border="1px solid" borderColor="divider" borderRadius={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="body1" fontWeight={600}>
                  {item.asset} {item.action}
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
                    Rate: {item.rate}%
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

export default function LendPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [filter, setFilter] = useState('all');

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
        {/* Main Lending Interface */}
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5" fontWeight={600}>
              Lending Pools
            </Typography>
            <Box display="flex" gap={1}>
              <FormControl size="small">
                <Select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="all">All Pools</MenuItem>
                  <MenuItem value="supply">Supply Only</MenuItem>
                  <MenuItem value="borrow">Borrow Only</MenuItem>
                  <MenuItem value="high-rate">High Rates</MenuItem>
                </Select>
              </FormControl>
              <IconButton size="small">
                <Refresh />
              </IconButton>
            </Box>
          </Box>

          <Box display="flex" flexDirection="column" gap={3}>
            {lendingPools.map((pool) => (
              <AdvancedLendingPoolCard key={pool.id} pool={pool} />
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
            <Tab label="Flash" />
            <Tab label="Risk" />
            <Tab label="Analytics" />
            <Tab label="History" />
          </Tabs>

          {selectedTab === 0 && <FlashLoanInterface />}
          {selectedTab === 1 && <RiskManagement />}
          {selectedTab === 2 && <LendingAnalytics />}
          {selectedTab === 3 && <BorrowingHistory />}
        </Box>
      </Box>
    </Box>
  );
}
