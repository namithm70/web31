'use client';

import { Box } from '@mui/material';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #000000 0%, #111111 50%, #000000 100%)' }}>
      {children}
    </Box>
  );
}


