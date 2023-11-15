import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: Pretendard;
    display: flex;
    justify-content: center;
    /* background-color: rgba(172,45,49, 0.8); */
    /* color: rgb(25, 25, 25) */
    padding-top: 80px;
    position: relative;
  }
`;

export default GlobalStyle;
