import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8B5CF6', // Purple
      light: '#A78BFA',
      dark: '#7C3AED',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#3B82F6', // Blue
      light: '#60A5FA',
      dark: '#2563EB',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#1E1B4B', // Deep purple background
      paper: 'rgba(139, 92, 246, 0.1)', // Glassmorphism purple
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#E2E8F0',
    },
    divider: 'rgba(139, 92, 246, 0.2)',
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      color: '#FFFFFF',
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.25rem',
      color: '#FFFFFF',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.125rem',
      color: '#FFFFFF',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
      color: '#FFFFFF',
    },
    body1: {
      fontSize: '1rem',
      color: '#E2E8F0',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#CBD5E1',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(139, 92, 246, 0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          borderRadius: 16,
          boxShadow: '0 8px 32px rgba(139, 92, 246, 0.1)',
          '&:hover': {
            boxShadow: '0 12px 40px rgba(139, 92, 246, 0.2)',
            transform: 'translateY(-2px)',
          },
          transition: 'all 0.3s ease',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'rgba(139, 92, 246, 0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(139, 92, 246, 0.1)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
          boxShadow: '0 4px 20px rgba(139, 92, 246, 0.1)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: 'rgba(139, 92, 246, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(139, 92, 246, 0.2)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: '0 4px 16px rgba(139, 92, 246, 0.2)',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(139, 92, 246, 0.3)',
            transform: 'translateY(-1px)',
          },
          transition: 'all 0.3s ease',
        },
        contained: {
          background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
          '&:hover': {
            background: 'linear-gradient(135deg, #7C3AED, #2563EB)',
          },
        },
        outlined: {
          border: '1px solid rgba(139, 92, 246, 0.3)',
          color: '#8B5CF6',
          '&:hover': {
            background: 'rgba(139, 92, 246, 0.1)',
            border: '1px solid rgba(139, 92, 246, 0.5)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            background: 'rgba(139, 92, 246, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: 12,
            '&:hover': {
              border: '1px solid rgba(139, 92, 246, 0.4)',
            },
            '&.Mui-focused': {
              border: '1px solid rgba(139, 92, 246, 0.6)',
              boxShadow: '0 0 0 2px rgba(139, 92, 246, 0.1)',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#CBD5E1',
          },
          '& .MuiInputBase-input': {
            color: '#FFFFFF',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          background: 'rgba(139, 92, 246, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          color: '#8B5CF6',
          fontWeight: 500,
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          background: 'rgba(139, 92, 246, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(139, 92, 246, 0.1)',
          borderRadius: 12,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(139, 92, 246, 0.1)',
          color: '#E2E8F0',
        },
        head: {
          fontWeight: 600,
          color: '#8B5CF6',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          background: 'rgba(139, 92, 246, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(139, 92, 246, 0.1)',
          borderRadius: 12,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: '#CBD5E1',
          fontWeight: 500,
          '&.Mui-selected': {
            color: '#8B5CF6',
            background: 'rgba(139, 92, 246, 0.1)',
          },
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(8px)',
          background: 'rgba(30, 27, 75, 0.8)',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          background: 'rgba(139, 92, 246, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          color: '#8B5CF6',
          '&:hover': {
            background: 'rgba(139, 92, 246, 0.2)',
            transform: 'scale(1.05)',
          },
          transition: 'all 0.3s ease',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          margin: '4px 8px',
          '&:hover': {
            background: 'rgba(139, 92, 246, 0.1)',
            backdropFilter: 'blur(10px)',
          },
          '&.Mui-selected': {
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
          },
        },
      },
    },
  },
});
