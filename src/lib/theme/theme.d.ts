import { Theme, ThemeOptions } from "@mui/material/styles";
import React from "react";

declare module "@mui/material/styles" {
  interface Theme {
    mainFontStyles?: {
      fontFamily?: React.CSSProperties['fontFamily'];
    };
    navFontStyles?: {
      fontFamily?: React.CSSProperties['fontFamily'];
      fontSize?: React.CSSProperties['fontSize'];
      textTransform?: React.CSSProperties['textTransform'];
      [key: string]: any;  // ✅ To support dynamic breakpoints
    };
  }

  interface ThemeOptions {
    mainFontStyles?: {
      fontFamily?: React.CSSProperties['fontFamily'];
    };
    navFontStyles?: {
      fontFamily?: React.CSSProperties['fontFamily'];
      fontSize?: React.CSSProperties['fontSize'];
      textTransform?: React.CSSProperties['textTransform'];
      [key: string]: any;  // ✅ To support dynamic breakpoints
    };
  }
}
