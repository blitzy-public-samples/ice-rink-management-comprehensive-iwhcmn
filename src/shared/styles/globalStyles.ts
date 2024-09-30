import { createGlobalStyle } from 'styled-components';
import { theme } from '../styles/theme';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: ${theme.typography.fontFamily};
    font-size: 16px;
    line-height: 1.5;
    color: ${theme.palette.text.primary};
    background-color: ${theme.palette.background.default};
  }

  a {
    color: ${theme.palette.primary.main};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.typography.h1.fontFamily};
    font-weight: ${theme.typography.h1.fontWeight};
    margin-bottom: 0.5em;
  }

  button {
    font-family: ${theme.typography.button.fontFamily};
    font-size: ${theme.typography.button.fontSize};
  }

  input, textarea, select {
    font-family: ${theme.typography.body1.fontFamily};
    font-size: ${theme.typography.body1.fontSize};
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;

export default GlobalStyles;