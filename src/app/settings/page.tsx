'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Settings,
  NetworkCheck,
  Speed,
  Security,
  ExpandMore,
  Delete,
  Refresh,
} from '@mui/icons-material';
import { useAppStore } from '@/store';

function NetworkSettings() {
  const { selectedChain, setSelectedChain } = useAppStore();
  
  const networks = [
    { id: 1, name: 'Ethereum', symbol: 'ETH', enabled: true },
    { id: 137, name: 'Polygon', symbol: 'MATIC', enabled: true },
    { id: 42161, name: 'Arbitrum', symbol: 'ARB', enabled: true },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          <NetworkCheck sx={{ mr: 1, verticalAlign: 'middle' }} />
          Network Settings
        </Typography>
        
        {networks.map((network) => (
          <Box key={network.id} display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Box>
              <Typography variant="body1">{network.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {network.symbol}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              <Chip 
                label={selectedChain === network.id ? 'Active' : 'Inactive'} 
                color={selectedChain === network.id ? 'primary' : 'default'}
                size="small"
              />
              <Switch
                checked={network.enabled}
                onChange={() => setSelectedChain(network.id)}
              />
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}

function TradingSettings() {
  const { slippage, setSlippage, gasMode, setGasMode } = useAppStore();

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          <Speed sx={{ mr: 1, verticalAlign: 'middle' }} />
          Trading Settings
        </Typography>
        
        <Box mb={3}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Slippage Tolerance
          </Typography>
          <TextField
            type="number"
            value={slippage}
            onChange={(e) => setSlippage(parseFloat(e.target.value) || 0)}
            InputProps={{
              endAdornment: <Typography variant="body2">%</Typography>,
            }}
            fullWidth
            size="small"
          />
          <Typography variant="body2" color="text.secondary" mt={1}>
            Recommended: 0.5% - 1%
          </Typography>
        </Box>

        <Box mb={3}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Gas Mode
          </Typography>
          <Box display="flex" gap={1}>
            {(['safe', 'average', 'fast'] as const).map((mode) => (
              <Button
                key={mode}
                variant={gasMode === mode ? 'contained' : 'outlined'}
                size="small"
                onClick={() => setGasMode(mode)}
                sx={{ textTransform: 'capitalize' }}
              >
                {mode}
              </Button>
            ))}
          </Box>
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Auto-approve Tokens
          </Typography>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Automatically approve tokens for trading"
          />
        </Box>
      </CardContent>
    </Card>
  );
}

function ApprovalsManager() {
  const [approvals] = useState([
    {
      token: 'USDC',
      spender: 'Uniswap V3 Router',
      allowance: '1000.00',
      lastUsed: '2 hours ago',
    },
    {
      token: 'ETH',
      spender: 'Aave V3 Pool',
      allowance: '5.0',
      lastUsed: '1 day ago',
    },
  ]);

  const handleRevoke = (token: string, spender: string) => {
    // TODO: Implement revoke logic
    console.log('Revoking approval for', token, 'from', spender);
  };

  const handleUpdate = (token: string, spender: string) => {
    // TODO: Implement update logic
    console.log('Updating approval for', token, 'from', spender);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          <Security sx={{ mr: 1, verticalAlign: 'middle' }} />
          Token Approvals
        </Typography>
        
        <Alert severity="info" sx={{ mb: 2 }}>
          Review and manage token approvals for enhanced security
        </Alert>

        <TableContainer component={Paper} sx={{ backgroundColor: 'background.paper' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Token</TableCell>
                <TableCell>Spender</TableCell>
                <TableCell align="right">Allowance</TableCell>
                <TableCell align="right">Last Used</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {approvals.map((approval, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography variant="body1">{approval.token}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {approval.spender}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body1">{approval.allowance}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" color="text.secondary">
                      {approval.lastUsed}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}

function SecuritySettings() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          <Security sx={{ mr: 1, verticalAlign: 'middle' }} />
          Security Settings
        </Typography>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle1">Transaction Confirmations</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Require confirmation for large transactions (>$1000)"
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Show transaction details before signing"
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle1">Privacy Settings</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <FormControlLabel
                control={<Switch />}
                label="Share anonymous usage data for improvements"
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Block known malicious contracts"
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle1">Notifications</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Health factor warnings"
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Transaction confirmations"
              />
              <FormControlLabel
                control={<Switch />}
                label="Price alerts"
              />
            </Box>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
}

function DataManagement() {
  const handleClearCache = () => {
    // TODO: Implement cache clearing
    console.log('Clearing cache...');
  };

  const handleExportData = () => {
    // TODO: Implement data export
    console.log('Exporting data...');
  };

  const handleResetSettings = () => {
    // TODO: Implement settings reset
    console.log('Resetting settings...');
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Data Management
        </Typography>
        
        <Box display="flex" flexDirection="column" gap={2}>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={handleClearCache}
          >
            Clear Cache
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={handleExportData}
          >
            Export Data
          </Button>
          
          <Button
            variant="outlined"
            color="error"
            startIcon={<Delete />}
            onClick={handleResetSettings}
          >
            Reset All Settings
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function SettingsPage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Box display="flex" flexDirection="column" gap={3}>
        <NetworkSettings />
        <TradingSettings />
        <ApprovalsManager />
        <SecuritySettings />
        <DataManagement />
      </Box>
    </Box>
  );
}
