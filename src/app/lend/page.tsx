'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  TextField,
  Chip,
  LinearProgress,
  Alert,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  AccountBalance,
  TrendingUp,
  Warning,
  CheckCircle,
} from '@mui/icons-material';
import { useAccount } from 'wagmi';
import { MarketRate, TokenData } from '@/types';

// Mock market data
const mockMarkets: (MarketRate & { token: TokenData })[] = [
  {
    asset: '0xA0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8C' as any,
    supplyAPY: 4.2,
    borrowAPR: 6.8,
    utilization: 78.5,
    token: {
      address: '0xA0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8C' as any,
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      price: 1.00,
    },
  },
  {
    asset: '0xB0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8C8C' as any,
    supplyAPY: 2.1,
    borrowAPR: 4.5,
    utilization: 65.2,
    token: {
      address: '0xB0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8C8C' as any,
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: 18,
      price: 3200.00,
    },
  },
  {
    asset: '0xC0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8C8C' as any,
    supplyAPY: 3.8,
    borrowAPR: 5.9,
    utilization: 72.1,
    token: {
      address: '0xC0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8C8C' as any,
      symbol: 'USDT',
      name: 'Tether USD',
      decimals: 6,
      price: 1.00,
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
  const [amount, setAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState(mockMarkets[0]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {action === 'supply' ? 'Supply Assets' : 'Borrow Assets'}
        </Typography>
        
        <Box mb={2}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Asset
          </Typography>
          <Button
            variant="outlined"
            fullWidth
            sx={{ justifyContent: 'space-between', textTransform: 'none' }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body1">{selectedToken.token.symbol}</Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedToken.token.name}
              </Typography>
            </Box>
          </Button>
        </Box>

        <Box mb={2}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Amount
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="0.0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            InputProps={{
              endAdornment: (
                <Button size="small">
                  Max
                </Button>
              ),
            }}
          />
        </Box>

        {action === 'supply' && (
          <Box mb={2}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Supply APY
            </Typography>
            <Typography variant="h6" color="success.main">
              {selectedToken.supplyAPY.toFixed(2)}%
            </Typography>
          </Box>
        )}

        {action === 'borrow' && (
          <Box mb={2}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Borrow APR
            </Typography>
            <Typography variant="h6" color="error.main">
              {selectedToken.borrowAPR.toFixed(2)}%
            </Typography>
          </Box>
        )}

        <Button
          variant="contained"
          fullWidth
          size="large"
          disabled={!amount}
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

      <Grid container spacing={3}>
        {/* Health Factor */}
        <Grid item xs={12} md={4}>
          <HealthFactorCard />
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Your Positions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Total Supplied
                  </Typography>
                  <Typography variant="h6">
                    $12,450.00
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Total Borrowed
                  </Typography>
                  <Typography variant="h6" color="error.main">
                    $3,200.00
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Net APY
                  </Typography>
                  <Typography variant="h6" color="success.main">
                    +2.8%
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Available to Borrow
                  </Typography>
                  <Typography variant="h6">
                    $8,250.00
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12}>
          <Card>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="Markets" />
                <Tab label="Supply" />
                <Tab label="Borrow" />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              <MarketTable />
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <SupplyBorrowForm action="supply" />
                </Grid>
                <Grid item xs={12} md={6}>
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
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <SupplyBorrowForm action="borrow" />
                </Grid>
                <Grid item xs={12} md={6}>
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
                </Grid>
              </Grid>
            </TabPanel>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
