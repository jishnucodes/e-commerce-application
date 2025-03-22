"use client";

import React, { useState, useRef } from "react";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box
} from "@mui/material";

const Searchbar: React.FC = () => {
  const [open, setOpen] = useState(false);         // Dialog state
  const [textValue, setTextValue] = useState("");  // TextField value

  // Toggle Dialog
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle TextField changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(event.target.value);
  };

  return (
    <Box sx={{width: "100%"}} >

      <Button
        variant="outlined"
        sx={{
          width: '90%'
        }}
      >
        Search Product
      </Button>

      {/* TextField */}
      {/* <TextField
        label="Click to view content"
        variant="outlined"
        fullWidth
        value={textValue}
        onChange={handleChange}
        onClick={handleOpen}   // Open dialog on click
        style={{ marginBottom: "1rem" }}
      /> */}

      {/* Dialog Positioned Below */}
      {/* <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          // style: {
          //   position: "absolute",
          //   top: textFieldRef.current
          //     ? textFieldRef.current.getBoundingClientRect().bottom + window.scrollY + 8
          //     : undefined,
          //   left: textFieldRef.current
          //     ? textFieldRef.current.getBoundingClientRect().left + window.scrollX
          //     : undefined,
          //   width: textFieldRef.current ? textFieldRef.current.offsetWidth : "400px",
          // },
        }}
      >
        <DialogTitle>Entered Text</DialogTitle>
        <DialogContent>
          <Typography>
            {textValue || "No content entered"}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog> */}
    </Box>
  );
};

export default Searchbar;
