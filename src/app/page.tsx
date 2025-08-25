'use client';

import { Box, Button, Typography, Stack, Chip } from '@mui/material';
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
        background: 'linear-gradient(120deg, #000000 0%, #111111 40%, #000000 100%)',
        color: '#FFFFFF',
        textAlign: 'center',
        px: 2,
        position: 'relative',
      }}
    >
      {/* subtle gradient orbs */}
      <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', top: -120, left: -80, width: 320, height: 320, borderRadius: '50%', filter: 'blur(60px)', background: 'radial-gradient(circle, rgba(255,255,255,0.05), rgba(255,255,255,0))' }} />
        <Box sx={{ position: 'absolute', bottom: -140, right: -100, width: 360, height: 360, borderRadius: '50%', filter: 'blur(70px)', background: 'radial-gradient(circle, rgba(255,255,255,0.03), rgba(255,255,255,0))' }} />
      </Box>

      <Box className="animate-fade-in-up" sx={{ maxWidth: 980, px: { xs: 2, md: 0 } }}>
        <Chip label="Monochrome • Fast • Secure" variant="outlined" sx={{ mb: 2, borderRadius: 2 }} />
        <Typography
          variant="h2"
          fontWeight={900}
          letterSpacing="-0.03em"
          sx={{ mb: 2, lineHeight: 1.1, WebkitTextStroke: '0.4px rgba(255,255,255,0.3)' }}
        >
          DeFi, distilled to black and white
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Swap, lend, farm, and track your portfolio with a minimal, glass-like interface and buttery-smooth animations.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mb: 3 }}>
          <Button component={Link} href="/auth/signup" variant="contained" size="large" sx={{ px: 4 }}>
            Create account
          </Button>
          <Button component={Link} href="/auth/signin" variant="outlined" size="large" sx={{ px: 4 }}>
            Sign in
          </Button>
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ opacity: 0.9 }}>
          <Chip label="No clutter" size="small" variant="outlined" />
          <Chip label="Wallet-first" size="small" variant="outlined" />
          <Chip label="Realtime insights" size="small" variant="outlined" />
        </Stack>
      </Box>
    </Box>
  );
}
