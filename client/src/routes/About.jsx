import React from "react";
import { styled } from "styled-components";
import { PiCursorClickFill, PiWarningDiamondFill } from "react-icons/pi";
import TechStack from "../component/TechStack";
import Footer from "../component/Footer";

const About = () => {
  return (
    <>
      <Container>
        <Description>
          <h3>
            About this Application
            <PiCursorClickFill style={{ margin: "0px 10px", height: "23px" }} />
          </h3>
          <p>이 어플리케이션은 React JS와 Node JS를 기반으로 개발되었습니다.</p>
          <p>
            사용자가 와인에 대한 취향을 입력하고 <strong>`추천받기`</strong>{" "}
            버튼을 클릭하면, 취향에 맞는 와인을 추천받을 수 있습니다.
            <br />
          </p>
          <p>
            입력 값에 따라 그에 맞는 와인을 찾는 과정은{" "}
            <strong>Chat GPT API (OpenAI API)</strong>를 활용하였고,{" "}
            <strong>Vivino API</strong>를 통해 와인에 대한 정보를 가져오는
            방식으로 구성되었습니다.
          </p>
        </Description>
        <Description>
          <h3>
            <PiWarningDiamondFill
              style={{ margin: "0px 10px", height: "25px" }}
            />
            유의사항
            <PiWarningDiamondFill
              style={{ margin: "0px 10px", height: "25px" }}
            />
          </h3>
          <p>
            Chat GPT를 활용하기 때문에 때로는{" "}
            <strong>적절하지 않은 추천 와인</strong>이 등장할 수 있습니다.
            <br />
          </p>
          <p>
            Vivino API를 통해 와인 정보를 가져오는 과정에서{" "}
            <strong>30초 이상의 로딩</strong>이 일어날 수 있습니다.
          </p>
        </Description>
      </Container>
      <TechStack />
      <Footer />
    </>
  );
};

export default About;

const Container = styled.div`
  width: 100vw;
  position: relative;
  padding-top: 50px;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 768px) {
    h3 {
      font-size: 22px;
    }
  }
`;

const Description = styled.div`
  width: 900px;
  display: flex;
  border-radius: 10px;
  margin-bottom: 50px;

  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 0px 80px;
  text-align: center;

  h3 {
    font-size: 25px;
    display: flex;
    align-items: center;
  }

  p {
    margin: 5px 0;
    line-height: 30px;
  }

  @media screen and (max-width: 950px) {
    width: 95%;
  }

  @media screen and (max-width: 768px) {
    font-size: 13px;
    line-height: normal;
    padding: 20px 30px;
  }
`;
