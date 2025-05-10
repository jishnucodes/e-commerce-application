import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const categories = [
  {
    id: 1,
    name: 'Womens Fashion',
    image: '/backpacks.jpg',
  },
  {
    id: 2,
    name: 'Mobiles',
    image: '/backpacks.jpg',
  },
  {
    id: 3,
    name: 'Fashion',
    image: '/backpacks.jpg',
  },
  {
    id: 4,
    name: 'Electronics',
    image: '/backpacks.jpg',
  },
  {
    id: 5,
    name: 'Headphones',
    image: '/backpacks.jpg',
  },
  {
    id: 6,
    name: 'Tablets',
    image: '/backpacks.jpg',
  },
  {
    id: 7,
    name: 'Watches',
    image: '/backpacks.jpg',
  },
  {
    id: 8,
    name: 'Televisions',
    image: '/backpacks.jpg',
  },
  {
    id: 9,
    name: 'Toys',
    image: '/backpacks.jpg',
  }
];

const HeaderSlider = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <Box 
      sx={{ 
        width: '100%',
        bgcolor: 'background.paper',
        py: 2,
        borderBottom: 1,
        borderColor: 'divider',
        overflow: 'hidden',
        position: 'relative',
        '&::before, &::after': {
          content: '""',
          position: 'absolute',
          width: '100px',
          height: '100%',
          top: 0,
          zIndex: 2,
        },
        '&::before': {
          left: 0,
          background: 'linear-gradient(to right, #ffffff 0%, transparent 100%)',
        },
        '&::after': {
          right: 0,
          background: 'linear-gradient(to left, #ffffff 0%, transparent 100%)',
        }
      }}
    >
      <motion.div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          padding: '0 16px',
          width: '100%',
        }}
      >
        {categories.map((category, index) => {
          const angle = (index / categories.length) * Math.PI * 2;
          const x = Math.cos(angle) * 20;
          const scale = Math.sin(angle) * 0.1 + 0.9;

          return (
            <motion.div
              key={category.id}
              initial={{ x: x, scale: scale }}
              animate={{
                x: [x, -x, x],
                scale: hoveredIndex === index ? 1.05 : [scale, scale * 1.1, scale],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              style={{
                flex: '0 0 auto',
                minWidth: '120px',
                maxWidth: '140px',
                transformOrigin: 'center center',
              }}
            >
              <Link 
                href={"/"}
                style={{ 
                  textDecoration: 'none',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                    filter: hoveredIndex === index ? 'grayscale(0%)' : 'grayscale(20%)',
                    opacity: hoveredIndex === index ? 1 : 0.9,
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      '& .category-image': {
                        transform: 'scale(1.1)',
                      },
                      '& .category-text': {
                        color: 'primary.main',
                        fontWeight: 600
                      }
                    },
                    px: { xs: 0.5, sm: 1 },
                    py: 1
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      mb: 1.5,
                      height: { xs: 60, sm: 65, md: 70 },
                      width: '100%',
                      overflow: 'hidden',
                      borderRadius: '8px',
                      bgcolor: 'background.paper',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    }}
                  >
                    <Box
                      className="category-image"
                      sx={{
                        transition: 'transform 0.3s ease-in-out',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <Image
                        src={category.image}
                        alt={category.name}
                        width={80}
                        height={70}
                        style={{ 
                          objectFit: 'contain',
                          maxWidth: '100%',
                          height: 'auto'
                        }}
                        priority
                      />
                    </Box>
                  </Box>
                  <Typography
                    className="category-text"
                    variant="body2"
                    sx={{
                      color: 'text.primary',
                      textAlign: 'center',
                      fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' },
                      fontWeight: hoveredIndex === index ? 600 : 500,
                      width: '100%',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      lineHeight: 1.2,
                      letterSpacing: '0.01em',
                      transition: 'all 0.3s ease-in-out'
                    }}
                  >
                    {category.name}
                  </Typography>
                </Box>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </Box>
  );
};

export default HeaderSlider;
