'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Alert,
  Divider,
} from '@mui/material';
import {
  CheckCircle,
  Error,
  AccountBalanceWallet,
  SwapHoriz,
  Agriculture,
  AccountBalance,
} from '@mui/icons-material';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export function WalletConnectionTest() {
  const { address, isConnected, status } = useAccount();
  const { connect, connectors, error } = useConnect();
  const { disconnect } = useDisconnect();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Wallet Connection Status
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          {/* Connection Status */}
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body2" fontWeight={600}>
              Status:
            </Typography>
            <Chip
              label={isConnected ? 'Connected' : 'Disconnected'}
              color="primary"
              variant="outlined"
              icon={isConnected ? <CheckCircle /> : <Error />}
            />
          </Box>

          {/* Wallet Address */}
          {isConnected && address && (
            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="body2" fontWeight={600}>
                Address:
              </Typography>
              <Typography variant="body2" fontFamily="monospace" color="text.secondary">
                {address.slice(0, 6)}...{address.slice(-4)}
              </Typography>
            </Box>
          )}

          {/* Connection Actions */}
          <Box display="flex" gap={1}>
            {!isConnected ? (
              connectors.map((connector) => (
                <Button
                  key={connector.id}
                  variant="contained"
                  size="small"
                  onClick={() => connect({ connector })}
                  disabled={!connector.ready}
                  startIcon={<AccountBalanceWallet />}
                >
                  Connect {connector.name}
                </Button>
              ))
            ) : (
              <Button
                variant="outlined"
                size="small"
                onClick={() => disconnect()}
                startIcon={<Error />}
              >
                Disconnect
              </Button>
            )}
          </Box>

          {/* Error Display */}
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error.message}
            </Alert>
          )}

          <Divider sx={{ my: 2 }} />

          {/* Quick Actions */}
          {isConnected && (
            <Box>
              <Typography variant="body2" fontWeight={600} mb={1}>
                Quick Actions:
              </Typography>
              <Box display="flex" gap={1} flexWrap="wrap">
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<SwapHoriz />}
                >
                  Swap
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Agriculture />}
                >
                  Farm
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<AccountBalance />}
                >
                  Lend
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
