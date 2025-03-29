"use client";
import React from "react";
import { Container, Box, Typography, Button, IconButton } from "@mui/material";
import { Home, Info, ContactMail, Facebook, Twitter, Instagram } from "@mui/icons-material";
import Grid from '@mui/material/Grid2';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(to right, #1e3c72, #2a5298)", // Gradient background
        color: "white",
        py: 6,
        mt: "auto",
        mb:"10px",
        borderTop: "1px solid",
        borderColor: "divider",
        fontFamily: "Arial, sans-serif", // Custom font
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          {/* Quick Links */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Quick Links
            </Typography>
            <Box display="flex" flexDirection="column">
              {[
                { text: "Home", icon: <Home />, href: "/" },
                { text: "About", icon: <Info />, href: "/about" },
                { text: "Contact", icon: <ContactMail />, href: "/contact" },
              ].map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  startIcon={item.icon}
                  href={item.href}
                  sx={{
                    justifyContent: "flex-start",
                    fontSize: "1rem",
                    fontWeight: "500",
                    my: 0.5,
                    color: "#e0e0e0",
                    "&:hover": { color: "white", transform: "scale(1.05)" },
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Contact Us
            </Typography>
            {[
              { label: "Email:", value: "contact@example.com" },
              { label: "Phone:", value: "+1 234 567 890" },
              { label: "Address:", value: "123 Street Name, City" },
            ].map((item, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{ color: "#e0e0e0", fontSize: "1rem", mb: 0.5 }}
              >
                <strong>{item.label}</strong> {item.value}
              </Typography>
            ))}
          </Grid>

          {/* Social Media */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Follow Us
            </Typography>
            <Box display="flex" gap={2}>
              {[
                { icon: <Facebook />, href: "#" },
                { icon: <Twitter />, href: "#" },
                { icon: <Instagram />, href: "#" },
              ].map((item, index) => (
                <IconButton
                  key={index}
                  color="inherit"
                  href={item.href}
                  sx={{
                    color: "white",
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    "&:hover": { bgcolor: "rgba(255, 255, 255, 0.3)", transform: "scale(1.2)" },
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  {item.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box textAlign="center" pt={4} mt={3}>
          <Typography variant="body2" sx={{ fontSize: "0.9rem", opacity: 0.8 }}>
            © {new Date().getFullYear()} Your Company Name. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;