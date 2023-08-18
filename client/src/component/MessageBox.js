import React from "react";
import { styled } from "styled-components";
import Lottie from "lottie-react";
import winelottie from "../assets/winelottie.json";
import Typing from "./Typing";

const MessageBox = () => {
  return (
    <Container>
      <Title>
        <h4>취향대로 와인 추천받기 🍷</h4>
        <span>I want to get recommendations for..</span>
        <div>
          <Typing />
        </div>
        {/* <span>with Chat GPT</span> */}
      </Title>
      <LottieBox>
        <Lottie animationData={winelottie} loop={true} className="lottie" />
      </LottieBox>
    </Container>
  );
};

export default MessageBox;

const Container = styled.div`
  width: 45%;
  height: 600px;

  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 30px 0;

  justify-content: space-between;

  font-size: 20px;
  font-weight: 550;

  @media screen and (max-width: 990px) {
    width: 500px;
    height: 570px;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Title = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  h4 {
    font-size: 35px;
    margin: 10px 30px;
  }
  span {
    margin-left: 30px;
  }
`;

const LottieBox = styled.div`
  width: 500px;
  height: 300px;

  display: flex;
  justify-content: center;

  .lottie {
    width: 370px;
    height: 370px;
  }
  margin-bottom: 100px;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;
