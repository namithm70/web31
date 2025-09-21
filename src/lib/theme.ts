import { alpha, createTheme, responsiveFontSizes } from '@mui/material/styles';
import type { Palette } from '@mui/material/styles';

const typography = {
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif',
  h1: {
    fontWeight: 700,
    fontSize: '3.25rem',
    letterSpacing: '-0.03em',
    lineHeight: 1.05,
  },
  h2: {
    fontWeight: 600,
    fontSize: '2.75rem',
    letterSpacing: '-0.02em',
    lineHeight: 1.15,
  },
  h3: {
    fontWeight: 600,
    fontSize: '2.125rem',
    letterSpacing: '-0.015em',
    lineHeight: 1.2,
  },
  h4: {
    fontWeight: 600,
    fontSize: '1.75rem',
    letterSpacing: '-0.01em',
  },
  h5: {
    fontWeight: 600,
    fontSize: '1.5rem',
    letterSpacing: '-0.01em',
  },
  h6: {
    fontWeight: 600,
    fontSize: '1.125rem',
    letterSpacing: '-0.01em',
  },
  subtitle1: {
    fontWeight: 500,
    fontSize: '1rem',
    letterSpacing: '0.01em',
  },
  subtitle2: {
    fontWeight: 500,
    fontSize: '0.9375rem',
    letterSpacing: '0.02em',
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.65,
    letterSpacing: '0.01em',
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.6,
    letterSpacing: '0.02em',
  },
  button: {
    fontWeight: 600,
    textTransform: 'none',
    letterSpacing: '0.025em',
  },
  overline: {
    fontWeight: 600,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
  },
  caption: {
    fontSize: '0.75rem',
    letterSpacing: '0.04em',
  },
} as const;

