'use client';

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Divider,
} from '@mui/material';
import {
  AccountBalanceWallet,
  CheckCircle,
  Info,
  Download,
  Link,
} from '@mui/icons-material';
import { useAccount } from 'wagmi';
import { useTheme } from '@/contexts/ThemeContext';

export function WalletConnectionGuide() {
  const { isConnected } = useAccount();
  const { themeMode } = useTheme();

  if (isConnected) {
    return (
      <Card sx={{ 
        background: themeMode === 'dark' 
          ? 'rgba(255, 255, 255, 0.1)' 
          : 'rgba(139, 92, 246, 0.1)',
        border: themeMode === 'dark'
          ? '1px solid rgba(255, 255, 255, 0.2)'
          : '1px solid rgba(139, 92, 246, 0.3)',
        borderRadius: 2,
      }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <CheckCircle color="success" />
            <Typography variant="h6" sx={{ color: 'text.primary' }}>
              Wallet Connected!
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Your wallet is successfully connected. You can now use all features of the DeFi Superapp.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ 
      background: themeMode === 'dark' 
        ? 'rgba(255, 255, 255, 0.1)' 
        : 'rgba(139, 92, 246, 0.1)',
      border: themeMode === 'dark'
        ? '1px solid rgba(255, 255, 255, 0.2)'
        : '1px solid rgba(139, 92, 246, 0.3)',
      borderRadius: 2,
    }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <AccountBalanceWallet sx={{ color: 'primary.main' }} />
          <Typography variant="h6" sx={{ color: 'text.primary' }}>
            Connect Your Wallet
          </Typography>
        </Box>

        <Alert severity="info" sx={{ 
          mb: 3, 
          background: themeMode === 'dark' 
            ? 'rgba(255, 255, 255, 0.1)' 
            : 'rgba(139, 92, 246, 0.1)' 
        }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            To use the DeFi Superapp, you need to connect a cryptocurrency wallet. 
            The app supports BSC (Binance Smart Chain), Ethereum, Polygon, and Arbitrum networks.
          </Typography>
        </Alert>

        <Typography variant="subtitle1" sx={{ color: 'text.primary', mb: 2, fontWeight: 600 }}>
          Step 1: Install a Wallet
        </Typography>

        <List sx={{ mb: 3 }}>
          <ListItem sx={{ px: 0 }}>
            <ListItemIcon>
              <Download sx={{ color: 'primary.main' }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
                  MetaMask (Recommended)
                </Typography>
              }
              secondary={
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Most popular browser wallet extension
                </Typography>
              }
            />
            <Button
              variant="outlined"
              size="small"
              href="https://metamask.io/download/"
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<Link />}
              sx={{
                color: 'primary.main',
                borderColor: themeMode === 'dark'
                  ? 'rgba(255, 255, 255, 0.3)'
                  : 'rgba(139, 92, 246, 0.5)',
                '&:hover': {
                  borderColor: themeMode === 'dark'
                    ? 'rgba(255, 255, 255, 0.5)'
                    : 'rgba(139, 92, 246, 0.7)',
                  background: themeMode === 'dark'
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(139, 92, 246, 0.05)',
                },
              }}
            >
              Download
            </Button>
          </ListItem>

          <ListItem sx={{ px: 0 }}>
            <ListItemIcon>
              <Download sx={{ color: 'primary.main' }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
                  WalletConnect
                </Typography>
              }
              secondary={
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Connect with mobile wallets
                </Typography>
              }
            />
            <Button
              variant="outlined"
              size="small"
              href="https://walletconnect.com/"
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<Link />}
              sx={{
                color: 'primary.main',
                borderColor: themeMode === 'dark'
                  ? 'rgba(255, 255, 255, 0.3)'
                  : 'rgba(139, 92, 246, 0.5)',
                '&:hover': {
                  borderColor: themeMode === 'dark'
                    ? 'rgba(255, 255, 255, 0.5)'
                    : 'rgba(139, 92, 246, 0.7)',
                  background: themeMode === 'dark'
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(139, 92, 246, 0.05)',
                },
              }}
            >
              Learn More
            </Button>
          </ListItem>
        </List>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" sx={{ color: 'text.primary', mb: 2, fontWeight: 600 }}>
          Step 2: Connect Your Wallet
        </Typography>

        <List>
          <ListItem sx={{ px: 0 }}>
            <ListItemIcon>
              <Info sx={{ color: 'primary.main' }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1" sx={{ color: 'text.primary' }}>
                  Click the "Connect Wallet" button in the top navigation
                </Typography>
              }
            />
          </ListItem>

          <ListItem sx={{ px: 0 }}>
            <ListItemIcon>
              <Info sx={{ color: 'primary.main' }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1" sx={{ color: 'text.primary' }}>
                  Choose your preferred wallet from the list
                </Typography>
              }
            />
          </ListItem>

          <ListItem sx={{ px: 0 }}>
            <ListItemIcon>
              <Info sx={{ color: 'primary.main' }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1" sx={{ color: 'text.primary' }}>
                  Approve the connection in your wallet
                </Typography>
              }
            />
          </ListItem>
        </List>

        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 3, fontStyle: 'italic' }}>
          Need help? Check out our detailed wallet connection guide or contact support.
        </Typography>
      </CardContent>
    </Card>
  );
}
