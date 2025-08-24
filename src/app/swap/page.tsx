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
  LinearProgress,
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
  Help,
  LocalGasStation,
  KeyboardArrowDown,
  Search,
  Close,
  FlashOn,
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

function TokenSelector({ 
  token, 
  onSelect, 
  label,
  onMaxClick,
  balance,
  showBalance = true
}: { 
  token?: TokenData; 
  onSelect: (token: TokenData) => void; 
  label: string;
  onMaxClick?: () => void;
  balance?: string;
  showBalance?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<string[]>(['USDC', 'ETH', 'USDT']);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
        <Typography variant="body2" color="text.secondary" fontWeight={500}>
          {label}
        </Typography>
        {showBalance && balance && (
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            Balance: {parseFloat(balance).toFixed(4)}
          </Typography>
        )}
      </Box>
      
      <Paper
        elevation={0}
        onClick={() => setOpen(true)}
                sx={{ 
          p: 3,
          cursor: 'pointer',
          border: '2px solid rgba(139, 92, 246, 0.3)',
          borderRadius: 8,
          background: 'rgba(139, 92, 246, 0.1)',
          backdropFilter: 'blur(20px)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(59, 130, 246, 0.05))',
            opacity: 0,
            transition: 'opacity 0.3s ease',
          },
          '&:hover': {
            border: '2px solid rgba(139, 92, 246, 0.5)',
            background: 'rgba(139, 92, 246, 0.15)',
            transform: 'translateY(-2px)',
            boxShadow: '0 12px 32px rgba(139, 92, 246, 0.2)',
            '&::before': {
              opacity: 1,
            }
          }
        }}
      >
        {token ? (
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar 
                src={token.logoURI} 
                sx={{ 
                  width: 44, 
                  height: 44,
                  border: '2px solid rgba(0, 0, 0, 0.05)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                {token.symbol.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight={700} color="text.primary">
                  {token.symbol}
                </Typography>
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                  {token.name}
                </Typography>
              </Box>
            </Box>
            <KeyboardArrowDown sx={{ color: 'text.secondary' }} />
          </Box>
        ) : (
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6" fontWeight={600} color="text.primary">
              Select Token
            </Typography>
            <KeyboardArrowDown sx={{ color: 'text.secondary' }} />
          </Box>
        )}
      </Paper>

      {/* Token Selection Dialog */}
      <Dialog 
        open={open} 
        onClose={() => setOpen(false)} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 0,
            background: 'rgba(139, 92, 246, 0.15)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
          }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h5" fontWeight={700}>
              Select Token
            </Typography>
            <IconButton onClick={() => setOpen(false)} size="small">
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            placeholder="Search tokens..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ 
              mb: 3, 
              mt: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: 8,
                background: 'rgba(139, 92, 246, 0.1)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  border: '1px solid rgba(0, 0, 0, 0.2)',
                },
                '&.Mui-focused': {
                  border: '1px solid #1976d2',
                  boxShadow: '0 0 0 3px rgba(25, 118, 210, 0.1)',
                }
              }
            }}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          />
          
          {/* Favorites Section */}
          {!searchTerm && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" fontWeight={600} color="text.secondary" mb={2}>
                Favorites
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {favorites.map((symbol) => {
                  const token = mockTokens.find(t => t.symbol === symbol);
                  if (!token) return null;
                  return (
                    <Chip
                      key={symbol}
                      avatar={<Avatar src={token.logoURI} sx={{ width: 20, height: 20 }} />}
                      label={symbol}
                      onClick={() => {
                        onSelect(token);
                        setOpen(false);
                      }}
                      sx={{
                        cursor: 'pointer',
                        background: 'rgba(25, 118, 210, 0.1)',
                        border: '1px solid rgba(25, 118, 210, 0.2)',
                        '&:hover': {
                          background: 'rgba(25, 118, 210, 0.15)',
                          transform: 'translateY(-1px)',
                        },
                        transition: 'all 0.2s ease',
                      }}
                    />
                  );
                })}
              </Box>
            </Box>
          )}
          
          <List sx={{ p: 0 }}>
            {mockTokens
              .filter(token => 
                !searchTerm || 
                token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                token.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((tokenOption) => (
              <ListItem
                key={tokenOption.symbol}
                component="div"
                onClick={() => {
                  onSelect(tokenOption);
                  setOpen(false);
                }}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  p: 2,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    background: 'rgba(25, 118, 210, 0.04)',
                    transform: 'translateX(4px)',
                  }
                }}
              >
                <ListItemAvatar>
                  <Avatar 
                    src={tokenOption.logoURI}
                    sx={{ 
                      width: 48, 
                      height: 48,
                      border: '2px solid rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    {tokenOption.symbol.charAt(0)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="h6" fontWeight={600}>
                      {tokenOption.symbol}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary" fontWeight={500}>
                      {tokenOption.name}
                    </Typography>
                  }
                />
                                 <Box textAlign="right">
                   <Typography variant="body1" fontWeight={700} color="text.primary">
                     ${tokenOption.price?.toLocaleString()}
                   </Typography>
                   <Typography variant="caption" color="text.secondary" fontWeight={500}>
                     ${((tokenOption.volume24h || 0) / 1e6).toFixed(0)}M vol
                   </Typography>
                   <IconButton
                     size="small"
                     onClick={(e) => {
                       e.stopPropagation();
                       setFavorites(prev => 
                         prev.includes(tokenOption.symbol) 
                           ? prev.filter(s => s !== tokenOption.symbol)
                           : [...prev, tokenOption.symbol]
                       );
                     }}
                     sx={{ 
                       mt: 0.5,
                       color: favorites.includes(tokenOption.symbol) ? '#1976d2' : 'text.secondary',
                       '&:hover': {
                         color: '#1976d2',
                         transform: 'scale(1.1)',
                       },
                       transition: 'all 0.2s ease',
                     }}
                   >
                     {favorites.includes(tokenOption.symbol) ? <Favorite /> : <FavoriteBorder />}
                   </IconButton>
                 </Box>
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </Box>
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
  const { slippage, setSlippage } = useAppStore();
  
  const [tokenIn, setTokenIn] = useState<TokenData | undefined>(mockTokens[1]); // ETH
  const [tokenOut, setTokenOut] = useState<TokenData | undefined>(mockTokens[0]); // USDC
  const [amountIn, setAmountIn] = useState('');
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [showPriceChart, setShowPriceChart] = useState(false);

  const { data: balanceIn } = useBalance({
    address,
    token: tokenIn?.address,
  });

  const handleSwapTokens = () => {
    setTokenIn(tokenOut);
    setTokenOut(tokenIn);
    setQuote(null);
  };

  const handleGetQuote = async () => {
    if (!tokenIn || !tokenOut || !amountIn) return;
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockQuote: Quote = {
        tokenIn: tokenIn.address,
        tokenOut: tokenOut.address,
        amountIn,
        amountOut: (parseFloat(amountIn) * (tokenIn.price || 1) / (tokenOut.price || 1) * 0.997).toString(),
        route: 'Uniswap V3',
        priceImpactBps: Math.random() * 10,
        gasEstimate: (Math.random() * 0.01 + 0.005).toFixed(3),
        slippageBps: slippage * 100,
      };
      
      setQuote(mockQuote);
    } catch (error) {
      console.error('Quote error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = async () => {
    if (!quote) return;
    
    // TODO: Implement actual swap logic
    console.log('Executing swap:', quote);
  };

  const priceImpact = quote ? quote.priceImpactBps / 100 : 0;
  const isHighImpact = priceImpact > 2;
  const isMediumImpact = priceImpact > 0.5 && priceImpact <= 2;
  const isLowImpact = priceImpact <= 0.5;

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'transparent',
      position: 'relative',
    }}>
      <Box sx={{ maxWidth: 1400, mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }}>
        {/* Modern Hero Section */}
        <Box sx={{ 
          textAlign: 'center', 
          mb: 8,
          position: 'relative',
          zIndex: 1,
        }}>
          {/* Floating Elements */}
          <Box sx={{
            position: 'absolute',
            top: -50,
            left: '10%',
            width: 100,
            height: 100,
            background: 'linear-gradient(45deg, rgba(25, 118, 210, 0.1), rgba(156, 39, 176, 0.1))',
            borderRadius: '50%',
            animation: 'float 6s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-20px)' },
            }
          }} />
          <Box sx={{
            position: 'absolute',
            top: 50,
            right: '15%',
            width: 80,
            height: 80,
            background: 'linear-gradient(45deg, rgba(156, 39, 176, 0.1), rgba(25, 118, 210, 0.1))',
            borderRadius: '50%',
            animation: 'float 8s ease-in-out infinite reverse',
          }} />
          
          <Typography 
            variant="h1" 
            fontWeight={900} 
            sx={{
              background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 25%, #A78BFA 50%, #60A5FA 75%, #8B5CF6 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3,
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              textShadow: '0 4px 20px rgba(139, 92, 246, 0.3)',
            }}
          >
            Swap Tokens
          </Typography>
          
          <Typography 
            variant="h4" 
            color="text.secondary" 
            fontWeight={400}
            sx={{ 
              mb: 4,
              opacity: 0.8,
              fontSize: { xs: '1.1rem', md: '1.5rem' },
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.4,
            }}
          >
            Trade tokens instantly with the best rates across multiple DEXs
          </Typography>
          
          {/* Enhanced Stats Cards */}
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            gap: 3,
            maxWidth: 800,
            mx: 'auto',
            mt: 6,
          }}>
            {[
              { value: '$2.4B', label: '24h Volume', icon: '📈', color: '#1976d2' },
              { value: '1,247', label: 'Active Pairs', icon: '🔗', color: '#42a5f5' },
              { value: '15 Gwei', label: 'Avg Gas', icon: '⛽', color: '#9c27b0' },
            ].map((stat, index) => (
              <Box
                key={index}
                sx={{
                  background: 'rgba(139, 92, 246, 0.1)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  borderRadius: 0,
                  p: 3,
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(139, 92, 246, 0.2)',
                    background: 'rgba(139, 92, 246, 0.15)',
                  }
                }}
              >
                <Typography variant="h2" sx={{ mb: 1, fontSize: '2rem' }}>
                  {stat.icon}
                </Typography>
                <Typography variant="h4" fontWeight={700} sx={{ color: stat.color, mb: 1 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
                </Box>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 4 }}>
        {/* Modern Main Swap Interface */}
        <Box>
          <Card sx={{
            background: 'rgba(139, 92, 246, 0.15)',
            backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(139, 92, 246, 0.3)',
              borderRadius: 0,
              boxShadow: '0 8px 32px rgba(139, 92, 246, 0.15)',
            position: 'relative',
            overflow: 'hidden',
            '&:hover': {
              boxShadow: '0 12px 40px rgba(139, 92, 246, 0.2)',
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.3s ease',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '6px',
              background: 'linear-gradient(90deg, #8B5CF6, #3B82F6, #A78BFA, #60A5FA)',
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)',
              pointerEvents: 'none',
            }
          }}>
            <CardContent sx={{ p: 5 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={5}>
                <Box>
                  <Typography variant="h3" fontWeight={800} sx={{ 
                    mb: 1,
                    background: 'linear-gradient(135deg, #1976d2, #9c27b0)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                    Swap
                  </Typography>
                  <Typography variant="body1" color="text.secondary" fontWeight={500}>
                    Get the best rates across all DEXs
                  </Typography>
                </Box>
                <Box display="flex" gap={1}>
                  <Tooltip title="Refresh Quote">
                    <IconButton 
                      onClick={handleGetQuote} 
                      disabled={loading}
                      sx={{
                        background: 'rgba(25, 118, 210, 0.1)',
                        '&:hover': {
                          background: 'rgba(25, 118, 210, 0.2)',
                          transform: 'rotate(180deg)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <Refresh />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="View Price Chart">
                    <IconButton 
                      onClick={() => setShowPriceChart(!showPriceChart)}
                      sx={{
                        background: 'rgba(25, 118, 210, 0.1)',
                        '&:hover': {
                          background: 'rgba(25, 118, 210, 0.2)',
                        },
                      }}
                    >
                      <ShowChart />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Settings">
                    <IconButton
                      sx={{
                        background: 'rgba(25, 118, 210, 0.1)',
                        '&:hover': {
                          background: 'rgba(25, 118, 210, 0.2)',
                        },
                      }}
                    >
                      <Settings />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>

              {/* Token Input */}
              <Box mb={3}>
                <TokenSelector
                  token={tokenIn}
                  onSelect={setTokenIn}
                  label="You Pay"
                  onMaxClick={() => setAmountIn(balanceIn?.formatted || '0')}
                  balance={balanceIn?.formatted}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="0.0"
                  value={amountIn}
                  onChange={(e) => setAmountIn(e.target.value)}
                  sx={{ 
                    mt: 2,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      background: 'rgba(0, 0, 0, 0.02)',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      '&:hover': {
                        border: '1px solid rgba(0, 0, 0, 0.2)',
                      },
                      '&.Mui-focused': {
                        border: '1px solid #1976d2',
                        boxShadow: '0 0 0 3px rgba(25, 118, 210, 0.1)',
                      }
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <Button
                        size="small"
                        onClick={() => setAmountIn(balanceIn?.formatted || '0')}
                        sx={{ 
                          mr: 1,
                          background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                          color: 'white',
                          fontWeight: 600,
                          '&:hover': {
                            background: 'linear-gradient(135deg, #1565c0, #1976d2)',
                          }
                        }}
                      >
                        Max
                      </Button>
                    ),
                  }}
                />
              </Box>

              {/* Ultra Modern Swap Button */}
              <Box display="flex" justifyContent="center" mb={4} position="relative">
                {/* Animated Background Rings */}
                <Box sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 120,
                  height: 120,
                  background: 'conic-gradient(from 0deg, rgba(25, 118, 210, 0.1), rgba(156, 39, 176, 0.1), rgba(25, 118, 210, 0.1))',
                  borderRadius: '50%',
                  zIndex: 0,
                  animation: 'rotate 4s linear infinite',
                  '@keyframes rotate': {
                    '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
                    '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
                  }
                }} />
                <Box sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 100,
                  height: 100,
                  background: 'radial-gradient(circle, rgba(25, 118, 210, 0.15) 0%, transparent 70%)',
                  borderRadius: '50%',
                  zIndex: 0,
                  animation: 'pulse 2s ease-in-out infinite',
                  '@keyframes pulse': {
                    '0%, 100%': { transform: 'translate(-50%, -50%) scale(1)' },
                    '50%': { transform: 'translate(-50%, -50%) scale(1.1)' },
                  }
                }} />
                
                <IconButton 
                  onClick={handleSwapTokens}
                  sx={{
                    width: 72,
                    height: 72,
                    border: '3px solid rgba(255, 255, 255, 0.3)',
                    background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.2), rgba(156, 39, 176, 0.1))',
                    backdropFilter: 'blur(20px)',
                    position: 'relative',
                    zIndex: 2,
                    boxShadow: '0 8px 32px rgba(25, 118, 210, 0.2)',
                    '&:hover': {
                      border: '3px solid rgba(255, 255, 255, 0.5)',
                      background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.3), rgba(156, 39, 176, 0.2))',
                      transform: 'rotate(180deg) scale(1.2)',
                      boxShadow: '0 16px 48px rgba(25, 118, 210, 0.4)',
                    },
                    '&:active': {
                      transform: 'rotate(180deg) scale(0.9)',
                    },
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <SwapHoriz sx={{ 
                    fontSize: 36, 
                    color: 'white',
                    filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))',
                  }} />
                </IconButton>
              </Box>

              {/* Token Output */}
              <Box mb={4}>
                <TokenSelector
                  token={tokenOut}
                  onSelect={setTokenOut}
                  label="You Receive"
                  showBalance={false}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="0.0"
                  value={quote?.amountOut || ''}
                  disabled
                  sx={{ 
                    mt: 2,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      background: 'rgba(0, 0, 0, 0.02)',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      '&.Mui-disabled': {
                        background: 'rgba(0, 0, 0, 0.01)',
                        border: '1px solid rgba(0, 0, 0, 0.05)',
                      }
                    }
                  }}
                />
              </Box>

              {/* Quote Details */}
              {quote && (
                <Box mb={4}>
                  <Divider sx={{ mb: 3, borderColor: 'rgba(0, 0, 0, 0.1)' }} />
                  
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3 }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" fontWeight={500} gutterBottom>
                        Rate
                      </Typography>
                      <Typography variant="body1" fontWeight={700} color="text.primary">
                        1 {tokenIn?.symbol} = {(parseFloat(quote.amountOut) / parseFloat(quote.amountIn)).toFixed(6)} {tokenOut?.symbol}
                      </Typography>
                    </Box>
                    <Box>
                       <Typography variant="body2" color="text.secondary" fontWeight={500} gutterBottom>
                         Price Impact
                       </Typography>
                       <Box display="flex" alignItems="center" gap={1}>
                         <Box sx={{
                           width: 8,
                           height: 8,
                           borderRadius: '50%',
                           background: isHighImpact ? '#f44336' : isMediumImpact ? '#ff9800' : '#4caf50',
                           boxShadow: `0 0 8px ${isHighImpact ? '#f44336' : isMediumImpact ? '#ff9800' : '#4caf50'}40`,
                         }} />
                         <Typography 
                           variant="body1" 
                           fontWeight={700}
                           color={isHighImpact ? 'error.main' : isMediumImpact ? 'warning.main' : 'success.main'}
                         >
                           {priceImpact.toFixed(2)}%
                         </Typography>
                         {isHighImpact && <Warning sx={{ color: 'error.main' }} />}
                         {isMediumImpact && <Info sx={{ color: 'warning.main' }} />}
                         {isLowImpact && <CheckCircle sx={{ color: 'success.main' }} />}
                       </Box>
                     </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" fontWeight={500} gutterBottom>
                        Network Fee
                      </Typography>
                      <Typography variant="body1" fontWeight={700} color="text.primary">
                        ~${(parseFloat(quote.gasEstimate) * 3200).toFixed(2)}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" fontWeight={500} gutterBottom>
                        Slippage
                      </Typography>
                      <Typography variant="body1" fontWeight={700} color="text.primary">
                        {slippage}%
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )}

              {/* Action Buttons */}
              {!address ? (
                <Alert 
                  severity="info" 
                  icon={<Info />}
                  sx={{
                    borderRadius: 3,
                    background: 'rgba(25, 118, 210, 0.05)',
                    border: '1px solid rgba(25, 118, 210, 0.2)',
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  Please connect your wallet to start swapping
                </Alert>
              ) : (
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={!tokenIn || !tokenOut || !amountIn || loading}
                  onClick={quote ? handleSwap : handleGetQuote}
                  sx={{ 
                    height: 72,
                    borderRadius: 4,
                    background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 25%, #64b5f6 50%, #9c27b0 75%, #e91e63 100%)',
                    backgroundSize: '200% 200%',
                    boxShadow: '0 12px 32px rgba(25, 118, 210, 0.4), 0 4px 16px rgba(156, 39, 176, 0.3)',
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    textTransform: 'none',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                      transition: 'left 0.5s',
                    },
                    '&:hover': {
                      background: 'linear-gradient(135deg, #1565c0 0%, #1976d2 25%, #42a5f5 50%, #7b1fa2 75%, #c2185b 100%)',
                      backgroundSize: '200% 200%',
                      boxShadow: '0 16px 48px rgba(25, 118, 210, 0.6), 0 8px 24px rgba(156, 39, 176, 0.4)',
                      transform: 'translateY(-3px)',
                      '&::before': {
                        left: '100%',
                      }
                    },
                    '&:active': {
                      transform: 'translateY(-1px)',
                    },
                    '&:disabled': {
                      background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.3), rgba(156, 39, 176, 0.2))',
                      boxShadow: 'none',
                      transform: 'none',
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  {loading ? (
                    <Box display="flex" alignItems="center" gap={2}>
                      <Skeleton width={24} height={24} variant="circular" />
                      Getting Quote...
                    </Box>
                  ) : quote ? (
                    'Swap Now'
                  ) : (
                    'Get Quote'
                  )}
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Advanced Settings */}
          <AdvancedSettings />

          {/* Route Optimizer */}
          <RouteOptimizer quote={quote} />
        </Box>

        {/* Ultra Modern Sidebar */}
        <Box>
          <Box display="flex" flexDirection="column" gap={4}>
            {/* Enhanced Market Stats */}
            <Card sx={{
              background: 'rgba(139, 92, 246, 0.15)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              borderRadius: 8,
              boxShadow: '0 8px 32px rgba(139, 92, 246, 0.15)',
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                boxShadow: '0 12px 40px rgba(139, 92, 246, 0.2)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #8B5CF6, #3B82F6, #A78BFA, #60A5FA)',
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.03) 0%, transparent 50%)',
                pointerEvents: 'none',
              }
            }}>
              <CardContent sx={{ p: 4 }}>
                <Box display="flex" alignItems="center" mb={4}>
                  <Box sx={{
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 3,
                    boxShadow: '0 8px 20px rgba(139, 92, 246, 0.25)',
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: -2,
                      left: -2,
                      right: -2,
                      bottom: -2,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))',
                      zIndex: -1,
                    }
                  }}>
                    <TrendingUp sx={{ color: 'white', fontSize: 26 }} />
                  </Box>
                  <Box>
                    <Typography variant="h5" fontWeight={800} sx={{
                      background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 0.5,
                    }}>
                      Market Stats
                    </Typography>
                    <Typography variant="body2" color="text.secondary" fontWeight={500}>
                      Live market data
                    </Typography>
                  </Box>
                </Box>
                
                <Box display="flex" flexDirection="column" gap={3}>
                  {[
                    { label: '24h Volume', value: '$2.4B', icon: '📈', color: '#1976d2' },
                    { label: 'Total Liquidity', value: '$8.7B', icon: '💧', color: '#42a5f5' },
                    { label: 'Active Pairs', value: '1,247', icon: '🔗', color: '#9c27b0' },
                  ].map((stat, index) => (
                    <Box 
                      key={index}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 2,
                        borderRadius: 0,
                        background: 'rgba(139, 92, 246, 0.05)',
                        border: '1px solid rgba(139, 92, 246, 0.1)',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',
                        '&:hover': {
                          background: 'rgba(139, 92, 246, 0.1)',
                          transform: 'translateX(4px)',
                          boxShadow: '0 4px 12px rgba(139, 92, 246, 0.1)',
                        }
                      }}
                    >
                      <Box display="flex" alignItems="center" gap={2}>
                        <Typography variant="h6" sx={{ color: stat.color }}>
                          {stat.icon}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" fontWeight={500}>
                          {stat.label}
                        </Typography>
                      </Box>
                      <Typography variant="body1" fontWeight={700} sx={{ color: stat.color }}>
                        {stat.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>

            {/* Modern Swap History */}
            <Card sx={{
              background: 'rgba(139, 92, 246, 0.15)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              borderRadius: 8,
              boxShadow: '0 8px 32px rgba(139, 92, 246, 0.15)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #4CAF50, #66BB6A, #81C784)',
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 80% 20%, rgba(76, 175, 80, 0.03) 0%, transparent 50%)',
                pointerEvents: 'none',
              }
            }}>
              <CardContent sx={{ p: 4 }}>
                <Box display="flex" alignItems="center" mb={4}>
                  <Box sx={{
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #4CAF50, #66BB6A)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 3,
                    boxShadow: '0 8px 20px rgba(76, 175, 80, 0.25)',
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: -2,
                      left: -2,
                      right: -2,
                      bottom: -2,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.2), rgba(102, 187, 106, 0.2))',
                      zIndex: -1,
                    }
                  }}>
                    <History sx={{ color: 'white', fontSize: 26 }} />
                  </Box>
                  <Box>
                    <Typography variant="h5" fontWeight={800} sx={{
                      background: 'linear-gradient(135deg, #4CAF50, #66BB6A)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 0.5,
                    }}>
                      Recent Swaps
                    </Typography>
                    <Typography variant="body2" color="text.secondary" fontWeight={500}>
                      Your transaction history
                    </Typography>
                  </Box>
                </Box>
                
                <Box display="flex" flexDirection="column" gap={2}>
                  {swapHistory.map((swap, index) => (
                    <Box 
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 2.5,
                        borderRadius: 8,
                        background: 'rgba(139, 92, 246, 0.05)',
                        border: '1px solid rgba(139, 92, 246, 0.1)',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',
                        '&:hover': {
                          background: 'rgba(139, 92, 246, 0.1)',
                          transform: 'translateX(4px)',
                          boxShadow: '0 4px 12px rgba(139, 92, 246, 0.1)',
                        }
                      }}
                    >
                      <Avatar sx={{ 
                        bgcolor: 'rgba(76, 175, 80, 0.1)',
                        border: '2px solid rgba(76, 175, 80, 0.2)',
                        mr: 2,
                        width: 40,
                        height: 40,
                      }}>
                        <SwapHoriz sx={{ color: '#4CAF50', fontSize: 20 }} />
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body1" fontWeight={600} color="text.primary">
                          {swap.amount} {swap.from} → {swap.to}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" fontWeight={500}>
                          {swap.date}
                        </Typography>
                      </Box>
                      <Chip
                        label={swap.status}
                        size="small"
                        color="success"
                        icon={<CheckCircle />}
                        sx={{ 
                          fontWeight: 600,
                          background: 'linear-gradient(135deg, #4CAF50, #66BB6A)',
                          color: 'white',
                          '& .MuiChip-icon': {
                            color: 'white',
                          }
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>

            {/* Modern Gas Tracker */}
            <Card sx={{
              background: 'rgba(139, 92, 246, 0.15)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              borderRadius: 8,
              boxShadow: '0 8px 32px rgba(139, 92, 246, 0.15)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #FF9800, #FFB74D, #FFCC02)',
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 20% 80%, rgba(255, 152, 0, 0.03) 0%, transparent 50%)',
                pointerEvents: 'none',
              }
            }}>
              <CardContent sx={{ p: 4 }}>
                <Box display="flex" alignItems="center" mb={4}>
                  <Box sx={{
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FF9800, #FFB74D)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 3,
                    boxShadow: '0 8px 20px rgba(255, 152, 0, 0.25)',
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: -2,
                      left: -2,
                      right: -2,
                      bottom: -2,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.2), rgba(255, 183, 77, 0.2))',
                      zIndex: -1,
                    }
                  }}>
                    <LocalGasStation sx={{ color: 'white', fontSize: 26 }} />
                  </Box>
                  <Box>
                    <Typography variant="h5" fontWeight={800} sx={{
                      background: 'linear-gradient(135deg, #FF9800, #FFB74D)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 0.5,
                    }}>
                      Gas Tracker
                    </Typography>
                    <Typography variant="body2" color="text.secondary" fontWeight={500}>
                      Network fees
                    </Typography>
                  </Box>
                </Box>
                
                <Box display="flex" flexDirection="column" gap={3}>
                  {[
                    { label: 'Safe', value: '15 Gwei', icon: '🟢', color: '#4CAF50', speed: 'Slow' },
                    { label: 'Average', value: '25 Gwei', icon: '🟡', color: '#FF9800', speed: 'Normal' },
                    { label: 'Fast', value: '35 Gwei', icon: '🔴', color: '#F44336', speed: 'Quick' },
                  ].map((gas, index) => (
                    <Box 
                      key={index}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 2.5,
                        borderRadius: 8,
                        background: 'rgba(139, 92, 246, 0.05)',
                        border: '1px solid rgba(139, 92, 246, 0.1)',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',
                        '&:hover': {
                          background: 'rgba(139, 92, 246, 0.1)',
                          transform: 'translateX(4px)',
                          boxShadow: '0 4px 12px rgba(139, 92, 246, 0.1)',
                        }
                      }}
                    >
                      <Box display="flex" alignItems="center" gap={2}>
                        <Typography variant="h6">
                          {gas.icon}
                        </Typography>
                        <Box>
                          <Typography variant="body2" color="text.secondary" fontWeight={500}>
                            {gas.label}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {gas.speed}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body1" fontWeight={700} sx={{ color: gas.color }}>
                        {gas.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default function SwapPage() {
  return <SwapCard />;
}
