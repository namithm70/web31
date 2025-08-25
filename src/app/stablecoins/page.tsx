'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Avatar,
  Alert,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Settings,
  History,
} from '@mui/icons-material';
import { WalletConnectionTest } from '@/components/wallet-connection-test';

// Mock data
const stablecoins = [
  {
    symbol: 'USDC',
    name: 'USD Coin',
    price: 1.00,
    marketCap: 45000000000,
    volume24h: 2500000000,
    pegDeviation: 0.01,
    risk: 'low' as const,
    apy: 4.2,
    icon: '🔵',
  },
  {
    symbol: 'USDT',
    name: 'Tether',
    price: 1.00,
    marketCap: 85000000000,
    volume24h: 4500000000,
    pegDeviation: 0.02,
    risk: 'medium' as const,
    apy: 3.8,
    icon: '🟢',
  },
  {
    symbol: 'DAI',
    name: 'Dai',
    price: 1.00,
    marketCap: 8500000000,
    volume24h: 850000000,
    pegDeviation: 0.005,
    risk: 'low' as const,
    apy: 5.1,
    icon: '🟡',
  },
  {
    symbol: 'FRAX',
    name: 'Frax',
    price: 1.00,
    marketCap: 2500000000,
    volume24h: 450000000,
    pegDeviation: 0.015,
    risk: 'medium' as const,
    apy: 6.2,
    icon: '🟣',
  },
];

const yieldOpportunities = [
  { protocol: 'Aave', asset: 'USDC', apy: 4.2, risk: 'low', minDeposit: 100 },
  { protocol: 'Compound', asset: 'USDT', apy: 3.8, risk: 'low', minDeposit: 50 },
  { protocol: 'Yearn Finance', asset: 'DAI', apy: 8.5, risk: 'medium', minDeposit: 1000 },
  { protocol: 'Curve Finance', asset: 'FRAX', apy: 12.1, risk: 'high', minDeposit: 5000 },
];

const pegMonitoring = {
  totalMarketCap: 138500000000,
  averageDeviation: 0.011,
  alerts: [
    { stablecoin: 'USDT', deviation: 0.02, severity: 'warning' },
    { stablecoin: 'FRAX', deviation: 0.015, severity: 'info' },
  ],
};

interface Stablecoin {
  symbol: string;
  name: string;
  price: number;
  marketCap: number;
  volume24h: number;
  pegDeviation: number;
  risk: 'low' | 'medium' | 'high';
  apy: number;
  icon: string;
}

function StablecoinCard({ stablecoin }: { stablecoin: Stablecoin }) {
  const [amount, setAmount] = useState('');

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      default: return 'default';
    }
  };

  const getPegStatus = (deviation: number) => {
    if (deviation < 0.01) return { status: 'Stable', color: 'success' };
    if (deviation < 0.02) return { status: 'Slight Deviation', color: 'warning' };
    return { status: 'Significant Deviation', color: 'error' };
  };

  const pegStatus = getPegStatus(stablecoin.pegDeviation);

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              {stablecoin.icon}
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                {stablecoin.name} ({stablecoin.symbol})
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ${stablecoin.price.toFixed(4)}
              </Typography>
            </Box>
          </Box>
          <Chip
            label={stablecoin.risk.toUpperCase()}
            color={getRiskColor(stablecoin.risk) as 'success' | 'warning' | 'error' | 'default'}
            size="small"
          />
        </Box>

        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} mb={3}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Market Cap
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              ${(stablecoin.marketCap / 1000000000).toFixed(1)}B
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Volume (24h)
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              ${(stablecoin.volume24h / 1000000000).toFixed(1)}B
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Peg Deviation
            </Typography>
            <Typography variant="body2" fontWeight={600} color={pegStatus.color as 'success' | 'warning' | 'error'}>
              {stablecoin.pegDeviation}%
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              APY
            </Typography>
            <Typography variant="body2" fontWeight={600} color="success.main">
              {stablecoin.apy}%
            </Typography>
          </Box>
        </Box>

        <Box display="flex" gap={1} mb={2}>
          <TextField
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
            size="small"
          />
        </Box>

        <Box display="flex" gap={1}>
          <Button variant="contained" size="small" fullWidth>
            Deposit
          </Button>
          <Button variant="outlined" size="small" fullWidth>
            Withdraw
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

