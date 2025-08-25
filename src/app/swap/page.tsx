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
} from '@mui/material';
import {
  SwapHoriz,
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
  Agriculture,
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
} from '@mui/icons-material';
import { WalletConnectionTest } from '@/components/wallet-connection-test';

// Enhanced mock data with advanced swap features
const tokens = [
  { symbol: 'ETH', name: 'Ethereum', price: 3200, change24h: 2.5, icon: '🔵', volume24h: 1500000000 },
  { symbol: 'USDC', name: 'USD Coin', price: 1.00, change24h: 0.0, icon: '🔵', volume24h: 2500000000 },
  { symbol: 'UNI', name: 'Uniswap', price: 8.50, change24h: -1.2, icon: '🟣', volume24h: 850000000 },
  { symbol: 'AAVE', name: 'Aave', price: 95.20, change24h: 3.8, icon: '🔵', volume24h: 420000000 },
  { symbol: 'WBTC', name: 'Wrapped Bitcoin', price: 45000, change24h: 1.8, icon: '🟠', volume24h: 1800000000 },
];

const dexAggregators = [
  { name: '1inch', bestPrice: 3200.50, gasEstimate: 45, liquidity: 'high', route: 'Uniswap V3 → SushiSwap' },
  { name: 'ParaSwap', bestPrice: 3200.25, gasEstimate: 52, liquidity: 'medium', route: 'Uniswap V3 → Balancer' },
  { name: '0x Protocol', bestPrice: 3200.75, gasEstimate: 38, liquidity: 'high', route: 'Uniswap V3 → Curve' },
];

const limitOrders = [
  { id: 1, from: 'ETH', to: 'USDC', amount: 0.5, price: 3250, status: 'pending', timestamp: '2024-01-15T10:30:00Z' },
  { id: 2, from: 'UNI', to: 'ETH', amount: 100, price: 8.75, status: 'filled', timestamp: '2024-01-15T09:15:00Z' },
  { id: 3, from: 'USDC', to: 'AAVE', amount: 1000, price: 94.50, status: 'cancelled', timestamp: '2024-01-15T08:45:00Z' },
];

const priceAlerts = [
  { id: 1, token: 'ETH', targetPrice: 3500, direction: 'above', status: 'active' },
  { id: 2, token: 'UNI', targetPrice: 7.50, direction: 'below', status: 'triggered' },
  { id: 3, token: 'AAVE', targetPrice: 100, direction: 'above', status: 'active' },
];

const swapHistory = [
  { id: 1, from: 'ETH', to: 'USDC', amount: 0.5, price: 3200, gasUsed: 45, timestamp: '2024-01-15T10:30:00Z', status: 'completed' },
  { id: 2, from: 'UNI', to: 'ETH', amount: 50, price: 8.50, gasUsed: 52, timestamp: '2024-01-15T09:15:00Z', status: 'completed' },
  { id: 3, from: 'USDC', to: 'AAVE', amount: 500, price: 95.20, gasUsed: 38, timestamp: '2024-01-15T08:45:00Z', status: 'pending' },
];

interface Token {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  icon: string;
  volume24h: number;
}

