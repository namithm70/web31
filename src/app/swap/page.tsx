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
  LinearProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Tabs,
  Tab,
  Tooltip,
  Alert,
  Switch,
  FormControlLabel,
  Slider,
  Badge,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ListItemIcon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import {
  Refresh,
  Add,
  Remove,
  Download,
  Share,
  Visibility,
  Expand,
  Compress,
  TrendingUp,
  TrendingDown,
  AccountBalance,
  SwapHoriz,
  Agriculture,
  CurrencyExchange,
  Notifications,
  Star,
  StarBorder,
  Info,
  Warning,
  CheckCircle,
  Speed,
  AutoAwesome,
  ShowChart,
  Timeline,
  Bolt,
  LocalFireDepartment,
  WaterDrop,
  ElectricBolt,
  FilterList,
  Sort,
  ViewList,
  ViewModule,
  PieChart,
  BarChart,
  AttachMoney,
  AccountBalanceWallet,
  Security,
  Analytics,
  AutoGraph,
  Psychology,
  Lightbulb,
  Diamond,
  EmojiEvents,
  RocketLaunch,
  TrendingFlat,
  ExpandMore,
  ContentCopy,
  Share as ShareIcon,
  Download as DownloadIcon,
  Upload,
  Visibility as VisibilityIcon,
  VisibilityOff,
  AutoAwesome as AutoAwesomeIcon,
  PsychologyAlt,
  Calculate,
  Timeline as TimelineIcon,
  TrendingUpOutlined,
  TrendingDownOutlined,
  SpeedOutlined,
  SecurityOutlined,
  AnalyticsOutlined,
  AutoGraphOutlined,
  ShowChartOutlined,
  TimelineOutlined,
  BoltOutlined,
  LocalFireDepartmentOutlined,
  WaterDropOutlined,
  ElectricBoltOutlined,
  CompressOutlined,
  ExpandOutlined,
  FilterListOutlined,
  SortOutlined,
  ViewListOutlined,
  ViewModuleOutlined,
  PieChartOutlined,
  BarChartOutlined,
  AttachMoneyOutlined,
  AccountBalanceWalletOutlined,
  CurrencyExchangeOutlined,
  SecurityOutlined as SecurityOutlinedIcon,
  PsychologyOutlined,
  LightbulbOutlined,
  DiamondOutlined,
  EmojiEventsOutlined,
  RocketLaunchOutlined,
  TrendingFlatOutlined,
  ExpandMoreOutlined,
  AddOutlined,
  RemoveOutlined,
  ContentCopyOutlined,
  ShareOutlined,
  DownloadOutlined,
  UploadOutlined,
  VisibilityOutlined,
  VisibilityOffOutlined,
  AutoAwesomeOutlined,
  PsychologyAltOutlined,
  CalculateOutlined,
} from '@mui/icons-material';

// Enhanced mock data for advanced swap features
const tokens = [
  { symbol: 'ETH', name: 'Ethereum', price: 3200, change24h: 2.5, volume: 1500000000 },
  { symbol: 'USDC', name: 'USD Coin', price: 1.00, change24h: 0.1, volume: 850000000 },
  { symbol: 'UNI', name: 'Uniswap', price: 8.50, change24h: -1.2, volume: 420000000 },
  { symbol: 'WBTC', name: 'Wrapped Bitcoin', price: 65000, change24h: 1.8, volume: 320000000 },
  { symbol: 'DAI', name: 'Dai', price: 1.00, change24h: 0.05, volume: 280000000 },
];

const dexAggregators = [
  { name: '1inch', price: 0.9985, gasEstimate: 120000, route: ['Uniswap V3', 'SushiSwap'] },
  { name: 'ParaSwap', price: 0.9982, gasEstimate: 125000, route: ['Uniswap V2', 'Balancer'] },
  { name: '0x Protocol', price: 0.9978, gasEstimate: 118000, route: ['Curve', 'Uniswap V3'] },
];

const limitOrders = [
  {
    id: '1',
    from: 'ETH',
    to: 'USDC',
    amount: 2.5,
    price: 3200,
    type: 'buy',
    status: 'active',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: '2',
    from: 'UNI',
    to: 'ETH',
    amount: 100,
    price: 0.0028,
    type: 'sell',
    status: 'filled',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
  },
];

