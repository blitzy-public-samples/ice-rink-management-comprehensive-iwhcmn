import React from 'react';
import { Box, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';
import { COLORS, FONTS } from '../../styles/theme';

// Define styles for the footer component
const footerStyles = {
  footer: {
    backgroundColor: COLORS.background.paper,
    color: COLORS.text.primary,
    padding: '24px',
    marginTop: 'auto',
  },
  linkContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '16px',
  },
  link: {
    color: COLORS.text.secondary,
    margin: '0 8px',
    textDecoration: 'none',
    '&:hover': {
      color: COLORS.primary.main,
    },
  },
  socialIcons: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '16px',
  },
};

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box component="footer" sx={footerStyles.footer}>
      <Typography variant="body2" align="center" sx={{ fontFamily: FONTS.body }}>
        &copy; {currentYear} Ice Rink Management and Booking System. All rights reserved.
      </Typography>
      
      <Box sx={footerStyles.linkContainer}>
        <Link href="/about" sx={footerStyles.link}>
          About
        </Link>
        <Link href="/contact" sx={footerStyles.link}>
          Contact
        </Link>
        <Link href="/terms" sx={footerStyles.link}>
          Terms of Service
        </Link>
        <Link href="/privacy" sx={footerStyles.link}>
          Privacy Policy
        </Link>
      </Box>
      
      <Box sx={footerStyles.socialIcons}>
        <IconButton
          aria-label="Facebook"
          component="a"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: COLORS.text.secondary }}
        >
          <Facebook />
        </IconButton>
        <IconButton
          aria-label="Twitter"
          component="a"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: COLORS.text.secondary }}
        >
          <Twitter />
        </IconButton>
        <IconButton
          aria-label="Instagram"
          component="a"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: COLORS.text.secondary }}
        >
          <Instagram />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;

// Human tasks:
// 1. Update the copyright year dynamically (Optional) - Implemented
// 2. Add actual social media links for the Ice Rink Management and Booking System (Required)
// 3. Ensure all links in the footer are working and pointing to the correct pages (Required)
// 4. Review the footer design with the UX team to ensure it matches the overall application design (Optional)