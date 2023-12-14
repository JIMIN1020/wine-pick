import React from "react";
import styled from "styled-components";

function Guide() {
  return (
    <Container>
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
              와인과 함께 페어링 하고 싶은 <strong>음식의 이름과 특징</strong>을
              선택하면,
            </p>
            <p>
              <strong>음식과 잘 어울리는 와인 5가지</strong>를 추천받을 수
              있어요!
            </p>
          </Desc>
          <Image src="img/pairing.gif" alt="pairing" />
        </Intro>
      </Line>
      <Line>
        <h1>추천 결과 확인 &#x2728;</h1>
        <Intro>
          <Image
            src="img/result.gif"
            alt="result"
            style={{ height: "270px" }}
          />
          <Desc style={{ height: "270px" }}>
            <p>
              원하는 취향 & 페어링 음식에 맞는 와인을 <strong>Chat GPT</strong>
              가 추천합니다!
            </p>
            <p>
              추천 결과를 클릭하면 <strong>해당 와인의 상세 페이지</strong>로
              이동할 수 있어요.
            </p>
          </Desc>
        </Intro>
      </Line>
    </Container>
  );
}

export default Guide;

const Container = styled.div`
  width: 100%;
  max-width: 1250px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 50px 0px;
`;

const Image = styled.img`
  height: 350px;
  /* box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px; */
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 10px;
  border: 1px solid lightgray;
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
