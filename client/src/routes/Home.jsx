import React from "react";
import styled from "styled-components";
import Lottie from "lottie-react";
import winelottie from "../assets/winelottie.json";

const Home = () => {
  return (
    <Container>
      <Contents>
        <Text>
          <h1>
            What do friends and wine have in common? The older, the better.
          </h1>
          <p>
            My only regret in life is that I did not drink more wine.
            <br /> - Ernest Hemingway -
          </p>
        </Text>
        <LottieBox>
          <Lottie animationData={winelottie} loop={true} className="lottie" />
        </LottieBox>
      </Contents>
      <Footer></Footer>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  overflow: hidden;

  display: flex;
  flex-direction: column;
`;

const Contents = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
`;

const Text = styled.div`
  width: 100%;
  margin: 70px 100px;

  & h1 {
    font-size: 50px;
  }

  & p {
    font-size: 20px;
    text-align: start;
    margin: 50px 0px;
    line-height: 30px;
    font-style: italic;
  }
`;

const LottieBox = styled.div`
  width: 500px;
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

const Footer = styled.footer`
  height: 200px;
  width: 100vw;
  position: fixed;
  bottom: -150px;
  z-index: -999;

  background-color: rgba(215, 92, 96);
  -webkit-transform: skew(0deg, -10deg);
  -moz-transform: skew(0deg, -10deg);
  -ms-transform: skew(0deg, -10deg);
  -o-transform: skew(0deg, -10deg);
  transform: skew(0deg, -10deg);

  /* .content {
    -webkit-transform: skew(0deg, 10deg);
    -moz-transform: skew(0deg, 10deg);
    -ms-transform: skew(0deg, 10deg);
    -o-transform: skew(0deg, 10deg);
    transform: skew(0deg, 10deg);
    text-align: center;
  } */
`;
