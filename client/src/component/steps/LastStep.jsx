import React from "react";
import styled from "styled-components";

function LastStep({ clearAll }) {
  return (
    <Container>
      <Title>
        <h1>또 다른 추천받기</h1>
        <p>다시 추천을 받고 싶으시다면 아래 버튼을 클릭해주세요!</p>
      </Title>
      <BtnBox>
        <Button onClick={clearAll}>추천받기</Button>
      </BtnBox>
    </Container>
  );
}

export default LastStep;

const Container = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  height: 170px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;

  & h1 {
    margin: 10px 0px;
    font-size: 28px;
  }

  & p {
    margin: 10px 0px;
    white-space: pre-wrap;
    text-align: center;
    line-height: 30px;
  }
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 150px;
  gap: 20px;
  align-items: center;
`;

const Button = styled.button`
  border: none;
  border-radius: 20px;
  height: 40px;
  width: 100px;
  background-color: rgba(172, 45, 49);
  color: white;
  cursor: pointer;
  margin: 10px;
  font-weight: 600;

  transition: transform 0.1s ease-in;
  &:hover {
    transform: scale(1.1);
  }
`;
