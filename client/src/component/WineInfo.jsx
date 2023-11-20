import React from "react";
import { styled } from "styled-components";
import { SiVivino } from "react-icons/si";
import Flag from "./Flag";

const WineInfo = ({ wine }) => {
  /* ------------- 와인 클릭 시 링크로 이동 ------------- */
  const onClick = () => {
    window.open(wine.link);
  };

  return (
    <Container onClick={onClick}>
      <Thumbnail>
        <img src={wine.thumb} height="200" alt="wine img" />
      </Thumbnail>
      <Description>
        <WineName>{wine.name}</WineName>
        <KoName>{wine.ko_name}</KoName>
        <Region>
          <Flag countryName={wine.country} />
          <span>
            {wine.country}, {wine.region}
          </span>
        </Region>
        <Rating>
          <SiVivino /> {wine.average_rating}
        </Rating>
      </Description>
    </Container>
  );
};

export default WineInfo;

const Container = styled.div`
  width: 220px;
  height: 400px;
  background-color: white;
  margin: 20px 0px;
  border-radius: 15px;

  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 220px;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Description = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0px 15px;

  display: flex;
  flex-direction: column;
  align-items: center;
  word-break: break-all;
`;

const WineName = styled.h3`
  width: 100%;
  font-size: 16px;
  font-weight: 550;
  max-height: 40px;
  margin: 10px 0px;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

const KoName = styled.span`
  width: 100%;
  font-size: 14px;
  max-height: 33px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

const Rating = styled.span`
  background-color: rgba(172, 45, 49);
  font-size: 12px;
  color: white;
  font-weight: 550;
  padding: 5px 7px;
  border-radius: 20px;
  margin: 10px 0px;

  display: flex;
  align-items: center;
`;

const Region = styled.div`
  width: 100%;
  font-size: 13px;
  margin: 10px 0px;

  display: flex;
  align-items: center;

  & span {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    margin-left: 10px;
  }
`;
