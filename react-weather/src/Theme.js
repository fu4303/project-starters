import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import Image from './assets/img/background.jpg'; 

let Theme = createMuiTheme({
  palette: {
    type: "dark",
  },
  typography: {
    button: {
      textTransform: "none",
      backgroundColor: "blue",
    },
    h6: {
      color: "white",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundImage:
          `url(${Image})`,
        }
      }
    },
    MuiPaper: {
      root: {
        backgroundColor: "transparent",
      },
      elevation1: {
        ///boxShadow: "none",
      },
      elevation8: {
        backgroundColor: "blue",
      },
    },
    MuiSvgIcon: {
      colorPrimary: {
        color: "white",
      },
    },
    MuiFormLabel: {
      root: {
        color: "white",
        "&$focused": {
          color: "white",
          fontWeight: "bold"
        }
      },
    },
    MuiInput: {
      root: {
        color: "white",
      },
    },
    MuiInputLabel: {
      root: {
        color: "white",
      },
    },
    MuiSelect: {
      icon: {
        color: "white",
      },
    },
    MuiAutocomplete: {
      listbox: {
        backgroundColor: "blue",
      },
    },
  },
});

Theme = responsiveFontSizes(Theme);

export default Theme;
