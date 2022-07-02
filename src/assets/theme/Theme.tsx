import { createTheme, styled, TextField } from '@mui/material';
import esLocalal from 'date-fns/locale/es';

export const themePage = createTheme({
  palette: {
    primary: {
      main: '#006341',
    },
    secondary: {
      main: '#43b02a',
    },
    warning: {
      main: '#e63422',
    },
  },
});

export const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#0db02b',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#0db02b',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#e2e2e2',
    },
    '&:hover fieldset': {
      borderColor: '#006647',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#0db02b',
    },
  },
});

export const localeMap = {
  es: esLocalal,
};

export const maskMap = {
  es: '--____',
};
