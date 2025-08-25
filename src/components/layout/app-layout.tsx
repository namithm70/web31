'use client';

import { useState } from 'react';
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
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountBalanceWallet,
} from '@mui/icons-material';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useRouter, usePathname } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Swap', href: '/swap' },
  { name: 'Farm', href: '/farm' },
  { name: 'Lend', href: '/lend' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Stablecoins', href: '/stablecoins' },
  { name: 'Settings', href: '/settings' },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { themeMode } = useTheme();

  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleNavigation = (href: string) => {
    router.push(href);
    handleMobileMenuClose();
  };

  const handleWalletConnect = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect({ connector: connectors[0] });
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout', { method: 'POST' });
    } finally {
      if (isConnected) disconnect();
      router.push('/auth/signin');
    }
  };

  const isAuthRoute = pathname.startsWith('/auth');
  const isLanding = pathname === '/';
  const showNav = !isAuthRoute && !isLanding;
  const showWalletChip = showNav; // only after login (protected pages)

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
          <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 0 } }}>
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
              {showNav && navigationItems.map((item, index) => (
                <Slide
                  key={item.name}
                  direction="down"
                  in
                  timeout={600 + index * 100}
                >
                  <Fade in timeout={800 + index * 100}>
                    <Button
                      key={item.name}
                      onClick={() => handleNavigation(item.href)}
                      sx={{
                        color: 'text.primary',
                        fontWeight: 500,
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          left: '50%',
                          width: 0,
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
              ))}
            </Box>

            {/* Wallet Connection & Mobile Menu */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: isConnected ? 'text.primary' : 'primary.main',
              }}
            >
              {/* Wallet Connection */}
              {showWalletChip && (
                <Fade in timeout={1000}>
                  <Chip
                    icon={<AccountBalanceWallet />}
                    label={isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : 'Connect Wallet'}
                    onClick={handleWalletConnect}
                    sx={{
                      background: isConnected ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                      color: isConnected ? 'success.main' : 'primary.main',
                      border: `1px solid ${isConnected ? 'rgba(76, 175, 80, 0.3)' : 'rgba(255, 255, 255, 0.2)'}`,
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      },
                    }}
                  />
                </Fade>
              )}

              {showNav && (
                <>
                  <ThemeToggle />
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
            minWidth: 200,
          },
        }}
      >
        {showNav && navigationItems.map((item) => (
          <Fade key={item.name} in timeout={300}>
            <MenuItem
              onClick={() => handleNavigation(item.href)}
              sx={{
                fontWeight: 500,
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
        ))}
      </Menu>

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
