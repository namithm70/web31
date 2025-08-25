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
  Grid,
  LinearProgress,
} from '@mui/material';
import {
  SwapHoriz,
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
  AccountBalance,
} from '@mui/icons-material';
import { WalletConnectionTest } from '@/components/wallet-connection-test';

// Mock data for tokens
const tokens = [
  { symbol: 'ETH', name: 'Ethereum', price: 3200, change24h: 2.5, icon: '🔵' },
  { symbol: 'USDC', name: 'USD Coin', price: 1.00, change24h: 0.1, icon: '🔵' },
  { symbol: 'UNI', name: 'Uniswap', price: 8.50, change24h: -1.2, icon: '🟣' },
  { symbol: 'AAVE', name: 'Aave', price: 95.20, change24h: 3.8, icon: '🔵' },
  { symbol: 'LINK', name: 'Chainlink', price: 15.75, change24h: 1.9, icon: '🔵' },
];

// Mock liquidity pools
const liquidityPools = [
  { pair: 'ETH/USDC', liquidity: 12500000, volume24h: 2500000, fee: 0.3, apy: 12.5 },
  { pair: 'UNI/ETH', liquidity: 8500000, volume24h: 1800000, fee: 0.3, apy: 15.2 },
  { pair: 'AAVE/USDC', liquidity: 3200000, volume24h: 750000, fee: 0.3, apy: 18.7 },
  { pair: 'LINK/ETH', liquidity: 2100000, volume24h: 420000, fee: 0.3, apy: 14.3 },
];

// Mock transaction history
const swapHistory = [
  { id: 1, from: 'ETH', to: 'USDC', amount: 0.5, value: 1600, timestamp: new Date(Date.now() - 1000 * 60 * 30), status: 'completed' },
  { id: 2, from: 'UNI', to: 'ETH', amount: 100, value: 850, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), status: 'completed' },
  { id: 3, from: 'USDC', to: 'AAVE', amount: 500, value: 500, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), status: 'pending' },
];

function TokenSelector({ label, value, onTokenSelect, onAmountChange }: any) {
  const [open, setOpen] = useState(false);

  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      <Typography variant="body2" color="text.secondary" mb={1}>
        {label}
      </Typography>
      <Box display="flex" alignItems="center" gap={2}>
        <Button
          variant="outlined"
          onClick={() => setOpen(!open)}
          sx={{ minWidth: 120, justifyContent: 'space-between' }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <span>{value?.icon || '🔵'}</span>
            <Typography>{value?.symbol || 'Select Token'}</Typography>
          </Box>
          <ArrowDownward sx={{ fontSize: 16 }} />
        </Button>
        <TextField
          fullWidth
          placeholder="0.0"
          type="number"
          onChange={(e) => onAmountChange(e.target.value)}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        />
      </Box>
      {value && (
        <Box display="flex" justifyContent="space-between" mt={1}>
          <Typography variant="body2" color="text.secondary">
            ${value.price}
          </Typography>
          <Typography variant="body2" color={value.change24h >= 0 ? 'success.main' : 'error.main'}>
            {value.change24h >= 0 ? '+' : ''}{value.change24h}%
          </Typography>
        </Box>
      )}
    </Card>
  );
}

function PriceChart() {
  return (
    <Card className="animate-fade-in-up">
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight={600}>
            Price Chart
          </Typography>
          <Box display="flex" gap={1}>
            <Button size="small" variant="outlined">1H</Button>
            <Button size="small" variant="contained">24H</Button>
            <Button size="small" variant="outlined">7D</Button>
            <Button size="small" variant="outlined">1M</Button>
          </Box>
        </Box>
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
              Interactive Chart Coming Soon
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

function LiquidityPools() {
  return (
    <Card className="animate-fade-in-up stagger-1">
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight={600}>
            Liquidity Pools
          </Typography>
          <Button variant="outlined" size="small" startIcon={<WaterDrop />}>
            Add Liquidity
          </Button>
        </Box>
        <List>
          {liquidityPools.map((pool, index) => (
            <ListItem key={index} sx={{ px: 0, py: 1 }}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <WaterDrop />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body1" fontWeight={600}>
                      {pool.pair}
                    </Typography>
                    <Chip label={`${pool.fee}%`} size="small" color="primary" />
                  </Box>
                }
                secondary={
                  <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Liquidity: ${(pool.liquidity / 1000000).toFixed(1)}M
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Volume 24h: ${(pool.volume24h / 1000000).toFixed(1)}M
                      </Typography>
                    </Box>
                    <Box textAlign="right">
                      <Typography variant="body2" color="success.main" fontWeight={600}>
                        {pool.apy}% APY
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

function SwapHistory() {
  return (
    <Card className="animate-fade-in-up stagger-2">
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={3}>
          Recent Swaps
        </Typography>
        <List>
          {swapHistory.map((swap) => (
            <ListItem key={swap.id} sx={{ px: 0, py: 1 }}>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: swap.status === 'completed' ? 'success.main' : 'warning.main',
                  }}
                >
                  {swap.status === 'completed' ? <CheckCircle /> : <Warning />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body1" fontWeight={600}>
                      {swap.from} → {swap.to}
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      ${swap.value.toLocaleString()}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" color="text.secondary">
                      {swap.amount} {swap.from}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {swap.timestamp.toLocaleTimeString()}
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

export default function SwapPage() {
  const [fromToken, setFromToken] = useState(tokens[0]);
  const [toToken, setToToken] = useState(tokens[1]);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState(0.5);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleSwap = () => {
    // Mock swap functionality
    console.log('Swapping', fromAmount, fromToken.symbol, 'for', toAmount, toToken.symbol);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h3" fontWeight={700} mb={1}>
            Swap Tokens
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Trade tokens instantly with the best rates
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
        {/* Swap Interface */}
        <Box>
          <Card className="animate-fade-in-up">
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" fontWeight={600} mb={3}>
                Swap
              </Typography>

              <Box display="flex" flexDirection="column" gap={2} mb={3}>
                <TokenSelector
                  label="From"
                  value={fromToken}
                  onTokenSelect={setFromToken}
                  onAmountChange={setFromAmount}
                />
                
                <Box display="flex" justifyContent="center">
                  <IconButton
                    sx={{
                      border: '2px solid',
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      '&:hover': {
                        transform: 'rotate(180deg)',
                        transition: 'transform 0.3s ease',
                      },
                    }}
                  >
                    <ArrowDownward />
                  </IconButton>
                </Box>

                <TokenSelector
                  label="To"
                  value={toToken}
                  onTokenSelect={setToToken}
                  onAmountChange={setToAmount}
                />
              </Box>

              {/* Swap Details */}
              <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 2, mb: 3 }}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" color="text.secondary">
                    Rate
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    1 {fromToken?.symbol} = {(toToken?.price / fromToken?.price).toFixed(4)} {toToken?.symbol}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" color="text.secondary">
                    Slippage
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {slippage}%
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Network Fee
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    ~$5.20
                  </Typography>
                </Box>
              </Box>

              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleSwap}
                startIcon={<SwapHoriz />}
                sx={{ py: 1.5 }}
              >
                Swap {fromToken?.symbol} for {toToken?.symbol}
              </Button>
            </CardContent>
          </Card>

          {/* Swap History */}
          <Box mt={3}>
            <SwapHistory />
          </Box>
        </Box>

        {/* Charts and Analytics */}
        <Box>
          <PriceChart />
          
          <Box mt={3}>
            <LiquidityPools />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
