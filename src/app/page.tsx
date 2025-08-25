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
          background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
          color: '#000000',
        }}
      >
        <Box
          className="animate-scale-in"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <CircularProgress 
            size={60} 
            sx={{ 
              color: '#000000', 
              mb: 2,
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'round',
              }
            }} 
          />
          <Typography 
            variant="h4" 
            className="animate-fade-in-up"
            sx={{ 
              color: '#000000', 
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
          >
            DeFi Superapp
          </Typography>
          <Typography 
            variant="body1" 
            className="animate-fade-in-up stagger-1"
            sx={{ 
              color: '#666666', 
              fontWeight: 500,
            }}
          >
            Loading your experience...
          </Typography>
        </Box>
      </Box>
    );
  }

  return null;
}
