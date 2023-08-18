import React from "react";
import { styled } from "styled-components";
import wineImg from "../assets/images/wine-bottle.png";

const WineInfo = ({ wine }) => {
  /* ------------- 문자열 내 html 태그 처리 ------------- */
  function createMarkup(html) {
    return { __html: html };
  }
  /* ------------- 와인 클릭 시 링크로 이동 ------------- */
  const onClick = () => {
    window.open(wine.link);
  };
  return (
    <Container onClick={onClick}>
      <Thumbnail>
        {wine.thumbnail ? (
          <img src={wine.thumbnail} height="180" alt="wine img" />
        ) : (
          <img src={wineImg} width="150" alt="wine img" />
        )}
      </Thumbnail>
      <Description>
        <h3
          dangerouslySetInnerHTML={createMarkup(
            wine.title.replace(/<b>/g, "").replace(/<\/b>/g, "")
          )}
        />
        <p
          dangerouslySetInnerHTML={
            wine.description
              ? createMarkup(
                  wine.description
                    .replace(/<b>/g, "")
                    .replace(/<\/b>/g, "")
                    .replace("테이스팅 노트", "")
                )
              : createMarkup("상세 설명이 없습니다.")
          }
        />
      </Description>
    </Container>
  );
};

export default WineInfo;

const Container = styled.div`
  width: 520px;
  height: 250px;
  background-color: white;
  margin: 20px 0px;
  border-radius: 15px;

  display: flex;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }

  @media screen and (max-width: 600px) {
    width: 80%;
    height: auto;
    flex-direction: column;
    align-items: center;
  }
`;

const Thumbnail = styled.div`
  width: 150px;
  height: 250px;
  border-radius: 15px;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 600px) {
    height: 170px;
    padding: 20px 0;
  }
`;

const Description = styled.div`
  width: 370px;
  height: 250px;
  box-sizing: border-box;
  padding: 15px 0px;
  padding-right: 30px;

  h3 {
    font-size: 22px;
  }

  p {
    line-height: 25px;
  }

  @media screen and (max-width: 600px) {
    width: 90%;
    justify-content: center;
    text-align: center;
    padding: 0px 0px;
  }
`;
