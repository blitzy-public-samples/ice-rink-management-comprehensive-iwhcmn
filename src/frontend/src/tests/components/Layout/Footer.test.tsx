import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import Footer from '../../../components/Layout/Footer';
import theme from '../../../styles/theme';

describe('Footer component', () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <Footer />
      </ThemeProvider>
    );
  });

  test('renders the copyright text', () => {
    const currentYear = new Date().getFullYear();
    const copyrightText = screen.getByText(new RegExp(`${currentYear}`));
    expect(copyrightText).toBeInTheDocument();
    expect(copyrightText).toHaveTextContent(`© ${currentYear}`);
  });

  test('renders all footer links', () => {
    const aboutLink = screen.getByText(/About/i);
    const contactLink = screen.getByText(/Contact/i);
    const termsLink = screen.getByText(/Terms of Service/i);
    const privacyLink = screen.getByText(/Privacy Policy/i);

    expect(aboutLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
    expect(termsLink).toBeInTheDocument();
    expect(privacyLink).toBeInTheDocument();
  });

  test('renders social media icons', () => {
    const facebookIcon = screen.getByLabelText(/Facebook/i);
    const twitterIcon = screen.getByLabelText(/Twitter/i);
    const instagramIcon = screen.getByLabelText(/Instagram/i);

    expect(facebookIcon).toBeInTheDocument();
    expect(twitterIcon).toBeInTheDocument();
    expect(instagramIcon).toBeInTheDocument();
  });

  test('applies correct styles to footer elements', () => {
    const footer = screen.getByRole('contentinfo');
    const links = screen.getAllByRole('link');
    const socialIcons = screen.getAllByRole('img', { hidden: true });

    expect(footer).toHaveStyle({ backgroundColor: theme.palette.primary.main });
    links.forEach(link => {
      expect(link).toHaveStyle({ color: theme.palette.primary.contrastText });
    });
    socialIcons.forEach(icon => {
      expect(icon).toHaveStyle({ marginLeft: '8px', marginRight: '8px' });
    });
  });
});

// Human tasks:
// TODO: Implement additional tests for link functionality
// TODO: Add tests for hover states of links and social media icons
// TODO: Ensure test coverage is adequate for all Footer component features