const priceAlerts = [
  {
    id: '1',
    token: 'ETH',
    targetPrice: 3500,
    condition: 'above',
    status: 'active',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
  },
  {
    id: '2',
    token: 'UNI',
    targetPrice: 7.50,
    condition: 'below',
    status: 'triggered',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
];

const swapHistory = [
  {
    id: '1',
    from: 'ETH',
    to: 'USDC',
    amount: 1.5,
    received: 4800,
    price: 3200,
    gasUsed: 0.002,
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    txHash: '0x1234...5678',
  },
  {
    id: '2',
    from: 'USDC',
    to: 'UNI',
    amount: 1000,
    received: 117.6,
    price: 8.50,
    gasUsed: 0.001,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    txHash: '0x8765...4321',
  },
];

function AdvancedTokenSelector({ selectedToken, onSelect }: { selectedToken: any; onSelect: (token: any) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => setOpen(true)}
        startIcon={<Avatar sx={{ width: 24, height: 24 }}>{selectedToken?.symbol?.charAt(0)}</Avatar>}
        fullWidth
        sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
      >
        {selectedToken ? (
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body1" fontWeight={600}>
              {selectedToken.symbol}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {selectedToken.name}
            </Typography>
          </Box>
        ) : (
          'Select Token'
        )}
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Select Token</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={1}>
            {tokens.map((token) => (
              <ListItem
                key={token.symbol}
                onClick={() => {
                  onSelect(token);
                  setOpen(false);
                }}
                sx={{ cursor: 'pointer' }}
              >
                <ListItemAvatar>
                  <Avatar>{token.symbol.charAt(0)}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="body1" fontWeight={600}>
                        {token.symbol}
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        ${token.price.toLocaleString()}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" color="text.secondary">
                        {token.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color={token.change24h >= 0 ? 'text.primary' : 'text.secondary'}
                      >
                        {token.change24h >= 0 ? '+' : ''}{token.change24h}%
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

function AdvancedCharts() {
  const [timeframe, setTimeframe] = useState('1D');

  return (
    <Card className="animate-fade-in-up stagger-1">
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box display="flex" alignItems="center" gap={1}>
            <ShowChart sx={{ color: 'primary.main' }} />
            <Typography variant="h6" fontWeight={600}>
              Advanced Charts
            </Typography>
          </Box>
          <Box display="flex" gap={1}>
            {['1H', '1D', '1W', '1M'].map((tf) => (
              <Chip
                key={tf}
                label={tf}
                size="small"
                color={timeframe === tf ? 'primary' : 'default'}
                variant={timeframe === tf ? 'filled' : 'outlined'}
                onClick={() => setTimeframe(tf)}
                sx={{ cursor: 'pointer' }}
              />
            ))}
          </Box>
        </Box>

        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3} mb={3}>
          <Box textAlign="center" p={2} bgcolor="grey.50" borderRadius={2}>
            <Typography variant="body2" color="text.secondary">
              Current Price
            </Typography>
            <Typography variant="h5" fontWeight={600} color="text.primary">
              $3,200.50
            </Typography>
          </Box>
          <Box textAlign="center" p={2} bgcolor="grey.100" borderRadius={2}>
            <Typography variant="body2" color="text.secondary">
              24h Change
            </Typography>
            <Typography variant="h5" fontWeight={600} color="text.primary">
              +2.5%
            </Typography>
          </Box>
        </Box>

        <Box display="flex" flexDirection="column" gap={2}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" fontWeight={600}>
              Volume (24h)
            </Typography>
            <Typography variant="body2" color="text.secondary">
              $1.5B
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" fontWeight={600}>
              Market Cap
            </Typography>
            <Typography variant="body2" color="text.secondary">
              $385.2B
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" fontWeight={600}>
              Liquidity
            </Typography>
            <Typography variant="body2" color="text.secondary">
              $2.1B
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

function LimitOrders() {
  const [open, setOpen] = useState(false);

  return (
    <Card className="animate-fade-in-up stagger-2">
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box display="flex" alignItems="center" gap={1}>
            <Timeline sx={{ color: 'primary.main' }} />
            <Typography variant="h6" fontWeight={600}>
              Limit Orders
            </Typography>
          </Box>
          <Button variant="outlined" size="small" onClick={() => setOpen(true)}>
            New Order
          </Button>
        </Box>

        <Box display="flex" flexDirection="column" gap={2}>
          {limitOrders.map((order) => (
            <Box key={order.id} p={2} border="1px solid" borderColor="divider" borderRadius={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    {order.from} → {order.to}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {order.amount} {order.from} @ ${order.price}
                  </Typography>
                </Box>
                <Box textAlign="right">
                  <Chip
                    label={order.status}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                  <Typography variant="caption" color="text.secondary" display="block">
                    {order.timestamp.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Create Limit Order</DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2} mt={1}>
              <FormControl fullWidth>
                <InputLabel>Order Type</InputLabel>
                <Select label="Order Type" defaultValue="buy">
                  <MenuItem value="buy">Buy</MenuItem>
                  <MenuItem value="sell">Sell</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Token</InputLabel>
                <Select label="Token" defaultValue="ETH">
                  {tokens.map((token) => (
                    <MenuItem key={token.symbol} value={token.symbol}>
                      {token.symbol}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="contained">Create Order</Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
}

function PriceAlerts() {
  const [open, setOpen] = useState(false);

  return (
    <Card className="animate-fade-in-up stagger-3">
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box display="flex" alignItems="center" gap={1}>
            <Notifications sx={{ color: 'primary.main' }} />
            <Typography variant="h6" fontWeight={600}>
              Price Alerts
            </Typography>
          </Box>
          <Button variant="outlined" size="small" onClick={() => setOpen(true)}>
            New Alert
          </Button>
        </Box>

        <Box display="flex" flexDirection="column" gap={2}>
          {priceAlerts.map((alert) => (
            <Box key={alert.id} p={2} border="1px solid" borderColor="divider" borderRadius={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    {alert.token} {alert.condition} ${alert.targetPrice}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {alert.timestamp.toLocaleString()}
                  </Typography>
                </Box>
                <Chip
                  label={alert.status}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </Box>
            </Box>
          ))}
        </Box>

        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Create Price Alert</DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2} mt={1}>
              <FormControl fullWidth>
                <InputLabel>Token</InputLabel>
                <Select label="Token" defaultValue="ETH">
                  {tokens.map((token) => (
                    <MenuItem key={token.symbol} value={token.symbol}>
                      {token.symbol}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Condition</InputLabel>
                <Select label="Condition" defaultValue="above">
                  <MenuItem value="above">Above</MenuItem>
                  <MenuItem value="below">Below</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="contained">Create Alert</Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
}

function DexAggregator() {
  return (
    <Card className="animate-fade-in-up stagger-4">
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box display="flex" alignItems="center" gap={1}>
            <AutoGraph sx={{ color: 'primary.main' }} />
            <Typography variant="h6" fontWeight={600}>
              Best Routes
            </Typography>
          </Box>
          <IconButton size="small">
            <Refresh />
          </IconButton>
        </Box>

        <Box display="flex" flexDirection="column" gap={2}>
          {dexAggregators.map((dex, index) => (
            <Box key={index} p={2} border="1px solid" borderColor="divider" borderRadius={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="body2" fontWeight={600}>
                  {dex.name}
                </Typography>
                <Typography variant="body2" fontWeight={600} color="text.primary">
                  ${dex.price.toFixed(4)}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="caption" color="text.secondary">
                  Route: {dex.route.join(' → ')}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Gas: {dex.gasEstimate.toLocaleString()}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

function GasOptimization() {
  const [gasPrice, setGasPrice] = useState(25);

  return (
    <Card className="animate-fade-in-up stagger-5">
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box display="flex" alignItems="center" gap={1}>
            <Speed sx={{ color: 'primary.main' }} />
            <Typography variant="h6" fontWeight={600}>
              Gas Optimization
            </Typography>
          </Box>
          <IconButton size="small">
            <Info />
          </IconButton>
        </Box>

        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3} mb={3}>
          <Box textAlign="center" p={2} bgcolor="grey.50" borderRadius={2}>
            <Typography variant="body2" color="text.secondary">
              Current Gas Price
            </Typography>
            <Typography variant="h5" fontWeight={600} color="text.primary">
              {gasPrice} Gwei
            </Typography>
          </Box>
          <Box textAlign="center" p={2} bgcolor="grey.100" borderRadius={2}>
            <Typography variant="body2" color="text.secondary">
              Estimated Cost
            </Typography>
            <Typography variant="h5" fontWeight={600} color="text.primary">
              $12.50
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" fontWeight={600} mb={2}>
          Gas Price Priority
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          {[
            { label: 'Slow', price: 15, time: '5-10 min' },
            { label: 'Standard', price: 25, time: '2-5 min' },
            { label: 'Fast', price: 40, time: '30 sec' },
            { label: 'Instant', price: 60, time: '10 sec' },
          ].map((option) => (
            <Box
              key={option.label}
              p={2}
              border="1px solid"
              borderColor={gasPrice === option.price ? 'primary.main' : 'divider'}
              borderRadius={2}
              sx={{ cursor: 'pointer' }}
              onClick={() => setGasPrice(option.price)}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    {option.label}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {option.time}
                  </Typography>
                </Box>
                <Typography variant="body2" fontWeight={600}>
                  {option.price} Gwei
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

export default function SwapPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [fromToken, setFromToken] = useState(tokens[0]);
  const [toToken, setToToken] = useState(tokens[1]);
  const [amount, setAmount] = useState('');

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h3" fontWeight={700} mb={1}>
            Token Swap
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Swap tokens with the best rates and lowest fees
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
            startIcon={<SwapHoriz />}
          >
            Quick Swap
          </Button>
        </Box>
      </Box>

      <Box display="grid" gridTemplateColumns={{ xs: '1fr', lg: '2fr 1fr' }} gap={3}>
        <Box>
          <Card className="animate-fade-in-up">
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} mb={3}>
                Swap Tokens
              </Typography>

              <Box display="flex" flexDirection="column" gap={3}>
                <Box>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    From
                  </Typography>
                  <AdvancedTokenSelector selectedToken={fromToken} onSelect={setFromToken} />
                </Box>

                <Box display="flex" justifyContent="center">
                  <IconButton>
                    <SwapHoriz />
                  </IconButton>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    To
                  </Typography>
                  <AdvancedTokenSelector selectedToken={toToken} onSelect={setToToken} />
                </Box>

                <Button variant="contained" fullWidth size="large">
                  Swap Tokens
                </Button>
              </Box>
            </CardContent>
          </Card>

          <DexAggregator />
        </Box>

        <Box>
          <Tabs
            value={selectedTab}
            onChange={(e, newValue) => setSelectedTab(newValue)}
            sx={{ mb: 3 }}
          >
            <Tab label="Charts" />
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
