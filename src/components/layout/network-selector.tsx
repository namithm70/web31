'use client';

import { useState, useMemo } from 'react';
import {
  Avatar,
  Box,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  NetworkCheck,
  CheckCircleOutline,
  Pending,
} from '@mui/icons-material';
import { useNetwork, useSwitchNetwork } from 'wagmi';
import { useAppStore } from '@/store';

const CHAIN_META: Record<number, { label: string; nativeSymbol: string; gradient: string; secondary?: string }> = {
  1: {
    label: 'Ethereum',
    nativeSymbol: 'ETH',
    gradient: 'linear-gradient(135deg, #627eea 0%, #3a54c5 100%)',
  },
  5: {
    label: 'Goerli',
    nativeSymbol: 'ETH',
    gradient: 'linear-gradient(135deg, #6f41db 0%, #4a1da3 100%)',
  },
  11155111: {
    label: 'Sepolia',
    nativeSymbol: 'ETH',
    gradient: 'linear-gradient(135deg, #1c7ed6 0%, #2b8af7 100%)',
  },
  137: {
    label: 'Polygon',
    nativeSymbol: 'MATIC',
    gradient: 'linear-gradient(135deg, #8247e5 0%, #6f3cc9 100%)',
  },
  42161: {
    label: 'Arbitrum',
    nativeSymbol: 'ETH',
    gradient: 'linear-gradient(135deg, #28a0f0 0%, #1b6edc 100%)',
  },
};

interface ChainButtonState {
  label: string;
  nativeSymbol: string;
  gradient: string;
}

const getChainMeta = (chainId?: number): ChainButtonState | null => {
  if (!chainId) return null;
  const meta = CHAIN_META[chainId];
  if (meta) return meta;
  return {
    label: `Chain ${chainId}`,
    nativeSymbol: 'N/A',
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)',
  };
};

export default function NetworkSelector() {
  const { chain, chains } = useNetwork();
  const { switchNetworkAsync, isLoading: isSwitching, pendingChainId } = useSwitchNetwork();
  const { selectedChain, setSelectedChain } = useAppStore((state) => ({
    selectedChain: state.selectedChain,
    setSelectedChain: state.setSelectedChain,
  }));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const activeChainId = chain?.id ?? selectedChain;
  const activeMeta = useMemo(() => getChainMeta(activeChainId), [activeChainId]);

  const statusLabel = useMemo(() => {
    if (!chain) return 'Wallet not connected';
    if (isSwitching && pendingChainId) return `Switching to ${getChainMeta(pendingChainId)?.label ?? pendingChainId}`;
    return `Connected to ${chain.name}`;
  }, [chain, isSwitching, pendingChainId]);

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => setAnchorEl(null);

  const handleSelect = async (chainId: number) => {
    setSelectedChain(chainId);
    try {
      if (switchNetworkAsync) {
        await switchNetworkAsync(chainId);
      }
    } catch (error) {
      console.error('Failed to switch network', error);
    } finally {
      closeMenu();
    }
  };

  const availableChains = useMemo(() => {
    const configured = Object.keys(CHAIN_META).map(Number);
    const walletChains = chains?.map((c) => c.id) ?? [];
    const fallback = activeChainId ? [activeChainId] : [];
    return Array.from(new Set([...configured, ...walletChains, ...fallback].filter(Boolean))) as number[];
  }, [chains, activeChainId]);

  return (
    <>
      <Tooltip title={statusLabel} placement="bottom" arrow>
        <Button
          onClick={openMenu}
          variant="outlined"
          size="small"
          endIcon={isSwitching ? <Pending fontSize="small" /> : <NetworkCheck fontSize="small" />}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            px: 1.5,
            py: 0.5,
            borderColor: 'divider',
            color: 'text.primary',
            background: activeMeta?.gradient ?? 'transparent',
            backgroundSize: '200% 200%',
            backgroundPosition: 'left center',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundPosition: 'right center',
              boxShadow: '0 6px 18px rgba(15, 118, 110, 0.15)',
            },
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            sx={{ color: 'common.white' }}
          >
            <Avatar
              sx={{
                width: 24,
                height: 24,
                fontSize: 12,
                bgcolor: 'rgba(0,0,0,0.3)',
              }}
            >
              {activeMeta?.nativeSymbol ?? '?'}
            </Avatar>
            <Typography variant="subtitle2" fontWeight={600}>
              {activeMeta?.label ?? 'Unknown'}
            </Typography>
          </Box>
        </Button>
      </Tooltip>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
        <Box px={2} py={1.5}>
          <Typography variant="overline" color="text.secondary">
            Select Network
          </Typography>
        </Box>
        <Divider />
        {availableChains.map((id) => {
          const meta = getChainMeta(id);
          if (!meta) return null;
          const isActive = id === activeChainId;
          return (
            <MenuItem key={id} onClick={() => handleSelect(id)} selected={isActive} sx={{ gap: 1 }}>
              <ListItemIcon>
                <Avatar
                  sx={{
                    width: 28,
                    height: 28,
                    fontSize: 12,
                    bgcolor: meta ? 'rgba(15, 118, 110, 0.1)' : 'action.hover',
                  }}
                >
                  {meta.nativeSymbol}
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary={meta.label}
                secondary={meta.nativeSymbol}
                primaryTypographyProps={{ fontWeight: 600 }}
              />
              {isActive ? <CheckCircleOutline color="success" fontSize="small" /> : null}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
