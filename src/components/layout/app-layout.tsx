'use client';

import { useState } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
  Button,
  Chip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  SwapHoriz as SwapIcon,
  AccountBalance as LendIcon,
  Agriculture as FarmIcon,
  CurrencyExchange as StablecoinIcon,
  AccountBalanceWallet as PortfolioIcon,
  Settings as SettingsIcon,
  AccountBalanceWallet as WalletIcon,
} from '@mui/icons-material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter, usePathname } from 'next/navigation';
import { useAccount, useDisconnect } from 'wagmi';

const drawerWidth = 240;

const navigationItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Swap', icon: <SwapIcon />, path: '/swap' },
  { text: 'Lend', icon: <LendIcon />, path: '/lend' },
  { text: 'Farm', icon: <FarmIcon />, path: '/farm' },
  { text: 'Stablecoins', icon: <StablecoinIcon />, path: '/stablecoins' },
  { text: 'Portfolio', icon: <PortfolioIcon />, path: '/portfolio' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          DeFi Superapp
        </Typography>
      </Toolbar>
      <List>
        {navigationItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={pathname === item.path}
              onClick={() => {
                router.push(item.path);
                setMobileOpen(false);
              }}
              sx={{
                '&.Mui-selected': {
                  background: 'linear-gradient(135deg, rgba(111, 76, 255, 0.15), rgba(111, 76, 255, 0.08))',
                  borderRight: '3px solid rgba(111, 76, 255, 0.8)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, rgba(111, 76, 255, 0.2), rgba(111, 76, 255, 0.12))',
                  }
                },
                '&:hover': {
                  background: 'linear-gradient(135deg, rgba(111, 76, 255, 0.08), rgba(111, 76, 255, 0.04))',
                }
              }}
            >
              <ListItemIcon sx={{ 
                color: pathname === item.path ? 'rgba(111, 76, 255, 0.9)' : 'inherit' 
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* Light purple gradient background */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(111, 76, 255, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(111, 76, 255, 0.06) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(111, 76, 255, 0.04) 0%, transparent 50%),
            #F8F9FF
          `,
          zIndex: -1,
        }}
      />
      
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: 'background.paper',
          color: 'text.primary',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {navigationItems.find(item => item.path === pathname)?.text || 'DeFi Superapp'}
          </Typography>
          
          {/* Enhanced Wallet Connection */}
          <Box display="flex" alignItems="center" gap={2}>
            {isConnected && (
              <Chip
                icon={<WalletIcon />}
                label={`${address?.slice(0, 6)}...${address?.slice(-4)}`}
                color="primary"
                variant="outlined"
                sx={{
                  background: 'rgba(111, 76, 255, 0.1)',
                  border: '1px solid rgba(111, 76, 255, 0.3)',
                  fontWeight: 600,
                }}
              />
            )}
            <ConnectButton />
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: 'background.paper',
              borderRight: `1px solid ${theme.palette.divider}`,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: 'background.paper',
              borderRight: `1px solid ${theme.palette.divider}`,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          backgroundColor: 'transparent',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
