import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFFFFF', // Pure white
      light: '#F5F5F5',
      dark: '#E0E0E0',
      contrastText: '#000000',
    },
    secondary: {
      main: '#CCCCCC', // Light gray
      light: '#E5E5E5',
      dark: '#999999',
      contrastText: '#000000',
    },
    background: {
      default: '#000000', // Pure black
      paper: 'rgba(255, 255, 255, 0.05)', // Subtle white overlay
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#CCCCCC',
    },
    divider: 'rgba(255, 255, 255, 0.1)',
  },
  shape: {
    borderRadius: 4, // Reduced for cleaner look
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      color: '#FFFFFF',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      color: '#FFFFFF',
      letterSpacing: '-0.01em',
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
      color: '#CCCCCC',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      color: '#999999',
      lineHeight: 1.5,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 4,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          '&:hover': {
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            transform: 'translateY(-1px)',
          },
          transition: 'all 0.2s ease',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            transform: 'translateY(-1px)',
          },
          transition: 'all 0.2s ease',
        },
        contained: {
          background: '#FFFFFF',
          color: '#000000',
          '&:hover': {
            background: '#F5F5F5',
          },
        },
        outlined: {
          border: '1px solid rgba(255, 255, 255, 0.3)',
          color: '#FFFFFF',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
          },
        },
        text: {
          color: '#FFFFFF',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.05)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 4,
            '&:hover': {
              border: '1px solid rgba(255, 255, 255, 0.2)',
            },
            '&.Mui-focused': {
              border: '1px solid rgba(255, 255, 255, 0.4)',
              boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.1)',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#999999',
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
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#FFFFFF',
          fontWeight: 500,
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 4,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          color: '#CCCCCC',
        },
        head: {
          fontWeight: 600,
          color: '#FFFFFF',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 4,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: '#999999',
          fontWeight: 500,
          '&.Mui-selected': {
            color: '#FFFFFF',
            background: 'rgba(255, 255, 255, 0.05)',
          },
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(8px)',
          background: 'rgba(0, 0, 0, 0.8)',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#FFFFFF',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.1)',
            transform: 'scale(1.05)',
          },
          transition: 'all 0.2s ease',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          margin: '2px 4px',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
          },
          '&.Mui-selected': {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.1)',
        },
        bar: {
          background: '#FFFFFF',
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          '& .MuiSwitch-switchBase': {
            color: '#999999',
          },
          '& .MuiSwitch-track': {
            background: 'rgba(255, 255, 255, 0.1)',
          },
          '& .Mui-checked': {
            color: '#FFFFFF',
            '& + .MuiSwitch-track': {
              background: 'rgba(255, 255, 255, 0.3)',
            },
          },
        },
      },
    },
  },
});
