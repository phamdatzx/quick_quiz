import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import theme from '../../config/customizations/uicustomization';
// const theme = createTheme({
//   components: {
//     // Name of the component ⚛️
//     MuiButtonBase: {
//       defaultProps: {
//         // The default props to change
//         disableRipple: true, // No more ripple, on the whole application 💣!
//       },
//     },
//   },
// });

export default function DefaultProps() {
  return (
    <ThemeProvider theme={theme}>
          <Button>This button has disabled ripples.</Button>
          <Button>This button has disabled ripples.</Button>
          <Button>This button has disabled ripples.</Button>
          <Button>This button has disabled ripples.</Button>
          <Button>This button has disabled ripples.</Button>
          <Button>This button has disabled ripples.</Button>
          <Button>This button has disabled ripples.</Button>
    </ThemeProvider>
  );
}