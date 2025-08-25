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
  SwapHoriz,
  TrendingUp,
  TrendingDown,
  ArrowDownward,
  ArrowUpward,
  Info,
  Warning,
  CheckCircle,
  Timeline,
  ShowChart,
  Speed,
  Lock,
  LockOpen,
  Star,
  LocalFireDepartment,
  EmojiEvents,
  MonetizationOn,
  CreditCard,
  Calculate,
  Security,
  PieChart,
  BarChart,
  AttachMoney,
  AccountBalanceWallet,
  Agriculture,
  Refresh,
  Settings,
  History,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { WalletConnectionTest } from '@/components/wallet-connection-test';

// Mock data
const tokens = [
  { symbol: 'ETH', name: 'Ethereum', price: 2500, change24h: 2.5, icon: '🔵' },
  { symbol: 'USDC', name: 'USD Coin', price: 1.00, change24h: 0.01, icon: '🔵' },
  { symbol: 'USDT', name: 'Tether', price: 1.00, change24h: -0.02, icon: '🟢' },
  { symbol: 'DAI', name: 'Dai', price: 1.00, change24h: 0.00, icon: '🟡' },
  { symbol: 'WBTC', name: 'Wrapped Bitcoin', price: 45000, change24h: 1.8, icon: '🟠' },
  { symbol: 'UNI', name: 'Uniswap', price: 12.50, change24h: -3.2, icon: '🟣' },
];

const liquidityPools = [
  { pair: 'ETH/USDC', liquidity: 15000000, volume24h: 2500000, fee: 0.3, apy: 12.5 },
  { pair: 'USDC/USDT', liquidity: 8000000, volume24h: 1800000, fee: 0.05, apy: 8.2 },
  { pair: 'ETH/DAI', liquidity: 12000000, volume24h: 2100000, fee: 0.3, apy: 11.8 },
  { pair: 'WBTC/ETH', liquidity: 9000000, volume24h: 1600000, fee: 0.3, apy: 9.5 },
];

const swapHistory = [
  { from: 'ETH', to: 'USDC', amount: 2.5, value: 6250, timestamp: '2024-01-15T10:30:00Z', status: 'completed' },
  { from: 'USDC', to: 'DAI', amount: 1000, value: 1000, timestamp: '2024-01-15T09:15:00Z', status: 'completed' },
  { from: 'WBTC', to: 'ETH', amount: 0.1, value: 4500, timestamp: '2024-01-15T08:45:00Z', status: 'pending' },
  { from: 'UNI', to: 'USDT', amount: 50, value: 625, timestamp: '2024-01-15T08:00:00Z', status: 'failed' },
];

interface Token {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  icon: string;
}

interface LiquidityPool {
  pair: string;
  liquidity: number;
  volume24h: number;
  fee: number;
  apy: number;
}

interface SwapHistoryItem {
  from: string;
  to: string;
  amount: number;
  value: number;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
}

