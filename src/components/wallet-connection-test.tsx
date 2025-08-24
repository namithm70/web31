'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Alert,
  AlertTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  CheckCircle,
  Error,
  AccountBalanceWallet,
  SwapHoriz,
  AccountBalance,
  Agriculture,
} from '@mui/icons-material';
import { useAccount, useBalance, useChainId, useSwitchChain } from 'wagmi';

export function WalletConnectionTest() {
  const { address, isConnected, connector } = useAccount();
  const chainId = useChainId();
  const { chains, switchChain } = useSwitchChain();
  const { data: balance } = useBalance({
    address,
  });
  const [testResults, setTestResults] = useState<{
    connection: boolean;
    network: boolean;
    balance: boolean;
  }>({
    connection: false,
    network: false,
    balance: false,
  });

  const runTests = () => {
    setTestResults({
      connection: isConnected,
      network: !!chainId,
      balance: !!balance,
    });
  };

  const getSupportedChains = () => {
    return chains.map((c: any) => c.name).join(', ');
  };

  if (!isConnected) {
    return (
      <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom fontWeight={700}>
            <AccountBalanceWallet sx={{ mr: 1, verticalAlign: 'middle' }} />
            Wallet Connection Test
          </Typography>
          <Alert severity="info" sx={{ mt: 2 }}>
            <AlertTitle>Connect Your Wallet</AlertTitle>
            Please connect your wallet using the "Connect Wallet" button in the top-right corner to run the connection tests.
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom fontWeight={700}>
          <AccountBalanceWallet sx={{ mr: 1, verticalAlign: 'middle' }} />
          Wallet Connection Test
        </Typography>

        {/* Connection Status */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Connection Status
          </Typography>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Chip
              icon={<CheckCircle />}
              label="Connected"
              color="success"
              variant="outlined"
            />
            <Typography variant="body2" color="text.secondary">
              Wallet: {connector?.name || 'Unknown'}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" fontFamily="monospace">
            Address: {address}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Network Information */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Network Information
          </Typography>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Chip
              label={`Chain ID: ${chainId}`}
              color="primary"
              variant="outlined"
            />
            <Typography variant="body2" color="text.secondary">
              Chain ID: {chainId}
            </Typography>
          </Box>
          
          <Typography variant="body2" color="text.secondary" mb={2}>
            Supported Networks: {getSupportedChains()}
          </Typography>

          {chains.length > 1 && (
            <Box display="flex" gap={1} flexWrap="wrap">
              {chains.map((c: any) => (
                <Button
                  key={c.id}
                  size="small"
                  variant={chainId === c.id ? "contained" : "outlined"}
                  onClick={() => switchChain?.({ chainId: c.id })}
                  disabled={chainId === c.id}
                >
                  {c.name}
                </Button>
              ))}
            </Box>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Balance Information */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Balance Information
          </Typography>
          {balance ? (
            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="h6" fontWeight={700}>
                {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ≈ ${(parseFloat(balance.formatted) * (balance.value ? Number(balance.value) : 0)).toFixed(2)} USD
              </Typography>
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Loading balance...
            </Typography>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Test Results */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Connection Tests
          </Typography>
          <Button
            variant="contained"
            onClick={runTests}
            sx={{ mb: 2 }}
          >
            Run Tests
          </Button>

          <List>
            <ListItem>
              <ListItemIcon>
                {testResults.connection ? (
                  <CheckCircle color="success" />
                ) : (
                  <Error color="error" />
                )}
              </ListItemIcon>
              <ListItemText
                primary="Wallet Connection"
                secondary={testResults.connection ? "✅ Connected successfully" : "❌ Connection failed"}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                {testResults.network ? (
                  <CheckCircle color="success" />
                ) : (
                  <Error color="error" />
                )}
              </ListItemIcon>
              <ListItemText
                primary="Network Detection"
                secondary={testResults.network ? "✅ Network detected" : "❌ Network not detected"}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                {testResults.balance ? (
                  <CheckCircle color="success" />
                ) : (
                  <Error color="error" />
                )}
              </ListItemIcon>
              <ListItemText
                primary="Balance Reading"
                secondary={testResults.balance ? "✅ Balance loaded" : "❌ Balance not available"}
              />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Available Features */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Available Features
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <SwapHoriz color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Token Swapping"
                secondary="Swap tokens across multiple DEXs"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AccountBalance color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Lending & Borrowing"
                secondary="Supply and borrow assets"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Agriculture color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Yield Farming"
                secondary="Stake and earn rewards"
              />
            </ListItem>
          </List>
        </Box>
      </CardContent>
    </Card>
  );
}
