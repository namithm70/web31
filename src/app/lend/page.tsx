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
} from '@mui/material';
import {
  Add,
  Info,
  Bolt,
  Security,
  Warning,
  Analytics,
  Download,
  AccountBalanceWallet,
  Remove,
  Notifications,
  FilterList,
  Sort,
  CompressOutlined,
  ExpandMoreOutlined,
} from '@mui/icons-material';


// Enhanced mock data removed – will wire to Aave/Compound subgraphs
const lendingPools: LendingPool[] = [
  {
    id: '1',
    name: 'USDC Lending Pool',
    asset: 'USDC',
      symbol: 'USDC',
    supplyRate: 4.2,
    borrowRate: 6.8,
    totalSupply: 25000000,
    totalBorrow: 18000000,
    utilization: 72,
    healthFactor: 1.85,
    collateralFactor: 0.85,
    liquidationThreshold: 0.82,
    userSupply: 5000,
    userBorrow: 0,
  },
  {
    id: '2',
    name: 'ETH Lending Pool',
    asset: 'ETH',
    symbol: 'ETH',
    supplyRate: 2.1,
    borrowRate: 4.5,
    totalSupply: 15000000,
    totalBorrow: 8500000,
    utilization: 57,
    healthFactor: 2.1,
    collateralFactor: 0.75,
    liquidationThreshold: 0.72,
    userSupply: 0,
    userBorrow: 2000,
  },
  {
    id: '3',
    name: 'DAI Lending Pool',
    asset: 'DAI',
    symbol: 'DAI',
    supplyRate: 3.8,
    borrowRate: 5.9,
    totalSupply: 18000000,
    totalBorrow: 12000000,
    utilization: 67,
    healthFactor: 1.95,
    collateralFactor: 0.90,
    liquidationThreshold: 0.87,
    userSupply: 3000,
    userBorrow: 1500,
  },
];

const flashLoanData: { availableAssets: string[]; fees: Record<string, number>; maxAmounts: Record<string, number>; recentLoans: { id: string; asset: string; amount: number; fee: number; timestamp: Date; txHash: string }[] } = {
  availableAssets: ['USDC', 'ETH', 'DAI', 'WBTC'],
  fees: {
    USDC: 0.09,
    ETH: 0.09,
    DAI: 0.09,
    WBTC: 0.09,
  },
  maxAmounts: {
    USDC: 10000000,
    ETH: 5000,
    DAI: 8000000,
    WBTC: 200,
  },
  recentLoans: [
    {
      id: '1',
      asset: 'USDC',
      amount: 50000,
      fee: 45,
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      txHash: '0x1234...5678',
    },
    {
      id: '2',
      asset: 'ETH',
      amount: 10,
      fee: 0.009,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      txHash: '0x8765...4321',
    },
  ],
};

const riskManagementData: { portfolioRisk: string; healthFactor: number; liquidationRisk: number; diversificationScore: number; recommendations: { action: string; priority: string; impact: string }[] } = {
  portfolioRisk: 'low',
  healthFactor: 2.1,
  liquidationRisk: 0.02,
  diversificationScore: 85,
  recommendations: [
    { action: 'Increase ETH collateral', priority: 'high', impact: 'Reduce liquidation risk' },
    { action: 'Diversify to stablecoins', priority: 'medium', impact: 'Improve stability' },
    { action: 'Monitor utilization rates', priority: 'low', impact: 'Optimize borrowing' },
  ],
};

const lendingAnalytics: { totalSupplied: number; totalBorrowed: number; netAPY: number; totalInterestEarned: number; totalInterestPaid: number; netEarnings: number; averageHealthFactor: number; utilizationRate: number } = {
  totalSupplied: 8000,
  totalBorrowed: 3500,
  netAPY: 2.8,
  totalInterestEarned: 125,
  totalInterestPaid: 45,
  netEarnings: 80,
  averageHealthFactor: 2.1,
  utilizationRate: 65,
};

const borrowingHistory: { id: string; action: 'supply'|'borrow'|'repay'; asset: string; amount: number; timestamp: Date; txHash: string; gasUsed: number }[] = [
  {
    id: '1',
    action: 'supply',
    asset: 'USDC',
    amount: 5000,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    txHash: '0x1234...5678',
    gasUsed: 0.002,
  },
  {
    id: '2',
    action: 'borrow',
    asset: 'ETH',
    amount: 2,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
    txHash: '0x8765...4321',
    gasUsed: 0.003,
  },
  {
    id: '3',
    action: 'repay',
    asset: 'DAI',
    amount: 1000,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
    txHash: '0xabcd...efgh',
    gasUsed: 0.002,
  },
];



