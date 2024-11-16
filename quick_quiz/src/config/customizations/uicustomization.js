import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { colors } from '@mui/material';

const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          color: '#fff', 
          backgroundColor: '#1976d2', 
          fontFamily: 'Lexend',
          fontSize: '1rem', 
          fontWeight: 'normal', 
          borderRadius: '10px', 
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
         textTransform: 'none',
        },
        contained: {
          backgroundColor: '#1935CA',
        },
        outlined: {
          backgroundColor: '#FBF9F9',
          borderColor: '#1935CA',
          color: '#4A4A4A',
          "&:hover": {
            backgroundColor: '#1935CA',
            color: '#fff',
          }
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'Lexend',
          color: '#000', 
        },
        h4: {
          // Heading 4 Style
          
          fontWeight: 'bold', 
          fontSize: '1.5rem', 
        },
        body1: {
          // Body Text Style
          fontSize: '1rem', 
        },
        subtitle1: {
          color: '#555', 
          fontSize: '0.875rem', 
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          // Card Style
          backgroundColor: '#fff', 
          borderRadius: '10px', 
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '16px', 
        },
      },
    },

    MuiBox: {
      styleOverrides: {
        root: {
          padding: '16px', 
          margin: '16px', 
        },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          // Avatar Style
          width: '40px', 
          height: '40px', 
          borderRadius: '50%',
          border: '2px solid #fff', 
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          // TextField Style
          backgroundColor: '#fff', 
          borderRadius: '10px', 
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)",
          },
          "& .MuiOutlinedInput-root": {
          "& fieldset": {
            border: "none", 
          },
        },
        },
      },
    },

    MuiIconButton: {
      defaultProps: {
        disableFocusRipple: true,
        disableRipple:true,
      },
      styleOverrides: {
        root: {
          // IconButton Style
          backgroundColor: "#fff", 
          borderRadius: "10px", 
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", 
          padding: "8px", 
          color: '#1976d2',
          transition: "transform 0.3s ease",
          '&:hover': {
            transform: "scale(1.05)",
          },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          // Chip Style
          backgroundColor: '#EDEDED',
          fontFamily:'Lexend',
          fontWeight:'bold',
          color: '#1935CA',
          fontSize: '0.75rem', 
          padding: '8px',
        },
      },
    },
  },
});
export default theme;