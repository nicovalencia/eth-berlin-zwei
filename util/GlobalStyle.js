import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  @import url('https://fonts.googleapis.com/css?family=Baumans&display=swap');

  body {
    background-color: #fdf7e2;
  }

  html, body {
    height: 100%;
    padding: 0;
    margin: 0;
    font-size: 62.5%; /* base 10 rems */
  }

  * {
    font-size: 2rem;
    box-sizing: border-box;
    font-family: 'Baumans', cursive;
  }

  a:focus,
  input:focus,
  select:focus,
  textarea:focus,
  button:focus {
    outline: none;
  }

`;

export default GlobalStyle;
