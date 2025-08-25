'use client';

import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Chip,
  CssBaseline,
  Menu,
  MenuItem,
  Button,
  Container,
  Fade,
  Slide,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  SwapHoriz,
  AccountBalance,
  Agriculture,
  CurrencyExchange,
  Settings,
  KeyboardArrowDown,
} from '@mui/icons-material';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const navigationItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
  { text: 'Swap', icon: <SwapHoriz />, path: '/swap' },
  { text: 'Lend', icon: <AccountBalance />, path: '/lend' },
  { text: 'Farm', icon: <Agriculture />, path: '/farm' },
  { text: 'Stablecoins', icon: <CurrencyExchange />, path: '/stablecoins' },
  { text: 'Portfolio', icon: <AccountBalance />, path: '/portfolio' },
  { text: 'Settings', icon: <Settings />, path: '/settings' },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  const [desktopMenuAnchor, setDesktopMenuAnchor] = useState<null | HTMLElement>(null);
  const { address, isConnected } = useAccount();
  const pathname = usePathname();
  const router = useRouter();

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleDesktopMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setDesktopMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMobileMenuAnchor(null);
    setDesktopMenuAnchor(null);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    handleMenuClose();
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      
      {/* Modern gradient background */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)
          `,
          zIndex: -1,
        }}
      />
      
      {/* Apple-style top navigation */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
          color: '#000000',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ 
            justifyContent: 'space-between',
            px: { xs: 0, sm: 2 },
            py: 1,
          }}>
            {/* Logo */}
            <Fade in timeout={800}>
              <Typography 
                variant="h6" 
                component="div"
                onClick={() => handleNavigation('/')}
                sx={{
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: { xs: '1.25rem', sm: '1.5rem' },
                  color: '#000000',
                  '&:hover': {
                    color: '#666666',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                DeFi Superapp
              </Typography>
            </Fade>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
              <Fade in timeout={1000}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {navigationItems.map((item, index) => (
                    <Slide direction="down" in timeout={800 + index * 100} key={item.text}>
                      <Button
                        onClick={() => handleNavigation(item.path)}
                        sx={{
                          color: pathname === item.path ? '#000000' : '#666666',
                          fontWeight: pathname === item.path ? 600 : 500,
                          fontSize: '0.875rem',
                          px: 2,
                          py: 1,
                          borderRadius: 2,
                          textTransform: 'none',
                          position: 'relative',
                          '&:hover': {
                            background: 'rgba(0, 0, 0, 0.04)',
                            color: '#000000',
                            transform: 'translateY(-1px)',
                          },
                          '&::after': pathname === item.path ? {
                            content: '""',
                            position: 'absolute',
                            bottom: 0,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '20px',
                            height: '2px',
                            background: '#000000',
                            borderRadius: '1px',
                          } : {},
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      >
                        {item.text}
                      </Button>
                    </Slide>
                  ))}
                </Box>
              </Fade>
            </Box>

            {/* Mobile Menu Button */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                onClick={handleMobileMenuOpen}
                sx={{
                  color: '#000000',
                  '&:hover': {
                    background: 'rgba(0, 0, 0, 0.04)',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Wallet Connection */}
            <Fade in timeout={1200}>
              <Box display="flex" alignItems="center" gap={2}>
                {isConnected && (
                  <Chip
                    icon={<AccountBalance />}
                    label={`${address?.slice(0, 6)}...${address?.slice(-4)}`}
                    variant="outlined"
                    sx={{
                      background: 'rgba(0, 0, 0, 0.04)',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      fontWeight: 600,
                      color: '#000000',
                      '&:hover': {
                        background: 'rgba(0, 0, 0, 0.08)',
                        transform: 'scale(1.02)',
                      },
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  />
                )}
                <ConnectButton />
              </Box>
            </Fade>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Menu */}
      <Menu
        anchorEl={mobileMenuAnchor}
        open={Boolean(mobileMenuAnchor)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            borderRadius: 3,
            mt: 1,
            minWidth: 200,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }
        }}
        TransitionComponent={Fade}
        transitionDuration={300}
      >
        {navigationItems.map((item, index) => (
          <MenuItem
            key={item.text}
            onClick={() => handleNavigation(item.path)}
            selected={pathname === item.path}
            sx={{
              py: 1.5,
              px: 2,
              borderRadius: 1,
              mx: 1,
              my: 0.5,
              '&.Mui-selected': {
                background: 'rgba(0, 0, 0, 0.08)',
                color: '#000000',
                fontWeight: 600,
              },
              '&:hover': {
                background: 'rgba(0, 0, 0, 0.04)',
              },
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {item.icon}
              <Typography variant="body2" fontWeight={pathname === item.path ? 600 : 500}>
                {item.text}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: { xs: 8, sm: 9 },
          pb: 4,
          px: { xs: 2, sm: 3, md: 4 },
          background: 'transparent',
          minHeight: '100vh',
        }}
      >
        <Fade in timeout={600}>
          <Container maxWidth="xl" sx={{ py: 2 }}>
            {children}
          </Container>
        </Fade>
      </Box>
    </Box>
  );
}
