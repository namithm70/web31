import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000', // Pure black
      light: '#333333',
      dark: '#000000',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#666666', // Medium gray
      light: '#999999',
      dark: '#333333',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF', // Pure white
      paper: '#FFFFFF',
    },
    text: {
      primary: '#000000',
      secondary: '#666666',
    },
    divider: 'rgba(0, 0, 0, 0.1)',
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3rem',
      color: '#000000',
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.5rem',
      color: '#000000',
      letterSpacing: '-0.01em',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem',
      color: '#000000',
      lineHeight: 1.4,
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.5rem',
      color: '#000000',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
      color: '#000000',
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.125rem',
      color: '#000000',
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      color: '#666666',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      color: '#999999',
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      fontSize: '0.875rem',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: '#FFFFFF',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
            transform: 'translateY(-2px)',
          },
          transition: 'all 0.3s ease',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: '#FFFFFF',
          border: '1px solid rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#FFFFFF',
          color: '#000000',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: '#FFFFFF',
          borderRight: '1px solid rgba(0, 0, 0, 0.08)',
          color: '#000000',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.875rem',
          padding: '12px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            transform: 'translateY(-1px)',
          },
          transition: 'all 0.2s ease',
        },
        contained: {
          background: '#000000',
          color: '#FFFFFF',
          '&:hover': {
            background: '#333333',
          },
        },
        outlined: {
          border: '1px solid rgba(0, 0, 0, 0.2)',
          color: '#000000',
          '&:hover': {
            background: 'rgba(0, 0, 0, 0.04)',
            border: '1px solid rgba(0, 0, 0, 0.3)',
          },
        },
        text: {
          color: '#000000',
          '&:hover': {
            background: 'rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            background: '#FFFFFF',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: 8,
            '&:hover': {
              border: '1px solid rgba(0, 0, 0, 0.2)',
            },
            '&.Mui-focused': {
              border: '1px solid #000000',
              boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.1)',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#666666',
          },
          '& .MuiInputBase-input': {
            color: '#000000',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          background: 'rgba(0, 0, 0, 0.04)',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          color: '#000000',
          fontWeight: 500,
          borderRadius: 6,
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          background: '#FFFFFF',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          borderRadius: 8,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          color: '#666666',
        },
        head: {
          fontWeight: 600,
          color: '#000000',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          background: '#FFFFFF',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          borderRadius: 8,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: '#666666',
          fontWeight: 500,
          '&.Mui-selected': {
            color: '#000000',
            background: 'rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(4px)',
          background: 'rgba(255, 255, 255, 0.8)',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          background: 'rgba(0, 0, 0, 0.04)',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          color: '#000000',
          '&:hover': {
            background: 'rgba(0, 0, 0, 0.08)',
            transform: 'scale(1.05)',
          },
          transition: 'all 0.2s ease',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '4px 8px',
          '&:hover': {
            background: 'rgba(0, 0, 0, 0.04)',
          },
          '&.Mui-selected': {
            background: 'rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          background: 'rgba(0, 0, 0, 0.1)',
        },
        bar: {
          background: '#000000',
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: '#000000',
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
            background: 'rgba(0, 0, 0, 0.1)',
          },
          '& .Mui-checked': {
            color: '#000000',
            '& + .MuiSwitch-track': {
              background: 'rgba(0, 0, 0, 0.3)',
            },
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          border: '1px solid rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});
