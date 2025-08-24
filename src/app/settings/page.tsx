'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Switch,
  FormControlLabel,
  Button,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Notifications,
  Security,
  Language,
  Palette,
  AccountCircle,
  VpnKey,
  Help,
} from '@mui/icons-material';
import { useAppStore } from '@/store';

// Mock data
const networks = [
  { id: 1, name: 'Ethereum', enabled: true },
  { id: 137, name: 'Polygon', enabled: true },
  { id: 42161, name: 'Arbitrum', enabled: false },
];

const approvals = [
  {
    token: 'USDC',
    spender: 'Uniswap V3 Router',
    allowance: '∞',
    lastUsed: '2 hours ago',
  },
  {
    token: 'WETH',
    spender: 'Aave V3 Pool',
    allowance: '5.0 WETH',
    lastUsed: '1 day ago',
  },
];

export default function SettingsPage() {
  const [selectedChain, setSelectedChain] = useState(1);
  const [slippage, setSlippage] = useState(0.5);
  const [notifications, setNotifications] = useState({
    healthFactor: true,
    transactions: true,
    priceAlerts: false,
  });

  const handleUpdate = (token: string, spender: string) => {
    console.log('Update approval for', token, 'to', spender);
  };

  const handleRevoke = (token: string, spender: string) => {
    console.log('Revoke approval for', token, 'from', spender);
  };

  const handleClearCache = () => {
    console.log('Clearing cache...');
  };

  const handleExportData = () => {
    console.log('Exporting data...');
  };

  const handleResetSettings = () => {
    console.log('Resetting settings...');
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      {/* Network Settings */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Network Settings
          </Typography>
          
          <Box display="flex" flexDirection="column" gap={2}>
            {networks.map((network) => (
              <Box key={network.id} display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="body1">{network.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Chain ID: {network.id}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={2}>
                  <Typography variant="body2">
                    {selectedChain === network.id ? 'Active' : 'Inactive'}
                  </Typography>
                  <Switch
                    checked={network.enabled}
                    onChange={() => console.log('Toggle network', network.id)}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Trading Settings */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Trading Settings
          </Typography>
          
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Typography variant="body1">
              Slippage Tolerance
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <input
                type="number"
                value={slippage}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSlippage(parseFloat(e.target.value) || 0)}
                style={{ width: '50px', textAlign: 'center' }}
              />
              <Typography variant="body2">%</Typography>
            </Box>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Recommended: 0.5% - 1%
          </Typography>
        </CardContent>
      </Card>

      {/* Token Approvals */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Token Approvals
          </Typography>
          
          <Alert severity="info" sx={{ mb: 2 }}>
            Review and manage your token approvals for security
          </Alert>

          <List>
            {approvals.map((approval, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText
                  primary={approval.token}
                  secondary={
                    <>
                      <Typography variant="body2" color="text.secondary">
                        {approval.spender}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Allowance: {approval.allowance}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Last Used: {approval.lastUsed}
                      </Typography>
                    </>
                  }
                />
                <Box display="flex" gap={1}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleUpdate(approval.token, approval.spender)}
                  >
                    Update
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => handleRevoke(approval.token, approval.spender)}
                  >
                    Revoke
                  </Button>
                </Box>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Security Settings
          </Typography>
          
          <Box display="flex" flexDirection="column" gap={2}>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Require confirmation for large transactions (>$1000)"
            />
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Show transaction details before signing"
            />
            <FormControlLabel
              control={<Switch />}
              label="Share anonymous usage data for improvements"
            />
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Block known malicious contracts"
            />
          </Box>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Notifications
          </Typography>
          
          <Box display="flex" flexDirection="column" gap={2}>
            <FormControlLabel
              control={
                <Switch 
                  checked={notifications.healthFactor}
                  onChange={(e) => setNotifications(prev => ({ ...prev, healthFactor: e.target.checked }))}
                />
              }
              label="Health factor warnings"
            />
            <FormControlLabel
              control={
                <Switch 
                  checked={notifications.transactions}
                  onChange={(e) => setNotifications(prev => ({ ...prev, transactions: e.target.checked }))}
                />
              }
              label="Transaction confirmations"
            />
            <FormControlLabel
              control={
                <Switch 
                  checked={notifications.priceAlerts}
                  onChange={(e) => setNotifications(prev => ({ ...prev, priceAlerts: e.target.checked }))}
                />
              }
              label="Price alerts"
            />
          </Box>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Actions
          </Typography>
          
          <Box display="flex" gap={2} flexWrap="wrap">
            <Button
              variant="outlined"
              startIcon={<Help />}
              onClick={handleClearCache}
            >
              Clear Cache
            </Button>
            <Button
              variant="outlined"
              startIcon={<Help />}
              onClick={handleExportData}
            >
              Export Data
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<VpnKey />}
              onClick={handleResetSettings}
            >
              Reset Settings
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
