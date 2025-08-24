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
  Menu,
  MenuItem,
  ListItemAvatar,
  ListItemText,
  Chip,
  Divider,
} from '@mui/material';
import {
  ExpandMore,
  CompareArrows,
  Settings,
  KeyboardArrowDown,
  TrendingUp,
} from '@mui/icons-material';
import { useAccount, useBalance } from 'wagmi';
import { TokenData } from '@/types';

// Enhanced mock token data with BSC tokens
const mockTokens: TokenData[] = [
  {
    address: '0x0000000000000000000000000000000000000000' as `0x${string}`,
    symbol: 'BNB',
    name: 'BNB',
    decimals: 18,
    price: 320.00,
    logoURI: 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
    volume24h: 15000000000,
    liquidity: 50000000000,
  },
  {
    address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d' as `0x${string}`,
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 18,
    price: 1.00,
    logoURI: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
    volume24h: 8000000000,
    liquidity: 30000000000,
  },
  {
    address: '0x55d398326f99059fF775485246999027B3197955' as `0x${string}`,
    symbol: 'USDT',
    name: 'Tether USD',
    decimals: 18,
    price: 1.00,
    logoURI: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
    volume24h: 12000000000,
    liquidity: 85000000000,
  },
  {
    address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56' as `0x${string}`,
    symbol: 'BUSD',
    name: 'Binance USD',
    decimals: 18,
    price: 1.00,
    logoURI: 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
    volume24h: 5000000000,
    liquidity: 20000000000,
  },
  {
    address: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82' as `0x${string}`,
    symbol: 'CAKE',
    name: 'PancakeSwap Token',
    decimals: 18,
    price: 2.50,
    logoURI: 'https://cryptologos.cc/logos/pancakeswap-cake-logo.png',
    volume24h: 3000000000,
    liquidity: 8000000000,
  },
  {
    address: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c' as `0x${string}`,
    symbol: 'BTCB',
    name: 'Bitcoin BEP2',
    decimals: 18,
    price: 45000.00,
    logoURI: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
    volume24h: 2000000000,
    liquidity: 6000000000,
  },
  {
    address: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8' as `0x${string}`,
    symbol: 'ETH',
    name: 'Ethereum Token',
    decimals: 18,
    price: 3500.00,
    logoURI: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    volume24h: 4000000000,
    liquidity: 12000000000,
  },
  {
    address: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3' as `0x${string}`,
    symbol: 'DAI',
    name: 'Dai Token',
    decimals: 18,
    price: 1.00,
    logoURI: 'https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png',
    volume24h: 1500000000,
    liquidity: 4000000000,
  },
  {
    address: '0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47' as `0x${string}`,
    symbol: 'ADA',
    name: 'Cardano Token',
    decimals: 18,
    price: 0.45,
    logoURI: 'https://cryptologos.cc/logos/cardano-ada-logo.png',
    volume24h: 1000000000,
    liquidity: 3000000000,
  },
  {
    address: '0x4338665CBB7B2485A8855A139b75D5e34AB0DB94' as `0x${string}`,
    symbol: 'LTC',
    name: 'Litecoin Token',
    decimals: 18,
    price: 75.00,
    logoURI: 'https://cryptologos.cc/logos/litecoin-ltc-logo.png',
    volume24h: 800000000,
    liquidity: 2000000000,
  },
  {
    address: '0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE' as `0x${string}`,
    symbol: 'XRP',
    name: 'XRP Token',
    decimals: 18,
    price: 0.55,
    logoURI: 'https://cryptologos.cc/logos/xrp-xrp-logo.png',
    volume24h: 1200000000,
    liquidity: 3500000000,
  },
  {
    address: '0x0D8Ce2A99Bb6e3B7Db580eD848240e4a0F9aE153' as `0x${string}`,
    symbol: 'FIL',
    name: 'Filecoin',
    decimals: 18,
    price: 5.50,
    logoURI: 'https://cryptologos.cc/logos/filecoin-fil-logo.png',
    volume24h: 600000000,
    liquidity: 1500000000,
  },
];

