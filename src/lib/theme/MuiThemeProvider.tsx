"use client";
import React, { useState, useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/slices/themeSlice";
import { darkTheme, lightTheme } from "./theme";
import { AppDispatch, RootState } from "../../../store";

const MuiThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

  const {themeMode} = useSelector((state: RootState) => state.theme)
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    dispatch (toggleTheme(systemTheme));
  }, []);

  // Apply the CSS theme globally with data-theme attribute
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeMode);
  }, [themeMode]);

  

  return (
    <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
      <CssBaseline /> 
      {children}
    </ThemeProvider>
  );
};

export default MuiThemeProvider;
