import React from "react";
import styled from "styled-components";
import { BiSolidDownArrow } from "react-icons/bi";
import { GoCircle, GoCheckCircleFill } from "react-icons/go";

function Selected({ step, options }) {
  return (
    <Container>
      <h2>
        <BiSolidDownArrow style={{ margin: "0px 10px", height: "15px" }} />
        선택한 와인
        <BiSolidDownArrow style={{ margin: "0px 10px", height: "15px" }} />
      </h2>
      <MyWine>
        <Image src="img/wine-bottle.png" alt="wine bottle" />
        <LineBox>
          <Line>
            {step > 1 ? (
              <GoCheckCircleFill
                style={{
                  width: "20px",
                  height: "20px",
                  color: "rgba(172, 45, 49)",
                }}
              />
            ) : (
              <GoCircle
                style={{
                  width: "20px",
                  height: "20px",
                  color: "#525252",
                }}
              />
            )}
            <span>타입 - {options.type}</span>
          </Line>
          <Line>
            {step > 2 ? (
              <GoCheckCircleFill
                style={{
                  width: "20px",
                  height: "20px",
                  color: "rgba(172, 45, 49)",
                }}
              />
            ) : (
              <GoCircle
                style={{
                  width: "20px",
                  height: "20px",
                  color: "#525252",
                }}
              />
            )}
            <span>바디 - {options.body}</span>
          </Line>
          <Line>
            {step > 3 ? (
              <GoCheckCircleFill
                style={{
                  width: "20px",
                  height: "20px",
                  color: "rgba(172, 45, 49)",
                }}
              />
            ) : (
              <GoCircle
                style={{
                  width: "20px",
                  height: "20px",
                  color: "#525252",
                }}
              />
            )}
            <span>타닌 - {options.tannin}</span>
          </Line>
          <Line>
            {step > 4 ? (
              <GoCheckCircleFill
                style={{
                  width: "20px",
                  height: "20px",
                  color: "rgba(172, 45, 49)",
                }}
              />
            ) : (
              <GoCircle
                style={{
                  width: "20px",
                  height: "20px",
                  color: "#525252",
                }}
              />
            )}
            <span>산도 - {options.acidity}</span>
          </Line>
          <Line>
            {step > 5 ? (
              <GoCheckCircleFill
                style={{
                  width: "20px",
                  height: "20px",
                  color: "rgba(172, 45, 49)",
                }}
              />
            ) : (
              <GoCircle
                style={{
                  width: "20px",
                  height: "20px",
                  color: "#525252",
                }}
              />
            )}
            <span>당도 - {options.sweetness}</span>
          </Line>
        </LineBox>
      </MyWine>
    </Container>
  );
}

export default Selected;

const Container = styled.div`
  width: 320px;
  h2 {
    text-align: center;
    font-size: 20px;
  }
`;

const MyWine = styled.div`
  width: 100%;
  height: 230px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  border-radius: 10px;
  border: 0.5px solid gray;

  display: flex;
  align-items: center;
`;

const Image = styled.img`
  height: 170px;
  margin: 10px 0px;
`;

const LineBox = styled.div`
  width: 170px;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Line = styled.div`
  width: 100%;
  height: 35px;
  box-sizing: border-box;
  font-size: 14px;

  display: flex;
  align-items: center;

  & span {
    margin: 0px 10px;
  }
`;
