import React from "react";
import { styled } from "styled-components";
import wineImg from "../assets/images/wine-bottle.png";

const WineInfo = ({ wine }) => {
  return (
    <Container>
      <Thumbnail>
        {wine.thumbnail ? (
          <img src={wine.thumbnail} height="180" alt="wine img" />
        ) : (
          <img src={wineImg} width="150" alt="wine img" />
        )}
      </Thumbnail>
      <Description>
        <h3>{wine.title}</h3>
        <p>{wine.description ? wine.description : "상세 설명이 없습니다."}</p>
      </Description>
    </Container>
  );
};

export default WineInfo;

const Container = styled.div`
  width: 600px;
  height: 250px;
  background-color: white;
  margin: 20px 0px;
  border-radius: 15px;

  display: flex;
`;

const Thumbnail = styled.div`
  width: 170px;
  height: 250px;
  border-radius: 15px;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Description = styled.div`
  width: 380px;
  height: 200px;
  box-sizing: border-box;
  padding: 15px 15px;

  h3 {
    font-size: 24px;
  }

  p {
    line-height: 25px;
  }
`;
