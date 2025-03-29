"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Paper, useTheme, useMediaQuery } from '@mui/material';
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

export default function BottomNavigationComponent() {
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [value, setValue] = React.useState(0);

  return (
    <>
    {
        isSmallScreen ? (
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }} elevation={3}>
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <BottomNavigationAction label="Categories" icon={<TopicOutlinedIcon />} />
              <BottomNavigationAction label="Home" icon={<HomeOutlinedIcon />} />
              <BottomNavigationAction label="Cart" icon={<ShoppingCartOutlinedIcon />} />
              <BottomNavigationAction label="Account" icon={<PersonOutlineOutlinedIcon />} />
            </BottomNavigation>
            
          </Paper>
        ) : null
    }
    </>
   
  );
}
