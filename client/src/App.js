import { styled } from "styled-components";
import AppRouter from "./AppRouter";
import GlobalStyle from "./GlobalStyle";
import NavBar from "./component/NavBar";

function App() {
  return (
    <>
      <Container>
        <GlobalStyle />
        <NavBar />
        <AppRouter />
      </Container>
    </>
  );
}

export default App;

const Container = styled.div`
  width: 99vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
`;
