import React from "react";
import styled from "styled-components";
import Lottie from "lottie-react";
import winelottie from "../assets/winelottie.json";
import { quotes } from "../assets/wineQuotes";

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
      <Guide>
        <MenuBox>
          <h3>와인 추천받기</h3>
        </MenuBox>
        <MenuBox>
          <h3>AI 소믈리에와 대화</h3>
        </MenuBox>
        <MenuBox>
          <h3>페어링 추천받기</h3>
        </MenuBox>
      </Guide>
      <Screen>
        <h1>와인 추천받기 &#x2728;</h1>
      </Screen>
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

const Screen = styled.div`
  width: 100%;
  max-width: 1250px;
  height: auto;
  display: flex;
`;

const Guide = styled.div`
  width: 100%;
  height: 400px;
  background-color: rgba(172, 45, 49, 0.248);

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const MenuBox = styled.div`
  background-color: white;
  width: 300px;
  height: 200px;
  border-radius: 10px;
  border: 1px solid gray;

  box-sizing: border-box;
  padding: 30px;

  & h3 {
    margin: 0;
  }
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
  /* width: 500px; */
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
