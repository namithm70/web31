'use client';

import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Chip,
  CssBaseline,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  SwapHoriz,
  AccountBalance,
  Agriculture,
  CurrencyExchange,
  Settings,
} from '@mui/icons-material';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const drawerWidth = 240;

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const { address, isConnected } = useAccount();
  const pathname = usePathname();

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
                // router.push(item.path); // Removed useRouter
                setMobileOpen(false);
              }}
              sx={{
                borderRadius: 12,
                margin: '4px 8px',
                '&.Mui-selected': {
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  boxShadow: '0 4px 16px rgba(139, 92, 246, 0.2)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(59, 130, 246, 0.25))',
                  }
                },
                '&:hover': {
                  background: 'rgba(139, 92, 246, 0.1)',
                  backdropFilter: 'blur(10px)',
                  transform: 'translateX(4px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <ListItemIcon sx={{ 
                color: pathname === item.path ? '#8B5CF6' : '#E2E8F0',
                transition: 'color 0.3s ease',
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{
                  '& .MuiTypography-root': {
                    fontWeight: pathname === item.path ? 600 : 500,
                    color: pathname === item.path ? '#FFFFFF' : '#E2E8F0',
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* Glassmorphism background with wave patterns */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
            linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #1E1B4B 100%)
          `,
          zIndex: -1,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='rgba(139, 92, 246, 0.03)' fill-rule='evenodd'/%3E%3C/svg%3E")
            `,
            opacity: 0.6,
          },
        }}
      />
      
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: 'background.paper',
          color: 'text.primary',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
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
                icon={<AccountBalance />}
                label={`${address?.slice(0, 6)}...${address?.slice(-4)}`}
                color="primary"
                variant="outlined"
                sx={{
                  background: 'rgba(139, 92, 246, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  fontWeight: 600,
                  color: '#8B5CF6',
                  '&:hover': {
                    background: 'rgba(139, 92, 246, 0.2)',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.3s ease',
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
              borderRight: '1px solid rgba(0, 0, 0, 0.12)',
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
              borderRight: '1px solid rgba(0, 0, 0, 0.12)',
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
