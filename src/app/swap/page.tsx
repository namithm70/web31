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
} from '@mui/material';
import {
  ExpandMore,
  CompareArrows,
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
  return (
    <Box sx={{ minHeight: '100vh', background: 'transparent', position: 'relative' }}>
      <Box sx={{ maxWidth: 1400, mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }}>
        <SwapCard />
      </Box>
    </Box>
  );
}
