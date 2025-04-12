import { createTheme } from "@mui/material/styles";

// Create a base theme instance for breakpoints
const baseTheme = createTheme();

// Light Theme Configuration
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#fff5f5",
      paper: "#f4f6f8",
    },
    text: {
      primary: "#0118D8",
      secondary: "#3f3d3d",
    },
  },
  typography: {
    fontFamily: "CaviarDreams_Bold ,Garmit-Light",
  },
  mainFontStyles: {
    fontFamily: "Arial, sans-serif",
  },
  navFontStyles: {
    fontFamily: "CaviarDreams_Bold",
    fontSize: "12px",
    textTransform: "capitalize",
    [baseTheme.breakpoints.up("sm")]: {
      fontSize: "14px"
    },
    [baseTheme.breakpoints.up("md")]: {
      fontSize: "16px"
    }
  }
});

// Dark Theme Configuration
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#16151e",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#253bfe",
      secondary: "#adadad",
    },
  },
  typography: {
    fontFamily: "CaviarDreams_Bold ,Garmit-Light",
  },
  mainFontStyles: {
    fontFamily: "Poppins",
  },
  navFontStyles: {
    fontFamily: "CaviarDreams_Bold",
    fontSize: "12px",
    textTransform: "capitalize",
    [baseTheme.breakpoints.up("sm")]: {
      fontSize: "14px"
    },
    [baseTheme.breakpoints.up("md")]: {
      fontSize: "16px"
    }
  }
});

export { lightTheme, darkTheme };
