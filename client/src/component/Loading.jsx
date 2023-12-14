import React from "react";
import { styled } from "styled-components";
import { SyncLoader } from "react-spinners";

const Loading = () => {
  return (
    <Container>
      <h4>추천 받는 중...</h4>
      <SyncLoader color="white" />
    </Container>
  );
};

export default Loading;

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
  top: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;

  h4 {
    margin: 0 0;
    margin-top: -20px;
    margin-bottom: 20px;
    font-size: 24px;
  }

  @media screen and (max-width: 1150px) {
    width: 100%;
  }

  @media screen and (max-width: 990px) {
    width: 100%;
    height: 100%;
  }

  @media screen and (max-width: 600px) {
    width: 100%;
    height: 100%;
  }
`;
