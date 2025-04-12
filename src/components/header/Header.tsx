"use client";

import React from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Drawer,
  ListItemIcon,
  useTheme,
  Container,
} from "@mui/material";
import Image from "next/image";
import Searchbar from "./components/Searchbar";
import MenuIcon from "@mui/icons-material/Menu";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LanguageIcon from "@mui/icons-material/Language";
import PersonIcon from "@mui/icons-material/Person";
import { ArrowDownwardSharp, DarkMode } from "@mui/icons-material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { toggleTheme } from "@/slices/themeSlice";
import DropdownNavButton from "./components/DropdownNavButton";
import SubHeader from "./components/Subheader";
import MobileViewTabs from "../mobile-view-tabs/MobileViewTabs";

const Header = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const dispatch: AppDispatch = useDispatch();
  const { themeMode } = useSelector((state: RootState) => state.theme);

  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const navItems = [
    {
      id: 1,
      icon: <ContactMailIcon />,
      label: "Contact",
    },
    {
      id: 2,
      icon: [
        {
          id: 1,
          label: "Light Mode",
          icon: <LightModeIcon />,
        },
        {
          id: 2,
          label: "Dark Mode",
          icon: <DarkMode />,
        },
      ],
      label: "Theme",
    },
    {
      id: 3,
      icon: <ArrowDropDownIcon />,
      label: "More",
    },
  ];

  const dropdownMenuItems = [
    {
      id: 1,
      icon: <PersonIcon />,
      label: "Account",
    },
    {
      id: 2,
      icon: <LanguageIcon />,
      label: "English",
    },
  ];

  const drawerWidth = "400px";

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 1 }}>
        Main Menu
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        Select a option tab
      </Typography>
      {/* <List sx={{ display: "flex", flexDirection: "column" }}>
        {navItems.map((item) => (
          <React.Fragment key={item.id}>
            <ListItem sx={{}}>
              {item.id === navItems[2].id ? (
                <DropdownNavButton key={item.id} item={item} />
              ) : (
                <Button
                  type="button"
                  key={item.id}
                  startIcon={
                    item.id !== navItems[2].id && item.icon
                      ? Array.isArray(item.icon)
                        ? themeMode == "light"
                          ? item.icon[1].icon
                          : item.icon[0].icon
                        : item.icon
                      : null
                  }
                  sx={{
                    ...theme.navFontStyles,
                    color: "#424242",
                  }}
                >
                  {item.id !== navItems[2].id && item.icon
                    ? Array.isArray(item.icon)
                      ? themeMode == "light"
                        ? item.icon[1].label
                        : item.icon[0].label
                      : item.label
                    : null}
                </Button>
              )}
            </ListItem>

            <Divider />
          </React.Fragment>
        ))}
      </List> */}
      <Box>
        <Box>
          <MobileViewTabs />
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", padding: "0px" }}>
        <CssBaseline />
        <Container>
          <AppBar
            component="nav"
            sx={(theme) => ({
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.secondary,
              padding: "0px",
            })}
          >
            <Toolbar
              sx={{
                height: "40px",
                minHeight: { xs: "40px", sm: "40px" },
                justifyContent: { sm: "space-between", md: "space-between" },
              }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  fontFamily: "CaviarDreams_Bold",
                  display: { xs: "none", sm: "none", md: "block" },
                  fontSize: { md: "20px", lg: "20px" },
                }}
              >
                Welcome To Carrefour Store
              </Typography>
              <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
                {navItems.map((item) => (
                  <React.Fragment key={item.id}>
                    {item.id === navItems[2].id ? (
                      <DropdownNavButton key={item.id} item={item} />
                    ) : (
                      <Button
                        type="button"
                        key={item.id}
                        startIcon={
                          item.id !== navItems[2].id && item.icon
                            ? Array.isArray(item.icon)
                              ? themeMode == "light"
                                ? item.icon[1].icon
                                : item.icon[0].icon
                              : item.icon
                            : null
                        }
                        sx={{
                          ...theme?.navFontStyles,
                          marginRight: "10px",
                        }}
                        onClick={() =>
                          dispatch(
                            toggleTheme(themeMode == "dark" ? "light" : "dark")
                          )
                        }
                      >
                        {item.id !== navItems[2].id && item.icon
                          ? Array.isArray(item.icon)
                            ? themeMode == "light"
                              ? item.icon[1].label
                              : item.icon[0].label
                            : item.label
                          : null}
                      </Button>
                    )}
                  </React.Fragment>
                ))}
                {/* <Button onClick={() => dispatch(toggleTheme("light"))}>
                  <DarkMode />
                </Button> */}
              </Box>
            </Toolbar>
            <Divider />
            <SubHeader />
          </AppBar>
        </Container>
        <nav>
          <Drawer
            anchor="right"
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                maxWidth: drawerWidth,
                width: "100%",
                background: "white",
              },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>
      {/* <Box sx={{position: 'absolute', top: '100px', width: "100%"}} component="div">
      <SubHeader />
      </Box> */}
    </Box>
  );
};

export default Header;
