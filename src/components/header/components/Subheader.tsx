"use client";

import { Box, Typography, Button, IconButton } from "@mui/material";
import Image from "next/image";
import Searchbar from "./Searchbar";
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { AppDispatch } from "../../../../store";
import { useDispatch } from "react-redux";
import { showSidebar } from "@/slices/headerSlice";
import { useState } from "react";

const SubHeader = () => {

  const dispatch: AppDispatch = useDispatch();

  const [isClicked, setIsClicked] = useState<boolean>(true);

  const handleMenuIconClick = () => {
    setIsClicked(!isClicked)
    dispatch(showSidebar(isClicked))
  }
  return (
    <Box
      sx={{
        display: { xs: "none", sm: "flex", md: "flex", lg: "flex" },
        flexDirection: 'column',
        paddingLeft: "24px",
        paddingRight: "24px",
        paddingTop: "8px",
        paddingBottom: "8px"
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 4,
        }}
      >
        {/* Logo and Brand */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src="/Carrefour-Emblem.png"
            alt="Carrefour Logo"
            width={35}
            height={30}
            priority
          />
          <Typography
            variant="body1"
            sx={{
              fontSize: "30px",
              fontFamily: "Poppins",
              letterSpacing: "1px",
              fontWeight: "bold",
              color: "blueViolet",
            }}
          >
            Carrefour
          </Typography>
        </Box>

        {/* Searchbar */}
        <Box sx={{ width: "80%", justifyItems: "center", flexGrow: 1 }}>
          <Searchbar />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <IconButton sx={{justifyItems: 'start'}}>
            <ShoppingCartOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          border: "1px solid #e0e0e0",
          padding: "6px",
          marginTop: "15px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 2
          }}
        >
        <Button 
          variant='contained'
          color="primary"
          endIcon={<WidgetsOutlinedIcon />}
          onClick={handleMenuIconClick}
        >
          Categories
        </Button>
        <Typography variant="body1">shop</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SubHeader;
