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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Timeline,
  Settings,
  History,
} from '@mui/icons-material';
import { WalletConnectionTest } from '@/components/wallet-connection-test';

// Mock data
const lendingPools = [
  {
    id: 1,
    asset: 'USDC',
    supplyRate: 4.2,
    borrowRate: 6.8,
    utilization: 78.5,
    totalSupply: 15000000,
    totalBorrow: 11775000,
    collateralFactor: 0.85,
    icon: '🔵',
  },
  {
    id: 2,
    asset: 'ETH',
    supplyRate: 2.1,
    borrowRate: 4.5,
    utilization: 65.2,
    totalSupply: 8500000,
    totalBorrow: 5542000,
    collateralFactor: 0.75,
    icon: '🟠',
  },
  {
    id: 3,
    asset: 'DAI',
    supplyRate: 3.8,
    borrowRate: 5.9,
    utilization: 82.1,
    totalSupply: 12000000,
    totalBorrow: 9852000,
    collateralFactor: 0.80,
    icon: '🟡',
  },
  {
    id: 4,
    asset: 'WBTC',
    supplyRate: 1.5,
    borrowRate: 3.2,
    utilization: 45.8,
    totalSupply: 3200000,
    totalBorrow: 1465600,
    collateralFactor: 0.70,
    icon: '🟠',
  },
];

const borrowingHistory = [
  { id: 1, asset: 'USDC', amount: 5000, action: 'borrow', timestamp: '2024-01-15T10:30:00Z', status: 'completed' },
  { id: 2, asset: 'ETH', amount: 2.5, action: 'repay', timestamp: '2024-01-15T09:15:00Z', status: 'completed' },
  { id: 3, asset: 'DAI', amount: 3000, action: 'borrow', timestamp: '2024-01-15T08:45:00Z', status: 'pending' },
];

const portfolioData = {
  totalSupplied: 25000,
  totalBorrowed: 12000,
  healthFactor: 1.85,
  availableToBorrow: 8500,
  netAPY: 2.8,
  utilizationRate: 48.0,
};

interface LendingPool {
  id: number;
  asset: string;
  supplyRate: number;
  borrowRate: number;
  utilization: number;
  totalSupply: number;
  totalBorrow: number;
  collateralFactor: number;
  icon: string;
}

