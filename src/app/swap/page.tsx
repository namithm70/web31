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
      background: 'transparent',
      position: 'relative',
    }}>
      <Card sx={{
        maxWidth: 480,
        width: '100%',
        mx: 2,
        background: 'rgba(139, 92, 246, 0.15)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        borderRadius: 2,
        boxShadow: '0 8px 32px rgba(139, 92, 246, 0.15)',
        overflow: 'visible',
      }}>
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700,
                color: '#FFFFFF',
                mb: 1
              }}
            >
              Swap Tokens
            </Typography>
            <Typography variant="body2" sx={{ color: '#E2E8F0' }}>
              Trade tokens instantly with the best rates
            </Typography>
          </Box>

          {/* Token Input */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ color: '#E2E8F0', mb: 1.5, fontWeight: 600 }}>
              You Pay
            </Typography>
            <Box sx={{
              background: 'rgba(139, 92, 246, 0.1)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              borderRadius: 2,
              p: 2.5,
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: 'rgba(139, 92, 246, 0.5)',
                boxShadow: '0 4px 20px rgba(139, 92, 246, 0.2)',
              }
            }}>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar 
                  src={tokenIn?.logoURI} 
                  alt={tokenIn?.symbol}
                  sx={{ 
                    width: 48, 
                    height: 48,
                    border: '2px solid rgba(139, 92, 246, 0.3)',
                    background: 'rgba(139, 92, 246, 0.2)',
                    borderRadius: 2,
                  }}
                >
                  {tokenIn?.symbol?.charAt(0)}
                </Avatar>
                <Box flex={1}>
                  <Typography variant="h6" fontWeight={700} sx={{ color: '#FFFFFF' }}>
                    {tokenIn?.symbol}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#E2E8F0', fontWeight: 500 }}>
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
                      color: '#FFFFFF',
                    },
                    '& .MuiInput-underline:before': { borderBottom: 'none' },
                    '& .MuiInput-underline:after': { borderBottom: 'none' },
                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: 'none' },
                    '& .MuiInput-input::placeholder': {
                      color: '#A0AEC0',
                      opacity: 1,
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Typography variant="body2" sx={{ color: '#A0AEC0', fontWeight: 600 }}>
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
                background: 'rgba(139, 92, 246, 0.2)',
                color: '#FFFFFF',
                width: 48,
                height: 48,
                border: '1px solid rgba(139, 92, 246, 0.3)',
                boxShadow: '0 4px 16px rgba(139, 92, 246, 0.2)',
                borderRadius: 2,
                '&:hover': {
                  background: 'rgba(139, 92, 246, 0.3)',
                  transform: 'scale(1.1)',
                  boxShadow: '0 6px 20px rgba(139, 92, 246, 0.3)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <CompareArrows />
            </IconButton>
          </Box>

          {/* Token Output */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="body2" sx={{ color: '#E2E8F0', mb: 1.5, fontWeight: 600 }}>
              You Receive
            </Typography>
            <Box sx={{
              background: 'rgba(139, 92, 246, 0.1)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              borderRadius: 2,
              p: 2.5,
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: 'rgba(139, 92, 246, 0.5)',
                boxShadow: '0 4px 20px rgba(139, 92, 246, 0.2)',
              }
            }}>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar 
                  src={tokenOut?.logoURI} 
                  alt={tokenOut?.symbol}
                  sx={{ 
                    width: 48, 
                    height: 48,
                    border: '2px solid rgba(139, 92, 246, 0.3)',
                    background: 'rgba(139, 92, 246, 0.2)',
                    borderRadius: 2,
                  }}
                >
                  {tokenOut?.symbol?.charAt(0)}
                </Avatar>
                <Box flex={1}>
                  <Typography variant="h6" fontWeight={700} sx={{ color: '#FFFFFF' }}>
                    {tokenOut?.symbol}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#E2E8F0', fontWeight: 500 }}>
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
                      color: '#FFFFFF',
                    },
                    '& .MuiInput-underline:before': { borderBottom: 'none' },
                    '& .MuiInput-underline:after': { borderBottom: 'none' },
                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: 'none' },
                    '& .MuiInput-input::placeholder': {
                      color: '#A0AEC0',
                      opacity: 1,
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Typography variant="body2" sx={{ color: '#A0AEC0', fontWeight: 600 }}>
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
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.8), rgba(59, 130, 246, 0.8))',
              borderRadius: 2,
              fontSize: '1.1rem',
              fontWeight: 700,
              textTransform: 'none',
              color: '#FFFFFF',
              boxShadow: '0 8px 25px rgba(139, 92, 246, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.9), rgba(59, 130, 246, 0.9))',
                boxShadow: '0 12px 35px rgba(139, 92, 246, 0.4)',
                transform: 'translateY(-2px)',
              },
              '&:disabled': {
                background: 'rgba(139, 92, 246, 0.2)',
                color: '#A0AEC0',
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
                background: 'rgba(139, 92, 246, 0.1)',
                borderRadius: 2,
                border: '1px solid rgba(139, 92, 246, 0.3)',
                minHeight: 48,
                '&:hover': {
                  background: 'rgba(139, 92, 246, 0.15)',
                }
              }
            }}
          >
            <AccordionSummary expandIcon={<ExpandMore sx={{ color: '#E2E8F0' }} />}>
              <Box display="flex" alignItems="center" gap={1}>
                <Settings sx={{ fontSize: 20, color: '#E2E8F0' }} />
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#E2E8F0' }}>
                  Advanced Settings
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 2 }}>
              <Box>
                <Typography variant="body2" sx={{ color: '#E2E8F0', mb: 2, fontWeight: 600 }}>
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
                      borderRadius: 1.5,
                    },
                    '& .MuiSlider-rail': {
                      backgroundColor: 'rgba(139, 92, 246, 0.2)',
                      height: 6,
                      borderRadius: 1.5,
                    },
                    '& .MuiSlider-mark': {
                      backgroundColor: 'rgba(139, 92, 246, 0.3)',
                    },
                    '& .MuiSlider-markLabel': {
                      color: '#E2E8F0',
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
