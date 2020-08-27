import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
 :root{
    font-size: 60%;
  }

  * {
    margin:0;
    padding:0;
    box-sizing:border-box;
  }
  /* html {
    min-height: 100%;
  
  } */
  *, button, input {
    font-family: Roboto, sans-serif;
  }
 

  html,body, #root {
    min-height: 100%;
  }

  #root{
  display:flex;
  align-items: center;
  justify-content:center;
  
}

@media(min-width:700px){
  :root{
    font-size:62.5%;
  }
}
`;
