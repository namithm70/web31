'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  IconButton,
  Chip,
  Alert,
  Skeleton,
  Divider,
  Slider,
  Switch,
  FormControlLabel,
  Tooltip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Dialog,
  DialogTitle,
  DialogContent,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  SwapHoriz,
  Settings,
  TrendingUp,
  Info,
  ExpandMore,
  Refresh,
  History,
  Favorite,
  FavoriteBorder,
  CompareArrows,
  ShowChart,
  Warning,
  CheckCircle,
  LocalGasStation,
  KeyboardArrowDown,
  Search,
  Close,
} from '@mui/icons-material';
import { useAccount, useBalance } from 'wagmi';
import { useAppStore } from '@/store';
import { TokenData, Quote } from '@/types';

// Enhanced mock token data
const mockTokens: TokenData[] = [
  {
    address: '0xA0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8C8C' as `0x${string}`,
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    price: 1.00,
    logoURI: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png',
  },
  {
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' as `0x${string}`,
    symbol: 'WETH',
    name: 'Wrapped Ether',
    decimals: 18,
    price: 3500.00,
    logoURI: 'https://assets.coingecko.com/coins/images/2518/small/weth.png',
  },
  {
    address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599' as `0x${string}`,
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    decimals: 8,
    price: 45000.00,
    logoURI: 'https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png',
  },
  {
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F' as `0x${string}`,
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    decimals: 18,
    price: 1.00,
    logoURI: 'https://assets.coingecko.com/coins/images/9956/small/4943.png',
  },
  {
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7' as `0x${string}`,
    symbol: 'USDT',
    name: 'Tether USD',
    decimals: 6,
    price: 1.00,
    logoURI: 'https://assets.coingecko.com/coins/images/325/small/Tether.png',
  },
  {
    address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984' as `0x${string}`,
    symbol: 'UNI',
    name: 'Uniswap',
    decimals: 18,
    price: 12.50,
    logoURI: 'https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png',
  },
];

// Mock DEX protocols
const dexProtocols = [
  { name: 'Uniswap V3', logo: '🦄', efficiency: 95, liquidity: 'High', color: '#FF007A' },
  { name: 'SushiSwap', logo: '🍣', efficiency: 88, liquidity: 'Medium', color: '#FA52A0' },
  { name: 'Balancer', logo: '⚖️', efficiency: 92, liquidity: 'High', color: '#1E1E1E' },
  { name: 'Curve', logo: '📈', efficiency: 98, liquidity: 'Very High', color: '#3465A4' },
];

