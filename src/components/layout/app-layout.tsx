'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Slide,
  Fade,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountBalanceWallet,
  KeyboardCommandKey,
  Bolt,
} from '@mui/icons-material';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useRouter, usePathname } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';
import NetworkSelector from '@/components/layout/network-selector';
import NotificationCenter from '@/components/layout/notification-center';
import CommandPalette from '@/components/layout/command-palette';
import { useAppStore } from '@/store';

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', description: 'Portfolio and protocol KPIs', chips: ['overview'] },
  { name: 'Swap', href: '/swap', description: 'Trade tokens across supported DEXes', chips: ['dex', 'routing'] },
  { name: 'Farm', href: '/farm', description: 'Yield farming and staking incentives', chips: ['yield'] },
  { name: 'Lend', href: '/lend', description: 'Supply & borrow across money markets', chips: ['lending'] },
  { name: 'Portfolio', href: '/portfolio', description: 'Track balances across chains', chips: ['positions'] },
  { name: 'Stablecoins', href: '/stablecoins', description: 'Optimise yields for stable assets', chips: ['stable'] },
  { name: 'Settings', href: '/settings', description: 'Manage preferences and security', chips: ['preferences'] },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { themeMode, toggleTheme } = useTheme();
  const { slippage, gasMode, setSlippage, setGasMode } = useAppStore((state) => ({
    slippage: state.slippage,
    gasMode: state.gasMode,
    setSlippage: state.setSlippage,
    setGasMode: state.setGasMode,
  }));

  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);

  const handleMobileMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  }, []);

  const handleMobileMenuClose = useCallback(() => {
    setMobileMenuAnchor(null);
  }, []);

  const handleNavigation = useCallback((href: string) => {
    router.push(href);
    handleMobileMenuClose();
  }, [router, handleMobileMenuClose]);

  const handleWalletConnect = useCallback(() => {
    if (isConnected) {
      disconnect();
    } else if (connectors?.length) {
      connect({ connector: connectors[0] });
    }
  }, [isConnected, disconnect, connect, connectors]);

  const handleSignOut = useCallback(async () => {
    try {
      await fetch('/api/auth/signout', { method: 'POST' });
    } finally {
      if (isConnected) disconnect();
      router.push('/auth/signin');
    }
  }, [disconnect, isConnected, router]);

  const isAuthRoute = pathname.startsWith('/auth');
  const isLanding = pathname === '/';
  const showNav = !isAuthRoute && !isLanding;
  const showWalletChip = showNav; // only after login (protected pages)

  const paletteItems = useMemo(() => {
    const navItems = navigationItems.map((item) => ({
      id: `nav-${item.href}`,
      label: item.name,
      description: item.description,
      chips: item.chips,
      onSelect: () => handleNavigation(item.href),
    }));

    const actions = [
      {
        id: 'toggle-theme',
        label: `Switch to ${themeMode === 'light' ? 'dark' : 'light'} mode`,
        description: 'Flip the global colour scheme',
        chips: ['preferences'],
        onSelect: toggleTheme,
      },
      {
        id: 'connect-wallet',
        label: isConnected ? 'Disconnect wallet' : 'Connect wallet',
        description: isConnected ? 'Disconnect current wallet session' : 'Trigger wallet selector',
        chips: ['wallet'],
        onSelect: handleWalletConnect,
      },
      {
        id: 'set-gas-fast',
        label: 'Set gas mode to Fast',
        description: `Current: ${gasMode}`,
        chips: ['transaction'],
        onSelect: () => setGasMode('fast'),
      },
      {
        id: 'set-slippage-low',
        label: 'Limit slippage to 0.3%',
        description: `Current: ${slippage}%`,
        chips: ['swap'],
        onSelect: () => setSlippage(0.3),
      },
      {
        id: 'sign-out',
        label: 'Sign out securely',
        description: 'Terminate session and disconnect wallet',
        chips: ['account'],
        onSelect: handleSignOut,
      },
    ];

    return [...navItems, ...actions];
  }, [gasMode, handleNavigation, handleSignOut, handleWalletConnect, isConnected, setGasMode, setSlippage, slippage, themeMode, toggleTheme]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && (event.key === 'k' || event.key === 'K')) {
        event.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const renderNavButton = (item: typeof navigationItems[number], index: number) => {
    const isActive = pathname.startsWith(item.href);
    return (
      <Slide key={item.name} direction="down" in timeout={600 + index * 100}>
        <Fade in timeout={800 + index * 100}>
          <Button
            onClick={() => handleNavigation(item.href)}
            sx={{
              color: isActive ? 'primary.main' : 'text.primary',
              fontWeight: isActive ? 700 : 500,
              position: 'relative',
              backgroundColor: isActive ? 'action.hover' : 'transparent',
              borderRadius: 2,
              px: 1.5,
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 4,
                left: '50%',
                width: isActive ? '100%' : 0,
                height: 2,
                background: themeMode === 'dark'
                  ? 'linear-gradient(135deg, #FFFFFF 0%, #CCCCCC 100%)'
                  : 'linear-gradient(135deg, #000000 0%, #333333 100%)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: 'translateX(-50%)',
              },
              '&:hover::after': {
                width: '100%',
              },
              '&:hover': {
                background: themeMode === 'dark'
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(0, 0, 0, 0.04)',
                transform: 'translateY(-1px)',
              },
            }}
          >
            {item.name}
          </Button>
        </Fade>
      </Slide>
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: themeMode === 'dark'
            ? 'rgba(0, 0, 0, 0.95)'
            : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: themeMode === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.08)'
            : '1px solid rgba(0, 0, 0, 0.06)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 0 }, gap: 2, flexWrap: 'wrap' }}>
            {/* Logo */}
            <Fade in timeout={800}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 700,
                  background: themeMode === 'dark'
                    ? 'linear-gradient(135deg, #FFFFFF 0%, #CCCCCC 100%)'
                    : 'linear-gradient(135deg, #000000 0%, #333333 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  cursor: 'pointer',
                }}
                onClick={() => router.push('/')}
              >
                DeFI App
              </Typography>
            </Fade>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              {showNav && navigationItems.map((item, index) => renderNavButton(item, index))}
            </Box>

            {/* Right Controls */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                flexGrow: { xs: 1, sm: 0 },
                justifyContent: { xs: 'flex-end', md: 'flex-end' },
                color: isConnected ? 'text.primary' : 'primary.main',
              }}
            >
              {showNav && (
                <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 1.5, mr: 1.5 }}>
                  <Chip
                    label={`Gas: ${gasMode}`}
                    size="small"
                    variant="outlined"
                    sx={{ fontWeight: 600, borderRadius: 2 }}
                  />
                  <Chip
                    label={`Slippage: ${slippage}%`}
                    size="small"
                    variant="outlined"
                    sx={{ fontWeight: 600, borderRadius: 2 }}
                  />
                </Box>
              )}

              {showNav && (
                <>
                  <NetworkSelector />
                  <NotificationCenter />
                  <Tooltip title="Open command palette (⌘K / Ctrl+K)" arrow>
                    <IconButton onClick={() => setPaletteOpen(true)}>
                      <KeyboardCommandKey />
                    </IconButton>
                  </Tooltip>
                </>
              )}

              {/* Wallet Connection */}
              {showWalletChip && (
                <Fade in timeout={1000}>
                  <Chip
                    icon={<AccountBalanceWallet />}
                    label={isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : 'Connect Wallet'}
                    onClick={handleWalletConnect}
                    sx={{
                      background: isConnected
                        ? 'rgba(76, 175, 80, 0.1)'
                        : themeMode === 'dark'
                          ? 'rgba(255, 255, 255, 0.1)'
                          : 'rgba(0, 0, 0, 0.05)',
                      color: isConnected ? 'success.main' : 'primary.main',
                      border: `1px solid ${isConnected
                        ? 'rgba(76, 175, 80, 0.3)'
                        : themeMode === 'dark'
                          ? 'rgba(255, 255, 255, 0.2)'
                          : 'rgba(0, 0, 0, 0.1)'}`,
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: themeMode === 'dark'
                          ? '0 4px 12px rgba(255, 255, 255, 0.1)'
                          : '0 4px 12px rgba(0, 0, 0, 0.15)',
                      },
                    }}
                  />
                </Fade>
              )}

              {showNav && (
                <>
                  <ThemeToggle />
                  <Tooltip title="Quick DeFi actions" arrow>
                    <IconButton onClick={() => setPaletteOpen(true)} color="primary">
                      <Bolt />
                    </IconButton>
                  </Tooltip>
                  <Button variant="outlined" size="small" onClick={handleSignOut} sx={{ ml: 1 }}>
                    Sign out
                  </Button>
                </>
              )}

              {/* Mobile Menu Button */}
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMobileMenuOpen}
                sx={{ display: { md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Menu */}
      <Menu
        anchorEl={mobileMenuAnchor}
        open={Boolean(mobileMenuAnchor)}
        onClose={handleMobileMenuClose}
        sx={{
          '& .MuiPaper-root': {
            background: themeMode === 'dark' ? '#111111' : '#FFFFFF',
            backdropFilter: 'blur(20px)',
            border: themeMode === 'dark'
              ? '1px solid rgba(255, 255, 255, 0.08)'
              : '1px solid rgba(0, 0, 0, 0.08)',
            borderRadius: 3,
            boxShadow: themeMode === 'dark'
              ? '0 8px 32px rgba(0, 0, 0, 0.5)'
              : '0 8px 32px rgba(0, 0, 0, 0.12)',
            minWidth: 220,
            p: 1,
          },
        }}
      >
        {showNav && (
          <MenuItem onClick={() => setPaletteOpen(true)} sx={{ gap: 1 }}>
            <KeyboardCommandKey fontSize="small" />
            Command Palette
          </MenuItem>
        )}
        {showNav && navigationItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Fade key={item.name} in timeout={300}>
              <MenuItem
                onClick={() => handleNavigation(item.href)}
                sx={{
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'primary.main' : 'text.primary',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    background: themeMode === 'dark'
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                {item.name}
              </MenuItem>
            </Fade>
          );
        })}
      </Menu>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} items={paletteItems} />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          background: themeMode === 'dark'
            ? 'linear-gradient(135deg, #000000 0%, #111111 50%, #000000 100%)'
            : 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <Fade in timeout={600}>
          <Container maxWidth="xl" sx={{ py: 4 }}>
            {children}
          </Container>
        </Fade>
      </Box>
    </Box>
  );
}