interface LendingPool {
  id: string;
  name: string;
  asset: string;
  symbol: string;
  totalSupply: number;
  totalBorrow: number;
  supplyRate: number;
  borrowRate: number;
  utilization: number;
  liquidationThreshold: number;
  collateralFactor: number;
  userSupply: number;
  userBorrow: number;
  healthFactor: number;
}

function AdvancedLendingPoolCard({ pool }: { pool: LendingPool }) {
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
              <Chip
                label={`${pool.utilization}% Utilized`}
                color="primary"
                size="small"
                variant="outlined"
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              Total Supply: ${(pool.totalSupply / 1000000).toFixed(1)}M
            </Typography>
          </Box>
          <Box textAlign="right">
            <Typography variant="h5" fontWeight={700} color="text.primary">
              {pool.supplyRate}% Supply
        </Typography>
            <Typography variant="body2" color="text.secondary">
              {pool.borrowRate}% Borrow
          </Typography>
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
          <Chip
            label={`Health: ${pool.healthFactor}`}
            size="small"
            color="primary"
            variant="outlined"
          />
          <Chip
            label={`Collateral: ${pool.collateralFactor * 100}%`}
            size="small"
            color="primary"
            variant="outlined"
          />
        </Box>

        <Box display="flex" gap={1}>
          <Button variant="contained" size="small" fullWidth>
            Supply
          </Button>
          <Button variant="outlined" size="small" fullWidth>
            Borrow
          </Button>
          <IconButton size="small" onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? <CompressOutlined /> : <ExpandMoreOutlined />}
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
                  Total Borrow
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  ${(pool.totalBorrow / 1000000).toFixed(1)}M
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Liquidation Threshold
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {pool.liquidationThreshold * 100}%
        </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

