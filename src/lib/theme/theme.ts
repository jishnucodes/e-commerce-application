import { createTheme, ThemeOptions } from "@mui/material/styles";




// Light Theme Configuration
const lightTheme:ThemeOptions  = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#ffffff",
      paper: "#f4f6f8",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    
  },
  mainFontStyles: {
    fontFamily: "Arial, sans-serif", // ✅ Now properly recognized
  },
  navFontStyles: {
    fontFamily: "Poppins",
    fontSize: "12px",
    textTransform: "capitalize",
    [createTheme().breakpoints.up("sm")] : {
      fontSize: "14px"
    },
    [createTheme().breakpoints.up("md")] : {
      fontSize: "16px"
    }
  }
});

// Dark Theme Configuration
const darkTheme:ThemeOptions = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#e0f2f1",
      secondary: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  mainFontStyles: {
    fontFamily: "Poppins", 
  },
  navFontStyles: {
    fontFamily: "Poppins",
    fontSize: "12px",
    textTransform: "capitalize",
    [createTheme().breakpoints.up("sm")] : {
      fontSize: "14px"
    },
    [createTheme().breakpoints.up("md")] : {
      fontSize: "16px"
    }
  }
});

export { lightTheme, darkTheme };
