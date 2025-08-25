'use client';

import { Box } from '@mui/material';
import { useTheme } from '@/contexts/ThemeContext';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { themeMode } = useTheme();
  
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: themeMode === 'dark'
        ? 'linear-gradient(135deg, #000000 0%, #111111 50%, #000000 100%)'
        : 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)'
    }}>
      {children}
    </Box>
  );
}


