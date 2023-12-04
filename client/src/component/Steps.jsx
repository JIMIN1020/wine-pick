import React from "react";
import styled from "styled-components";

function Steps({ step }) {
  return (
    <StepBox>
      <Step>
        <Num step={step >= 1}>1</Num>
        <Line step={step >= 2} />
      </Step>
      <Step>
        <Num step={step >= 2}>2</Num>
        <Line step={step >= 3} />
      </Step>
      <Step>
        <Num step={step >= 3}>3</Num>
        <Line step={step >= 4} />
      </Step>
      <Step>
        <Num step={step >= 4}>4</Num>
        <Line step={step >= 5} />
      </Step>
      <Step>
        <Num step={step >= 5}>5</Num>
      </Step>
    </StepBox>
  );
}

export default Steps;

const StepBox = styled.div`
  width: 800px;
  height: 100px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
const Line = styled.div`
  width: 50px;
  height: 3px;
  border-radius: 5px;
  background-color: ${(props) => (props.step ? "rgb(172, 45, 49)" : "#e2e2e2")};
`;

const Step = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  box-sizing: border-box;

  & span {
    margin: 0px 10px;
    color: #222222;
    font-weight: 500;
  }
`;

const Num = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: ${(props) => (props.step ? "rgb(172, 45, 49)" : "#e2e2e2")};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.step ? "white" : "rgb(46, 46, 46)")};
  font-weight: 900;
`;
