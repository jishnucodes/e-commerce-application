import { createTheme } from "@mui/material/styles";

// Create a base theme instance for breakpoints
const baseTheme = createTheme();

// Light Theme Configuration
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0118D8",
      light: "#0118D8",
    },
    secondary: {
      main: "#090910",
      light: "#3f3d3d",
    },
    
    background: {
      default: "#fff5f5",
      paper: "#f4f6f8",
    },
    text: {
      primary: "#0118D8",
      secondary: "#090910",
      tertiary: "#3f3d3d",
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
    },
    color: "#090910",
  },
  buttonStyles: {
    backgroundColor: "#253bfe",
    fontFamily: "CaviarDreams_Bold",
    fontSize: "12px",
    textTransform: "capitalize",
    [baseTheme.breakpoints.up("sm")]: {
      fontSize: "14px"
    },
    [baseTheme.breakpoints.up("md")]: {
      fontSize: "16px"
    },
    color: "#F3F3FF",
  }
});

// Dark Theme Configuration
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#253bfe",
      light: "#253bfe",
    },
    secondary: {
      main: "#F3F3FF",
      light: "#adadad",
    },
    background: {
      default: "#16151e",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#253bfe",
      secondary: "#F3F3FF",
      tertiary: "#adadad",
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
    },
    color: "#F3F3FF",
  },
  buttonStyles: {
    backgroundColor: "#253bfe",
    fontFamily: "CaviarDreams_Bold",
    fontSize: "12px",
    textTransform: "capitalize",
    [baseTheme.breakpoints.up("sm")]: {
      fontSize: "14px"
    },
    [baseTheme.breakpoints.up("md")]: {
      fontSize: "16px"
    },
    color: "#F3F3FF",
  }
});

export { lightTheme, darkTheme };
