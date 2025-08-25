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
import { usePathname, useRouter } from 'next/navigation';

const drawerWidth = 280;

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
  const router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setMobileOpen(false);
  };

  const drawer = (
    <div>
      <Toolbar sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
        <Typography 
          variant="h6" 
          noWrap 
          component="div"
          onClick={() => handleNavigation('/')}
          sx={{
            cursor: 'pointer',
            fontWeight: 700,
            color: '#000000',
            fontSize: '1.5rem',
            '&:hover': {
              color: '#666666',
            },
            transition: 'color 0.2s ease',
          }}
        >
          DeFi Superapp
        </Typography>
      </Toolbar>
      
      <Box sx={{ p: 2 }}>
        <Typography 
          variant="overline" 
          sx={{ 
            color: '#666666', 
            fontWeight: 600, 
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            mb: 2,
            display: 'block'
          }}
        >
          BROWSE BY
        </Typography>
      </Box>
      
      <List>
        {navigationItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={pathname === item.path}
              onClick={() => handleNavigation(item.path)}
              sx={{
                borderRadius: 8,
                margin: '4px 16px',
                '&.Mui-selected': {
                  background: 'rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  '&:hover': {
                    background: 'rgba(0, 0, 0, 0.1)',
                  }
                },
                '&:hover': {
                  background: 'rgba(0, 0, 0, 0.04)',
                  transform: 'translateX(4px)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <ListItemIcon sx={{ 
                color: pathname === item.path ? '#000000' : '#666666',
                transition: 'color 0.2s ease',
                minWidth: 40,
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{
                  '& .MuiTypography-root': {
                    fontWeight: pathname === item.path ? 600 : 500,
                    color: pathname === item.path ? '#000000' : '#666666',
                    fontSize: '0.875rem',
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
      
      {/* Clean white background */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: '#FFFFFF',
          zIndex: -1,
        }}
      />
      
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: '#FFFFFF',
          color: '#000000',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)',
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
          <Typography 
            variant="h6" 
            noWrap 
            component="div" 
            sx={{ 
              flexGrow: 1,
              cursor: 'pointer',
              fontWeight: 600,
              color: '#000000',
              '&:hover': {
                color: '#666666',
              },
              transition: 'color 0.2s ease',
            }}
            onClick={() => handleNavigation('/')}
          >
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
                  background: 'rgba(0, 0, 0, 0.04)',
                  border: '1px solid rgba(0, 0, 0, 0.2)',
                  fontWeight: 600,
                  color: '#000000',
                  '&:hover': {
                    background: 'rgba(0, 0, 0, 0.08)',
                    transform: 'scale(1.02)',
                  },
                  transition: 'all 0.2s ease',
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
              backgroundColor: '#FFFFFF',
              borderRight: '1px solid rgba(0, 0, 0, 0.08)',
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
              backgroundColor: '#FFFFFF',
              borderRight: '1px solid rgba(0, 0, 0, 0.08)',
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
          p: 4,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          backgroundColor: '#FFFFFF',
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
