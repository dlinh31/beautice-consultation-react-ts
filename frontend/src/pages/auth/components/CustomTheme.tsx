import { createTheme } from '@mui/material/styles';


const CustomTheme = createTheme({
  palette: {
    background: {
      default: 'transparent',
    }
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});


export {CustomTheme}