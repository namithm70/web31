'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  LinearProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
} from '@mui/material';
import {
  AccountBalanceWallet,
  TrendingUp,
  Warning,
  CheckCircle,
  Download,
  Visibility,
} from '@mui/icons-material';
import { useAccount } from 'wagmi';
import { PositionSummary } from '@/types';

// Mock portfolio data
const mockPortfolio: PositionSummary = {
  balances: {
    '0xA0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8C': '1000000', // USDC
    '0xB0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8C8C': '5000000000000000000', // ETH
  },
  supplied: [
    {
      asset: '0xA0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8C' as any,
      amount: '500000',
      apy: 4.2,
    },
  ],
  borrowed: [
    {
      asset: '0xC0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8C8C' as any,
      amount: '200000',
      apr: 6.8,
    },
  ],
  healthFactor: 1.85,
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`portfolio-tabpanel-${index}`}
      aria-labelledby={`portfolio-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function PortfolioOverview() {
  const totalValue = 15000; // Mock total portfolio value
  const netApy = 2.8; // Mock net APY

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Portfolio Overview
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">
            ${totalValue.toLocaleString()}
          </Typography>
          <Chip 
            label={`+${netApy}% APY`} 
            color="success" 
            variant="outlined"
          />
        </Box>
        <LinearProgress
          variant="determinate"
          value={75}
          color="success"
          sx={{ mb: 1 }}
        />
        <Typography variant="body2" color="text.secondary">
          +$420.50 (24h)
        </Typography>
      </CardContent>
    </Card>
  );
}

function HealthFactorCard() {
  const healthFactor = mockPortfolio.healthFactor || 0;
  const isHealthy = healthFactor > 1.5;
  const isWarning = healthFactor <= 1.5 && healthFactor > 1.1;
  const isDanger = healthFactor <= 1.1;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Health Factor
        </Typography>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Typography variant="h4" color={isHealthy ? 'success.main' : isWarning ? 'warning.main' : 'error.main'}>
            {healthFactor.toFixed(2)}
          </Typography>
          {isHealthy ? (
            <CheckCircle color="success" />
          ) : isWarning ? (
            <Warning color="warning" />
          ) : (
            <Warning color="error" />
          )}
        </Box>
        <LinearProgress
          variant="determinate"
          value={Math.min((healthFactor / 2) * 100, 100)}
          color={isHealthy ? 'success' : isWarning ? 'warning' : 'error'}
          sx={{ mb: 1 }}
        />
        <Typography variant="body2" color="text.secondary">
          {isHealthy 
            ? 'Your position is healthy' 
            : isWarning 
            ? 'Consider adding collateral or repaying debt'
            : 'Risk of liquidation - take action immediately'
          }
        </Typography>
      </CardContent>
    </Card>
  );
}

function BalancesTable() {
  const balances = [
    {
      symbol: 'USDC',
      name: 'USD Coin',
      balance: '1,000.00',
      value: '$1,000.00',
      change24h: '+2.5%',
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      balance: '5.0',
      value: '$16,000.00',
      change24h: '-1.2%',
    },
  ];

  return (
    <TableContainer component={Paper} sx={{ backgroundColor: 'background.paper' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Asset</TableCell>
            <TableCell align="right">Balance</TableCell>
            <TableCell align="right">Value</TableCell>
            <TableCell align="right">24h Change</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {balances.map((balance) => (
            <TableRow key={balance.symbol}>
              <TableCell>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="body1">{balance.symbol}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {balance.name}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body1">{balance.balance}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body1">{balance.value}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography 
                  variant="body1" 
                  color={balance.change24h.startsWith('+') ? 'success.main' : 'error.main'}
                >
                  {balance.change24h}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Button size="small" variant="outlined">
                  Trade
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function PositionsTable() {
  const positions = [
    {
      protocol: 'Aave V3',
      type: 'Supply',
      asset: 'USDC',
      amount: '500.00',
      value: '$500.00',
      apy: '4.2%',
    },
    {
      protocol: 'Aave V3',
      type: 'Borrow',
      asset: 'USDT',
      amount: '200.00',
      value: '$200.00',
      apy: '6.8%',
    },
  ];

  return (
    <TableContainer component={Paper} sx={{ backgroundColor: 'background.paper' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Protocol</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Asset</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Value</TableCell>
            <TableCell align="right">APY/APR</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {positions.map((position, index) => (
            <TableRow key={index}>
              <TableCell>
                <Typography variant="body1">{position.protocol}</Typography>
              </TableCell>
              <TableCell>
                <Chip 
                  label={position.type} 
                  color={position.type === 'Supply' ? 'success' : 'warning'}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Typography variant="body1">{position.asset}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body1">{position.amount}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body1">{position.value}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography 
                  variant="body1" 
                  color={position.type === 'Supply' ? 'success.main' : 'error.main'}
                >
                  {position.apy}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Button size="small" variant="outlined">
                  Manage
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function PortfolioPage() {
  const { address } = useAccount();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleExportCSV = () => {
    // TODO: Implement CSV export
    console.log('Exporting portfolio data...');
  };

  if (!address) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Portfolio
        </Typography>
        <Alert severity="info">
          Please connect your wallet to view your portfolio
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          Portfolio
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Download />}
          onClick={handleExportCSV}
        >
          Export CSV
        </Button>
      </Box>

      <Box display="flex" gap={3} mb={3}>
        <Box flex={1}>
          <PortfolioOverview />
        </Box>
        <Box flex={1}>
          <HealthFactorCard />
        </Box>
      </Box>

      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Balances" />
            <Tab label="Positions" />
            <Tab label="History" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <BalancesTable />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <PositionsTable />
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="body1" color="text.secondary">
            Transaction history will be displayed here
          </Typography>
        </TabPanel>
      </Card>
    </Box>
  );
}
