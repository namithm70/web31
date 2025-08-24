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
          background: `
            radial-gradient(circle at 20% 80%, rgba(111, 76, 255, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(111, 76, 255, 0.06) 0%, transparent 50%),
            #F8F9FF
          `,
          color: '#1A1A2E',
        }}
      >
        <CircularProgress size={60} sx={{ color: '#6F4CFF', mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          Loading DeFi Superapp...
        </Typography>
      </Box>
    );
  }

  return null;
}
