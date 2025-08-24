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

export function WalletConnectionGuide() {
  const { isConnected } = useAccount();

  if (isConnected) {
    return (
      <Card sx={{ 
        background: 'rgba(139, 92, 246, 0.1)',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        borderRadius: 2,
      }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <CheckCircle color="success" />
            <Typography variant="h6" sx={{ color: '#FFFFFF' }}>
              Wallet Connected!
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: '#E2E8F0' }}>
            Your wallet is successfully connected. You can now use all features of the DeFi Superapp.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ 
      background: 'rgba(139, 92, 246, 0.1)',
      border: '1px solid rgba(139, 92, 246, 0.3)',
      borderRadius: 2,
    }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <AccountBalanceWallet sx={{ color: '#8B5CF6' }} />
          <Typography variant="h6" sx={{ color: '#FFFFFF' }}>
            Connect Your Wallet
          </Typography>
        </Box>

        <Alert severity="info" sx={{ mb: 3, background: 'rgba(139, 92, 246, 0.1)' }}>
          <Typography variant="body2" sx={{ color: '#E2E8F0' }}>
            To use the DeFi Superapp, you need to connect a cryptocurrency wallet. 
            The app supports BSC (Binance Smart Chain), Ethereum, Polygon, and Arbitrum networks.
          </Typography>
        </Alert>

        <Typography variant="subtitle1" sx={{ color: '#FFFFFF', mb: 2, fontWeight: 600 }}>
          Step 1: Install a Wallet
        </Typography>

        <List sx={{ mb: 3 }}>
          <ListItem sx={{ px: 0 }}>
            <ListItemIcon>
              <Download sx={{ color: '#8B5CF6' }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1" sx={{ color: '#FFFFFF', fontWeight: 600 }}>
                  MetaMask (Recommended)
                </Typography>
              }
              secondary={
                <Typography variant="body2" sx={{ color: '#E2E8F0' }}>
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
                borderColor: 'rgba(139, 92, 246, 0.5)',
                color: '#8B5CF6',
                '&:hover': {
                  borderColor: '#8B5CF6',
                  background: 'rgba(139, 92, 246, 0.1)',
                }
              }}
            >
              Download
            </Button>
          </ListItem>

          <ListItem sx={{ px: 0 }}>
            <ListItemIcon>
              <Download sx={{ color: '#8B5CF6' }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1" sx={{ color: '#FFFFFF', fontWeight: 600 }}>
                  Coinbase Wallet
                </Typography>
              }
              secondary={
                <Typography variant="body2" sx={{ color: '#E2E8F0' }}>
                  User-friendly wallet from Coinbase
                </Typography>
              }
            />
            <Button
              variant="outlined"
              size="small"
              href="https://www.coinbase.com/wallet"
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<Link />}
              sx={{
                borderColor: 'rgba(139, 92, 246, 0.5)',
                color: '#8B5CF6',
                '&:hover': {
                  borderColor: '#8B5CF6',
                  background: 'rgba(139, 92, 246, 0.1)',
                }
              }}
            >
              Download
            </Button>
          </ListItem>
        </List>

        <Divider sx={{ borderColor: 'rgba(139, 92, 246, 0.3)', my: 2 }} />

        <Typography variant="subtitle1" sx={{ color: '#FFFFFF', mb: 2, fontWeight: 600 }}>
          Step 2: Connect to DeFi Superapp
        </Typography>

        <List>
          <ListItem sx={{ px: 0 }}>
            <ListItemIcon>
              <Info sx={{ color: '#8B5CF6' }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1" sx={{ color: '#FFFFFF' }}>
                  Click &quot;Connect Wallet&quot; in the top-right corner
                </Typography>
              }
            />
          </ListItem>

          <ListItem sx={{ px: 0 }}>
            <ListItemIcon>
              <Info sx={{ color: '#8B5CF6' }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1" sx={{ color: '#FFFFFF' }}>
                  Select your wallet from the dropdown
                </Typography>
              }
            />
          </ListItem>

          <ListItem sx={{ px: 0 }}>
            <ListItemIcon>
              <Info sx={{ color: '#8B5CF6' }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1" sx={{ color: '#FFFFFF' }}>
                  Approve the connection in your wallet
                </Typography>
              }
            />
          </ListItem>
        </List>

        <Alert severity="warning" sx={{ mt: 3, background: 'rgba(255, 193, 7, 0.1)' }}>
          <Typography variant="body2" sx={{ color: '#E2E8F0' }}>
            <strong>Security Tip:</strong> Never share your private keys or seed phrase with anyone. 
            Only connect to trusted applications.
          </Typography>
        </Alert>
      </CardContent>
    </Card>
  );
}