function TokenSelector({ 
  selectedToken, 
  onSelect, 
  label 
}: { 
  selectedToken: TokenData; 
  onSelect: (token: TokenData) => void;
  label: string;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTokenSelect = (token: TokenData) => {
    onSelect(token);
    handleClose();
  };

  return (
    <Box>
      <Typography variant="body2" sx={{ color: '#E2E8F0', mb: 1.5, fontWeight: 600 }}>
        {label}
      </Typography>
      <Button
        onClick={handleClick}
        sx={{
          background: 'rgba(139, 92, 246, 0.1)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          borderRadius: 2,
          p: 2.5,
          width: '100%',
          justifyContent: 'space-between',
          textTransform: 'none',
          color: '#FFFFFF',
          '&:hover': {
            background: 'rgba(139, 92, 246, 0.15)',
            borderColor: 'rgba(139, 92, 246, 0.5)',
          }
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar 
            src={selectedToken?.logoURI} 
            alt={selectedToken?.symbol}
            sx={{ 
              width: 32, 
              height: 32,
              border: '2px solid rgba(139, 92, 246, 0.3)',
              background: 'rgba(139, 92, 246, 0.2)',
              borderRadius: 2,
            }}
          >
            {selectedToken?.symbol?.charAt(0)}
          </Avatar>
          <Box textAlign="left">
            <Typography variant="body1" fontWeight={600} sx={{ color: '#FFFFFF' }}>
              {selectedToken?.symbol}
            </Typography>
                             <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                   ${(selectedToken?.price || 0).toFixed(2)}
                 </Typography>
          </Box>
        </Box>
        <KeyboardArrowDown sx={{ color: '#E2E8F0' }} />
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            background: 'rgba(30, 27, 75, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: 2,
            maxHeight: 400,
            width: 320,
          }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 2 }}>
            Select Token
          </Typography>
          <TextField
            placeholder="Search tokens..."
            variant="outlined"
            size="small"
            fullWidth
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                color: '#FFFFFF',
                '& fieldset': {
                  borderColor: 'rgba(139, 92, 246, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(139, 92, 246, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#8B5CF6',
                },
              },
              '& .MuiInputBase-input::placeholder': {
                color: '#A0AEC0',
                opacity: 1,
              },
            }}
          />
        </Box>
        <Divider sx={{ borderColor: 'rgba(139, 92, 246, 0.3)' }} />
        {mockTokens.map((token) => (
          <MenuItem
            key={token.address}
            onClick={() => handleTokenSelect(token)}
            sx={{
              color: '#FFFFFF',
              '&:hover': {
                background: 'rgba(139, 92, 246, 0.1)',
              },
              '&.Mui-selected': {
                background: 'rgba(139, 92, 246, 0.2)',
                '&:hover': {
                  background: 'rgba(139, 92, 246, 0.25)',
                },
              },
            }}
          >
            <ListItemAvatar>
              <Avatar 
                src={token.logoURI} 
                alt={token.symbol}
                sx={{ 
                  width: 32, 
                  height: 32,
                  borderRadius: 2,
                }}
              >
                {token.symbol.charAt(0)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="body1" fontWeight={600} sx={{ color: '#FFFFFF' }}>
                  {token.symbol}
                </Typography>
              }
                             secondary={
                 <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                   {token.name} • ${(token.price || 0).toFixed(2)}
                 </Typography>
               }
            />
                         <Chip
               label={`$${((token.volume24h || 0) / 1000000).toFixed(0)}M`}
               size="small"
               sx={{
                 background: 'rgba(139, 92, 246, 0.2)',
                 color: '#E2E8F0',
                 fontSize: '0.75rem',
               }}
             />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

function SwapCard() {
  const { address } = useAccount();
  const [tokenIn, setTokenIn] = useState<TokenData>(mockTokens[0]); // BNB
  const [tokenOut, setTokenOut] = useState<TokenData>(mockTokens[2]); // USDT
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

  // Calculate estimated output (mock calculation)
  const estimatedOutput = amountIn && tokenIn.price && tokenOut.price ? 
    (parseFloat(amountIn) * tokenIn.price / tokenOut.price).toFixed(6) : '';

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
            <TokenSelector 
              selectedToken={tokenIn} 
              onSelect={setTokenIn} 
              label="You Pay"
            />
            <Box sx={{
              background: 'rgba(139, 92, 246, 0.1)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              borderRadius: 2,
              p: 2.5,
              mt: 1.5,
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: 'rgba(139, 92, 246, 0.5)',
                boxShadow: '0 4px 20px rgba(139, 92, 246, 0.2)',
              }
            }}>
              <Box display="flex" alignItems="center" gap={2}>
                <Box flex={1}>
                  <Typography variant="body2" sx={{ color: '#A0AEC0', mb: 0.5 }}>
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
            <TokenSelector 
              selectedToken={tokenOut} 
              onSelect={setTokenOut} 
              label="You Receive"
            />
            <Box sx={{
              background: 'rgba(139, 92, 246, 0.1)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              borderRadius: 2,
              p: 2.5,
              mt: 1.5,
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: 'rgba(139, 92, 246, 0.5)',
                boxShadow: '0 4px 20px rgba(139, 92, 246, 0.2)',
              }
            }}>
              <Box display="flex" alignItems="center" gap={2}>
                <Box flex={1}>
                  <Typography variant="body2" sx={{ color: '#A0AEC0', mb: 0.5 }}>
                    Estimated: {estimatedOutput} {tokenOut?.symbol}
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
                />
              </Box>
            </Box>
          </Box>

          {/* Swap Info */}
          {amountIn && (
            <Box sx={{ 
              background: 'rgba(139, 92, 246, 0.1)', 
              border: '1px solid rgba(139, 92, 246, 0.3)',
              borderRadius: 2,
              p: 2,
              mb: 3
            }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="body2" sx={{ color: '#E2E8F0' }}>
                  Exchange Rate
                </Typography>
                                 <Typography variant="body2" sx={{ color: '#FFFFFF', fontWeight: 600 }}>
                   1 {tokenIn.symbol} = {((tokenIn.price || 0) / (tokenOut.price || 1)).toFixed(6)} {tokenOut.symbol}
                 </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" sx={{ color: '#E2E8F0' }}>
                  Price Impact
                </Typography>
                <Typography variant="body2" sx={{ color: '#10B981', fontWeight: 600 }}>
                  <TrendingUp sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                  &lt; 0.1%
                </Typography>
              </Box>
            </Box>
          )}

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
