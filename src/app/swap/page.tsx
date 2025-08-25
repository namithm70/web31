'use client';

import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
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
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Refresh, Notifications, ShowChart, AutoGraph, Speed, Info, SwapHoriz } from '@mui/icons-material';

// Fetch real tokens from CoinGecko and map to Token interface
async function fetchMarketTokens(): Promise<Token[]> {
  const res = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
  );
  if (!res.ok) throw new Error('Failed to fetch tokens');
  const data = await res.json();
  return (data || []).map((t: any) => ({
    symbol: String(t.symbol || '').toUpperCase(),
    name: t.name || '',
    price: Number(t.current_price ?? 0),
    change24h: Number(t.price_change_percentage_24h ?? 0),
    volume24h: Number(t.total_volume ?? 0),
    marketCap: Number(t.market_cap ?? 0),
    liquidity: Number(t.total_volume ?? 0),
  }));
}

const dexAggregators = [
  { name: '1inch', price: 0.9985, gasEstimate: 120000, route: ['Uniswap V3', 'SushiSwap'] },
  { name: 'ParaSwap', price: 0.9982, gasEstimate: 125000, route: ['Uniswap V2', 'Balancer'] },
  { name: '0x Protocol', price: 0.9978, gasEstimate: 118000, route: ['Curve', 'Uniswap V3'] },
];

// Removed mock limit orders – show empty state

// Removed mock price alerts – show empty state

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

interface Token {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  liquidity: number;
}

function AdvancedTokenSelector({ tokens, selectedToken, onSelect }: { tokens: Token[]; selectedToken: Token | null; onSelect: (token: Token) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => setOpen(true)}
        startIcon={<Avatar sx={{ width: 24, height: 24 }}>{selectedToken?.symbol?.charAt(0) || '?'}</Avatar>}
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

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Select a token</DialogTitle>
        <DialogContent dividers>
          <List>
            {tokens.map((t) => (
              <ListItemButton key={`${t.symbol}-${t.name}`} onClick={() => { onSelect(t); setOpen(false); }}>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar sx={{ width: 24, height: 24 }}>{t.symbol.charAt(0)}</Avatar>
                      <Typography variant="body2" fontWeight={600}>{t.symbol}</Typography>
                      <Typography variant="caption" color="text.secondary">{t.name}</Typography>
                    </Box>
                  }
                  secondary={
                    <Typography variant="caption" color="text.secondary">
                      ${t.price.toLocaleString()} • 24h: {t.change24h.toFixed(2)}%
                    </Typography>
                  }
                />
              </ListItemButton>
            ))}
          </List>
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
            <ShowChart sx={{ color: 'primary.main' }} />
            <Typography variant="h6" fontWeight={600}>
              Limit Orders
            </Typography>
          </Box>
          <Button variant="outlined" size="small" onClick={() => setOpen(true)}>
            New Order
          </Button>
        </Box>

        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="body2" color="text.secondary">
            No orders yet.
          </Typography>
        </Box>

        {/* Dialog removed as per edit hint */}
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
          <Typography variant="body2" color="text.secondary">
            No alerts yet.
          </Typography>
        </Box>

        {/* Dialog removed as per edit hint */}
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
  const { data: marketTokens, isLoading } = useQuery({
    queryKey: ['marketTokens'],
    queryFn: fetchMarketTokens,
    staleTime: 1000 * 60,
  });
  const tokens = useMemo(() => marketTokens || [], [marketTokens]);
  const [fromToken, setFromToken] = useState<Token | null>(null);
  const [toToken, setToToken] = useState<Token | null>(null);
  useEffect(() => {
    if (tokens.length && (!fromToken || !toToken)) {
      setFromToken(tokens[0]);
      setToToken(tokens[1] || tokens[0]);
    }
  }, [tokens, fromToken, toToken]);
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
                  <AdvancedTokenSelector tokens={tokens} selectedToken={fromToken} onSelect={setFromToken} />
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
                  <AdvancedTokenSelector tokens={tokens} selectedToken={toToken} onSelect={setToToken} />
                </Box>

                <Button variant="contained" fullWidth size="large" disabled={isLoading || !fromToken || !toToken}>
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