// Mock swap history
const swapHistory = [
  { from: 'ETH', to: 'USDC', amount: '2.5', date: '2 hours ago', status: 'completed' },
  { from: 'USDT', to: 'DAI', amount: '1000', date: '1 day ago', status: 'completed' },
  { from: 'WBTC', to: 'ETH', amount: '0.1', date: '3 days ago', status: 'completed' },
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
      id={`swap-tabpanel-${index}`}
      aria-labelledby={`swap-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function TokenSelector({ token, onSelect }: { token: TokenData; onSelect: () => void }) {
  return (
    <Paper
      onClick={onSelect}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2,
        cursor: 'pointer',
        background: 'rgba(139, 92, 246, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        borderRadius: 8,
        '&:hover': {
          background: 'rgba(139, 92, 246, 0.15)',
          border: '1px solid rgba(139, 92, 246, 0.5)',
        },
        transition: 'all 0.3s ease',
      }}
    >
      <Avatar src={token.logoURI} alt={token.symbol}>
        {token.symbol.charAt(0)}
      </Avatar>
      <Box>
        <Typography variant="body1" fontWeight={600}>
          {token.symbol}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {token.name}
        </Typography>
      </Box>
      <Box sx={{ ml: 'auto' }}>
        <Typography variant="body2" color="text.secondary">
          ${token.price?.toFixed(2)}
        </Typography>
      </Box>
    </Paper>
  );
}

function AdvancedSettings() {
  const { slippage, setSlippage, gasMode, setGasMode } = useAppStore();

  return (
    <Accordion 
      sx={{ 
        background: 'transparent',
        boxShadow: 'none',
        '&:before': { display: 'none' },
        '& .MuiAccordionSummary-root': {
          background: 'rgba(139, 92, 246, 0.15)',
          borderRadius: 8,
          border: '1px solid rgba(139, 92, 246, 0.3)',
          backdropFilter: 'blur(20px)',
        }
      }}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Box display="flex" alignItems="center" gap={1.5}>
          <Settings fontSize="small" sx={{ color: '#8B5CF6' }} />
          <Typography variant="subtitle1" fontWeight={600}>
            Advanced Settings
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 3 }}>
        <Box display="flex" flexDirection="column" gap={4}>
          {/* Slippage Tolerance */}
          <Box>
            <Typography variant="body1" color="text.primary" fontWeight={600} gutterBottom>
              Slippage Tolerance
            </Typography>
            <Slider
              value={slippage}
              onChange={(_, value) => setSlippage(value as number)}
              min={0.1}
              max={5}
              step={0.1}
              marks={[
                { value: 0.5, label: '0.5%' },
                { value: 1, label: '1%' },
                { value: 2, label: '2%' },
                { value: 5, label: '5%' },
              ]}
              sx={{
                '& .MuiSlider-thumb': {
                  backgroundColor: '#8B5CF6',
                  width: 20,
                  height: 20,
                  boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
                  '&:hover': {
                    boxShadow: '0 6px 16px rgba(139, 92, 246, 0.4)',
                  }
                },
                '& .MuiSlider-track': {
                  backgroundColor: '#8B5CF6',
                  height: 6,
                  borderRadius: 3,
                },
                '& .MuiSlider-rail': {
                  backgroundColor: 'rgba(139, 92, 246, 0.1)',
                  height: 6,
                  borderRadius: 3,
                },
                '& .MuiSlider-mark': {
                  backgroundColor: 'rgba(139, 92, 246, 0.3)',
                },
                '& .MuiSlider-markLabel': {
                  color: 'text.secondary',
                  fontWeight: 500,
                }
              }}
            />
            <Typography variant="body2" color="text.secondary" fontWeight={500} mt={1}>
              Current: {slippage}%
            </Typography>
          </Box>

          {/* Gas Mode */}
          <Box>
            <Typography variant="body1" color="text.primary" fontWeight={600} gutterBottom>
              Gas Mode
            </Typography>
            <Box display="flex" gap={1.5}>
              {(['safe', 'average', 'fast'] as const).map((mode) => (
                <Button
                  key={mode}
                  variant={gasMode === mode ? 'contained' : 'outlined'}
                  size="medium"
                  onClick={() => setGasMode(mode)}
                  sx={{ 
                    textTransform: 'capitalize',
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    fontWeight: 600,
                    ...(gasMode === mode ? {
                      background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                      boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #1565c0, #1976d2)',
                        boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
                      }
                    } : {
                      border: '2px solid rgba(25, 118, 210, 0.3)',
                      color: '#1976d2',
                      '&:hover': {
                        border: '2px solid rgba(25, 118, 210, 0.5)',
                        background: 'rgba(25, 118, 210, 0.04)',
                      }
                    })
                  }}
                >
                  {mode}
                </Button>
              ))}
            </Box>
          </Box>

          {/* Additional Options */}
          <Box>
            <Typography variant="body1" color="text.primary" fontWeight={600} gutterBottom>
              Preferences
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <FormControlLabel
                control={
                  <Switch 
                    defaultChecked 
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#1976d2',
                        '&:hover': {
                          backgroundColor: 'rgba(25, 118, 210, 0.08)',
                        },
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#1976d2',
                      },
                    }}
                  />
                }
                label={
                  <Typography variant="body2" fontWeight={500}>
                    Auto-approve tokens
                  </Typography>
                }
              />
              <FormControlLabel
                control={
                  <Switch 
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#1976d2',
                        '&:hover': {
                          backgroundColor: 'rgba(25, 118, 210, 0.08)',
                        },
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#1976d2',
                      },
                    }}
                  />
                }
                label={
                  <Typography variant="body2" fontWeight={500}>
                    Show transaction details
                  </Typography>
                }
              />
              <FormControlLabel
                control={
                  <Switch 
                    defaultChecked
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#1976d2',
                        '&:hover': {
                          backgroundColor: 'rgba(25, 118, 210, 0.08)',
                        },
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#1976d2',
                      },
                    }}
                  />
                }
                label={
                  <Typography variant="body2" fontWeight={500}>
                    Enable price alerts
                  </Typography>
                }
              />
            </Box>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

function RouteOptimizer({ quote }: { quote: Quote | null }) {
  if (!quote) return null;

  return (
    <Card sx={{ 
      mb: 3,
      background: 'rgba(139, 92, 246, 0.15)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(139, 92, 246, 0.3)',
      borderRadius: 8,
    }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom fontWeight={700}>
          <CompareArrows sx={{ mr: 1.5, verticalAlign: 'middle', color: '#8B5CF6' }} />
          Route Optimization
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2 }}>
          {dexProtocols.map((protocol, index) => (
            <Box key={protocol.name}>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  border: '1px solid rgba(139, 92, 246, 0.1)',
                  borderRadius: 8,
                  textAlign: 'center',
                  background: index === 0 
                    ? 'rgba(139, 92, 246, 0.1)'
                    : 'rgba(139, 92, 246, 0.05)',
                  backdropFilter: 'blur(20px)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 30px rgba(139, 92, 246, 0.1)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                  }
                }}
              >
                <Typography variant="h3" sx={{ mb: 1.5 }}>
                  {protocol.logo}
                </Typography>
                <Typography variant="h6" fontWeight={700} color="text.primary" mb={0.5}>
                  {protocol.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" fontWeight={500} mb={1}>
                  {protocol.efficiency}% efficiency
                </Typography>
                <Chip
                  label={protocol.liquidity}
                  size="small"
                  color={protocol.liquidity === 'Very High' ? 'success' : 'default'}
                  sx={{ 
                    fontWeight: 600,
                    background: protocol.liquidity === 'Very High' 
                      ? 'linear-gradient(135deg, #8B5CF6, #A78BFA)'
                      : 'rgba(139, 92, 246, 0.1)',
                    color: protocol.liquidity === 'Very High' ? 'white' : '#8B5CF6',
                  }}
                />
              </Paper>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

function SwapHistory() {
  return (
    <Card sx={{
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(0, 0, 0, 0.08)',
      borderRadius: 4,
    }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom fontWeight={700}>
          <History sx={{ mr: 1.5, verticalAlign: 'middle', color: '#1976d2' }} />
          Recent Swaps
        </Typography>
        
        <List sx={{ p: 0 }}>
          {swapHistory.map((swap, index) => (
            <ListItem key={index} sx={{ px: 0, py: 1.5 }}>
              <ListItemAvatar>
                <Avatar sx={{ 
                  bgcolor: 'rgba(25, 118, 210, 0.1)',
                  border: '2px solid rgba(25, 118, 210, 0.2)',
                }}>
                  <SwapHoriz sx={{ color: '#1976d2' }} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body1" fontWeight={600}>
                    {swap.amount} {swap.from} → {swap.to}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary" fontWeight={500}>
                    {swap.date}
                  </Typography>
                }
              />
              <Chip
                label={swap.status}
                size="small"
                color="success"
                icon={<CheckCircle />}
                sx={{ 
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #4CAF50, #66BB6A)',
                  color: 'white',
                }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

function SwapCard() {
  const { address } = useAccount();
  const [tokenIn, setTokenIn] = useState<TokenData>(mockTokens[0]);
  const [tokenOut, setTokenOut] = useState<TokenData>(mockTokens[1]);
  const [amountIn, setAmountIn] = useState('');
  const [amountOut, setAmountOut] = useState('');
  const [slippage, setSlippage] = useState(0.5);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const { data: balanceIn } = useBalance({
    address,
    token: tokenIn?.address,
  });

  const handleSwap = () => {
    // TODO: Implement swap logic
    console.log('Swapping', amountIn, tokenIn.symbol, 'for', amountOut, tokenOut.symbol);
  };

  const handleSwitchTokens = () => {
    const temp = tokenIn;
    setTokenIn(tokenOut);
    setTokenOut(temp);
  };

  return (
    <Card sx={{
      background: 'rgba(139, 92, 246, 0.15)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(139, 92, 246, 0.3)',
      borderRadius: 8,
      boxShadow: '0 8px 32px rgba(139, 92, 246, 0.15)',
      p: 4,
      maxWidth: 600,
      mx: 'auto',
    }}>
      <CardContent>
        <Typography variant="h5" gutterBottom textAlign="center" fontWeight={700}>
          Swap Tokens
        </Typography>

        {/* Token Input */}
        <Box mb={3}>
          <Typography variant="body2" color="text.secondary" mb={1}>
            You Pay
          </Typography>
          <Box display="flex" alignItems="center" gap={2} p={2} sx={{
            background: 'rgba(139, 92, 246, 0.1)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: 8,
          }}>
            <Avatar src={tokenIn?.logoURI} alt={tokenIn?.symbol}>
              {tokenIn?.symbol?.charAt(0)}
            </Avatar>
            <Box flex={1}>
              <Typography variant="body1" fontWeight={600}>
                {tokenIn?.symbol}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Balance: {balanceIn?.formatted || '0'}
              </Typography>
            </Box>
            <TextField
              value={amountIn}
              onChange={(e) => setAmountIn(e.target.value)}
              placeholder="0.0"
              variant="standard"
              sx={{ width: 120 }}
            />
          </Box>
        </Box>

        {/* Switch Button */}
        <Box display="flex" justifyContent="center" mb={3}>
          <IconButton onClick={handleSwitchTokens} sx={{
            background: 'rgba(139, 92, 246, 0.1)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            '&:hover': {
              background: 'rgba(139, 92, 246, 0.2)',
            }
          }}>
            <CompareArrows />
          </IconButton>
        </Box>

        {/* Token Output */}
        <Box mb={3}>
          <Typography variant="body2" color="text.secondary" mb={1}>
            You Receive
          </Typography>
          <Box display="flex" alignItems="center" gap={2} p={2} sx={{
            background: 'rgba(139, 92, 246, 0.1)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: 8,
          }}>
            <Avatar src={tokenOut?.logoURI} alt={tokenOut?.symbol}>
              {tokenOut?.symbol?.charAt(0)}
            </Avatar>
            <Box flex={1}>
              <Typography variant="body1" fontWeight={600}>
                {tokenOut?.symbol}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {tokenOut?.name}
              </Typography>
            </Box>
            <TextField
              value={amountOut}
              onChange={(e) => setAmountOut(e.target.value)}
              placeholder="0.0"
              variant="standard"
              sx={{ width: 120 }}
            />
          </Box>
        </Box>

        {/* Swap Button */}
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={handleSwap}
          disabled={!amountIn || !amountOut}
          sx={{ mb: 2 }}
        >
          Swap
        </Button>

        {/* Advanced Settings */}
        <Accordion expanded={showAdvanced} onChange={() => setShowAdvanced(!showAdvanced)}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="body2">Advanced Settings</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <Typography variant="body2" color="text.secondary" mb={1}>
                Slippage Tolerance: {slippage}%
              </Typography>
              <Slider
                value={slippage}
                onChange={(_, value) => setSlippage(value as number)}
                min={0.1}
                max={5}
                step={0.1}
                marks={[
                  { value: 0.5, label: '0.5%' },
                  { value: 1, label: '1%' },
                  { value: 2, label: '2%' },
                ]}
              />
            </Box>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
}

export default function SwapPage() {
  return <SwapCard />;
}
