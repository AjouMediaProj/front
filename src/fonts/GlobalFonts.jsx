import { createGlobalStyle } from 'styled-components';
import DokdoWoff from 'src/fonts/Dokdo-Regular.woff';
import NanumWoff from 'src/fonts/NanumGothic-Regular.woff';
import MalgunWoff from 'src/fonts/MalgunGothic.woff';

const GlobalFonts = createGlobalStyle`
  /* *, *::before, *::after {
    box-sizing: border-box;
  } */

  body {
    font-family: 'Malgun', sans-serif;
    line-height: 1.5;
  }  
  @font-face {
    font-family: 'Nanum';
    src: local('Nanum'), url()(${NanumWoff}) format('woff');
  }

  @font-face {
    font-family: 'Dokdo';
    src: local('Dokdo'), url(${DokdoWoff}) format('woff');
  }

  @font-face {
    font-family: 'Malgun';
    src: local('Malgun'), url(${MalgunWoff}) format('woff');
  }
`;

export default GlobalFonts;
