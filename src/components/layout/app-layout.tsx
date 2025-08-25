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
import { useRouter } from 'next/navigation';

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
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
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
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  cursor: 'pointer',
                }}
                onClick={() => router.push('/')}
              >
                DeFi Superapp
              </Typography>
            </Fade>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              {navigationItems.map((item, index) => (
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
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          transform: 'translateX(-50%)',
                        },
                        '&:hover::after': {
                          width: '100%',
                        },
                        '&:hover': {
                          background: 'rgba(102, 126, 234, 0.08)',
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Wallet Connection */}
              <Fade in timeout={1000}>
                <Chip
                  icon={<AccountBalanceWallet />}
                  label={isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : 'Connect Wallet'}
                  onClick={handleWalletConnect}
                  sx={{
                    background: isConnected ? 'rgba(76, 175, 80, 0.1)' : 'rgba(102, 126, 234, 0.1)',
                    color: isConnected ? 'success.main' : 'primary.main',
                    border: `1px solid ${isConnected ? 'rgba(76, 175, 80, 0.3)' : 'rgba(102, 126, 234, 0.3)'}`,
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
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            minWidth: 200,
          },
        }}
      >
        {navigationItems.map((item) => (
          <Fade key={item.name} in timeout={300}>
            <MenuItem
              onClick={() => handleNavigation(item.href)}
              sx={{
                fontWeight: 500,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  background: 'rgba(102, 126, 234, 0.08)',
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
          background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
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
