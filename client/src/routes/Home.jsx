import React from "react";
import styled from "styled-components";
import Lottie from "lottie-react";
import winelottie from "../assets/winelottie.json";
import { quotes } from "../assets/wineQuotes";
import MenuBox from "../component/MenuBox";
import Guide from "../component/Guide";

const Home = () => {
  return (
    <Container>
      <HomeScreen>
        <Text>
          <h1>{quotes.title[parseInt(Math.random() * 15)]}</h1>
          <p>{quotes.line[parseInt(Math.random() * 16)]}</p>
        </Text>
        <LottieBox>
          <Lottie animationData={winelottie} loop={true} className="lottie" />
        </LottieBox>
      </HomeScreen>
      <MenuBox />
      <Guide />
    </Container>
  );
};

export default Home;

const Container = styled.div`
  width: 100%;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HomeScreen = styled.div`
  width: 100%;
  max-width: 1250px;
  height: calc(100vh - 140px);
  display: flex;
  position: relative;
`;

const Text = styled.div`
  width: 100%;
  margin: 70px 30px;

  & h1 {
    font-size: 50px;
    font-family: "Ubuntu", sans-serif;
    font-weight: 500;
  }

  & p {
    font-size: 20px;
    font-family: "Ubuntu", sans-serif;
    text-align: start;
    margin: 50px 0px;
    line-height: 30px;
    font-style: italic;
    white-space: pre-line;
  }
`;

const LottieBox = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: flex-end;

  .lottie {
    width: 500px;
    height: 400px;
  }
`;
