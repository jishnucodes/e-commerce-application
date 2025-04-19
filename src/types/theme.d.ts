import { Theme, ThemeOptions } from "@mui/material/styles";
import React from "react";

declare module "@mui/material/styles" {
  interface TypeText {
    tertiary?: string;
  }
  interface Theme {
    mainFontStyles?: {
      fontFamily?: React.CSSProperties['fontFamily'];
    };
    navFontStyles?: {
      fontFamily?: React.CSSProperties['fontFamily'];
      fontSize?: React.CSSProperties['fontSize'];
      textTransform?: React.CSSProperties['textTransform'];
      color?: React.CSSProperties['color'];
      [key: string]: any;  // ✅ To support dynamic breakpoints
    };
    buttonStyles?: {
      backgroundColor?: React.CSSProperties['backgroundColor'];
      fontFamily?: React.CSSProperties['fontFamily'];
      fontSize?: React.CSSProperties['fontSize'];
      textTransform?: React.CSSProperties['textTransform'];
      [key: string]: any;  // ✅ To support dynamic breakpoints
    };
  }

  interface ThemeOptions {
    text?: {
      tertiary?: string;
    };
    mainFontStyles?: {
      fontFamily?: React.CSSProperties['fontFamily'];
    };
    navFontStyles?: {
      fontFamily?: React.CSSProperties['fontFamily'];
      fontSize?: React.CSSProperties['fontSize'];
      textTransform?: React.CSSProperties['textTransform'];
      [key: string]: any;  // ✅ To support dynamic breakpoints
    };
    buttonStyles?: {
      backgroundColor?: React.CSSProperties['backgroundColor'];
      fontFamily?: React.CSSProperties['fontFamily'];
      fontSize?: React.CSSProperties['fontSize'];
      textTransform?: React.CSSProperties['textTransform'];
      color?: React.CSSProperties['color'];
      [key: string]: any;  // ✅ To support dynamic breakpoints
    };
  }
}
