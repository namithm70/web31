import { createTheme } from '@mui/material/styles';

// Light theme
export const lightTheme = createTheme({
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
    divider: 'rgba(0, 0, 0, 0.06)',
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
      color: '#000000',
      letterSpacing: '-0.02em',
      lineHeight: 1.1,
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.75rem',
      color: '#000000',
      letterSpacing: '-0.01em',
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 600,
      fontSize: '2.25rem',
      color: '#000000',
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.75rem',
      color: '#000000',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.5rem',
      color: '#000000',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.25rem',
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
      letterSpacing: '0.025em',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: '#FFFFFF',
          border: '1px solid rgba(0, 0, 0, 0.06)',
          borderRadius: 16,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02), 0 1px 2px rgba(0, 0, 0, 0.04)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.06)',
            transform: 'translateY(-4px)',
          },
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: '#FFFFFF',
          border: '1px solid rgba(0, 0, 0, 0.06)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02), 0 1px 2px rgba(0, 0, 0, 0.04)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 600,
          textTransform: 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
          },
        },
        contained: {
          background: '#000000',
          color: '#FFFFFF',
          '&:hover': {
            background: '#333333',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
          },
        },
        outlined: {
          border: '1px solid rgba(0, 0, 0, 0.12)',
          color: '#000000',
          '&:hover': {
            border: '1px solid rgba(0, 0, 0, 0.2)',
            background: 'rgba(0, 0, 0, 0.04)',
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
            border: '1px solid rgba(0, 0, 0, 0.08)',
            '&:hover': {
              border: '1px solid rgba(0, 0, 0, 0.16)',
            },
            '&.Mui-focused': {
              border: '1px solid #000000',
              boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.1)',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#666666',
            '&.Mui-focused': {
              color: '#000000',
            },
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
          background: '#FFFFFF',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          color: '#000000',
          '&:hover': {
            background: '#F5F5F5',
            border: '1px solid rgba(0, 0, 0, 0.16)',
          },
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          background: '#FFFFFF',
          border: '1px solid rgba(0, 0, 0, 0.06)',
          borderRadius: 12,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
          color: '#000000',
        },
        head: {
          background: '#F5F5F5',
          color: '#000000',
          fontWeight: 600,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          '& .MuiTabs-indicator': {
            background: '#000000',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: '#666666',
          '&.Mui-selected': {
            color: '#000000',
          },
          '&:hover': {
            color: '#333333',
          },
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          background: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#000000',
          '&:hover': {
            background: 'rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          background: '#FFFFFF',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#000000',
          '&:hover': {
            background: 'rgba(0, 0, 0, 0.04)',
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
            '&.Mui-checked': {
              color: '#000000',
            },
          },
          '& .MuiSwitch-track': {
            background: 'rgba(0, 0, 0, 0.1)',
            '&.Mui-checked': {
              background: 'rgba(0, 0, 0, 0.2)',
            },
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          background: '#FFFFFF',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          color: '#000000',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          background: '#FFFFFF',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          color: '#000000',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: '#FFFFFF',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          color: '#000000',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          color: '#000000',
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          background: '#FFFFFF',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          color: '#000000',
          '&:hover': {
            background: 'rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: '#000000',
          '&:hover': {
            background: 'rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          background: '#333333',
          color: '#FFFFFF',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(0, 0, 0, 0.06)',
        },
      },
    },
  },
});

// Dark theme (AMOLED black)
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFFFFF', // Pure white
      light: '#FFFFFF',
      dark: '#CCCCCC',
      contrastText: '#000000',
    },
    secondary: {
      main: '#666666', // Medium gray
      light: '#999999',
      dark: '#333333',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#000000', // AMOLED black
      paper: '#111111', // Slightly lighter black for cards
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#CCCCCC',
    },
    divider: 'rgba(255, 255, 255, 0.08)',
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
      color: '#FFFFFF',
      letterSpacing: '-0.02em',
      lineHeight: 1.1,
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.75rem',
      color: '#FFFFFF',
      letterSpacing: '-0.01em',
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 600,
      fontSize: '2.25rem',
      color: '#FFFFFF',
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.75rem',
      color: '#FFFFFF',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.5rem',
      color: '#FFFFFF',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.25rem',
      color: '#FFFFFF',
      lineHeight: 1.5,
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
    button: {
      fontWeight: 600,
      textTransform: 'none',
      fontSize: '0.875rem',
      letterSpacing: '0.025em',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: '#111111',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 16,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.3)',
            transform: 'translateY(-4px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
          },
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: '#111111',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 600,
          textTransform: 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(255, 255, 255, 0.15)',
          },
        },
        contained: {
          background: '#FFFFFF',
          color: '#000000',
          '&:hover': {
            background: '#CCCCCC',
            boxShadow: '0 8px 25px rgba(255, 255, 255, 0.2)',
          },
        },
        outlined: {
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#FFFFFF',
          '&:hover': {
            border: '1px solid rgba(255, 255, 255, 0.4)',
            background: 'rgba(255, 255, 255, 0.05)',
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
            background: '#111111',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            '&:hover': {
              border: '1px solid rgba(255, 255, 255, 0.16)',
            },
            '&.Mui-focused': {
              border: '1px solid #FFFFFF',
              boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.1)',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#999999',
            '&.Mui-focused': {
              color: '#FFFFFF',
            },
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
          background: '#111111',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          color: '#FFFFFF',
          '&:hover': {
            background: '#222222',
            border: '1px solid rgba(255, 255, 255, 0.16)',
          },
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          background: '#111111',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 12,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          color: '#FFFFFF',
        },
        head: {
          background: '#000000',
          color: '#FFFFFF',
          fontWeight: 600,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          '& .MuiTabs-indicator': {
            background: '#FFFFFF',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: '#999999',
          '&.Mui-selected': {
            color: '#FFFFFF',
          },
          '&:hover': {
            color: '#CCCCCC',
          },
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          background: 'rgba(0, 0, 0, 0.8)',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.05)',
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          background: '#111111',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.05)',
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
            color: '#666666',
            '&.Mui-checked': {
              color: '#FFFFFF',
            },
          },
          '& .MuiSwitch-track': {
            background: 'rgba(255, 255, 255, 0.1)',
            '&.Mui-checked': {
              background: 'rgba(255, 255, 255, 0.3)',
            },
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          background: '#111111',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          color: '#FFFFFF',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          background: '#111111',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          color: '#FFFFFF',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: '#111111',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          background: '#111111',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.05)',
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.05)',
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          background: '#333333',
          color: '#FFFFFF',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(255, 255, 255, 0.08)',
        },
      },
    },
  },
});

// Default theme (light)
export const theme = lightTheme;