function TokenSelector({ 
  label, 
  value, 
  onTokenChange, 
  amount, 
  onAmountChange 
}: { 
  label: string; 
  value: Token | null; 
  onTokenChange: (token: Token) => void; 
  amount: string; 
  onAmountChange: (amount: string) => void; 
}) {
  const [open, setOpen] = useState(false);

  return (
    <Card>
      <CardContent>
        <Typography variant="body2" color="text.secondary" mb={2}>
          {label}
        </Typography>
        
        <Box display="flex" gap={2} mb={2}>
          <Button
            variant="outlined"
            onClick={() => setOpen(true)}
            startIcon={value ? <Avatar sx={{ width: 20, height: 20 }}>{value.icon}</Avatar> : undefined}
            fullWidth
          >
            {value ? `${value.symbol} - $${value.price.toFixed(2)}` : 'Select Token'}
          </Button>
        </Box>

        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          fullWidth
          InputProps={{
            endAdornment: value && (
              <Typography variant="body2" color="text.secondary">
                ≈ ${value.price * parseFloat(amount || '0')}
              </Typography>
            ),
          }}
        />

        {open && (
          <Box mt={2} p={2} bgcolor="grey.50" borderRadius={2}>
            <Typography variant="body2" fontWeight={600} mb={2}>
              Select Token
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              {tokens.map((token) => (
                <Button
                  key={token.symbol}
                  variant="text"
                  onClick={() => {
                    onTokenChange(token);
                    setOpen(false);
                  }}
                  startIcon={<Avatar sx={{ width: 20, height: 20 }}>{token.icon}</Avatar>}
                  sx={{ justifyContent: 'flex-start' }}
                >
                  <Box display="flex" flexDirection="column" alignItems="flex-start">
                    <Typography variant="body2" fontWeight={600}>
                      {token.symbol}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {token.name}
                    </Typography>
                  </Box>
                </Button>
              ))}
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

function PriceChart() {
  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
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

        <Box height={200} display="flex" alignItems="center" justifyContent="center" bgcolor="grey.50" borderRadius={2}>
          <Box textAlign="center">
            <ShowChart sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
            <Typography variant="body2" color="text.secondary">
              Chart data will be displayed here
            </Typography>
          </Box>
        </Box>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography variant="body2" color="text.secondary">
            Volume: $2.5M
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Market Cap: $45.2B
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

function LiquidityPools() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={3}>
          Liquidity Pools
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          {liquidityPools.map((pool) => (
            <Box key={pool.pair} p={2} border="1px solid" borderColor="divider" borderRadius={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="body1" fontWeight={600}>
                  {pool.pair}
                </Typography>
                <Chip label={`${pool.fee}%`} size="small" color="primary" />
              </Box>
              
              <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Liquidity
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    ${(pool.liquidity / 1000000).toFixed(1)}M
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Volume (24h)
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    ${(pool.volume24h / 1000000).toFixed(1)}M
                  </Typography>
                </Box>
              </Box>
              
              <Box mt={1}>
                <Typography variant="body2" color="text.secondary">
                  APY: <span style={{ color: 'green', fontWeight: 600 }}>{pool.apy}%</span>
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

function SwapHistory() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle />;
      case 'pending': return <Warning />;
      case 'failed': return <Info />;
      default: return <Info />;
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={3}>
          Recent Swaps
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          {swapHistory.map((swap, index) => (
            <Box key={index} p={2} border="1px solid" borderColor="divider" borderRadius={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="body1" fontWeight={600}>
                  {swap.from} → {swap.to}
                </Typography>
                <Chip
                  icon={getStatusIcon(swap.status)}
                  label={swap.status}
                  color={getStatusColor(swap.status) as any}
                  size="small"
                />
              </Box>
              
              <Typography variant="body2" color="text.secondary">
                {swap.amount} {swap.from} (${swap.value.toFixed(2)})
              </Typography>
              
              <Typography variant="caption" color="text.secondary">
                {new Date(swap.timestamp).toLocaleString()}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

export default function SwapPage() {
  const [fromToken, setFromToken] = useState<Token | null>(null);
  const [toToken, setToToken] = useState<Token | null>(null);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState(0.5);
  const [showSlippage, setShowSlippage] = useState(false);

  const handleSwap = () => {
    console.log('Swapping:', { fromToken, toToken, fromAmount, toAmount, slippage });
  };

  const estimatedRate = fromToken && toToken ? toToken.price / fromToken.price : 0;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h3" fontWeight={700} mb={1}>
            Swap
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Exchange tokens with the best rates and lowest fees
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
        {/* Main Swap Interface */}
        <Box>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6" fontWeight={600}>
                  Swap Tokens
                </Typography>
                <IconButton onClick={() => setShowSlippage(!showSlippage)}>
                  <Settings />
                </IconButton>
              </Box>

              {showSlippage && (
                <Box mb={3} p={2} bgcolor="grey.50" borderRadius={2}>
                  <Typography variant="body2" fontWeight={600} mb={2}>
                    Slippage Tolerance
                  </Typography>
                  <Slider
                    value={slippage}
                    onChange={(_, value) => setSlippage(value as number)}
                    min={0.1}
                    max={5}
                    step={0.1}
                    marks
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value}%`}
                  />
                </Box>
              )}

              <Box display="flex" flexDirection="column" gap={3}>
                <TokenSelector
                  label="From"
                  value={fromToken}
                  onTokenChange={setFromToken}
                  amount={fromAmount}
                  onAmountChange={setFromAmount}
                />

                <Box display="flex" justifyContent="center">
                  <IconButton>
                    <ArrowDownward />
                  </IconButton>
                </Box>

                <TokenSelector
                  label="To"
                  value={toToken}
                  onTokenChange={setToToken}
                  amount={toAmount}
                  onAmountChange={setToAmount}
                />

                {fromToken && toToken && (
                  <Box p={2} bgcolor="grey.50" borderRadius={2}>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      Exchange Rate
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      1 {fromToken.symbol} = {estimatedRate.toFixed(6)} {toToken.symbol}
                    </Typography>
                  </Box>
                )}

                <Button
                  variant="contained"
                  size="large"
                  startIcon={<SwapHoriz />}
                  onClick={handleSwap}
                  disabled={!fromToken || !toToken || !fromAmount || !toAmount}
                  fullWidth
                >
                  Swap
                </Button>
              </Box>
            </CardContent>
          </Card>

          <Box mt={3}>
            <SwapHistory />
          </Box>
        </Box>

        {/* Sidebar */}
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
