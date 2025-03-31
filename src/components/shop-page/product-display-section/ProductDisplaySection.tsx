"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

const menuItemValues = [
  "alphabetic",
  "price: low to high",
  "price: high to low",
  "latest",
];

const ProductDisplaySection = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedValue, setSelectedValue] = useState<string>(menuItemValues[3]);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("event value", event);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (value: string) => {
    console.log("clicked value", value);
    setSelectedValue(value);
    handleClose();
  };

  return (
    <Box component="div">
      {/* header-part */}
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "15px",
        }}
      >
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <span>
            <FilterAltOutlinedIcon />
          </span>
          <Typography variant="body1">Filters</Typography>
        </Box>
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            gap: 1,
          }}
        >
          <Box component="div">
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              variant="outlined"
            >
              {selectedValue}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleMenuItemClick(menuItemValues[0])}>
                Alphabetic
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick(menuItemValues[1])}>
                Price: Low to high
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick(menuItemValues[2])}>
                Price: High to low
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick(menuItemValues[3])}>
                Latest
              </MenuItem>
            </Menu>
          </Box>
          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              component="div"
              sx={{
                display: "flex", // Use flexbox for inline layout
                alignItems: "center", // Align items vertically centered
                gap: 1, // Add spacing between items
              }}
            >
              <Typography variant="body1">Show:</Typography>
              <TextField
                variant="outlined"
                size="small" // Smaller input field for better spacing
                sx={{
                  width: "100px",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      {/* product-card displaying */}
      <Box component="div">
        <Grid container spacing={2}>
          <Grid size={{ sm: 6, md: 4, lg: 3 }}>
            <Card sx={{ width: "100%"}}>
              <CardMedia
                sx={{ height: 140 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid size={{ sm: 6, md: 4, lg: 3 }}>
            <Card sx={{ width: "100%"}}>
              <CardMedia
                sx={{ height: 140 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid size={{ sm: 6, md: 4, lg: 3 }}>
            <Card sx={{ width: "100%"}}>
              <CardMedia
                sx={{ height: 140 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid size={{ sm: 6, md: 4, lg: 3 }}>
            <Card sx={{ width: "100%"}}>
              <CardMedia
                sx={{ height: 140 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid size={{ sm: 6, md: 4, lg: 3 }}>
            <Card sx={{ width: "100%"}}>
              <CardMedia
                sx={{ height: 140 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid size={{ sm: 6, md: 4, lg: 3 }}>
            <Card sx={{ width: "100%"}}>
              <CardMedia
                sx={{ height: 140 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
          
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductDisplaySection;
