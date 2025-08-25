'use client';

import { IconButton, Tooltip, Box } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeToggle() {
  const { themeMode, toggleTheme } = useTheme();

  return (
    <Tooltip title={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} mode`}>
      <IconButton
        onClick={toggleTheme}
        sx={{
          color: 'text.primary',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 2,
          p: 1,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.1)',
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
  );
}
