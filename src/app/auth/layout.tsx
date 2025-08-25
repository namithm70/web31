'use client';

import { Box } from '@mui/material';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)' }}>
      {children}
    </Box>
  );
}


