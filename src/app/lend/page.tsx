'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
} from '@mui/material';
import {
  AccountBalanceWallet,
  TrendingDown,
  Warning,
  CheckCircle,
} from '@mui/icons-material';
import { useAccount } from 'wagmi';
import { TokenData, MarketRate } from '@/types';

// Mock data
const mockMarkets: (MarketRate & { token: TokenData })[] = [
  {
    asset: '0xA0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8C8C' as `0x${string}`,
    supplyAPY: 4.2,
    borrowAPR: 6.8,
    utilization: 75.5,
    token: {
      address: '0xA0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8C8C' as `0x${string}`,
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      price: 1,
    },
  },
  {
    asset: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' as `0x${string}`,
    supplyAPY: 3.8,
    borrowAPR: 5.9,
    utilization: 68.2,
    token: {
      address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' as `0x${string}`,
      symbol: 'WETH',
      name: 'Wrapped Ether',
      decimals: 18,
      price: 3500,
    },
  },
  {
    asset: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599' as `0x${string}`,
    supplyAPY: 2.1,
    borrowAPR: 4.5,
    utilization: 45.8,
    token: {
      address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599' as `0x${string}`,
      symbol: 'WBTC',
      name: 'Wrapped Bitcoin',
      decimals: 8,
      price: 45000,
    },
  },
];

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
      id={`lending-tabpanel-${index}`}
      aria-labelledby={`lending-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function HealthFactorCard() {
  const healthFactor = 1.85; // Mock data
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
        {/* LinearProgress removed as per new_code */}
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

function MarketTable() {
  return (
    <TableContainer component={Paper} sx={{ backgroundColor: 'background.paper' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Asset</TableCell>
            <TableCell align="right">Supply APY</TableCell>
            <TableCell align="right">Borrow APR</TableCell>
            <TableCell align="right">Utilization</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockMarkets.map((market) => (
            <TableRow key={market.asset}>
              <TableCell>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="body1">{market.token.symbol}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {market.token.name}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body1" color="success.main">
                  {market.supplyAPY.toFixed(2)}%
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body1" color="error.main">
                  {market.borrowAPR.toFixed(2)}%
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body1">
                  {market.utilization.toFixed(1)}%
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Box display="flex" gap={1}>
                  <Button size="small" variant="outlined">
                    Supply
                  </Button>
                  <Button size="small" variant="outlined">
                    Borrow
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function SupplyBorrowForm({ action }: { action: 'supply' | 'borrow' }) {
  const [selectedToken, setSelectedToken] = useState<TokenData | null>(null);
  const [amount, setAmount] = useState('');

  const handleSubmit = () => {
    // TODO: Implement supply/borrow logic
    console.log(`${action} ${amount} of ${selectedToken?.symbol}`);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {action === 'supply' ? 'Supply Assets' : 'Borrow Assets'}
        </Typography>
        
        <Box mb={3}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Asset
          </Typography>
          <Button variant="outlined" fullWidth>
            {selectedToken ? selectedToken.symbol : 'Select Token'}
          </Button>
        </Box>

        <Box mb={3}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Amount
          </Typography>
          <Typography variant="h6">
            {amount}
          </Typography>
        </Box>

        <Button 
          variant="contained" 
          fullWidth 
          onClick={handleSubmit}
          disabled={!selectedToken || !amount}
        >
          {action === 'supply' ? 'Supply' : 'Borrow'}
        </Button>
      </CardContent>
    </Card>
  );
}

export default function LendPage() {
  const { address } = useAccount();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (!address) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Lending & Borrowing
        </Typography>
        <Alert severity="info">
          Please connect your wallet to access lending markets
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Lending & Borrowing
      </Typography>

      <Box display="flex" gap={3}>
        {/* Health Factor */}
        <Box flex={1}>
          <HealthFactorCard />
        </Box>

        {/* Quick Stats */}
        <Box flex={1}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Your Positions
              </Typography>
              <Box display="flex" gap={2}>
                <Box flex={1}>
                  <Typography variant="body2" color="text.secondary">
                    Total Supplied
                  </Typography>
                  <Typography variant="h6">
                    $12,450.00
                  </Typography>
                </Box>
                <Box flex={1}>
                  <Typography variant="body2" color="text.secondary">
                    Total Borrowed
                  </Typography>
                  <Typography variant="h6" color="error.main">
                    $3,200.00
                  </Typography>
                </Box>
                <Box flex={1}>
                  <Typography variant="body2" color="text.secondary">
                    Net APY
                  </Typography>
                  <Typography variant="h6" color="success.main">
                    +2.8%
                  </Typography>
                </Box>
                <Box flex={1}>
                  <Typography variant="body2" color="text.secondary">
                    Available to Borrow
                  </Typography>
                  <Typography variant="h6">
                    $8,250.00
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Main Content */}
      <Box mt={3}>
        <Card>
          {/* Tabs removed as per new_code */}
          {/* TabPanel value={tabValue} index={0} */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            {/* Tabs removed as per new_code */}
            {/* Tab label="Markets" */}
            {/* Tab label="Supply" */}
            {/* Tab label="Borrow" */}
          </Box>

          {/* TabPanel value={tabValue} index={0} */}
          <Box sx={{ p: 3 }}>
            <MarketTable />
          </Box>

          {/* TabPanel value={tabValue} index={1} */}
          <Box sx={{ p: 3 }}>
            <Box display="flex" gap={3}>
              <Box flex={1}>
                <SupplyBorrowForm action="supply" />
              </Box>
              <Box flex={1}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Supply Benefits
                    </Typography>
                    <Box component="ul" sx={{ pl: 2 }}>
                      <Typography component="li" variant="body2">
                        Earn interest on your assets
                      </Typography>
                      <Typography component="li" variant="body2">
                        Use as collateral for borrowing
                      </Typography>
                      <Typography component="li" variant="body2">
                        Withdraw anytime (subject to utilization)
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Box>

          {/* TabPanel value={tabValue} index={2} */}
          <Box sx={{ p: 3 }}>
            <Box display="flex" gap={3}>
              <Box flex={1}>
                <SupplyBorrowForm action="borrow" />
              </Box>
              <Box flex={1}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Borrowing Requirements
                    </Typography>
                    <Box component="ul" sx={{ pl: 2 }}>
                      <Typography component="li" variant="body2">
                        Maintain health factor &gt; 1.0
                      </Typography>
                      <Typography component="li" variant="body2">
                        Provide sufficient collateral
                      </Typography>
                      <Typography component="li" variant="body2">
                        Pay interest on borrowed amount
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
