import { styled } from "styled-components";
import AppRouter from "./AppRouter";
import GlobalStyle from "./GlobalStyle";
import Header from "./component/Header";

function App() {
  return (
    <>
      <Container>
        <GlobalStyle />
        <Header />
        <AppRouter />
      </Container>
    </>
  );
}

export default App;

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
`;
