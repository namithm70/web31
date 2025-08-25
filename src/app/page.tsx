'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Add a small delay to ensure proper hydration
    const timer = setTimeout(() => {
      router.push('/dashboard');
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [router]);

  if (isLoading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{
          background: '#000000',
          color: '#FFFFFF',
        }}
      >
        <CircularProgress size={60} sx={{ color: '#FFFFFF', mb: 2 }} />
        <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 600 }}>
          Loading DeFi Superapp...
        </Typography>
      </Box>
    );
  }

  return null;
}
