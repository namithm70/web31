'use client';

import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

export default function HomePage() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
        color: '#000000',
        textAlign: 'center',
        px: 2,
      }}
    >
      <Box className="animate-scale-in" sx={{ maxWidth: 900 }}>
        <Typography variant="h2" fontWeight={800} letterSpacing="-0.02em" sx={{ mb: 2 }}>
          The monochrome DeFi superapp
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Swap, lend, farm and track – fast, clean, and secure. Connect your wallet to get started.
        </Typography>
        <Box display="flex" gap={2} justifyContent="center">
          <Button component={Link} href="/auth/signup" variant="contained" size="large">
            Create account
          </Button>
          <Button component={Link} href="/auth/signin" variant="outlined" size="large">
            Sign in
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