const buildComponents = (mode: 'light' | 'dark', palette: Palette) => {
  const softBorder = mode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.1)';
  const hoverOverlay = mode === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.06)';
  const glassOverlay = mode === 'light'
    ? 'linear-gradient(145deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0) 100%)'
    : 'linear-gradient(145deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0) 100%)';

  return {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: palette.background.default,
          color: palette.text.primary,
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg',
      },
      styleOverrides: {
        root: {
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          '@media (min-width: 1200px)': {
            paddingLeft: '2rem',
            paddingRight: '2rem',
          },
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          position: 'relative',
          borderRadius: 18,
          border: `1px solid ${softBorder}`,
          background: palette.background.paper,
          backgroundImage: glassOverlay,
          boxShadow: mode === 'light'
            ? '0 18px 40px rgba(15, 15, 15, 0.08)'
            : '0 20px 50px rgba(0, 0, 0, 0.65)',
          transition: 'transform 200ms ease, box-shadow 260ms ease, border-color 240ms ease',
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 1,
            borderRadius: 16,
            border: `1px solid ${alpha(palette.common.white, mode === 'light' ? 0.04 : 0.08)}`,
            opacity: mode === 'light' ? 0.6 : 0.35,
            pointerEvents: 'none',
          },
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: mode === 'light'
              ? '0 26px 70px rgba(15, 15, 15, 0.12)'
              : '0 30px 80px rgba(0, 0, 0, 0.8)',
            borderColor: alpha(palette.primary.main, mode === 'light' ? 0.2 : 0.35),
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: 18,
          border: `1px solid ${softBorder}`,
          backgroundImage: glassOverlay,
          transition: 'border-color 200ms ease, box-shadow 220ms ease, transform 200ms ease',
          boxShadow: mode === 'light'
            ? '0 12px 32px rgba(15, 15, 15, 0.08)'
            : '0 14px 42px rgba(0, 0, 0, 0.65)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: mode === 'light'
            ? alpha('#ffffff', 0.85)
            : alpha('#000000', 0.85),
          backdropFilter: 'blur(24px)',
          borderBottom: `1px solid ${softBorder}`,
          boxShadow: 'none',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 14,
          paddingInline: '1.1rem',
          paddingBlock: '0.65rem',
          fontWeight: 600,
          letterSpacing: '0.05em',
          transition: 'transform 160ms ease, box-shadow 200ms ease, background-color 160ms ease',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          background: palette.primary.main,
          color: palette.primary.contrastText,
          '&:hover': {
            background: palette.primary.light,
            boxShadow: mode === 'light'
              ? '0 18px 40px rgba(0, 0, 0, 0.16)'
              : '0 18px 40px rgba(0, 0, 0, 0.5)',
          },
        },
        outlined: {
          borderColor: softBorder,
          '&:hover': {
            borderColor: alpha(palette.primary.main, 0.4),
            background: alpha(palette.primary.main, mode === 'light' ? 0.04 : 0.08),
          },
        },
        text: {
          '&:hover': {
            background: alpha(palette.primary.main, mode === 'light' ? 0.05 : 0.1),
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: 9,
          transition: 'background-color 160ms ease, transform 160ms ease',
          '&:hover': {
            backgroundColor: hoverOverlay,
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          border: `1px solid ${softBorder}`,
          background: alpha(palette.background.paper, 0.85),
          backdropFilter: 'blur(12px)',
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 14,
            background: palette.background.paper,
            transition: 'border 160ms ease, box-shadow 180ms ease',
            '& fieldset': {
              borderColor: softBorder,
              borderWidth: 1,
            },
            '&:hover fieldset': {
              borderColor: alpha(palette.primary.main, 0.35),
            },
            '&.Mui-focused fieldset': {
              borderColor: palette.primary.main,
              boxShadow: `0 0 0 4px ${alpha(palette.primary.main, 0.12)}`,
            },
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 10,
          padding: '0.5rem 0.75rem',
          border: `1px solid ${softBorder}`,
          backgroundColor: palette.background.paper,
          color: palette.text.primary,
          backdropFilter: 'blur(12px)',
          boxShadow: mode === 'light'
            ? '0 12px 30px rgba(15, 15, 15, 0.12)'
            : '0 12px 30px rgba(0, 0, 0, 0.6)',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          border: `1px solid ${softBorder}`,
          background: palette.background.paper,
          backdropFilter: 'blur(16px)',
          boxShadow: mode === 'light'
            ? '0 28px 60px rgba(15, 15, 15, 0.14)'
            : '0 32px 75px rgba(0, 0, 0, 0.7)',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontWeight: 500,
          '&:hover': {
            backgroundColor: hoverOverlay,
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          '&:hover': {
            backgroundColor: hoverOverlay,
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          transition: 'background-color 160ms ease, transform 160ms ease',
          '&:hover': {
            backgroundColor: hoverOverlay,
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: softBorder,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          height: 6,
          background: alpha(palette.primary.main, 0.1),
        },
        bar: {
          borderRadius: 999,
          background: palette.primary.main,
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        determinate: {
          color: palette.primary.main,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          border: `1px solid ${softBorder}`,
          background: alpha(palette.background.paper, 0.95),
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(palette.text.primary, mode === 'light' ? 0.08 : 0.16),
        },
      },
    },
  } as const;
};

const buildTheme = (mode: 'light' | 'dark') => {
  const isLight = mode === 'light';

  const theme = createTheme({
    palette: {
      mode,
      common: {
        black: '#000000',
        white: '#ffffff',
      },
      primary: {
        main: isLight ? '#111111' : '#ffffff',
        light: isLight ? '#2a2a2a' : '#f5f5f5',
        dark: isLight ? '#000000' : '#d6d6d6',
        contrastText: isLight ? '#ffffff' : '#000000',
      },
      secondary: {
        main: isLight ? '#5b5b5b' : '#b5b5b5',
        light: isLight ? '#737373' : '#d1d1d1',
        dark: isLight ? '#383838' : '#939393',
        contrastText: isLight ? '#ffffff' : '#000000',
      },
      background: {
        default: isLight ? '#ffffff' : '#000000',
        paper: isLight ? '#fdfdfd' : '#0d0d0d',
      },
      text: {
        primary: isLight ? '#0f0f0f' : '#f7f7f7',
        secondary: isLight ? '#5c5c5c' : '#c7c7c7',
        disabled: isLight ? alpha('#0f0f0f', 0.4) : alpha('#ffffff', 0.4),
      },
      divider: isLight ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
      action: {
        hover: isLight ? 'rgba(15, 15, 15, 0.04)' : 'rgba(255, 255, 255, 0.06)',
        selected: isLight ? 'rgba(15, 15, 15, 0.06)' : 'rgba(255, 255, 255, 0.08)',
        disabled: isLight ? 'rgba(15, 15, 15, 0.26)' : 'rgba(255, 255, 255, 0.3)',
        disabledBackground: isLight ? 'rgba(15, 15, 15, 0.08)' : 'rgba(255, 255, 255, 0.1)',
        focus: isLight ? 'rgba(15, 15, 15, 0.12)' : 'rgba(255, 255, 255, 0.16)',
      },
    },
    shape: {
      borderRadius: 16,
    },
    typography,
    transitions: {
      easing: {
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
      },
      duration: {
        shortest: 120,
        shorter: 160,
        short: 200,
        standard: 260,
        complex: 320,
        enteringScreen: 220,
        leavingScreen: 200,
      },
    },
    components: {},
  });

  theme.components = {
    ...buildComponents(mode, theme.palette),
  };

  return responsiveFontSizes(theme);
};

export const lightTheme = buildTheme('light');
export const darkTheme = buildTheme('dark');
