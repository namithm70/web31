'use client';

import { Box, Button, Typography, Stack, Chip, IconButton, Tooltip } from '@mui/material';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import { LightMode, DarkMode } from '@mui/icons-material';

export default function HomePage() {
  const { themeMode, toggleTheme } = useTheme();
  
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
              sx={{
          background: themeMode === 'dark'
            ? 'linear-gradient(120deg, #000000 0%, #111111 40%, #000000 100%)'
            : 'linear-gradient(120deg, #ffffff 0%, #f8fafc 40%, #eef2f7 100%)',
          color: themeMode === 'dark' ? '#FFFFFF' : '#000000',
          textAlign: 'center',
          px: 2,
          position: 'relative',
        }}
    >
      {/* subtle gradient orbs */}
      <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <Box sx={{ 
          position: 'absolute', 
          top: -120, 
          left: -80, 
          width: 320, 
          height: 320, 
          borderRadius: '50%', 
          filter: 'blur(60px)', 
          background: themeMode === 'dark'
            ? 'radial-gradient(circle, rgba(255,255,255,0.05), rgba(255,255,255,0))'
            : 'radial-gradient(circle, rgba(0,0,0,0.12), rgba(0,0,0,0))'
        }} />
        <Box sx={{ 
          position: 'absolute', 
          bottom: -140, 
          right: -100, 
          width: 360, 
          height: 360, 
          borderRadius: '50%', 
          filter: 'blur(70px)', 
          background: themeMode === 'dark'
            ? 'radial-gradient(circle, rgba(255,255,255,0.03), rgba(255,255,255,0))'
            : 'radial-gradient(circle, rgba(0,0,0,0.10), rgba(0,0,0,0))'
        }} />
      </Box>

      <Box className="animate-fade-in-up" sx={{ maxWidth: 980, px: { xs: 2, md: 0 }, position: 'relative' }}>
        {/* Theme Toggle */}
        <Box sx={{ position: 'absolute', top: -60, right: 0 }}>
          <Tooltip title={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} mode`}>
            <IconButton
              onClick={toggleTheme}
              sx={{
                color: themeMode === 'dark' ? '#FFFFFF' : '#000000',
                background: themeMode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.1)' 
                  : 'rgba(0, 0, 0, 0.05)',
                border: themeMode === 'dark'
                  ? '1px solid rgba(255, 255, 255, 0.2)'
                  : '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: 2,
                p: 1,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  background: themeMode === 'dark'
                    ? 'rgba(255, 255, 255, 0.15)'
                    : 'rgba(0, 0, 0, 0.1)',
                  transform: 'scale(1.05)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                },
                '& .MuiSvgIcon-root': {
                  fontSize: '1.2rem',
                },
              }}
            >
              {themeMode === 'light' ? <DarkMode /> : <LightMode />}
            </IconButton>
          </Tooltip>
        </Box>
        
        <Chip label="Monochrome • Fast • Secure" variant="outlined" sx={{ mb: 2, borderRadius: 2 }} />
        <Typography
          variant="h2"
          fontWeight={900}
          letterSpacing="-0.03em"
          sx={{ 
            mb: 2, 
            lineHeight: 1.1, 
            WebkitTextStroke: themeMode === 'dark' 
              ? '0.4px rgba(255,255,255,0.3)' 
              : '0.4px rgba(0,0,0,0.3)' 
          }}
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
