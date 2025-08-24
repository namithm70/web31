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
  Slider,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  InputAdornment,
} from '@mui/material';
import {
  ExpandMore,
  CompareArrows,
  KeyboardArrowDown,
  Settings,
} from '@mui/icons-material';
import { useAccount, useBalance } from 'wagmi';
import { TokenData } from '@/types';

// Enhanced mock token data
const mockTokens: TokenData[] = [
  {
    address: '0xA0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8C8C' as `0x${string}`,
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    price: 1.00,
    logoURI: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
    volume24h: 5000000000,
    liquidity: 25000000000,
  },
  {
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' as `0x${string}`,
    symbol: 'WETH',
    name: 'Wrapped Ether',
    decimals: 18,
    price: 3500.00,
    logoURI: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    volume24h: 8000000000,
    liquidity: 15000000000,
  },
  {
    address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599' as `0x${string}`,
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    decimals: 8,
    price: 45000.00,
    logoURI: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
    volume24h: 3000000000,
    liquidity: 8000000000,
  },
  {
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7' as `0x${string}`,
    symbol: 'USDT',
    name: 'Tether USD',
    decimals: 6,
    price: 1.00,
    logoURI: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
    volume24h: 12000000000,
    liquidity: 85000000000,
  },
];

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
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        opacity: 0.3,
      }
    }}>
      <Card sx={{
        maxWidth: 480,
        width: '100%',
        mx: 2,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: 4,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        overflow: 'visible',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -2,
          left: -2,
          right: -2,
          bottom: -2,
          background: 'linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c)',
          borderRadius: 6,
          zIndex: -1,
          opacity: 0.3,
        }
      }}>
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 800,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1
              }}
            >
              Swap Tokens
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Trade tokens instantly with the best rates
            </Typography>
          </Box>

          {/* Token Input */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" mb={1.5} sx={{ fontWeight: 600 }}>
              You Pay
            </Typography>
            <Box sx={{
              background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
              border: '2px solid #e2e8f0',
              borderRadius: 3,
              p: 2.5,
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: '#667eea',
                boxShadow: '0 4px 20px rgba(102, 126, 234, 0.15)',
              }
            }}>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar 
                  src={tokenIn?.logoURI} 
                  alt={tokenIn?.symbol}
                  sx={{ 
                    width: 48, 
                    height: 48,
                    border: '2px solid #fff',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  {tokenIn?.symbol?.charAt(0)}
                </Avatar>
                <Box flex={1}>
                  <Typography variant="h6" fontWeight={700} color="text.primary">
                    {tokenIn?.symbol}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Balance: {balanceIn?.formatted || '0'} {tokenIn?.symbol}
                  </Typography>
                </Box>
                <TextField
                  value={amountIn}
                  onChange={(e) => setAmountIn(e.target.value)}
                  placeholder="0.0"
                  variant="standard"
                  sx={{ 
                    width: 140,
                    '& .MuiInput-root': {
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: '#1a202c',
                    },
                    '& .MuiInput-underline:before': { borderBottom: 'none' },
                    '& .MuiInput-underline:after': { borderBottom: 'none' },
                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: 'none' },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                          ${tokenIn?.price?.toFixed(2)}
                        </Typography>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* Switch Button */}
          <Box display="flex" justifyContent="center" mb={3}>
            <IconButton 
              onClick={handleSwitchTokens} 
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                width: 48,
                height: 48,
                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                  transform: 'scale(1.1)',
                  boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <CompareArrows />
            </IconButton>
          </Box>

          {/* Token Output */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="body2" color="text.secondary" mb={1.5} sx={{ fontWeight: 600 }}>
              You Receive
            </Typography>
            <Box sx={{
              background: 'linear-gradient(135deg, #f0fff4 0%, #dcfce7 100%)',
              border: '2px solid #dcfce7',
              borderRadius: 3,
              p: 2.5,
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: '#10b981',
                boxShadow: '0 4px 20px rgba(16, 185, 129, 0.15)',
              }
            }}>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar 
                  src={tokenOut?.logoURI} 
                  alt={tokenOut?.symbol}
                  sx={{ 
                    width: 48, 
                    height: 48,
                    border: '2px solid #fff',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  {tokenOut?.symbol?.charAt(0)}
                </Avatar>
                <Box flex={1}>
                  <Typography variant="h6" fontWeight={700} color="text.primary">
                    {tokenOut?.symbol}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    {tokenOut?.name}
                  </Typography>
                </Box>
                <TextField
                  value={amountOut}
                  onChange={(e) => setAmountOut(e.target.value)}
                  placeholder="0.0"
                  variant="standard"
                  sx={{ 
                    width: 140,
                    '& .MuiInput-root': {
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: '#1a202c',
                    },
                    '& .MuiInput-underline:before': { borderBottom: 'none' },
                    '& .MuiInput-underline:after': { borderBottom: 'none' },
                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: 'none' },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                          ${tokenOut?.price?.toFixed(2)}
                        </Typography>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* Swap Button */}
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleSwap}
            disabled={!amountIn || !amountOut}
            sx={{ 
              mb: 3,
              height: 56,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: 3,
              fontSize: '1.1rem',
              fontWeight: 700,
              textTransform: 'none',
              boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)',
                transform: 'translateY(-2px)',
              },
              '&:disabled': {
                background: '#e2e8f0',
                color: '#a0aec0',
                boxShadow: 'none',
                transform: 'none',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Swap
          </Button>

          {/* Advanced Settings */}
          <Accordion 
            expanded={showAdvanced} 
            onChange={() => setShowAdvanced(!showAdvanced)}
            sx={{ 
              background: 'transparent',
              boxShadow: 'none',
              '&:before': { display: 'none' },
              '& .MuiAccordionSummary-root': {
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                borderRadius: 2,
                border: '1px solid #e2e8f0',
                minHeight: 48,
                '&:hover': {
                  background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                }
              }
            }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box display="flex" alignItems="center" gap={1}>
                <Settings sx={{ fontSize: 20, color: '#64748b' }} />
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#64748b' }}>
                  Advanced Settings
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary" mb={2} sx={{ fontWeight: 600 }}>
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
                  sx={{
                    '& .MuiSlider-thumb': {
                      backgroundColor: '#667eea',
                      width: 20,
                      height: 20,
                      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                      '&:hover': {
                        boxShadow: '0 6px 16px rgba(102, 126, 234, 0.4)',
                      }
                    },
                    '& .MuiSlider-track': {
                      backgroundColor: '#667eea',
                      height: 6,
                      borderRadius: 3,
                    },
                    '& .MuiSlider-rail': {
                      backgroundColor: '#e2e8f0',
                      height: 6,
                      borderRadius: 3,
                    },
                    '& .MuiSlider-mark': {
                      backgroundColor: '#cbd5e0',
                    },
                    '& .MuiSlider-markLabel': {
                      color: '#64748b',
                      fontWeight: 500,
                    }
                  }}
                />
              </Box>
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>
    </Box>
  );
}

export default function SwapPage() {
  return <SwapCard />;
}
