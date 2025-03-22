"use client";

import { Categories } from '@/common/utils';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import React from 'react'

const Sidebar = () => {
  return (
    <Box
        sx={{
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
            // maxWidth: "220px",
            width: "100%"
        }}
    >
         <List>
            {
                Categories.map((category) => (
                   <ListItem 
                    key={category.id} 
                    sx={{
                        fontFamily: "Roboto, sans-serif",
                        
                    }}
                >
                    
                    <ListItemText
                        primary={category.name}
                        sx={{
                            fontFamily: "Roboto, sans-serif",
                            '&:hover': {
                                cursor: 'pointer'
                            }
                        }}
                    />
                   </ListItem>
                ))
            }
                
            </List>
    </Box>
  )
}

export default Sidebar;