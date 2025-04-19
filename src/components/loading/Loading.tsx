"use client"
import { CircularProgress } from '@mui/material'
import { Backdrop } from '@mui/material'
import React, { useState } from 'react'

const Loading = () => {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Backdrop
    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
    open={open}
    onClick={handleClose}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
  )
}

export default Loading;

