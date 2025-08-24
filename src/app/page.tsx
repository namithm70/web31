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
            radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.12) 0%, transparent 50%),
            linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #1E1B4B 100%)
          `,
          color: '#FFFFFF',
        }}
      >
        <CircularProgress size={60} sx={{ color: '#8B5CF6', mb: 2 }} />
        <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 600 }}>
          Loading DeFi Superapp...
        </Typography>
      </Box>
    );
  }

  return null;
}
