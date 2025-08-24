import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#6F4CFF' }, // Purple primary
    secondary: { main: '#9E9E9E' },
    background: { 
      default: '#F8F9FF', // Light purple tinted background
      paper: 'rgba(111, 76, 255, 0.05)' // Very light purple tint
    },
    text: { 
      primary: '#1A1A2E', // Dark text
      secondary: '#4A4A6A' // Medium dark text
    },
    divider: 'rgba(111, 76, 255, 0.15)' // Purple tint
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: ['Inter', 'Roboto Mono', 'system-ui', 'Avenir', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial'].join(','),
    h1: { fontWeight: 700, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 600 }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(20px)',
          background: 'linear-gradient(135deg, rgba(111, 76, 255, 0.08), rgba(111, 76, 255, 0.04))',
          border: '1px solid rgba(111, 76, 255, 0.15)',
          boxShadow: '0 8px 32px rgba(111, 76, 255, 0.08)',
          '&:hover': {
            background: 'linear-gradient(135deg, rgba(111, 76, 255, 0.12), rgba(111, 76, 255, 0.06))',
            border: '1px solid rgba(111, 76, 255, 0.25)',
            boxShadow: '0 12px 40px rgba(111, 76, 255, 0.12)',
            transform: 'translateY(-2px)',
            transition: 'all 0.3s ease'
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(20px)',
          background: 'linear-gradient(135deg, rgba(111, 76, 255, 0.08), rgba(111, 76, 255, 0.04))',
          border: '1px solid rgba(111, 76, 255, 0.15)',
          boxShadow: '0 8px 32px rgba(111, 76, 255, 0.08)'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(20px)',
          background: 'linear-gradient(135deg, rgba(111, 76, 255, 0.12), rgba(111, 76, 255, 0.06))',
          borderBottom: '1px solid rgba(111, 76, 255, 0.15)',
          boxShadow: '0 4px 20px rgba(111, 76, 255, 0.08)'
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backdropFilter: 'blur(20px)',
          background: 'linear-gradient(135deg, rgba(111, 76, 255, 0.08), rgba(111, 76, 255, 0.04))',
          borderRight: '1px solid rgba(111, 76, 255, 0.15)',
          boxShadow: '4px 0 20px rgba(111, 76, 255, 0.08)'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)',
          '&.MuiButton-contained': {
            background: 'linear-gradient(135deg, rgba(111, 76, 255, 0.9), rgba(111, 76, 255, 0.7))',
            border: '1px solid rgba(111, 76, 255, 0.3)',
            boxShadow: '0 4px 15px rgba(111, 76, 255, 0.25)',
            color: 'white',
            '&:hover': {
              background: 'linear-gradient(135deg, rgba(111, 76, 255, 1), rgba(111, 76, 255, 0.8))',
              boxShadow: '0 6px 20px rgba(111, 76, 255, 0.35)',
              transform: 'translateY(-1px)'
            }
          },
          '&.MuiButton-outlined': {
            border: '1px solid rgba(111, 76, 255, 0.4)',
            color: 'rgba(111, 76, 255, 0.8)',
            '&:hover': {
              background: 'rgba(111, 76, 255, 0.08)',
              border: '1px solid rgba(111, 76, 255, 0.6)'
            }
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backdropFilter: 'blur(10px)',
            background: 'rgba(111, 76, 255, 0.03)',
            border: '1px solid rgba(111, 76, 255, 0.15)',
            '&:hover': {
              border: '1px solid rgba(111, 76, 255, 0.3)'
            },
            '&.Mui-focused': {
              border: '1px solid rgba(111, 76, 255, 0.5)',
              boxShadow: '0 0 0 2px rgba(111, 76, 255, 0.15)'
            }
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)',
          background: 'rgba(111, 76, 255, 0.08)',
          border: '1px solid rgba(111, 76, 255, 0.25)',
          '&.MuiChip-outlined': {
            border: '1px solid rgba(111, 76, 255, 0.4)',
            color: 'rgba(111, 76, 255, 0.8)'
          }
        }
      }
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(20px)',
          background: 'linear-gradient(135deg, rgba(111, 76, 255, 0.06), rgba(111, 76, 255, 0.03))',
          border: '1px solid rgba(111, 76, 255, 0.12)',
          borderRadius: 16
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(111, 76, 255, 0.08)'
        }
      }
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          '& .MuiTabs-indicator': {
            backgroundColor: 'rgba(111, 76, 255, 0.8)'
          }
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: 'rgba(111, 76, 255, 0.9)'
          }
        }
      }
    },
    MuiBackdrop: { 
      styleOverrides: { 
        root: { 
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(111, 76, 255, 0.08)'
        } 
      } 
    }
  }
});
