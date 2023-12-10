import React from "react";
import styled from "styled-components";
import Lottie from "lottie-react";
import winelottie from "../assets/winelottie.json";
import { quotes } from "../assets/wineQuotes";
import { FaArrowRightLong } from "react-icons/fa6";

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
          <div>
            <FaArrowRightLong style={{ width: "30px", height: "20px" }} />
          </div>
        </MenuBox>
        <MenuBox>
          <h3>AI 소믈리에와 대화</h3>
          <div>
            <FaArrowRightLong style={{ width: "30px", height: "20px" }} />
          </div>
        </MenuBox>
        <MenuBox>
          <h3>페어링 추천받기</h3>
          <div>
            <FaArrowRightLong style={{ width: "30px", height: "20px" }} />
          </div>
        </MenuBox>
      </Guide>
      <Screen>
        <Line>
          <h1>와인 추천받기 &#x2728;</h1>
          <Intro>
            <Image src="img/recommend.gif" alt="recommend" />
            <Desc>
              <p>
                원하는 와인 취향을 입력하고 <strong>'추천받기'</strong> 버튼을
                클릭하면,
              </p>
              <p>
                <strong>취향에 맞는 와인 5가지</strong>를 추천받을 수 있어요!
              </p>
            </Desc>
          </Intro>
        </Line>
        <Line>
          <h1 style={{ textAlign: "end" }}>페어링 추천받기 &#x2728;</h1>
          <Intro>
            <Desc style={{ alignItems: "flex-end" }}>
              <p>
                와인과 함께 페어링 하고 싶은 <strong>음식의 이름과 특징</strong>
                을 선택하면,
              </p>
              <p>
                <strong>음식과 잘 어울리는 와인 5가지</strong>를 추천받을 수
                있어요!
              </p>
            </Desc>
            <Image src="img/pairing.gif" alt="pairing" />
          </Intro>
        </Line>
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
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 50px 0px;
`;

const Guide = styled.div`
  width: 100%;
  height: 400px;
  /* background-color: rgba(172, 45, 49, 0.248); */
  background-color: #eae0db;

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

  & div {
    display: flex;
    justify-content: flex-end;
  }

  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

const Image = styled.img`
  height: 350px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  border-radius: 10px;
  border: 0.5px solid gray;
`;

const Line = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 500px;
  margin: 20px 0px;
`;

const Intro = styled.div`
  width: 100%;
  height: 350px;
  display: flex;
  justify-content: space-between;
`;

const Desc = styled.div`
  width: 100%;
  height: 100%;
  max-width: 500px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  & p {
    font-size: 18px;
    margin: 10px 0px;
  }
`;
