'use client';

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  CheckCircle,
  Error,
  ContentCopy,
  Refresh,
} from '@mui/icons-material';
import { useAccount, useConnect, useDisconnect, Connector } from 'wagmi';

export function WalletConnectionTest() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = (connector: Connector) => {
    connect({ connector });
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
    }
  };

  const getShortAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Card className="animate-fade-in-up" sx={{ mb: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight={600}>
            Wallet Connection
          </Typography>
          <IconButton size="small">
            <Refresh />
          </IconButton>
        </Box>

        {isConnected ? (
          <Box>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <CheckCircle sx={{ color: 'text.primary' }} />
              <Typography variant="body1" fontWeight={600}>
                Connected
              </Typography>
              <Chip
                label="Active"
                color="primary"
                size="small"
                variant="outlined"
              />
            </Box>

            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Typography variant="body2" color="text.secondary">
                Address:
              </Typography>
              <Typography variant="body2" fontWeight={600} fontFamily="monospace">
                {address ? getShortAddress(address) : 'Unknown'}
              </Typography>
              <Tooltip title="Copy Address">
                <IconButton size="small" onClick={copyAddress}>
                  <ContentCopy />
                </IconButton>
              </Tooltip>
            </Box>

            <Box display="flex" gap={1}>
              <Button
                variant="outlined"
                size="small"
                onClick={handleDisconnect}
              >
                Disconnect
              </Button>
              <Button
                variant="contained"
                size="small"
              >
                View Portfolio
              </Button>
            </Box>
          </Box>
        ) : (
          <Box>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <Error sx={{ color: 'text.secondary' }} />
              <Typography variant="body1" fontWeight={600}>
                Not Connected
              </Typography>
              <Chip
                label="Inactive"
                color="primary"
                size="small"
                variant="outlined"
              />
            </Box>

            <Typography variant="body2" color="text.secondary" mb={2}>
              Connect your wallet to start using DeFi features
            </Typography>

            <Box display="flex" gap={1} flexWrap="wrap">
              {connectors.map((connector) => (
                <Button
                  key={connector.id}
                  variant="outlined"
                  size="small"
                  onClick={() => handleConnect(connector)}
                  disabled={!connector.ready}
                >
                  {connector.name}
                </Button>
              ))}
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
