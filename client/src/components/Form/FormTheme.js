import { createTheme } from '@mui/material/styles';

const fontSize = '1.2rem';
const labelFontSize = '1.3rem';
const focusedColor = '#28a745';

const theme = createTheme({
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          label: {
            fontSize: labelFontSize,
          },
          '& label.Mui-focused': {
            color: focusedColor,
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: focusedColor,
          },
        },
        inputRoot: {
          fontSize: fontSize,
        },
      },
    },

    MuiFormControl: {
      styleOverrides: {
        root: {
          marginBottom: '1.2rem',
          label: {
            fontSize: labelFontSize,
          },
          '& label.Mui-focused': {
            color: focusedColor,
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: focusedColor,
          },
          '& .MuiInputBase-input': {
            fontSize: labelFontSize,
          },
        },
        inputRoot: {
          fontSize: fontSize,
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        root: {
          label: {
            fontSize: labelFontSize,
          },
          '& label.Mui-focused': {
            color: focusedColor,
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: focusedColor,
          },
          '& .MuiInputBase-input': {
            fontSize: labelFontSize,
          },
        },
        inputRoot: {
          fontSize: fontSize,
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        inputRoot: {
          fontSize: fontSize,
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: fontSize,
        },
        inputRoot: {
          fontSize: fontSize,
        },
      },
    },
  },
});

export default theme;
