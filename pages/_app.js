import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,700;1,800&family=Satisfy&display=swap');
body{
    padding:0;
    margin:0;
    font-family: 'EB Garamond', serif;
    font-family: 'Satisfy', cursive;  
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
        <Component {...pageProps} />
    </>
  );
}