function LendingPoolCard({ pool }: { pool: LendingPool }) {
  const [amount, setAmount] = useState('');
  const [action, setAction] = useState<'supply' | 'borrow' | 'repay' | 'withdraw'>('supply');

  const getUtilizationColor = (utilization: number) => {
    if (utilization > 80) return 'error';
    if (utilization > 60) return 'warning';
    return 'success';
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              {pool.icon}
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                {pool.asset}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Collateral Factor: {pool.collateralFactor * 100}%
              </Typography>
            </Box>
          </Box>
          <Chip
            label={`${pool.utilization}%`}
            color={getUtilizationColor(pool.utilization) as 'success' | 'warning' | 'error'}
            size="small"
          />
        </Box>

        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} mb={3}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Supply Rate
            </Typography>
            <Typography variant="h6" fontWeight={600} color="success.main">
              {pool.supplyRate}%
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Borrow Rate
            </Typography>
            <Typography variant="h6" fontWeight={600} color="error.main">
              {pool.borrowRate}%
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Total Supply
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              ${(pool.totalSupply / 1000000).toFixed(1)}M
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Total Borrow
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              ${(pool.totalBorrow / 1000000).toFixed(1)}M
            </Typography>
          </Box>
        </Box>

        <Box display="flex" gap={1} mb={2}>
          <Button
            variant={action === 'supply' ? 'contained' : 'outlined'}
            size="small"
            onClick={() => setAction('supply')}
            fullWidth
          >
            Supply
          </Button>
          <Button
            variant={action === 'borrow' ? 'contained' : 'outlined'}
            size="small"
            onClick={() => setAction('borrow')}
            fullWidth
          >
            Borrow
          </Button>
          <Button
            variant={action === 'repay' ? 'contained' : 'outlined'}
            size="small"
            onClick={() => setAction('repay')}
            fullWidth
          >
            Repay
          </Button>
          <Button
            variant={action === 'withdraw' ? 'contained' : 'outlined'}
            size="small"
            onClick={() => setAction('withdraw')}
            fullWidth
          >
            Withdraw
          </Button>
        </Box>

        <TextField
          label={`Amount to ${action}`}
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
          size="small"
          sx={{ mb: 2 }}
        />

        <Button variant="contained" fullWidth>
          {action.charAt(0).toUpperCase() + action.slice(1)} {pool.asset}
        </Button>
      </CardContent>
    </Card>
  );
}

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
              Total Supplied
            </Typography>
            <Typography variant="h5" fontWeight={600} color="success.main">
              ${portfolioData.totalSupplied.toLocaleString()}
            </Typography>
          </Box>

          <Box p={2} bgcolor="error.light" borderRadius={2}>
            <Typography variant="body2" color="text.secondary">
              Total Borrowed
            </Typography>
            <Typography variant="h5" fontWeight={600} color="error.main">
              ${portfolioData.totalBorrowed.toLocaleString()}
            </Typography>
          </Box>

          <Box p={2} bgcolor="info.light" borderRadius={2}>
            <Typography variant="body2" color="text.secondary">
              Health Factor
            </Typography>
            <Typography variant="h5" fontWeight={600} color="info.main">
              {portfolioData.healthFactor}
            </Typography>
          </Box>

          <Box p={2} bgcolor="warning.light" borderRadius={2}>
            <Typography variant="body2" color="text.secondary">
              Available to Borrow
            </Typography>
            <Typography variant="h5" fontWeight={600} color="warning.main">
              ${portfolioData.availableToBorrow.toLocaleString()}
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2" fontWeight={600} mb={1}>
              Net APY: {portfolioData.netAPY}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Utilization: {portfolioData.utilizationRate}%
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

function BorrowingHistory() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={3}>
          Borrowing History
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          {borrowingHistory.map((item) => (
            <Box key={item.id} p={2} border="1px solid" borderColor="divider" borderRadius={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="body1" fontWeight={600}>
                  {item.asset}
                </Typography>
                <Chip
                  label={item.action}
                  color={item.action === 'borrow' ? 'error' : 'success'}
                  size="small"
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Amount: {item.amount} {item.asset}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(item.timestamp).toLocaleString()}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

function InterestRateChart() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={3}>
          Interest Rate Analytics
        </Typography>

        <Box height={200} display="flex" alignItems="center" justifyContent="center" bgcolor="grey.50" borderRadius={2}>
          <Box textAlign="center">
            <Timeline sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
            <Typography variant="body2" color="text.secondary">
              Interest rate chart will be displayed here
            </Typography>
          </Box>
        </Box>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography variant="body2" color="text.secondary">
            Avg Supply Rate: 2.9%
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Avg Borrow Rate: 5.1%
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function LendPage() {
  const [selectedAsset, setSelectedAsset] = useState<string>('all');

  const filteredPools = selectedAsset === 'all' 
    ? lendingPools 
    : lendingPools.filter(pool => pool.asset === selectedAsset);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h3" fontWeight={700} mb={1}>
            Lend
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
        {/* Main Content */}
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5" fontWeight={600}>
              Lending Pools
            </Typography>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Asset</InputLabel>
              <Select
                value={selectedAsset}
                onChange={(e) => setSelectedAsset(e.target.value)}
                label="Asset"
              >
                <MenuItem value="all">All Assets</MenuItem>
                <MenuItem value="USDC">USDC</MenuItem>
                <MenuItem value="ETH">ETH</MenuItem>
                <MenuItem value="DAI">DAI</MenuItem>
                <MenuItem value="WBTC">WBTC</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={3}>
            {filteredPools.map((pool) => (
              <LendingPoolCard key={pool.id} pool={pool} />
            ))}
          </Box>
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