function AdvancedTokenSelector({ title, selectedToken, onTokenSelect, amount, onAmountChange }: {
  title: string;
  selectedToken: Token | null;
  onTokenSelect: (token: Token) => void;
  amount: string;
  onAmountChange: (amount: string) => void;
}) {
  const [showTokenList, setShowTokenList] = useState(false);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={2}>
          {title}
        </Typography>
        
        <Box display="flex" gap={2} mb={2}>
          <Button
            variant="outlined"
            onClick={() => setShowTokenList(true)}
            startIcon={selectedToken ? <Avatar sx={{ width: 20, height: 20, fontSize: 12 }}>{selectedToken.icon}</Avatar> : <Add />}
            sx={{ minWidth: 120 }}
          >
            {selectedToken ? selectedToken.symbol : 'Select Token'}
          </Button>
          <TextField
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            fullWidth
            size="small"
          />
        </Box>

        {selectedToken && (
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="body2" color="text.secondary">
                Price: ${selectedToken.price.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                24h: {selectedToken.change24h >= 0 ? '+' : ''}{selectedToken.change24h}%
              </Typography>
            </Box>
            <Box textAlign="right">
              <Typography variant="body2" fontWeight={600}>
                ≈ ${selectedToken.price * parseFloat(amount || '0')}
              </Typography>
            </Box>
          </Box>
        )}

        <Dialog open={showTokenList} onClose={() => setShowTokenList(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Select Token</DialogTitle>
          <DialogContent>
            <List>
              {tokens.map((token) => (
                <ListItem
                  key={token.symbol}
                  onClick={() => {
                    onTokenSelect(token);
                    setShowTokenList(false);
                  }}
                  sx={{ cursor: 'pointer' }}
                >
                  <ListItemAvatar>
                    <Avatar>{token.icon}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={token.name}
                    secondary={`$${token.price.toLocaleString()} • ${token.change24h >= 0 ? '+' : ''}${token.change24h}%`}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {token.symbol}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

function DexAggregator() {
  const [selectedDex, setSelectedDex] = useState(0);

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box display="flex" alignItems="center" gap={1}>
            <AutoGraph sx={{ color: 'primary.main' }} />
            <Typography variant="h6" fontWeight={600}>
              DEX Aggregator
            </Typography>
          </Box>
          <IconButton size="small">
            <Refresh />
          </IconButton>
        </Box>

        <Box display="flex" flexDirection="column" gap={2}>
          {dexAggregators.map((dex, index) => (
            <Box
              key={index}
              p={2}
              border="1px solid"
              borderColor={selectedDex === index ? 'primary.main' : 'divider'}
              borderRadius={2}
              sx={{
                cursor: 'pointer',
                bgcolor: selectedDex === index ? 'grey.50' : 'transparent',
                '&:hover': { bgcolor: 'grey.50' },
              }}
              onClick={() => setSelectedDex(index)}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="body1" fontWeight={600}>
                  {dex.name}
                </Typography>
                <Chip
                  label={`$${dex.bestPrice.toFixed(2)}`}
                  color="primary"
                  size="small"
                  variant="outlined"
                />
              </Box>
              
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Route: {dex.route}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Gas: {dex.gasEstimate} GWEI
                  </Typography>
                </Box>
                <Chip
                  label={dex.liquidity}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </Box>
            </Box>
          ))}
        </Box>

        <Box mt={3}>
          <Button variant="contained" fullWidth startIcon={<Bolt />}>
            Execute Best Route
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

function AdvancedCharts() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box display="flex" alignItems="center" gap={1}>
            <ShowChart sx={{ color: 'primary.main' }} />
            <Typography variant="h6" fontWeight={600}>
              Price Chart
            </Typography>
          </Box>
          <Box display="flex" gap={1}>
            {['1H', '1D', '1W', '1M'].map((timeframe) => (
              <Button
                key={timeframe}
                variant={selectedTimeframe === timeframe ? 'contained' : 'outlined'}
                size="small"
                onClick={() => setSelectedTimeframe(timeframe)}
              >
                {timeframe}
              </Button>
            ))}
          </Box>
        </Box>

        <Box height={300} display="flex" alignItems="center" justifyContent="center" bgcolor="grey.50" borderRadius={2}>
          <Box textAlign="center">
            <ShowChart sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
            <Typography variant="body2" color="text.secondary">
              Interactive price chart with {selectedTimeframe} timeframe
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Includes volume, indicators, and drawing tools
            </Typography>
          </Box>
        </Box>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography variant="body2" color="text.secondary">
            High: $3,250.50
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Low: $3,180.25
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Vol: $1.5B
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

function LimitOrders() {
  const [showCreateOrder, setShowCreateOrder] = useState(false);

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box display="flex" alignItems="center" gap={1}>
            <Timeline sx={{ color: 'primary.main' }} />
            <Typography variant="h6" fontWeight={600}>
              Limit Orders
            </Typography>
          </Box>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Add />}
            onClick={() => setShowCreateOrder(true)}
          >
            New Order
          </Button>
        </Box>

        <Box display="flex" flexDirection="column" gap={2}>
          {limitOrders.map((order) => (
            <Box key={order.id} p={2} border="1px solid" borderColor="divider" borderRadius={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="body1" fontWeight={600}>
                  {order.from} → {order.to}
                </Typography>
                <Chip
                  label={order.status}
                  color="primary"
                  size="small"
                  variant="outlined"
                />
              </Box>
              
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Amount: {order.amount} {order.from}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: ${order.price}
                  </Typography>
                </Box>
                <Box textAlign="right">
                  <Typography variant="caption" color="text.secondary">
                    {new Date(order.timestamp).toLocaleString()}
                  </Typography>
                  {order.status === 'pending' && (
                    <Button variant="outlined" size="small" sx={{ ml: 1 }}>
                      Cancel
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        <Dialog open={showCreateOrder} onClose={() => setShowCreateOrder(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Create Limit Order</DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2} mt={1}>
              <TextField label="From Token" fullWidth />
              <TextField label="To Token" fullWidth />
              <TextField label="Amount" type="number" fullWidth />
              <TextField label="Price" type="number" fullWidth />
              <TextField label="Expiry" type="datetime-local" fullWidth />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowCreateOrder(false)}>Cancel</Button>
            <Button variant="contained" onClick={() => setShowCreateOrder(false)}>
              Create Order
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
}

function PriceAlerts() {
  const [showCreateAlert, setShowCreateAlert] = useState(false);

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box display="flex" alignItems="center" gap={1}>
            <Notifications sx={{ color: 'primary.main' }} />
            <Typography variant="h6" fontWeight={600}>
              Price Alerts
            </Typography>
          </Box>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Add />}
            onClick={() => setShowCreateAlert(true)}
          >
            New Alert
          </Button>
        </Box>

        <Box display="flex" flexDirection="column" gap={2}>
          {priceAlerts.map((alert) => (
            <Box key={alert.id} p={2} border="1px solid" borderColor="divider" borderRadius={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="body1" fontWeight={600}>
                  {alert.token} {alert.direction} ${alert.targetPrice}
                </Typography>
                <Chip
                  label={alert.status}
                  color={alert.status === 'triggered' ? 'primary' : 'default'}
                  size="small"
                  variant="outlined"
                />
              </Box>
              
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  Target: ${alert.targetPrice}
                </Typography>
                <IconButton size="small">
                  <Remove />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>

        <Dialog open={showCreateAlert} onClose={() => setShowCreateAlert(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Create Price Alert</DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2} mt={1}>
              <TextField label="Token" fullWidth />
              <TextField label="Target Price" type="number" fullWidth />
              <FormControl fullWidth>
                <InputLabel>Direction</InputLabel>
                <Select label="Direction">
                  <MenuItem value="above">Above</MenuItem>
                  <MenuItem value="below">Below</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowCreateAlert(false)}>Cancel</Button>
            <Button variant="contained" onClick={() => setShowCreateAlert(false)}>
              Create Alert
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
}

function GasOptimization() {
  const [gasPrice, setGasPrice] = useState(45);
  const [priority, setPriority] = useState('medium');

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box display="flex" alignItems="center" gap={1}>
            <Speed sx={{ color: 'primary.main' }} />
            <Typography variant="h6" fontWeight={600}>
              Gas Optimization
            </Typography>
          </Box>
          <IconButton size="small">
            <Refresh />
          </IconButton>
        </Box>

        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3} mb={3}>
          <Box textAlign="center" p={2} bgcolor="grey.50" borderRadius={2}>
            <Typography variant="body2" color="text.secondary">
              Current Gas Price
            </Typography>
            <Typography variant="h5" fontWeight={600} color="text.primary">
              {gasPrice} GWEI
            </Typography>
          </Box>
          <Box textAlign="center" p={2} bgcolor="grey.100" borderRadius={2}>
            <Typography variant="body2" color="text.secondary">
              Estimated Cost
            </Typography>
            <Typography variant="h5" fontWeight={600} color="text.primary">
              ${(gasPrice * 0.001).toFixed(2)}
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" fontWeight={600} mb={2}>
          Priority Level
        </Typography>
        <Box display="flex" gap={1} mb={3}>
          {['low', 'medium', 'high'].map((level) => (
            <Button
              key={level}
              variant={priority === level ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setPriority(level)}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </Button>
          ))}
        </Box>

        <Typography variant="body2" fontWeight={600} mb={2}>
          Gas Price (GWEI)
        </Typography>
        <Slider
          value={gasPrice}
          onChange={(e, value) => setGasPrice(value as number)}
          min={20}
          max={100}
          step={1}
          valueLabelDisplay="auto"
          sx={{ mb: 3 }}
        />

        <Box display="flex" flexDirection="column" gap={2}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="text.secondary">
              Low Priority
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              35 GWEI
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="text.secondary">
              Medium Priority
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              45 GWEI
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="text.secondary">
              High Priority
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              65 GWEI
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function SwapPage() {
  const [fromToken, setFromToken] = useState<Token | null>(tokens[0]);
  const [toToken, setToToken] = useState<Token | null>(tokens[1]);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [slippage, setSlippage] = useState(0.5);

  const handleSwap = () => {
    // Swap logic here
    console.log('Swapping', fromAmount, fromToken?.symbol, 'for', toAmount, toToken?.symbol);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h3" fontWeight={700} mb={1}>
            Swap
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Trade tokens with advanced features and optimal routing
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
          <Box display="flex" flexDirection="column" gap={3} mb={3}>
            <AdvancedTokenSelector
              title="From"
              selectedToken={fromToken}
              onTokenSelect={setFromToken}
              amount={fromAmount}
              onAmountChange={setFromAmount}
            />
            
            <Box display="flex" justifyContent="center">
              <IconButton sx={{ bgcolor: 'grey.100' }}>
                <SwapHoriz />
              </IconButton>
            </Box>
            
            <AdvancedTokenSelector
              title="To"
              selectedToken={toToken}
              onTokenSelect={setToToken}
              amount={toAmount}
              onAmountChange={setToAmount}
            />
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="body2" color="text.secondary">
              Slippage Tolerance
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {slippage}%
            </Typography>
          </Box>
          
          <Slider
            value={slippage}
            onChange={(e, value) => setSlippage(value as number)}
            min={0.1}
            max={5}
            step={0.1}
            valueLabelDisplay="auto"
            sx={{ mb: 3 }}
          />

          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleSwap}
            startIcon={<SwapHoriz />}
            sx={{ mb: 3 }}
          >
            Swap
          </Button>

          <DexAggregator />
        </Box>

        {/* Advanced Features Sidebar */}
        <Box>
          <Tabs
            value={selectedTab}
            onChange={(e, newValue) => setSelectedTab(newValue)}
            sx={{ mb: 3 }}
          >
            <Tab label="Chart" />
            <Tab label="Orders" />
            <Tab label="Alerts" />
            <Tab label="Gas" />
          </Tabs>

          {selectedTab === 0 && <AdvancedCharts />}
          {selectedTab === 1 && <LimitOrders />}
          {selectedTab === 2 && <PriceAlerts />}
          {selectedTab === 3 && <GasOptimization />}
        </Box>
      </Box>
    </Box>
  );
}