function YieldOpportunities() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={3}>
          Yield Opportunities
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          {yieldOpportunities.map((opportunity, index) => (
            <Box key={index} p={2} border="1px solid" borderColor="divider" borderRadius={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="body1" fontWeight={600}>
                  {opportunity.protocol} - {opportunity.asset}
                </Typography>
                <Chip
                  label={`${opportunity.apy}% APY`}
                  color="success"
                  size="small"
                />
              </Box>
              
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Risk: {opportunity.risk}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Min Deposit: ${opportunity.minDeposit.toLocaleString()}
                  </Typography>
                </Box>
                <Button variant="outlined" size="small">
                  Invest
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

function PegMonitoring() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={3}>
          Peg Monitoring
        </Typography>

        <Box display="flex" flexDirection="column" gap={3}>
          <Box p={2} bgcolor="info.light" borderRadius={2}>
            <Typography variant="body2" color="text.secondary">
              Total Market Cap
            </Typography>
            <Typography variant="h5" fontWeight={600} color="info.main">
              ${(pegMonitoring.totalMarketCap / 1000000000).toFixed(1)}B
            </Typography>
          </Box>

          <Box p={2} bgcolor="warning.light" borderRadius={2}>
            <Typography variant="body2" color="text.secondary">
              Average Deviation
            </Typography>
            <Typography variant="h5" fontWeight={600} color="warning.main">
              {pegMonitoring.averageDeviation}%
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2" fontWeight={600} mb={2}>
              Recent Alerts
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              {pegMonitoring.alerts.map((alert, index) => (
                <Alert key={index} severity={alert.severity as 'warning' | 'info'} sx={{ py: 0 }}>
                  {alert.stablecoin}: {alert.deviation}% deviation
                </Alert>
              ))}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

function RiskAnalysis() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={3}>
          Risk Analysis
        </Typography>

        <Box display="flex" flexDirection="column" gap={3}>
          <Box p={2} bgcolor="success.light" borderRadius={2}>
            <Typography variant="body2" color="text.secondary">
              Portfolio Stability
            </Typography>
            <Typography variant="h5" fontWeight={600} color="success.main">
              Excellent
            </Typography>
          </Box>

          <Box p={2} bgcolor="info.light" borderRadius={2}>
            <Typography variant="body2" color="text.secondary">
              Diversification Score
            </Typography>
            <Typography variant="h5" fontWeight={600} color="info.main">
              85/100
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2" fontWeight={600} mb={2}>
              Recommendations
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography variant="body2" color="text.secondary">
                • Consider adding more DAI for better diversification
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Monitor USDT peg deviation closely
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Explore yield opportunities on Yearn Finance
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function StablecoinsPage() {
  const [selectedRisk, setSelectedRisk] = useState<string>('all');

  const filteredStablecoins = selectedRisk === 'all' 
    ? stablecoins 
    : stablecoins.filter(coin => coin.risk === selectedRisk);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h3" fontWeight={700} mb={1}>
            Stablecoins
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage stablecoin positions and monitor peg stability
          </Typography>
        </Box>
        <Box display="flex" gap={2}>
          <Button variant="outlined" startIcon={<History />}>
            History
          </Button>
          <Button variant="outlined" startIcon={<Settings />}>
            Settings
          </Button>
        </Box>
      </Box>

      <WalletConnectionTest />

      <Box display="grid" gridTemplateColumns={{ xs: '1fr', lg: '2fr 1fr' }} gap={4}>
        {/* Main Content */}
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5" fontWeight={600}>
              Stablecoin Markets
            </Typography>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Risk Level</InputLabel>
              <Select
                value={selectedRisk}
                onChange={(e) => setSelectedRisk(e.target.value)}
                label="Risk Level"
              >
                <MenuItem value="all">All Risks</MenuItem>
                <MenuItem value="low">Low Risk</MenuItem>
                <MenuItem value="medium">Medium Risk</MenuItem>
                <MenuItem value="high">High Risk</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={3}>
            {filteredStablecoins.map((stablecoin) => (
              <StablecoinCard key={stablecoin.symbol} stablecoin={stablecoin} />
            ))}
          </Box>
        </Box>

        {/* Sidebar */}
        <Box>
          <YieldOpportunities />
          
          <Box mt={3}>
            <PegMonitoring />
          </Box>

          <Box mt={3}>
            <RiskAnalysis />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