function FlashLoanInterface() {
  const [selectedAsset, setSelectedAsset] = useState('USDC');
  const [amount, setAmount] = useState('');

  return (
    <Card className="animate-fade-in-up stagger-1">
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Box display="flex" alignItems="center" gap={1}>
            <Bolt sx={{ color: 'primary.main' }} />
            <Typography variant="h6" fontWeight={600}>
              Flash Loan Interface
            </Typography>
          </Box>
          <IconButton size="small">
            <Info />
          </IconButton>
        </Box>

        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3} mb={3}>
          <Box textAlign="center" p={2} bgcolor="grey.50" borderRadius={2}>
            <Typography variant="body2" color="text.secondary">
              Available Assets
            </Typography>
            <Typography variant="h5" fontWeight={600} color="text.primary">
              {flashLoanData.availableAssets.length}
            </Typography>
          </Box>
          <Box textAlign="center" p={2} bgcolor="grey.100" borderRadius={2}>
                  <Typography variant="body2" color="text.secondary">
              Fee Rate
            </Typography>
            <Typography variant="h5" fontWeight={600} color="text.primary">
              {flashLoanData.fees[selectedAsset as keyof typeof flashLoanData.fees]}%
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" fontWeight={600} mb={2}>
          Recent Flash Loans
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          {flashLoanData.recentLoans.map((loan) => (
            <Box key={loan.id} p={2} border="1px solid" borderColor="divider" borderRadius={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    {loan.asset} Flash Loan
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {loan.timestamp.toLocaleString()}
                  </Typography>
                </Box>
                <Box textAlign="right">
                  <Typography variant="body2" fontWeight={600}>
                    {loan.amount.toLocaleString()} {loan.asset}
                </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Fee: {loan.fee} {loan.asset}
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

function RiskManagementSystem() {
  return (
    <Card className="animate-fade-in-up stagger-2">
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box display="flex" alignItems="center" gap={1}>
            <Security sx={{ color: 'primary.main' }} />
            <Typography variant="h6" fontWeight={600}>
              Risk Management
        </Typography>
          </Box>
          <IconButton size="small">
            <Warning />
          </IconButton>
        </Box>

        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3} mb={3}>
          <Box textAlign="center" p={2} bgcolor="grey.50" borderRadius={2}>
            <Typography variant="body2" color="text.secondary">
              Health Factor
            </Typography>
            <Typography variant="h5" fontWeight={600} color="text.primary">
              {riskManagementData.healthFactor}
            </Typography>
          </Box>
          <Box textAlign="center" p={2} bgcolor="grey.100" borderRadius={2}>
            <Typography variant="body2" color="text.secondary">
              Liquidation Risk
          </Typography>
            <Typography variant="h5" fontWeight={600} color="text.secondary">
              {riskManagementData.liquidationRisk}%
          </Typography>
          </Box>
        </Box>

        <Typography variant="body2" fontWeight={600} mb={2}>
          Risk Recommendations
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          {riskManagementData.recommendations.map((rec, index) => (
            <Box key={index} p={2} border="1px solid" borderColor="divider" borderRadius={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    {rec.action}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {rec.impact}
                  </Typography>
                </Box>
                <Chip
                  label={rec.priority}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

function LendingAnalytics() {
  return (
    <Card className="animate-fade-in-up stagger-3">
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box display="flex" alignItems="center" gap={1}>
            <Analytics sx={{ color: 'primary.main' }} />
            <Typography variant="h6" fontWeight={600}>
              Lending Analytics
      </Typography>
          </Box>
          <IconButton size="small">
            <Download />
          </IconButton>
        </Box>

        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3} mb={3}>
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
            <Typography variant="h5" fontWeight={600} color="text.secondary">
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
              Net Earnings
            </Typography>
            <Typography variant="h5" fontWeight={600} color="text.primary">
              ${lendingAnalytics.netEarnings}
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" fontWeight={600} mb={2}>
          Performance Metrics
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="text.secondary">
              Average Health Factor
            </Typography>
            <Typography variant="body2" fontWeight={600} color="text.primary">
              {lendingAnalytics.averageHealthFactor}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="text.secondary">
              Utilization Rate
            </Typography>
            <Typography variant="body2" fontWeight={600} color="text.secondary">
              {lendingAnalytics.utilizationRate}%
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

function BorrowingHistory() {
  return (
    <Card className="animate-fade-in-up stagger-4">
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight={600}>
            Borrowing History
          </Typography>
          <Button variant="outlined" size="small">
            View All
          </Button>
        </Box>

        <Box display="flex" flexDirection="column" gap={2}>
          {borrowingHistory.map((item) => (
            <Box key={item.id} p={2} border="1px solid" borderColor="divider" borderRadius={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    {item.action === 'supply' ? <Add /> : item.action === 'borrow' ? <Remove /> : <AccountBalanceWallet />}
                  </Avatar>
                  <Typography variant="body2" fontWeight={600}>
                    {item.action.charAt(0).toUpperCase() + item.action.slice(1)} {item.asset}
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
                  {item.amount.toLocaleString()} {item.asset}
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

export default function LendPage() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h3" fontWeight={700} mb={1}>
            Lending & Borrowing
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Supply assets to earn interest or borrow against collateral
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
            Supply Assets
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
            {lendingPools.length === 0 ? (
              <Typography variant="body2" color="text.secondary">No pools available yet.</Typography>
            ) : (
              lendingPools.map((pool: any) => (
                <AdvancedLendingPoolCard key={pool.id} pool={pool} />
              ))
            )}
              </Box>
            </Box>

        <Box>
          <Tabs
            value={selectedTab}
            onChange={(e, newValue) => setSelectedTab(newValue)}
            sx={{ mb: 3 }}
          >
            <Tab label="Flash Loans" />
            <Tab label="Risk" />
            <Tab label="Analytics" />
            <Tab label="History" />
          </Tabs>

          {selectedTab === 0 && (flashLoanData ? <FlashLoanInterface /> : <Typography variant="body2" color="text.secondary">No flash loan data.</Typography>)}
          {selectedTab === 1 && (riskManagementData ? <RiskManagementSystem /> : <Typography variant="body2" color="text.secondary">No risk data.</Typography>)}
          {selectedTab === 2 && (lendingAnalytics ? <LendingAnalytics /> : <Typography variant="body2" color="text.secondary">No analytics available.</Typography>)}
          {selectedTab === 3 && (borrowingHistory.length ? <BorrowingHistory /> : <Typography variant="body2" color="text.secondary">No history yet.</Typography>)}
          </Box>
      </Box>
    </Box>
  );
}
