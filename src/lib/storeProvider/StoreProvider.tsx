"use client";

import React from "react";
import { Provider } from "react-redux";
import store from "../../../store";
import MuiThemeProvider from "../theme/MuiThemeProvider";

const StoreProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <Provider store={store}>
      <MuiThemeProvider>{children}</MuiThemeProvider>
    </Provider>
  );
};

export default StoreProvider;
